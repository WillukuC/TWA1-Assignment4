import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
    email: string;
    movieChoice: string;
    authenticated: boolean;
}

function home() {
    const jwtString = localStorage.getItem('jwt');
    const [email, setEmail] = useState<string>("");
    const [movie, setMovie] = useState<string>("");
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
                setMovie(movieChoice)
                setAuthenticated(authenticated)

                console.log(`Email: ${email}`);
                console.log(`Movie choice: ${movieChoice}`);
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
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            Logged in as: {email}
                        </div>
                        <div className="col-6">
                            <button className="btn btn-dark" onClick={handleLogout} type="button">Log out</button>
                        </div>
                    </div>
                    <div className="row">Our movies</div>
                    <div className="row">Your favorite movie genre: {movie}</div>
                    <div className="row">
                        <div className="col">
                            Movie 1
                        </div>
                        <div className="col">
                            Movie 2
                        </div>
                        <div className="col">
                            Movie 3
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default home;