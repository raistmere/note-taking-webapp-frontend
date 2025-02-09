import styles from "./ChangePassword.module.css"

import showIcon from "../../assets/images/icon-show-password.svg";
import infoIcon from "../../assets/images/icon-info.svg";
import {FormEvent} from "react";


interface ChangePasswordDto {

    oldPassword: string,
    newPassword: string,
}

const ChangePassword = () => {

    const handleChangePassword = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const dto: ChangePasswordDto = {

            oldPassword: formData.get("oldPassword") as string,
            newPassword: formData.get("newPassword") as string,
        }

        const response = fetch("http://localhost:8080/change-password", {

            method: "POST",
            headers: {

                "Content-Type": "application/json",
            },
            body: JSON.stringify(dto),
            credentials: "include",
        })

        console.log(response);
    }

    return (
        <div className={`${styles.changePasswordWrapper}`}>
            <div className={`${styles.mainContainer}`}>
                <div className={`${styles.headerContainer}`}>
                    <div className={`${styles.backButtonContainer}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path fill="#000" fill-rule="evenodd" d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z" clip-rule="evenodd"/>
                        </svg>
                        <p className={`sans-serif-4`}>Settings</p>
                    </div>
                    <p className={`sans-serif-1`}>Change Password</p>
                </div>
                <div className={styles.contentWrapper}>
                    <form className={styles.formContainer} onSubmit={handleChangePassword}>
                        <div className={styles.inputContainer}>
                            <label className={`sans-serif-4`} htmlFor={"oldPassword"}>Old Password</label>
                            <div className={styles.passwordContainer}>
                                <input type={"password"} name={"oldPassword"} />
                                <img src={showIcon}/>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={`sans-serif-4`} htmlFor={"newPassword"}>New Password</label>
                            <div className={styles.passwordContainer}>
                                <input type={"password"} name={"newPassword"} />
                                <img src={showIcon}/>
                            </div>
                            <div className={styles.infoContainer}>
                                <img src={infoIcon}/>
                                <p className={'sans-serif-6'}>At least 8 characters</p>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={`sans sans-serif-4`} htmlFor={"confirmPassword"}>Confirm New Password</label>
                            <div className={styles.passwordContainer}>
                                <input type={"password"} name={"confirmPassword"} />
                                <img src={showIcon}/>
                            </div>
                        </div>
                        <button type="submit" className={`sans-serif-4`}>Save Password</button>
                    </form>
                </div>

            </div>
        </div>
    )
}


export default ChangePassword;