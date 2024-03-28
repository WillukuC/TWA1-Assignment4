import React, { useState, useEffect } from 'react'

function signup() {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [movieChoice, setMovieChoice] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword1Change = (event) => {
        setPassword1(event.target.value);
    };

    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
    };

    const handleMovieChoiceChange = (event) => {
        setMovieChoice(event.target.value);
    };

    const handleRegister = async () => {
        console.log(email, password1, password2, movieChoice);
    };

    const [agreesToTerms, setAgreesToTerms] = useState(false);
    const handleAgreeToTermsChange = (event) => {
        setAgreesToTerms(event.target.checked);
    };

    return (
        <>
            <h3>Create a new account</h3>
            <div className="container px-1">
                <div className="col p-1">
                    <div className="input-group mb-3">
                        <input type="text" value={email} onChange={handleEmailChange} className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" value={password1} onChange={handlePassword1Change} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" value={password2} onChange={handlePassword2Change} className="form-control" placeholder="Confirm Password" aria-label="ConfirmPassword" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <select className="form-select" value={movieChoice} onChange={handleMovieChoiceChange}>
                            <option selected>Favorite movie genre...</option>
                            <hr />
                            <option value="1">Drama</option>
                            <option value="2">Comedy</option>
                            <option value="3">Action</option>
                            <option value="4">Sci-fi</option>
                            <option value="5">Animation</option>
                            <option value="6">History</option>
                            <option value="7">Horror</option>
                            <option value="8">Romance</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-text mx-2">
                            <input
                                className="form-check-input mt-0"
                                id="accToS"
                                type="checkbox"
                                value=""
                                aria-label="Checkbox for following text input"
                                checked={agreesToTerms}
                                onChange={handleAgreeToTermsChange}
                            />
                        </div>
                        Agree to the <a className='ps-1' href="https://i.imgflip.com/64sz4u.png?a475440g" target="_blank"> terms and conditions</a>
                    </div>
                    <div>
                        <button className="btn btn-dark" onClick={handleRegister} type="button">Register</button>
                    </div>
                    <span>Already a member?<a className='my-1 ps-1' href="url">Log in here</a></span>
                </div>
            </div>
        </>
    )
}

export default signup