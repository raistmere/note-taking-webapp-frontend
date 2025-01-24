import {Link} from "react-router";

function Home() {

    return (
        <div>
            <div>Welcome to the Home Page!</div>
            <Link to={"/Dashboard"}>Go to Dashboard</Link>
        </div>
    );
}

export default Home;