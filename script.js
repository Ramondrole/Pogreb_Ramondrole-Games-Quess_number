let secretnumber = getRandomInt(1,10);
let attempts = 3;
let finish = false;

document.querySelector(".numbers").onclick = function(event){
    let target = event.target
    if (target.classList.contains("number")){
        let userNumber = target.innerHTML;
        check(userNumber);
    }
    if (target.classList.contains("newgame")){
        attempts = 3;
        secretnumber = getRandomInt(1,10);
        finish = false;

        document.querySelector(".podganalka").innerHTML = "Чего ждешь? Ткни кнопку!";
        document.querySelector("span").innerHTML = attempts;

        document.querySelector(".newgame").onmouseover = function () {
            document.querySelector(".newgame").style.backgroundColor = "#8f9fff";
        };
        document.querySelector(".newgame").onmouseout = function () {
            document.querySelector(".newgame").style.backgroundColor = "#6f7fdf";
        }
    }
}
function check(userNumber){
    if (!finish){
        if(userNumber > secretnumber) {
            document.querySelector(".podganalka").innerHTML = "Мимо! Попробуй поменьше";
            attempts -=1;
        }
        if (userNumber < secretnumber){
            document.querySelector(".podganalka").innerHTML = "Маловато будет...";
            attempts -=1;
        }
        if (userNumber == secretnumber) {
            document.querySelector(".podganalka").innerHTML = "О! Угадал! Ещё?";
            document.querySelector(".newgame").style.backgroundColor = "#f44336";
            finish = true;
        }
        document.querySelector("span").innerHTML = attempts;
        if (attempts == 0) {
            document.querySelector(".podganalka").innerHTML = "Все, финиш! Начинай заново!";
            document.querySelector(".newgame").style.backgroundColor = "#f44336";
            finish = true
        }
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
