let diff="";
let ty="";
let index=0,points=0,currpoint,totalTime=0,currTime;
let cnt=1;
let questionNumber=1;

let question=[];
let correctAnswer=[];
let userAnswer=[];
let time=[];
let rightWrong=[];
let intervals=[]

let elapsedTime,difference;
let ms=0,s=0,min=0,sm,ss,sms;
let startT;
let interval;

/******  All getElement by IDs of required content     ******/
let input = document.getElementById("ans");
let submitbtn = document.getElementById("submitButton");
let text = document.getElementById("question");
let number = document.getElementById("questionNumber");
let startbtn = document.getElementById("startButton");
let timer = document.getElementById("timer");
let difficulty = document.getElementsByName("mode");
let type = document.getElementsByName("type");
let table = document.getElementById("resultTable");
let totalTimetext = document.getElementById("totalTime");
let totalPointtext = document.getElementById("totalPoints")
let resultBtn = document.getElementById("Resultbtn");

//Function that allows player to press enter instead of submit button
input.addEventListener("keypress",function(event){
    if(event.key==="Enter"){
        event.preventDefault();
        storeCheckAns();
    }
});

//Starts he timer whenever a new question is promted, called when the user enters an answer
function startTimer(){
    startT=new Date().getTime();
    interval = setInterval(function(){
        elapsedTime=new Date().getTime();
        difference=elapsedTime-startT;
        min=Math.floor((difference % (1000*60*60))/(1000*60));
        s=Math.floor((difference % (1000*60))/1000);
        ms=difference % 1000;

        sm=min.toString().padStart(2,"0");
        ss=s.toString().padStart(2,"0");
        sms=ms.toString().padStart(3,"0");

        timer.innerHTML=`${sm}:${ss}:${sms}`;
    },1);
    intervals.push(interval);
}

//Starts the game when a type and difficulty is selected
//Starts the timer immediately and generates the questions
function start(){
    for(let i of difficulty){
        if(i.checked){
            diff=i.value;
        }
    }

    for(let i of type){
        if(i.checked){
            ty=i.value;
        }
    }

    startbtn.disabled = true;
    input.disabled=false;
    submitbtn.disabled=false;
    input.placeholder="Enter the correct answer";

    generate(diff,ty,question,correctAnswer,userAnswer);
    startTimer();

    text.innerHTML=question[index];
    number.innerHTML=(questionNumber+"/10");
}

//Checks the answer whenever the player enters their answer
function storeCheckAns(){
    let temp;
    startTimer();
    questionNumber++;
    text.innerHTML=question[index+1];
    number.innerHTML=(questionNumber+"/10");

    temp=parseInt(input.value);
    userAnswer.push(temp);
    input.value="";
    totalTime+=(min*1000*60)+(s*1000)+ms;
    time.push((min*1000*60)+(s*1000)+ms);

    if(temp===correctAnswer[index]){
        rightWrong.push("Correct");
    }
    else {
        rightWrong.push("Wrong");
    }

    clearInterval(interval);
    addrow();
    if(index==9){
        submitbtn.style.display="none";
        input.style.display="none";
        resultBtn.style.visibility="visible";
        number.innerHTML="Done";
        intervals.forEach(clearInterval);
        timer.innerHTML="Done";
        text.innerHTML="Done";

        totalTimetext.innerHTML=timeFormatting(totalTime);
        totalPointtext.innerHTML=points;
    }
    index++;
    console.log(question);
    console.log(correctAnswer);
    console.log(rightWrong);
}

