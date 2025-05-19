import "../styles/global.css";
import styles from "../styles/Quiz.module.css";
import AllQuestion from "./AllQuestion";

export default function Quiz() {
  return (
    <>
      <div className={styles.bod}>
        <AllQuestion resultpage="false" />
      </div>
    </>
  );
}
