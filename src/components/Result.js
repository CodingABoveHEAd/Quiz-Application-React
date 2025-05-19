import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswer from "../Hooks/useAnswers";
import "../styles/global.css";
import styles from "../styles/result.module.css";
import Analysis from "./Analysis";
import Summary from "./Summary";

export default function Result() {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const qna = state?.qna;

  const { loading, error, Answers } = useAnswer(id);

  function calculate() {
    let score = 0;
    Answers.forEach((question, index1) => {
      console.log(question);
      let correctIndexes = [],
        checekdIndexes = [];
      question.options.forEach((option, index2) => {
        console.log(option);
        if (option.correct) correctIndexes.push(index2);
        if (qna[index1].options[index2].checked) {
          checekdIndexes.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexes, checekdIndexes)) {
        score += 5;
      }
    });
    return score;
  }

  const userScore = calculate();

  return (
    <>
      {!qna && (
        <p>Oops! No quiz data found. Try going back and retaking the quiz.</p>
      )}
      {loading && <p>Loading.....</p>}
      {error && <p>There was an error!</p>}

      {Answers && Answers.length > 0 && (
        <div className={styles.container}>
          <Summary UserScore={userScore} />
          <Analysis answers={Answers} />
        </div>
      )}
    </>
  );
}
