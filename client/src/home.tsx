import React, { useState, useEffect } from 'react';


function home() {
    const jwt = localStorage.getItem('jwt');
    const [email, setEmail] = useState<string>("Not Logged in");
    const [favGenre, setFavGenre] = useState<string>("Genre");
    const [moviesResults, setMoviesResults] = useState([]);

    useEffect(() => {
        callMovies();
        setEmail(localStorage.getItem('email'));
    }, []);

    const callMovies = async () => {
        if (jwt != null) {
            try {
                const response = await fetch("http://localhost:8080/api/movies", {
                    method: "GET",
                    headers: {
                        token: jwt,
                    }
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.log(error);
                    throw new Error(error.message);
                }
                const data = await response.json();
                console.log(data.movies);
                setMoviesResults(data.movies);

            } catch (error) {
                console.log(error);
            }
        } else {
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        }

    }

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('email')
        window.location.href = "/login";
    }

    return (
        <>
            <div>
                <span className="navbar fixed-top navbar-light bg-light px-2">
                    <span className="text-decoration text-primary">
                        {email}
                    </span>
                    <button className="btn btn-dark" onClick={handleLogout} type="button">Log out</button>
                </span>

                <div className="container-fluid bg-light rounded border border-secondary" style={{ maxWidth: '90%' }}>
                    <div className="row"><h4>Our movies</h4> </div>
                    <div className="row"><h4>Your favorite movie genre: {favGenre}</h4>  </div>
                    <div className="row">
                        {moviesResults.map((movie : any) => (
                            <div className="card" style={{ width: '18rem' }}>
                                <img class="card-img-top" src={movie.poster} alt="Movie Poster"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text">{favGenre} - {movie.year}</p>
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default home;