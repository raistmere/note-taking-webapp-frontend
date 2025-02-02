import styles from "./Signup.module.css";

import {Link, useNavigate} from "react-router";
import { FormEvent } from "react";

// import images/icons
import logoIcon from "../../assets/images/logo.svg";
import infoIcon from "../../assets/images/icon-info.svg";
import showIcon from "../../assets/images/icon-show-password.svg";
import hideIcon from "../../assets/images/icon-hide-password.svg";

const Signup = () => {

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.mainContainer}>
                <div className={styles.logoContainer}>
                    <img src={logoIcon}/>
                    <div className={styles.welcomeTextContainer}>
                        <h1>Create Your Account</h1>
                        <p>Sign up to start organizing your notes and boost your productivity</p>
                    </div>
                </div>
                <div className={styles.loginWrapper}>
                    <form className={styles.formContainer} onSubmit={handleSubmit}>
                        <div className={styles.inputContainer}>
                            <label>Email Address</label>
                            <input type={"text"} name={"username"} placeholder={"email@example.com"} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Password</label>
                            <div className={styles.passwordContainer}>
                                <input type={"password"} name={"password_confirmation"} />
                                <img src={showIcon}/>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Confirm Password</label>
                            <div className={styles.passwordContainer}>
                                <input type={"password"} name={"password_confirmation"} />
                                <img src={showIcon}/>
                            </div>
                            <div className={styles.infoContainer}>
                                <img src={infoIcon}/>
                                <p>At least 8 characters</p>
                            </div>
                        </div>
                        <button type="submit">Sign up</button>
                    </form>
                </div>
                <div className={styles.loginContainer}>
                    <hr />
                    <p> Already have an account? <Link to="/login">Login</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Signup;