import styles from "../Dashboard/Dashboard.module.css";
import { Link } from "react-router";
import { View } from "../Dashboard/Dashboard.tsx";

import leftArrowIcon from "../../assets/images/icon-arrow-left.svg";
import tagIcon from "../../assets/images/icon-tag.svg";
import timeIcon from "../../assets/images/icon-clock.svg";
import {FormEvent} from "react";

type Props = {
    changeView: (view: View) => void;
    createNote: (e: FormEvent<HTMLFormElement>) => void;
}

const NoteCreate = (props: Props) => {

    return (
        <>
            {/* FORM CONTAINER   */}
            <form className={styles.noteDetailContainer} onSubmit={ props.createNote }>
                {/* Header container for form */}
                <div className={styles.headerContainer}>
                    <Link to={"/dashboard"} className={styles.backLinkContainer}
                          onClick={() => props.changeView(View.NOTE_LIST)}>
                        <img src={leftArrowIcon} alt="Left arrow icon"/>
                        <p>Go Back</p>
                    </Link>
                    <div className={styles.buttonContainer}>
                        <button>
                            Cancel
                        </button>
                        <button type={"submit"} className={styles.saveButton}>
                            Create Note
                        </button>
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.headerContainer}>
                        <input type="text" name="title" className={styles.noteTitle} placeholder="Enter a title..."/>
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
                        <input type="text" name="note" placeholder="Start typing your note here..." />
                    </div>
                </div>
            </form>
        </>
    )
}

export default NoteCreate;