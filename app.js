let gameSeq = [];
let userSeq = [];
let btns = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;
    submitBtn.style.display = "none";
    let randIdx = Math.floor(Math.random() * btns.length);

    let randomBtnId = btns[randIdx];
    // console.log("random index", randIdx);
    // console.log("random div ", randomDiv);
    let randomDiv = document.querySelector("#" + randomBtnId);   //(`#${randomBtnId}`);
    gameSeq.push(randomBtnId);
    // console.log("game flash", gameSeq);
    gameFlash(randomDiv); //calling game flash
}

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 500);

}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);

}

function clickBtn() {
    let userInp = document.getElementById("inputBox").value;
    // console.log(userInp);

    if (userInp <= 1) {
        alert('Enter a number greater than 1.');
    } else {
        let container = document.getElementById("container");

        for (let i = 0; i < userInp; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("allDiv");
            newDiv.setAttribute("id", `box-${i + 1}`);
            newDiv.style.backgroundColor = randomColor();

            newDiv.addEventListener("click", btnPress);
            container.appendChild(newDiv);
            btns.push(newDiv.id);
        }
        // console.log(btns);
    }

    if (started == false) {
        // console.log("game start");
        started = true;

        levelUp();
    }

};
function randomColor() {
    let red = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let color = `rgb(${red},${blue},${green})`;
    // console.log(color);
    return color;

}

function btnPress() {
    let userBtn = this;
    // console.log(this);
    userFlash(userBtn);

    let userDiv = userBtn.getAttribute("id");
    // console.log(userDiv);

    userSeq.push(userDiv);

    checkAns();
}

function checkAns() {

    let currentInx = userSeq.length - 1;

    // console.log("userSeq = ", userSeq[currentInx]);
    // console.log("gameSeq = ", gameSeq[currentInx]);
    // console.log("userSeq length = ", userSeq.length);
    // console.log("gameSeq lenght = ", gameSeq.length);

    if (userSeq[currentInx] === gameSeq[currentInx]) {

        if (userSeq.length == gameSeq.length) {
            h2.innerText = `Correct sequence.`;
            setTimeout(levelUp, 1000);
        }

    } else {
        h2.innerText = `Game Over. 
     Your score was ${level}`;

        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);


    }


}



