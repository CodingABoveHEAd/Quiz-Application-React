import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useQuestion from "../Hooks/useQuestions";
import styles from "../styles/AllQuestion.module.css";
import "../styles/global.css";
import Help from "./help";
import PrevNext from "./PrevNext";
import Question from "./Question";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;

    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;

    default:
      return state;
  }
};

export default function AllQuestion({ resultpage, Answers = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { load, error, questions } = useQuestion(id);
  const [curques, setcurques] = useState(0);
  const [flag, setflag] = useState(false);
  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const [tool, settool] = useState(false);

  const toolref = useRef();

  function handletool() {
    if (tool) {
      settool(false);
      toolref.current.style.display = "none";
    } else {
      settool(true);
      toolref.current.style.display = "inline-block";
    }
  }

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  function next() {
    if (curques + 1 < questions.length) {
      setcurques((prev) => prev + 1);

      if (curques + 2 === questions.length) {
        // console.log(curques);
        setflag(true);
      }
    } else {
      navigate("/result");
    }
  }

  function prev() {
    if (curques && curques <= questions.length) {
      setcurques((prev) => prev - 1);
      setflag(false);
    }
  }

  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultref = ref(db, `result/${uid}`);
    await set(resultref, qna);
    navigate(`/result/${id}`, {
      state: {
        qna,
      },
    });
  }

  function change(e, index) {
    dispatch({
      type: "answer",
      questionID: curques,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  const topnum = id.length === 5 ? Number(id[3] + id[4]) : Number(id[3]);
  // console.log(topnum);
  return (
    <>
      {load && <div>Loading</div>}
      {error && <div>There was an error!</div>}

      {!load && !error && qna && qna.length > 0 && (
        <>
          {resultpage === "false" ? (
            <div style={{ position: "relative" }}>
              <div className={styles.questions}>
                <Question
                  resultpage={resultpage}
                  title={qna[curques].title}
                  options={qna[curques].options}
                  handle={change}
                />
                {/* {console.log(curques)} */}
              </div>
              <span
                ref={toolref}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  position: "absolute",
                  backgroundColor: "#4d194dcc",
                  color: "#ffffff",
                  display: "none",
                  left: `calc(${(curques + 1) * 25}% - 95px)`, // Corrected calc format
                }}
              >
                {(curques + 1) * 25}% Completed
              </span>
              <Help topicNum={topnum - 1} />
              <progress
                onMouseOver={handletool}
                onMouseOut={handletool}
                style={{ width: "100%", marginTop: "55px", cursor: "pointer" }}
                value={(curques + 1) * 25}
                max="100"
              ></progress>

              <PrevNext
                Nextques={next}
                Prevques={prev}
                Flag={flag}
                Submit={submit}
              />
            </div>
          ) : (
            <>
              <Question resultpage={resultpage} answers={Answers} />
            </>
          )}
        </>
      )}
    </>
  );
}
