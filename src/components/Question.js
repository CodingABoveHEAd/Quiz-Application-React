import rstyles from "../styles/Analysis.module.css";
import "../styles/global.css";
import styles from "../styles/Question.module.css";
import Option from "./Option";

export default function Question({
  resultpage,
  title,
  options = [],
  handle,
  answers,
}) {
  return (
    <>
      {resultpage === "false" ? (
        <div className={styles.question}>
          <div className={styles.ques}>
            <p>{title}</p>
            <p
              style={{
                marginTop: 10,
                fontSize: 18,
                color: " rgb(107, 110, 110)",
              }}
            >
              Choose one option
            </p>
          </div>

          <div className={styles.quiz}>
            {options.map((option, index) => (
              <Option
                key={index}
                Text={option.title}
                Value={index}
                Check={option.checked}
                onChange={(e) => handle(e, index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {answers.map((ques, qIndex) => (
            <div className={rstyles.question} key={qIndex}>
              <div className={rstyles.ques}>
                <p>{ques.title}</p>
              </div>

              <div className={rstyles.quiz}>
                {ques.options.map((opt, oIndex) => (
                  <Option
                    key={oIndex}
                    Text={opt.title}
                    Check={opt.checked}
                    correct={opt.correct}
                    resultpage={resultpage}
                    disabled
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
