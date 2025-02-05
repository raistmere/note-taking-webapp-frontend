import styles from "../NoteList/NoteList.module.css";
import { Note } from "../Dashboard/Dashboard";

type Props = {
    noteList: Note[];
    viewDetail: (noteId: number | null) => void;
}

const NoteList = (props: Props) => {

    return (
        <div className={styles.noteListContainer}>
            {/* Content header - this can be turned into a component if need be*/}
            <h1 className={`sans-serif-1`}>All Notes</h1>
            {/* Note List Container - this will turn into its own component if need be.*/}
            {props.noteList.length > 0
                ?
                (
                    <ul className={styles.listWrapper}>
                        {props.noteList.map((note: Note) => (
                            <li key={note.id} className={styles.noteContainer}
                                onClick={() => props.viewDetail(note.id)}>
                                <strong>{note.title}</strong>
                                <div className={styles.tagContainer}>
                                    <p>Dev</p>
                                    <p>React</p>
                                </div>
                                <p>29 Oct 2024</p>
                                <hr/>
                            </li>))}
                    </ul>
                )
                :
                (
                    <div className={`${styles.emptyContainer}`}>
                        <p>You don't have any notes yet. Start a new note to capture your thoughts and ideas.</p>
                    </div>
                )
            }

        </div>
    )
}

export default NoteList;