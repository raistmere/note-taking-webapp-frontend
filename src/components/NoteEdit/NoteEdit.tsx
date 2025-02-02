import styles from "./NoteEdit.module.css";

import leftArrowIcon from "../../assets/images/icon-arrow-left.svg";
import tagIcon from "../../assets/images/icon-tag.svg";
import timeIcon from "../../assets/images/icon-clock.svg";
import { FormEvent } from "react";
import { Note, View } from "../Dashboard/Dashboard.tsx";

type Props = {
    note: Note;
    viewList: () => void;
    changeView: (view: View) => void;
    editNote: (e: FormEvent<HTMLFormElement>) => void;
}

const NoteEdit = (props: Props) => {

    return (
        <div className={styles.noteEditWrapper}>
            {/* FORM CONTAINER   */}
            <form className={styles.noteEditContainer} onSubmit={ props.editNote }>
                {/* Header container for form */}
                <div className={styles.headerContainer}>
                    <div className={styles.buttonContainer}>
                        <button type={"button"} className={styles.cancelContainer} onClick={() => props.changeView(View.NOTE_DETAIL)}>
                            <img src={leftArrowIcon} alt="Left arrow icon"/>
                            <p>Cancel</p>
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
                            <p>(WIP)</p>
                        </div>
                    </div>
                    <div className={styles.textContainer}>
                        <textarea name="note" defaultValue={props.note.note} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NoteEdit;