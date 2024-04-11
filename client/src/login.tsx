import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function login() {
    // const users = [
    //     {
    //         email: 'user1@example.com',
    //         password: 'password1',
    //     },
    //     {
    //         email: 'user2@example.com',
    //         password: 'password2',
    //     },
    // ];

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(true);
    const [password, setPassword] = useState("");
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
        if (!validateEmail(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    // const authUser = (email, password) => {
    //     const user = users.find(user => user.email === email && user.password === password);
    //     return user ? true : false;
    // };

    const validateEmail = (email: any) => {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(String(email).toLowerCase());
    };

    const handlePasswordChange = (event: any) => {
        const password = event.target.value
        setPassword(password);
    };

    const handleLogin = async () => {
        console.log("Verifying credentials...");
        if (email == '' || password == '') {

            notifyError('Please provide an email and password')

            // } else if (!authUser(email, password)) {

            //     notifyError('Username or password is not valid')

        } else if (emailError == false) {
            try {
                const response = await fetch("http://localhost:8080/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.log(error);
                    throw new Error(error.message);
                }
                notifySuccess("Logged in successfully! Redirecting...");
                const { token } = await response.json();
                console.log(token);
                localStorage.setItem("jwt", token);
                localStorage.setItem("email", email);
                setTimeout(() => {
                    window.location.href = "/movies";
                }, 2000);
            } catch (error) {
                notifyError(String(error));
            }
            setTimeout(() => {
                window.location.href = "/movies";
            }, 2000);
        } else {
            notifyError("An error has occured. Please try again later.")
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
                        <h3 className="mb-4">Log into an existing account</h3>
                        <div className="input-group mb-3">
                            <input type="text" value={email} onChange={handleEmailChange} className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" value={password} onChange={handlePasswordChange} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                        </div>
                        <div>
                            <button className="btn btn-dark" onClick={handleLogin} type="button">Login</button>
                        </div>
                        <span>Not a member?<a className='my-1 ps-1' href="/signup">Sign up here</a></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default login