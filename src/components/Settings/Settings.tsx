import styles from "./Settings.module.css";

import sunIcon from "../../assets/images/icon-sun.svg";
import fontIcon from "../../assets/images/icon-font.svg";
import lockIcon from "../../assets/images/icon-lock.svg";
import logoutIcon from "../../assets/images/icon-logout.svg";
import {Link} from "react-router";

type Props = {

    changePassword: () => void;
}

const Settings = (props: Props) => {

    return (
        <div className={styles.settingsWrapper}>
            <div className={styles.settingsContainer}>
                <div className={`${styles.headerContainer}`}>
                    <p className={`sans-serif-1`}>
                        Settings
                    </p>
                </div>
                <div className={`${styles.contentContainer}`}>
                    <div className={`${styles.buttonContainer}`}>
                        <button className={`sans-serif-4`}>
                            <img src={sunIcon} />
                            <p>Color Theme</p>
                        </button>
                        <button className={`sans-serif-4`}>
                            <img src={fontIcon} />
                            <p>Font Theme</p>
                        </button>
                        <button className={`sans-serif-4`} onClick={props.changePassword}>
                            <img src={lockIcon} />
                            <p>Change Password</p>
                        </button>
                    </div>
                    <div className={`${styles.logoutContainer}`}>
                        <Link to={"/logout"} className={`sans-serif-4`}>
                            <img src={logoutIcon} />
                            <p>Logout</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;