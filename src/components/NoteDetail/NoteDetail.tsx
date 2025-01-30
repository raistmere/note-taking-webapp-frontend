import styles from "../Dashboard/Dashboard.module.css";
import { Note } from "../Dashboard/Dashboard";

import archiveIcon from "../../assets/images/icon-archive.svg";
import tagIcon from "../../assets/images/icon-tag.svg";
import leftArrowIcon from "../../assets/images/icon-arrow-left.svg";
import trashIcon from "../../assets/images/icon-delete.svg";
import timeIcon from "../../assets/images/icon-clock.svg";

type Props = {
    note: Note;
    viewList: () => void;
    deleteNote: () => void;
}

const NoteDetail = (props: Props) => {

    return (
        <>
            {/* Note Detail Container   */}
            <div className={styles.noteDetailContainer}>
                {/* Header container for note detail container*/}
                <div className={styles.headerContainer}>
                    <button type={"button"} className={styles.backLinkContainer} onClick={() => props.viewList()}>
                        <img src={leftArrowIcon} alt="Left arrow icon"/>
                        <p>Go Back</p>
                    </button>
                    <div className={styles.buttonContainer}>
                        <button onClick={()=> props.deleteNote()}>
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
                    {props.note
                        ?
                        // display note details
                        (<>
                            <div className={styles.headerContainer}>
                                <h3 className={styles.noteTitle}>
                                    {props.note.title}
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
                                {props.note.note}
                            </div>
                        </>)

                        :
                        // WARNING: SOMETHING WENT WRONG
                        "ERROR: CURRENT NOTE IS NULL"}
                </div>
            </div>
        </>
    )
}

export default NoteDetail;