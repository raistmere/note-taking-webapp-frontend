import styles from "./Login.module.css";
import {FormEvent} from "react";
import {Link, useNavigate} from "react-router";

// import images/icons
import logo from "../../assets/images/logo.svg";

function Login() {

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = new URLSearchParams();
        data.append("username", formData.get("username") as string);
        data.append("password", formData.get("password") as string);

        console.log(data.get("username"));
        console.log(data.get("password"));
        console.log(data);
        console.log(JSON.stringify(data));
        console.log(data.toString());

        fetchAuthentication(data);
    }

    const fetchAuthentication = async (data: URLSearchParams) => {

        try {
            const response = await fetch("http://localhost:8080/login",{

                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: data,
                credentials:"include",
            })

            console.log(response);

            if(response.ok) {

                console.log("Login successfull!");
                navigate("/dashboard");
            } else {

                console.log("Login failed");
            }
        } catch (error) {

            console.log("Error: " + error);
        }

    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.mainContainer}>
                <div className={styles.logoContainer}>
                    <img src={logo}/>
                    <div className={styles.welcomeTextContainer}>
                        <h1> Welcome to Note</h1>
                        <p>Please log in to continue</p>
                    </div>
                </div>
                <div className={styles.loginWrapper}>
                    <form className={styles.formContainer} onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input type={"text"} name={"username"} placeholder={"123name"} />
                        <div className={styles.passwordContainer}>
                            <div className={styles.labelContainer}>
                                <label>Password</label>
                                <Link to={"/forgotpassword"}>Forgot</Link>
                            </div>
                            <input type={"password"} name={"password"} />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div className={styles.oathContainer}>
                    <hr/>
                    <p>Or log in with:</p>
                    <hr/>
                </div>
                <div className={styles.signUpContainer}>
                    <p> No account yet? </p>
                    <Link to="/signup">Sign Up</Link>
                </div>
                <hr/>
                <button onClick={() => {navigate("/")}}>Back to home page</button>
            </div>
        </div>
    )
}

export default Login;