import styles from "./Dashboard.module.css";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import logoIcon from "../../assets/images/logo.svg";
import homeIcon from "../../assets/images/icon-home.svg";
import searchIcon from "../../assets/images/icon-search.svg";
import archiveIcon from "../../assets/images/icon-archive.svg";
import tagIcon from "../../assets/images/icon-tag.svg";
import settingsIcon from "../../assets/images/icon-settings.svg";
import leftArrowIcon from "../../assets/images/icon-arrow-left.svg";
import trashIcon from "../../assets/images/icon-delete.svg";
import timeIcon from "../../assets/images/icon-clock.svg";

interface Note {

    id: number;
    userId: number;
    title: string;
    note: string;
}

function Dashboard() {

    const [notes, setNotes] = useState<Note[]>([]);
    const [isDetailView, setIsDetailView] = useState<boolean>(false);
    const [currentNote, setCurrentNote] = useState<Note>();

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
    };

    const ViewNoteDetail = (noteID: number) => {

        setIsDetailView(true);

        setCurrentNote(notes.find((note: Note) => note.id === noteID));
    };

    return (
        <div className={styles.wrapper}>

            {/* HEADER */}
            {/* header - should be turned into a component if need be. */}
            <div className={styles.headerContainer}>
                <img src={logoIcon} alt="logo"/>
            </div>

            {/* CONTENT */}
            {/* content (middle section) - should be turned into multiple components. */}
            {/* content section will adapt to with responsive design. */}
            <div className={styles.contentContainer}>

                {!isDetailView

                    ? // TRUE
                    (<>
                        {/* Content header - this can be turned into a component if need be*/}
                        <h3>All Notes</h3>
                        {/* Note List Container - this will turn into its own component if need be.*/}
                        <ul className={styles.noteListContainer}>
                            {notes.map((note: Note) => (
                                <li key={note.id} className={styles.noteContainer}
                                    onClick={() => ViewNoteDetail(note.id)}>
                                    <strong>{note.title}</strong>
                                    <div className={styles.tagContainer}>
                                        <p>Dev</p>
                                        <p>React</p>
                                    </div>
                                    <p>29 Oct 2024</p>
                                    <hr/>
                                </li>
                            ))}
                        </ul>
                    </>)

                    : // ELSE
                    /* Note Detail Container   */
                    (<div className={styles.noteDetailContainer}>
                        {/* Header container for note detail container*/}
                        <div className={styles.headerContainer}>
                            <Link to={"/dashboard"} className={styles.backLinkContainer}
                                  onClick={() => setIsDetailView(false)}>
                                <img src={leftArrowIcon} alt="Left arrow icon"/>
                                <p>Go Back</p>
                            </Link>
                            <div className={styles.buttonContainer}>
                                <button>
                                    <img src={trashIcon} alt="Trash delete icon button"/>
                                </button>
                                <button>
                                    <img src={archiveIcon} alt="Archive icon button"/>
                                </button>
                                <button>
                                    Cancel
                                </button>
                                <button className={styles.saveButton}>
                                    Save Note
                                </button>
                            </div>
                        </div>
                        <div className={styles.contentContainer}>
                            {currentNote
                                ?
                                // display note details
                                (<>
                                    <div className={styles.headerContainer}>
                                        <h3 className={styles.noteTitle}>
                                            {currentNote.title}
                                        </h3>
                                        <div className={styles.tagContainer}>
                                            <div className={styles.titleContainer}>
                                                <img src={tagIcon} alt="tag icon"/>
                                                <p>Tags</p>
                                            </div>
                                            <div className={styles.listContainer}>
                                                <p>Dev, React</p>
                                            </div>
                                        </div>
                                        <div className={styles.timestampContainer}>
                                            <div className={styles.titleContainer}>
                                                <img src={timeIcon} />
                                                <p>Last Edited</p>
                                            </div>
                                            <p>
                                                29 Oct 2024
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.textContainer}>
                                        {currentNote.note}
                                    </div>
                                </>)

                                :
                                // WARNING: SOMETHING WENT WRONG
                                "ERROR: CURRENT NOTE IS NULL"}
                        </div>
                    </div>)
                }

            </div>

            {/* FOOTER */}
            {/* footer (mobile menu bar) - should be its own component.*/}
            <div className={styles.footerContainer}>
                <div className={styles.createButtonContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12 5a.75.75 0 0 1 .75.75V11H18a.75.75 0 0 1 0 1.5h-5.25v5.25a.75.75 0 0 1-1.5 0V12.5H6A.75.75 0 0 1 6 11h5.25V5.75A.75.75 0 0 1 12 5Z"/>
                    </svg>
                </div>
                <div className={styles.menuBarContainer}>
                    <Link to={"/Dashboard"}>
                        <img src={homeIcon} alt="home icon"/>
                    </Link>
                    <Link to={"/Dashboard"}>
                        <img src={searchIcon} alt="home icon"/>
                    </Link>
                    <Link to={"/Dashboard"}>
                        <img src={archiveIcon} alt="home icon"/>
                    </Link>
                    <Link to={"/Dashboard"}>
                        <img src={tagIcon} alt="home icon"/>
                    </Link>
                    {/* For now the settings button will redirect to logout until settings is created*/}
                    <Link to={"/logout"}>
                        <img src={settingsIcon} alt="home icon"/>
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default Dashboard;