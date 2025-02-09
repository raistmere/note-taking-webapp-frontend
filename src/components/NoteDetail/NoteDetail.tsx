import styles from "./NoteDetail.module.css";

import { useState } from "react";

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
    viewEdit: () => void;
}

const NoteDetail = (props: Props) => {

    const [deleteModal, setDeleteModal] = useState(false);

    const toggleDeleteModal = () => {

        setDeleteModal(!deleteModal);
    }

    return (
        <div className={styles.noteDetailWrapper}>

            {deleteModal &&
                (
                    <div className={styles.modalWrapper}>
                        <div className={styles.deleteModalContainer}>
                            <div className={styles.warningContainer}>
                                <img src={trashIcon}/>
                                <div className={styles.textContainer}>
                                    <p className={`${styles.title} sans-serif-3`}>Delete Note</p>
                                    <p className={`sans-serif-5`}>Are you sure you want to permanently delete this note? This action cannot be undone.</p>
                                </div>
                            </div>
                            <div className={styles.buttonContainer}>
                                <button type={"button"} className={`${styles.cancelButton} sans-serif-4`} onClick={toggleDeleteModal}>Cancel</button>
                                <button type={"button"} className={`${styles.deleteButton} sans-serif-4`} onClick={props.deleteNote}>Delete Note</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Note Detail Container   */}
            <div className={styles.noteDetailContainer}>
                {/* Header container for note detail container*/}
                <div className={styles.headerContainer}>
                    <button type={"button"} className={styles.backLinkContainer} onClick={() => props.viewList()}>
                        <img src={leftArrowIcon} alt="Left arrow icon"/>
                        <p className={`sans-serif-5`}>Go Back</p>
                    </button>
                    <div className={styles.buttonContainer}>
                        <button type={"button"} onClick={toggleDeleteModal}>
                            <img src={trashIcon} alt="Trash delete icon button"/>
                        </button>
                        <button>
                            <img src={archiveIcon} alt="Archive icon button"/>
                        </button>
                        <button type={"button"} className={`${styles.saveButton} sans-serif-5`} onClick={props.viewEdit}>
                            Edit Note
                        </button>
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    {props.note
                        ?
                        // display note details
                        (<>
                            <div className={styles.headerContainer}>
                                <h2 className={`${styles.noteTitle} sans-serif-1`}>
                                    {props.note.title}
                                </h2>
                                <div className={styles.tagContainer}>
                                    <div className={styles.titleContainer}>
                                        <img src={tagIcon} alt="tag icon"/>
                                        <p className={`sans-serif-6`}>Tags</p>
                                    </div>
                                    <div className={styles.listContainer}>
                                        <p className={`sans-serif-6`}>Dev, React</p>
                                    </div>
                                </div>
                                <div className={styles.timestampContainer}>
                                    <div className={styles.titleContainer}>
                                        <img src={timeIcon} />
                                        <p className={`sans-serif-6`}>Last Edited</p>
                                    </div>
                                    <p className={`sans-serif-6`}>
                                        29 Oct 2024
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textContainer}>
                                <p className={`sans-serif-5`}>
                                    {props.note.note}
                                </p>
                            </div>
                        </>)

                        :
                        // WARNING: SOMETHING WENT WRONG
                        "ERROR: CURRENT NOTE IS NULL"}
                </div>
            </div>
        </div>
    )
}

export default NoteDetail;