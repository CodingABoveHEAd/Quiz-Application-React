import "../styles/global.css";
import styles from "../styles/PrevNext.module.css";

// const prog = document.querySelector("progress");

export default function PrevNext({ Nextques, Prevques, Flag, Submit }) {
  // let [cntx, changeCntx] = useState(0);

  // const change = (e) => {
  //   if (e.currentTarget.id === "prev") {
  //     changeCntx(cntx - 1);
  //     if (cntx === -1) {
  //       changeCntx(0);
  //       alert("No previous question");
  //       return;
  //     }
  //     prog.value = Number(prog.value) - 25;
  //     slideimagex();
  //   } else {
  //     changeCntx(cntx + 1);

  //     if (cntx === 4) {
  //       changeCntx(3);
  //       alert("No more Question");
  //       return;
  //     }
  //     slideimagex();
  //     func3();
  //   }
  // };

  // console.log(cntx);
  // console.log(Flag);

  const btnName = Flag ? "Submit" : "Next";

  return (
    <>
      <div className={styles.progress}>
        <div id="prev" className={styles.left} onClick={Prevques}>
          <img
            src="/HTML_Template/images/Arrow-Left-08-WF-256.png"
            alt="left"
          />
          <span style={{ padding: "0 4px", paddingRight: "7px" }}>
            Previous
          </span>
        </div>
        <div
          id="next"
          className={styles.right}
          onClick={Flag ? Submit : Nextques}
        >
          <span style={{ padding: "0 4px", paddingLeft: "7px" }}>
            {btnName}
          </span>
          <img
            src="/HTML_Template/images/Arrow-Left-08-WF-256 - Copy.png"
            alt="right"
          />
        </div>
      </div>
    </>
  );
}
