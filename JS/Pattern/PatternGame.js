class Queue{
    constructor()
    {
        this.elements={}
        this.head = 0;
        this.tail = 0;
    }

    enqueue(element)
    {
        this.elements[this.tail] = element; 
        this.tail++;
    }

    dequeue()
    {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;

        return item;
    }

    peek()
    {
        return this.elements[this.head];
    }

    get length()
    {
        var length = this.tail - this.head;
        return length;
    }

    get isEmpty()
    {
        return this.length === 0;
    }

    displayQueue()
    {
        let len = this.length;
        for (let i = 0; i < len; i++)
        {
            console.log(this.elements[i]);
        }
    }

    emptyQueue()
    {
        this.elements={};
        this.head = 0;
        this.tail = 0;
    }
}

class SimonQueue extends Queue
{
    //btn 1-4 should be elements.
    constructor(btn1,btn2,btn3,btn4)
    {
        super();
        this.btn1 = btn1;
        this.btn2 = btn2;
        this.btn3 = btn3;
        this.btn4 = btn4;
    }

    displaySQ()
    {
        let len = this.length;
        for (let i = 0; i < len; i++)
        {
            //setTimeout(() => {this.showColor(q)},1000);
            //setInterval(this.showColor(q),500); //sets a game on a timer
            setTimeout(()=>{this.showColor(this.elements[i])}, i * buffTimer);
        }
    }

    showColor(selection)
    {
        switch(selection)
        {
            case(1):
            this.goYellow();
            break;

            case(2):
            this.goRed();
            break;

            case(3):
            this.goBlue()
            break;

            case(4):
            this.goGreen();
            break;
        }
    }

    goYellow()
    {
        this.btn1.style.backgroundColor = "yellow";
        setTimeout(() => {
            this.btn1.style.backgroundColor = "lightyellow";
        }, disTimer);
    }

    goRed()
    {
        this.btn2.style.backgroundColor = "red";
        setTimeout(() => {
            this.btn2.style.backgroundColor = "lightcoral";
        }, disTimer);
    }

    goBlue()
    {
        this.btn3.style.backgroundColor = "blue";
        setTimeout(() => {
            this.btn3.style.backgroundColor = "lightblue";
        }, disTimer);
    }

    goGreen()
    {
        this.btn4.style.backgroundColor = "green";
        setTimeout(() => {
            this.btn4.style.backgroundColor = "lightgreen";
        }, disTimer);
    }
}

function goYellow(element)
{
    element.style.backgroundColor = "yellow";
    setTimeout(()=>{element.style.backgroundColor = "lightyellow";}, 500);
} 
function goRed(element)
{
    element.style.backgroundColor = "red";
    setTimeout(() => {
        element.style.backgroundColor = "lightcoral";
    }, 500);
}
function goBlue(element)
{
    //var element = document.getElementById("can3");

    element.style.backgroundColor = "blue";
    setTimeout(() => {
        element.style.backgroundColor = "lightblue";
    }, 500);
}
function goGreen(element)
{
    //var element = document.getElementById("can4");

    element.style.backgroundColor = "green";
    setTimeout(() => {
        element.style.backgroundColor = "lightgreen";
    }, 500);
}

function compareElement(iterator)
{
    let check = (uq.elements[iterator] === sq.elements[iterator]);
    // console.log(uq.elements[iterator]);
    // console.log(sq.elements[iterator]);
    return check;
}

function compareLength()
{
    let check = (uq.length === sq.length);
    return check;
}

function getRand()
{
    var min = 1;
    var max = 4;
    //let rand = Math.floor((Math.random() * 4) + 1); 
    //Math.random returns a floating point number. 
    //Math.floor truncates and + 1 makes the range 1 - 4, instead of 0 - 3
    var rand = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
    //console.log(rand);    
    return rand;
}

function play()
{
    //don't set up new objects here.
    //errors occur.

    compTurn = true;
    turn = 0;
  

    gameTurn();

}
function check()
{
    //repurpose to end game if not equal.
    if(compareElement(iterator))
    {
        score = score + 10;
        console.log(score);
    }
    else
    {
        endGame();
    }
    //had else here to end game, had some bugs
    
    //increment the score here.
    iterator++;
    if (turn == uq.length)
    {
        console.log(uq);
        uq.emptyQueue();
        compTurn = true;
        iterator = 0;
        gameTurn();    //call gameTurn
    }
    
    
}
async function gameTurn()
{
    if (compTurn)
    {
        setTimeout(() => {
        sq.enqueue(getRand());    
        sq.displaySQ();
        console.log(sq);
        turn++;
        // uq.emptyQueue();
        compTurn = false;  
        }, 1500);
        //1 sec is good buffer between user input and computer display
        
    }
    
}
function endGame()
{   //Send request to put score in the server
    fetch('http://localhost:8080/pscore', {
        method: "POST",
        //Create a header and body for the post request
        body: JSON.stringify({
          //Puts score variable in request
          score: score
        }),
        headers: {
          //Set a header to declare the type of object being sent as the request
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    fetch('http://localhost:8080/checkPattern', {
        method: "GET",
    }).then(res => res.text()).then(function (text) {
        console.log(text);
        if(text === "true"){
            var name = prompt("Congratulations! Enter your name for a new high score!");
            fetch('http://localhost:8080/pName', {
                method: "POST",
                body: JSON.stringify({
                    name: name
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            window.location.href = "PatternScore.html";
        }else{
            window.location.href = "PatternScore.html";
        }
    })
}

const btn1  = document.getElementById("can1");
const btn2  = document.getElementById("can2");
const btn3  = document.getElementById("can3");
const btn4  = document.getElementById("can4");

const easy  = document.getElementById("Easy");
const med   = document.getElementById("Medium");
const hard  = document.getElementById("Hard");

const start = document.getElementById("start");



var sq = new SimonQueue(btn1,btn2,btn3,btn4);
var uq = new Queue();
//test variables
var iterator = 0;
var on;
var turn = 0;
var compTurn = null;
var score = 0;

//btn1-4 need to call check()

btn1.addEventListener("click", e =>{
    goYellow(btn1);
    if(!compTurn && compTurn !=null)
    {
        uq.enqueue(1);
        check();  
    }
    
    
});
btn2.addEventListener("click", e =>{
    
    goRed(btn2);
    if(!compTurn && compTurn!= null)
    {
        
        uq.enqueue(2);
        check();
    }
});
btn3.addEventListener("click", e =>{
    goBlue(btn3);
    if(!compTurn && compTurn != null)
    {
    uq.enqueue(3);
    check();
    }
});
btn4.addEventListener("click", e =>{
    goGreen(btn4);
    if(!compTurn && compTurn != null)
    {    
    uq.enqueue(4);
    check();
    }
});


easy.addEventListener("click", e=>{
    on = true;  //might not be needed
    // easy.remove();
    // med.remove();
    // hard.remove();
    disTimer  = 1000;
    buffTimer = 1750;
    //play();
});

med.addEventListener("click", e=>{
    on = true;  //might not be needed
    // easy.remove();
    // med.remove();
    // hard.remove();
    disTimer  = 750;
    buffTimer = 1250;
    //play();
});

hard.addEventListener("click", e=>{
    on = true;  //might not be needed
    // easy.remove();
    // med.remove();
    // hard.remove();
    disTimer  = 500;
    buffTimer = 750;
    //play();
});

start.addEventListener("click" , e =>{   
    disTimer = 750;
    buffTimer = 1250;
    start.remove(); 
    play();
})  



//there should be a display timer and a buffer timer

var disTimer;
var buffTimer;
