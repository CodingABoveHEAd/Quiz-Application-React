import { useRef, useState } from "react";
import useHelp from "../Hooks/useHelp";
import "../styles/global.css";
import styles from "../styles/help.module.css";

export default function Help({ topicNum }) {
  const [disp, setdisp] = useState(false);
  const dispref = useRef();

  function func4() {
    console.log("Help icon clicked!");
    if (!disp) {
      setdisp(true);
      dispref.current.style.display = "flex";
    } else {
      setdisp(false);
      dispref.current.style.display = "none";
    }
  }

  const { load, error, helps } = useHelp();
  if (load) return <div>Loading</div>;
  if (error) return <div>There was an error!</div>;

  //
  const { gfg, gpt, yt } = helps[topicNum];
  // console.log(helps[topicNum]);
  return (
    <div className={styles.help} onClick={func4}>
      <img
        style={{ height: "100%", width: "100%" }}
        src="/HTML_Template/images/help.png"
        alt="help_image"
      />

      <div className={styles.side} ref={dispref}>
        <a href={yt} target="_blank" rel="noopener noreferrer">
          <img src="/HTML_Template/images/GeeksforGeeks.jpeg" alt="gfg" />
        </a>

        <a href={gpt} target="_blank" rel="noopener noreferrer">
          <img
            src="/HTML_Template/images/Korean Bulgogi Marinade for Ground Beef from Chapt GPT.jpeg"
            alt="chatgpt"
          />
        </a>

        <a href={gfg} target="_blank" rel="noopener noreferrer">
          <img src="/HTML_Template/images/youtube.png" alt="youtube" />
        </a>
      </div>
    </div>
  );
}
