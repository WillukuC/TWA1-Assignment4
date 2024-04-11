import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function signup() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(true);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordError, setPasswordError] = useState(true);
    const [favGenre, setFavGenre] = useState("");
    const [movieError, setMovieError] = useState(true);
    const notifyError = (error: String) =>
        toast.error(error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    const notifySuccess = (message: String) =>
        toast.success(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    const handleEmailChange = (event: any) => {
        const email = event.target.value;
        setEmail(email);
        setEmailError(!validateEmail(email));
    };

    const handlePassword1Change = (event: any) => {
        const password = event.target.value;
        setPassword(password);
        setPasswordError(!validatePassword(password));
    };

    const handlePassword2Change = (event: any) => {
        const password2 = event.target.value;
        setPassword2(password2);
    };

    const handleMovieChoiceChange = (event: any) => {
        const favGenre = event.target.value;
        setFavGenre(favGenre);
        if (favGenre == '' || favGenre == 'Favorite movie genre...') {
            setMovieError(true)
        } else {
            setMovieError(false);
        }
    };

    const handleRegister = async () => {
        if (email == '' || password == '' || password2 == '' || movieError) {
            notifyError("Please provide all required information.")
        } else if (emailError == true) {
            notifyError("Email is not valid.")
        } else if (passwordError == true) {
            notifyError("Password must contain at least 8 characters, at least an upper case and a lower case letter and have at least one symbol and number.")
        } else if (!matchPasswords(password, password2)) {
            notifyError("Passwords do not match.")
        } else if (!agreesToTerms) {
            notifyError("You must agree to the terms and conditions before signing up.")
        } else {
            console.log("Signed up successfully.");
            try {
                const response = await fetch("http://localhost:8080/api/register", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email,
                    password,
                    favGenre,
                  }),
                });
            
                if (!response.ok) {
                  const error = await response.json();
                  console.log(error);
                  throw new Error(error.message);
                }
                notifySuccess("Signed up successfully! Redirecting...");
                console.log("Signed up successfully.");
                setTimeout(() => {
                    window.location.href = "/login";
                  }, 2000);
              } catch (error) {
                notifyError(String(error));
              }
            
        }
    };

    const [agreesToTerms, setAgreesToTerms] = useState(false);
    const handleAgreeToTermsChange = (event: any) => {
        setAgreesToTerms(event.target.checked);
    };
    const validateEmail = (email: any) => {
        const regEmail = /^[A-Za-z0-9^@]+@[A-Za-z0-9^@]+.[A-Za-z0-9^@]+$/;
        return regEmail.test(String(email).toLowerCase());
    };
    const validatePassword = (password: any) => {
        const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
        return regPassword.test(String(password))
    }

    const matchPasswords = (password: any, password2: any) => {
        if (password === password2) {
            return true
        } else {
            return false
        }
    };

    return (
        <>
            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="container-fluid p-2 bg-light rounded border border-secondary" style={{ maxWidth: '20%' }}>
                
                <div className="container px-1 d-flex justify-content-center text-center">
                    <div className="col p-1">
                    <h3 className="mb-4">Create a new account</h3>
                        <div className="input-group mb-3">
                            <input type="text" value={email} onChange={handleEmailChange} className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" value={password} onChange={handlePassword1Change} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" value={password2} onChange={handlePassword2Change} className="form-control" placeholder="Confirm Password" aria-label="ConfirmPassword" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <select className="form-select" value={favGenre} onChange={handleMovieChoiceChange}>
                                <option selected>Favorite movie genre...</option>
                                <option value="Drama">Drama</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Action">Action</option>
                                <option value="Sci-fi">Sci-fi</option>
                                <option value="Animation">Animation</option>
                                <option value="History">History</option>
                                <option value="Horror">Horror</option>
                                <option value="Romance">Romance</option>
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
                        <span>Already a member?<a className='my-1 ps-1' href="/login">Log in here</a></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default signup