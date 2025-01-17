import {Link} from "react-router";

function Home() {

    return (
        <div>
            <div>Welcome to the Home Page!</div>
            <Link to={"/dashboard"}>Go to Dashboard</Link>
        </div>
    );
}

export default Home;