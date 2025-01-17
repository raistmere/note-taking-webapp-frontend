import {Link, useNavigate} from "react-router";
import {useEffect} from "react";

function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {

        getDashboardData()
    }, []);

    const getDashboardData = async ()=> {

        const response = await fetch("http://localhost:8080/dashboard",{
            method: "GET",
            credentials:"include",
        })

        console.log(response);

        if(response.redirected && response.url === "http://localhost:8080/login"){

            navigate("/login");
        }
    }

    return (
        <div>
            Welcome to the Dashboard Page!
            <Link to={"/logout"}>Logout</Link>
        </div>
    )
}

export default Dashboard;