import styles from "./Dashboard.module.css";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import logoIcon from "../../assets/images/logo.svg";
import homeIcon from "../../assets/images/icon-home.svg";
import searchIcon from "../../assets/images/icon-search.svg";
import archiveIcon from "../../assets/images/icon-archive.svg";
import tagIcon from "../../assets/images/icon-tag.svg";
import settingsIcon from "../../assets/images/icon-settings.svg";
// import plusIcon from "../../assets/images/icon-plus.svg";

interface Note {

    id: number;
    userId: number;
    title: string;
    note: string;
}

function Dashboard() {

    const [notes, setNotes] = useState<Note[]>([]);

    const navigate = useNavigate();

    useEffect(() => {

        getDashboardData()
    }, []);

    useEffect(() => {

        console.log("NOTES: " + JSON.stringify(notes));
    }, [notes]);

    const getDashboardData = async ()=> {

        const response = await fetch("http://localhost:8080/dashboard",{
            method: "GET",
            credentials:"include",
        })

        console.log(response);


        // if access denied and we are to be redirected to /Login
        // so this is kinda messy, I'm using the response to check what the redirect url is because of how I'm currently using the backend
        // this should not be like this and instead should bea simple !response.ok check that means that we need to go to Login page instead.
        if(response.redirected && response.url === "http://localhost:8080/login"){

            navigate("/login");
        } else {

            const data = await response.json();

            console.log(data);

            setNotes(data);
        }
    }

    return (
        <div className={styles.wrapper}>

            {/* HEADER */}
            {/* header - should be turned into a component if need be. */}
            <div className={styles.headerContainer}>
                <img src={logoIcon} alt="logo" />
            </div>

            {/* CONTENT */}
            {/* content (middle section) - should be turned into multiple components. */}
            {/* content section will adapt to with responsive design. */}
            <div className={styles.contentContainer}>
                <h3>All Notes</h3>
                <ul className={styles.listContainer}>
                    {notes.map((note: Note) => (
                        <li key={note.id} className={styles.noteContainer}>
                            <strong>{note.title}</strong>
                            <div className={styles.tagContainer}>
                                <p>Dev</p>
                                <p>React</p>
                            </div>
                            <p>29 Oct 2024</p>
                            <hr />
                        </li>
                    ))}
                </ul>
            </div>

            {/* FOOTER */}
            {/* footer (mobile menu bar) - should be its own component.*/}
            <div className={styles.footerContainer}>
                <div className={styles.buttonContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 5a.75.75 0 0 1 .75.75V11H18a.75.75 0 0 1 0 1.5h-5.25v5.25a.75.75 0 0 1-1.5 0V12.5H6A.75.75 0 0 1 6 11h5.25V5.75A.75.75 0 0 1 12 5Z"/>
                    </svg>
                </div>
                <div className={styles.menuBarContainer}>
                    <Link to={"/Dashboard"}>
                        <img src={homeIcon} alt="home icon" />
                    </Link>

                    <Link to={"/Dashboard"}>
                        <img src={searchIcon} alt="home icon" />
                    </Link>

                    <Link to={"/Dashboard"}>
                        <img src={archiveIcon} alt="home icon" />
                    </Link>

                    <Link to={"/Dashboard"}>
                        <img src={tagIcon} alt="home icon" />
                    </Link>

                    {/* For now the settings button will redirect to logout until settings is created*/}
                    <Link to={"/logout"}>
                        <img src={settingsIcon} alt="home icon" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;