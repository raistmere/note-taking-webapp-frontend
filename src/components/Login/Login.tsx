import styles from "./Login.module.css";
import {FormEvent} from "react";
import {Link, useNavigate} from "react-router";

// import images/icons
import logoIcon from "../../assets/images/logo.svg";
import showIcon from "../../assets/images/icon-show-password.svg";
// import infoIcon from "../../assets/images/icon-info.svg";

function Login() {

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = new URLSearchParams();
        data.append("username", formData.get("email") as string);
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
                    <img src={logoIcon}/>
                    <div className={styles.welcomeTextContainer}>
                        <p className={`${styles.title} sans-serif-1`}>Welcome to Note</p>
                        <p className={`sans-serif-5`}>Please log in to continue</p>
                    </div>
                </div>
                <div className={styles.loginWrapper}>
                    <form className={styles.formContainer} onSubmit={handleSubmit}>
                        <div className={styles.inputContainer}>
                            <label className={`sans-serif-4`}>Email Address</label>
                            <input type={"text"} name={"email"} placeholder={"email@example.com"} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={`sans-serif-4`}>Password</label>
                            <div className={styles.passwordContainer}>
                                <input type={"password"} name={"password"} />
                                <img src={showIcon}/>
                            </div>
                        </div>
                        <button type="submit" className={`sans-serif-3`}>Login</button>
                    </form>
                </div>
                <div className={styles.loginContainer}>
                    <hr />
                    <p className={`sans-serif-5`}> No account yet? <Link to="/signup">Sign Up</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Login;