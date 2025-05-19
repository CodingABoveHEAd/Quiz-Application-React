import "../styles/global.css";
import styles from "../styles/Summary.module.css";

export default function Summary({ UserScore = 0 }) {
  return (
    <>
      <div className={styles.summary}>
        <div className={styles.txt}>
          <b>
            Your Score is
            <br />
            {UserScore} out of 20
          </b>
        </div>
        <div className={styles.imag}>
          <img
            src="/HTML_Template/images/result-removebg-preview.png"
            alt="result_img"
          />
        </div>
      </div>
    </>
  );
}
