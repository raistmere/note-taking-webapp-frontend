import styles from "./Login.module.css";
import {FormEvent} from "react";
import {useNavigate} from "react-router";

// current password: 111eda61-9d3b-4936-bd93-05cc1e5d7e30

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
        <div>
            <h1> Welcome to the Login Form!</h1>
            <div>
                <form className={styles.loginFormContainer} onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type={"text"} name={"username"} placeholder={"123name"} />
                    <label>Password</label>
                    <input type={"password"} name={"password"} placeholder={"password@example.com"} />
                    <button type="submit">Login</button>
                </form>
                <br/>
                <button onClick={() => {navigate("/")}}>Back to home page</button>
            </div>
        </div>
    )
}

export default Login;