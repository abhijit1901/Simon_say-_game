let started=false;
let level=-1;
let max=0;
let gameseq=[];
let userseq=[];
let btns=["red","yellow","purple","green"]
let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started")
        started=true;
        levelup();
    }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },200);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },200);
}
function levelup(){
    userseq=[];
    level++;
    h2.innerText=`Level:${level}`;
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    gameFlash(randBtn);
}
function checkAnswer(idx){
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000);
        }
    }else{
        highscore();
        document.querySelector(".btn-container").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector(".btn-container").style.backgroundColor="azure";
        },500);
        reset();
    }
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userseq.push(userColor);
    checkAnswer(userseq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    gameseq=[];
    userseq=[];
    level=0;
    started=false;
}
function highscore(){
    if(max<level){
        max=level;
    }
    h2.innerHTML=`game over!<br>your score : ${level}<br>highscore :${max}<br>press any key to start`;
}