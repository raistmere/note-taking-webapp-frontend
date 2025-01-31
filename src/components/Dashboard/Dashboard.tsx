import styles from "./Dashboard.module.css";
import {Link, useNavigate} from "react-router";
import {FormEvent, useEffect, useState} from "react";

import NoteList from "../NoteList/NoteList.tsx";
import NoteDetail from "../NoteDetail/NoteDetail.tsx";
import NoteCreate from "../NoteCreate/NoteCreate.tsx"

import logoIcon from "../../assets/images/logo.svg";
import homeIcon from "../../assets/images/icon-home.svg";
import searchIcon from "../../assets/images/icon-search.svg";
import archiveIcon from "../../assets/images/icon-archive.svg";
import tagIcon from "../../assets/images/icon-tag.svg";
import settingsIcon from "../../assets/images/icon-settings.svg";
import NoteEdit from "../NoteEdit/NoteEdit.tsx";


export enum View {
    NOTE_LIST,
    NOTE_DETAIL,
    NOTE_CREATE,
    NOTE_EDIT,
}

export interface Note {

    id: number | null;
    userId: number | null;
    title: string;
    note: string;
}

function Dashboard() {

    const [notes, setNotes] = useState<Note[]>([]);
    const [view, setView] = useState<View>(View.NOTE_LIST);
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

    const viewNoteList = () => {

        changeView(View.NOTE_LIST);
    }

    const viewNoteDetail = (noteID: number | null) => {

        setCurrentNote(notes.find((note: Note) => note.id === noteID));
        changeView(View.NOTE_DETAIL)
    };

    const viewCreateNote = () => {

        changeView(View.NOTE_CREATE);
    }

    const viewEditNote = () => {

        changeView(View.NOTE_EDIT);
    }


    const changeView = (view: View) => {

        setView(view);
    }

    const displayContentView = () => {

        switch (view) {

            case View.NOTE_LIST:

                return <NoteList noteList={notes} viewDetail={viewNoteDetail}/>
            case View.NOTE_DETAIL:

                if(!currentNote) throw new Error(`ERROR: CURRENT NOTE IS NULL/UNDEFINED. CAN'T CALL NOTE_DETAIL VIEW`);

                if(currentNote.id == null) Error(`ERROR: CURRENT NOTE ID IS NULL. CAN'T CALL NOTE_DETAIL VIEW WITHOUT ID`);

                return <NoteDetail note={currentNote} viewList={viewNoteList} deleteNote={deleteNote} viewEdit={viewEditNote}/>
            case View.NOTE_CREATE:

                return <NoteCreate viewList={viewNoteList} createNote={createNote}/>
            case View.NOTE_EDIT:

                if(!currentNote) throw new Error(`ERROR: CURRENT NOTE IS NULL/UNDEFINED. CAN'T CALL NOTE_DETAIL VIEW`);

                if(currentNote.id == null) throw new Error(`ERROR: CURRENT NOTE ID IS NULL. CAN'T CALL NOTE_DETAIL VIEW WITHOUT ID`);

                return <NoteEdit note={currentNote} viewList={viewNoteList} editNote={editNote} />
            default:

                throw new Error(`ERROR: NO VIEW DISPLAY SELECTED`);
        }
    }

    const createNote = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // TODO: Need validation for form data (check for null or invalid values) before creating note

        // create a new note
        const note: Note = {

            id: null,
            userId: null,
            title: formData.get("title") as string,
            note: formData.get("note") as string
        }

        console.log(note);


        const response = await fetch("http://localhost:8080/createnote",{
            method: "POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        })

        console.log(response);

        await getDashboardData();
        changeView(View.NOTE_LIST);
    }

    const deleteNote = async () => {

        console.log("Deleting note...")

        const response = await fetch("http://localhost:8080/deletenote",{

            method: "POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentNote),
        })

        console.log(response);
        await getDashboardData();
        changeView(View.NOTE_LIST);
    }

    const editNote = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        console.log("Applying Edit to note...")

        const formData = new FormData(e.currentTarget);

        // create a new note
        const note: Note = {

            id: (currentNote != undefined ? currentNote.id : null),
            userId: null,
            title: formData.get("title") as string,
            note: formData.get("note") as string
        }

        console.log(note);

        const response = await fetch("http://localhost:8080/editnote",{
            method: "POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        })

        console.log(response);

        await getDashboardData();
        changeView(View.NOTE_LIST);
    }


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
                {displayContentView()}
            </div>

            {/* FOOTER */}
            {/* footer (mobile menu bar) - should be its own component.*/}
            <div className={styles.footerContainer}>
                {view != View.NOTE_CREATE &&
                    <div className={styles.createButtonContainer} onClick={() => viewCreateNote()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12 5a.75.75 0 0 1 .75.75V11H18a.75.75 0 0 1 0 1.5h-5.25v5.25a.75.75 0 0 1-1.5 0V12.5H6A.75.75 0 0 1 6 11h5.25V5.75A.75.75 0 0 1 12 5Z"/>
                        </svg>
                    </div>
                }
                <div className={styles.menuBarContainer}>
                    <Link to={"/Dashboard"} onClick={() => setView(View.NOTE_LIST)}>
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