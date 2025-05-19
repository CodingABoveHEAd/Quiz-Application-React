// const options = document.getElementsByClassName("opt");
const prog = document.querySelector("progress"); // Selects the first progress bar
let side = document.getElementsByClassName("side");

// eslint-disable-next-line no-unused-vars
function func1(event) {
  let parent = event.target.parentElement;
  if (event.target.checked) parent.style.backgroundColor = "lightblue";
  else parent.style.backgroundColor = "rgb(255, 255, 255)";
}

// eslint-disable-next-line no-unused-vars
function func4() {
  side[0].style.display === "flex"
    ? (side[0].style.display = "none")
    : (side[0].style.display = "flex");
}

// Quiz Slide js

const slidex = document.getElementsByClassName("question");

let cntx = 0;

// console.log(slides[0]);
for (let i = 0; i < slidex.length; i++) {
  slidex[i].style.left = `${i * 100}%`;
}

function slideimagex() {
  for (let i = 0; i < slidex.length; i++) {
    slidex[i].style.transform = `translateX(-${cntx * 100}%)`;
  }
}

// eslint-disable-next-line no-unused-vars
function func2() {
  console.log(cntx);
  cntx--;
  if (cntx === -1) {
    cntx = 0;
    alert("No previous question");
    return;
  }
  prog.value = Number(prog.value) - 25;
  slideimagex();
}

// eslint-disable-next-line no-unused-vars
function func3() {
  cntx++;
  console.log(cntx);
  if (cntx === 4) {
    cntx = 3;
    alert("No more Question");
    return;
  }
  prog.value = Number(prog.value) + 25;

  slideimagex();
}
