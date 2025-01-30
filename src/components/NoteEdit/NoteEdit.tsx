import styles from "../Dashboard/Dashboard.module.css";

import leftArrowIcon from "../../assets/images/icon-arrow-left.svg";
import tagIcon from "../../assets/images/icon-tag.svg";
import timeIcon from "../../assets/images/icon-clock.svg";
import {FormEvent} from "react";
import { Note } from "../Dashboard/Dashboard.tsx";

type Props = {
    note: Note;
    viewList: () => void;
    editNote: (e: FormEvent<HTMLFormElement>) => void;
}

const NoteEdit = (props: Props) => {

    return (
        <>
            {/* FORM CONTAINER   */}
            <form className={styles.noteDetailContainer} onSubmit={ props.editNote }>
                {/* Header container for form */}
                <div className={styles.headerContainer}>
                    <button type={"button"} className={styles.backLinkContainer} onClick={() => props.viewList()}>
                        <img src={leftArrowIcon} alt="Left arrow icon"/>
                        <p>Go Back</p>
                    </button>
                    <div className={styles.buttonContainer}>
                        <button>
                            Cancel
                        </button>
                        <button type={"submit"} className={styles.saveButton}>
                            Apply Edit
                        </button>
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.headerContainer}>
                        <input type="text" name="title" className={styles.noteTitle} defaultValue={props.note.title} />
                        <div className={styles.tagContainer}>
                            <div className={styles.titleContainer}>
                                <img src={tagIcon} alt="tag icon" />
                                <p>Tags</p>
                            </div>
                            <div className={styles.listContainer}>
                                <p>(disabled)</p>
                            </div>
                        </div>
                        <div className={styles.timestampContainer}>
                            <div className={styles.titleContainer}>
                                <img src={timeIcon} />
                                <p>Last Edited</p>
                            </div>
                            <p>Note yet saved</p>
                        </div>
                    </div>
                    <div className={styles.textContainer}>
                        <input type="text" name="note" defaultValue={props.note.note} />
                    </div>
                </div>
            </form>
        </>
    )
}

export default NoteEdit;