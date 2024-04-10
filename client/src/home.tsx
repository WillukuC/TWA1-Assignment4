import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
    email: string;
    movieChoice: string;
    authenticated: boolean;
}

function home() {
    const jwtString = localStorage.getItem('jwt');
    const [email, setEmail] = useState<string>("Not Logged in");
    const [favGenre, setFavGenre] = useState<string>("Genre");
    const [movies, setMovies] = useState<string>([]);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        handleShowInfo();
    }, []);

    const handleShowInfo = () => {
        if (jwtString != null) {
            try {
                const decodedJwt = jwtDecode<JwtPayload>(jwtString);
                const { email, movieChoice, authenticated } = decodedJwt;
                setEmail(email)
                setFavGenre(movieChoice)
                setAuthenticated(authenticated)

                console.log(`Email: ${email}`);
                console.log(`favGenre choice: ${movieChoice}`);
                console.log(`Authenticated: ${authenticated}`);
            } catch (error) {
                console.error('Error decoding JWT:', error);
            }
            // } else {
            //     window.location.href = "/login";
        }
    };


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