//Generates the questions based on the difficulty and type
function generate(diff,type,question,correctAnswer){
    let num1=0;
    let num2=0;
    let num3=0;
    let num4=0;
    let ans=0;
    let display="";
    for(let i=0;i<10;i++){
        if(diff=="Easy"){
            if(type=="Addition"){
                num1=Math.floor((Math.random() * 89)+10);
                num2=Math.floor((Math.random() * 89)+10);
                ans=num1+num2;

                display=num1 + " + " + num2;

                storeQuest(question,correctAnswer,display,ans);
            }
            else if(type=="Subtraction"){
                num1=Math.floor((Math.random() * 89)+10);
                num2=Math.floor((Math.random() * 89)+10);
                ans=num1-num2;
                display=num1 + " - " + num2;

                storeQuest(question,correctAnswer,display,ans);
            }
            else {
                num1=Math.floor((Math.random() * 89)+10);
                num2=Math.floor((Math.random() * 7)+2);
                ans=num1*num2;
                display=num1 + " * " + num2;
                
                storeQuest(question,correctAnswer,display,ans);
            }
        }

        else if(diff=="Medium"){
            if(type=="Addition"){
                num1=Math.floor((Math.random() * 899)+100);
                num2=Math.floor((Math.random() * 899)+100);
                ans=num1+num2;
                display=num1 + " + " + num2;

                storeQuest(question,correctAnswer,display,ans);
            }
            else if(type=="Subtraction"){
                num1=Math.floor((Math.random() * 899)+100);
                num2=Math.floor((Math.random() * 899)+100);
                ans=num1-num2;
                display=num1 + " - " + num2;

                storeQuest(question,correctAnswer,display,ans);
            }
            else {
                num1=Math.floor((Math.random() * 89)+10);
                num2=Math.floor((Math.random() * 89)+10);
                ans=num1*num2;
                display=num1 + " * " + num2;

                storeQuest(question,correctAnswer,display,ans);
            }
        }

        else if(diff=="Hard"){
            if(type=="Addition"){
                num1=Math.floor((Math.random() * 899)+100);
                num2=Math.floor((Math.random() * 899)+100);
                num3=Math.floor((Math.random() * 899)+100);
                ans=num1+num2+num3;
                display=num1 + " + " + num2 + " + " + num3;

                storeQuest(question,correctAnswer,display,ans);
            }
            else if(type=="Subtraction"){
                num1=Math.floor((Math.random() * 899)+100);
                num2=Math.floor((Math.random() * 899)+100);
                num3=Math.floor((Math.random() * 899)+100);
                ans=num1-num2-num3;
                display=num1 + " - " + num2 + " - " + num3;

                storeQuest(question,correctAnswer,display,ans);
            }
            else {
                num1=Math.floor((Math.random() * 89)+10);
                num2=Math.floor((Math.random() * 89)+10);
                num3=Math.floor((Math.random() * 89)+10);
                ans=num1*num2*num3;
                display=num1 + " * " + num2 + " * " + num3;

                storeQuest(question,correctAnswer,display,ans);
            }
        }

        else if(diff=="Extreme"){
            if(type=="Addition"){
                num1=Math.floor((Math.random() * 899)+100);
                num2=Math.floor((Math.random() * 899)+100);
                num3=Math.floor((Math.random() * 899)+100);
                num4=Math.floor((Math.random() * 899)+100);
                ans=num1+num2+num3+num4;
                display=num1 + " + " + num2 + " + " + num3 + " + " + num4;

                storeQuest(question,correctAnswer,display,ans);
            }
            else if(type=="Subtraction"){
                num1=Math.floor((Math.random() * 899)+100);
                num2=Math.floor((Math.random() * 899)+100);
                num3=Math.floor((Math.random() * 899)+100);
                num4=Math.floor((Math.random() * 899)+100);
                ans=num1-num2-num3-num4;
                display=num1 + " - " + num2 + " - " + num3 + " - " + num4;

                storeQuest(question,correctAnswer,display,ans);
            }
            else {
                num1=Math.floor((Math.random() * 899)+100);
                num2=Math.floor((Math.random() * 899)+100);
                ans=num1*num2;
                display=num1 + " * " + num2;

                storeQuest(question,correctAnswer,display,ans);
            }
        }
    }
}

//Stores the questions and answers
function storeQuest(question,correctAnswer,display,ans){
    question.push(display);
    correctAnswer.push(ans);
    document.getElementById("question").innerHTML=display;
}

//Formats the final time into min, s and ms
function timeFormatting(time){
    displayTime="";
    if(time<999){
        displayTime+=`${time%1000}ms`;
    }
    if(time>=1000&&time<=60000){
        displayTime+=`${Math.floor(time/1000)}s  ${time%1000}ms`;
    }
    else{
        displayTime+=`${Math.floor(time/(1000*60))}min  ${Math.floor((time/1000)%60)}s  ${time%1000}ms`;
    }
    return displayTime;
}

//Adds a row whenever an answer is inputted, called by StoreCheckAns()
function addrow(){
    let row=table.insertRow(1);
    if(rightWrong[index]=="Correct"){
        currpoint=1;
        points++;
    } else {
        currpoint=0;
    }

    row.innerHTML=`<td>${cnt}</td>`+
                  `<td>${question[index]}</td>`+
                  `<td>${userAnswer[index]}</td>`+
                  `<td>${correctAnswer[index]}</td>`+
                  `<td>${rightWrong[index]}</td>`+
                  `<td>${time[index]}ms</td>`+
                  `<td>${currpoint}</td>`;
    cnt++;
}

//Displays the table when the "show Results" button is clicked
//Happens when all questions are answered
function displayTable(){
    let tble=document.getElementById("Results");
    tble.style.visibility="visible";
}

//Simply refreshes the page to restart the game
function refresh(){
    location.reload();
}

