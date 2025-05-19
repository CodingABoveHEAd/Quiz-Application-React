import "../styles/global.css";
import styles from "../styles/Option.module.css";

export default function Option({
  Text,
  Value,
  Check,
  onChange,
  disabled,
  correct,
  resultpage,
}) {
  return (
    <div
      className={styles.opt}
      style={
        resultpage
          ? Check === true && correct === true
            ? { backgroundColor: "#70e000" }
            : Check === true && correct !== true
            ? { backgroundColor: "#f94144" }
            : Check !== true && correct === true
            ? { backgroundColor: "#788bff" }
            : {}
          : {}
      }
    >
      <input
        value={Value}
        checked={Check}
        type="checkbox"
        onChange={onChange}
        style={{ cursor: "pointer", margin: "0px 5px" }}
        disabled={disabled}
      />
      <span>{Text}</span>
    </div>
  );
}
