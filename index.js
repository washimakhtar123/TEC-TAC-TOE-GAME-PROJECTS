const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


let currentplayer;
let gameGrid;


const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

];

//lets create a function to initialize the game

function initGame(){
    currentplayer="X";
    gameGrid=["","","","","","","","",""];
    //Ui per empty bh krna pega boxes per
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //green color ko htane ke leyea initiel box css properties again
        box.classList=`box box${index+1}`;

    
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player-${currentplayer}`;
}
initGame();


function swapTurn(){
    if(currentplayer==="X"){
        currentplayer="O";
    }
    else{
        currentplayer="X";
    }
    //UI update
    gameInfo.innerText=`Current Player-${currentplayer}`;
}

function CheckgameOver(){
   let answer="";
   winningPosition.forEach((position)=>{
    //all 3 boxes should be non-empty same o=in value
    if((gameGrid[position[0]]!="" ||gameGrid[position[1]]!="" ||gameGrid[position[2]]!="")
        &&(gameGrid[position[0]]===gameGrid[position[1]])  &&(gameGrid[position[1]]===gameGrid[position[2]])){


            //check if winner is x
            if(gameGrid[position[0]]==="X")
            answer="X";
        else
        answer="O";

        //winner milgane per pointer event band krdo
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
          
        });
    //now we know X/O is a winner
    boxes[position[0]].classList.add("win");
    boxes[position[1]].classList.add("win");
    boxes[position[2]].classList.add("win");

    }

   });
   if(answer!==""){
    gameInfo.innerText=`Winner Player-${answer}`;
    newGameBtn.classList.add("active");
    return ;
   }
   //lets check whether is the tie
   let fillCount=0;
   gameGrid.forEach((box)=>{
    if(box!=="")
    fillCount++;
   });
   //bord is filled,game is tie
   if(fillCount===9){
    gameInfo.innerText="Game Tied";
    newGameBtn.classList.add("active");
   }

    
}


function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentplayer;
        gameGrid[index]=currentplayer;
        boxes[index].style.pointerEvents="none";
        //swap kro turn ko
        swapTurn();
        //check kro koi jeet to nhi gya na
        CheckgameOver();
    }
 }

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});
newGameBtn.addEventListener("click",initGame);

