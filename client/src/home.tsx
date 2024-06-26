import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function home() {
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');
    const [email, setEmail] = useState<null | string>("Not Logged in");
    const [favGenre, setFavGenre] = useState<string>("Genre");
    const [moviesResults, setMoviesResults] = useState([]);

    useEffect(() => {
        callMovies();
        setEmail(localStorage.getItem('email'));
    }, []);

    const callMovies = async () => {
        if (jwt != null) {
            try {
                const response = await fetch("/api/movies", {
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
                console.log(data.movies[0]);
                console.log(data.movies[1]);
                console.log();
                setMoviesResults(data.movies[1]);
                setFavGenre(data.movies[0]);

            } catch (error) {
                console.log(error);
            }
        } else {
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }

    }

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('email')
        navigate('/login');
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

                <div className="container-fluid bg-light rounded border border-secondary pt-5" style={{ maxWidth: '90%'}}>
                    <div className="row"><h4>Our movies</h4> </div>
                    <div className="row"><h4>Your favorite movie genre: {favGenre}</h4>  </div>
                    <div className="row">
                        {moviesResults.map((movie : any) => (
                            <div className="card" style={{ width: '18rem' }}>
                                <img className="card-img-top" src={movie.poster} alt="Movie Poster"/>
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