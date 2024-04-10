import React, { useState, useEffect } from 'react';


function home() {
    const jwt = localStorage.getItem('jwt');
    const [email, setEmail] = useState<string>("Not Logged in");
    const [favGenre, setFavGenre] = useState<string>("Genre");
    const [movies, setMovies] = useState<Object>([]);

    useEffect(() => {
        callMovies();
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
                console.log(data);
                setMovies(data);

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
                    <div className="row"><h4>Your favorite favGenre genre: {favGenre}</h4>  </div>
                    <div className="row">
                        {/* {movies.map((movie) => (
                            
                        ))} */}
                        <div className="col text-center">
                            favGenre 1
                        </div>
                        <div className="col text-center">
                            favGenre 2
                        </div>
                        <div className="col text-center">
                            favGenre 3
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default home;