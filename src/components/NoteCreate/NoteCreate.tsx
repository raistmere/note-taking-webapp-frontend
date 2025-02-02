import styles from "../NoteCreate/NoteCreate.module.css";

import leftArrowIcon from "../../assets/images/icon-arrow-left.svg";
import tagIcon from "../../assets/images/icon-tag.svg";
import timeIcon from "../../assets/images/icon-clock.svg";
import { FormEvent } from "react";

type Props = {
    viewList: () => void;
    createNote: (e: FormEvent<HTMLFormElement>) => void;
}

const NoteCreate = (props: Props) => {

    return (
        <div className={styles.noteCreateContainer}>
            {/* FORM CONTAINER   */}
            <form className={styles.formContainer} onSubmit={ props.createNote }>
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
                            <div>
                                <img src={timeIcon} />
                                <p>Last Edited</p>
                            </div>
                            <p>(WIP)</p>
                        </div>
                    </div>
                    <div className={styles.textContainer}>
                        <textarea name="note" placeholder="Start typing your note here..." />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NoteCreate;