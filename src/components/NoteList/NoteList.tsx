import styles from "../Dashboard/Dashboard.module.css";
import { Note } from "../Dashboard/Dashboard";

type Props = {
    noteList: Note[];
    viewDetail: (noteId: number | null) => void;
}

const NoteList = (props: Props) => {

    return (
        <>
            {/* Content header - this can be turned into a component if need be*/}
            <h3>All Notes</h3>
            {/* Note List Container - this will turn into its own component if need be.*/}
            <ul className={styles.noteListContainer}>
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
                    </li>
                ))}
            </ul>
        </>
    )
}

export default NoteList;