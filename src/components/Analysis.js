import resstyles from "../styles/Analysis.module.css";
import "../styles/global.css";
import AllQuestion from "./AllQuestion";

export default function Analysis({ answers }) {
  return (
    <>
      <p className={resstyles.an}>Result Analysis:</p>
      <span className={resstyles.hints} style={{ backgroundColor: "#70e000" }}>
        correctSelected
      </span>
      <span className={resstyles.hints} style={{ backgroundColor: "#f94144" }}>
        wrongSelected
      </span>
      <span className={resstyles.hints} style={{ backgroundColor: "#788bff" }}>
        missedCorrect
      </span>
      <AllQuestion resultpage="true" Answers={answers} />
    </>
  );
}
