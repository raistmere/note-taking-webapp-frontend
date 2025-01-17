import { useNavigate } from "react-router";

function logout() {

    const navigate = useNavigate();

    const submitLogout = async () => {

        const response = await fetch("http://localhost:8080/logout", {
            method: "GET",
            credentials: "include",
        });

        console.log(response);

        navigate("/login");
    }

    return (
        <div>
            <p>Are you sure you want to logout?</p>
            <button onClick={submitLogout}>Yes</button>
            <button onClick={() => {navigate("/dashboard")}}>No</button>
        </div>
    )
}

export default logout;