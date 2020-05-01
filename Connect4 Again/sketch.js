

let board=[
  ['N','N','N','N','N','N','N'],
  ['N','N','N','N','N','N','N'],
  ['N','N','N','N','N','N','N'],
  ['N','N','N','N','N','N','N'],
  ['N','N','N','N','N','N','N'],
  ['','','','','','',''],
];

let players =['R','Y'];
let w;
let h;
let ai='R';
let human ='Y';
let currentPlayer=human;

function setup() {
 createCanvas(800,800)
 frameRate(2);
 w= width/7;
 h=width/6;
 
}

function mousePressed(){
  let x;
  if(currentPlayer==human){
    let j=floor(mouseX/w);
    if(board[0][j]!='R' && board[0][j]!='Y'){
      for(let i=0;i<6;i++){
        if(board[i][j]==''){
          x=i;
          board[i][j]=human;
          
          currentPlayer=ai;
        }
      }
      if(x>0){
        board[x-1][j]='';
      }

      bestMove();
    }
    
  }
}

function equals4(a,b,c,d){
  return (a==b && b==c &&c==d && a!='' && a!='N');
}

function checkWinner(){
  let winner=null; 
   //horizontal 
  for(let i=0;i<6;i++){
    for(let j=0;j<4;j++){
      if (equals4(board[i][j],board[i][j+1],board[i][j+2],board[i][j+3])){
        winner=board[i][j];
      }
    }
  }

// vertical

  for(let i=0;i<3;i++){
    for(let j=0;j<7;j++){
      if (equals4(board[i][j],board[i+1][j],board[i+2][j],board[i+3][j])){
        winner=board[i][j];
      }
    }
  }

// Right diagonal 

  for(let i=0;i<3;i++){
    for(let j=0;j<4;j++){
      if (equals4(board[i][j],board[i+1][j+1],board[i+2][j+2],board[i+3][j+3])){
        winner=board[i][j];
      }
    }
  }

// Left Diagnol

  for(let i=5;i>2;i--){
    for(let j=0;j<4;j++){
      if (equals4(board[i][j],board[i-1][j+1],board[i-2][j+2],board[i-3][j+3])){
        winner=board[i][j];
      }
    }
  }
  let openSpots = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } 
  else {
    
    return winner;
  }
  

}



function bestMove(){
  beta=Infinity;
  alpha=-Infinity;
  bestScore=-Infinity;
  let move;
  

for(let i=5;i>-1;i--){
  for(let j=0;j<7;j++){  
    if(board[i][j]==''){
      board[i][j]=ai;
      if(i>0){
        board[i-1][j]='';
      }
      let score =minimax(board,5,false,alpha,beta);
      // debugger;
      board[i][j]='';
      if(i>0){
        board[i-1][j]='N';
      }
      if(score>bestScore){
        bestScore=score;
        move={i,j};
        }
      }
    }
  }
  board[move.i][move.j]=ai;
  if(move.i>0){
      board[move.i-1][move.j]='';
    }

  currentPlayer=human;
}

let scores={
  'R':1000,
  'Y':-1000,
  'tie':0
}

function countToken(array,length,value){
  tokenScore=0;
  for(let i =0;i<length;i++){
    
    if(array[i]==value){  
      tokenScore++;
    }
  }
  return tokenScore;
}

function countOpen(array,length,value1,value2){
  openScore=0;
  for(let i=0;i<length;i++){
    if(array[i]==value1||array[i]==value2){
      openScore++
    }
  }
  return openScore;
}

function scorePosition(board){
  let score=0;
  // score centre column
  centreArray=[];
  for(let i=5;i>-1;i--){
    centreArray.push(board[i][3]);
  }
  centreCount=countToken(centreArray,centreArray.length,ai);
  score=centreCount*3;

  
  // score horizontal 
  
  for(let i=5;i>-1;i--){
    rowArrary=[...board[i]];
    
    for(let j=0;j<4;j++){
      let pic=rowArrary.slice(j,4+j);
      if(countToken(pic,pic.length,ai)==4){
        score+=100;
        
      }
      else if (countToken(pic,pic.length,ai)==3 && (countOpen(pic,pic.length,'','N')==1)){
        score+=5;
        // debugger;
      }

      else if (countToken(pic,pic.length,ai)==2 && (countOpen(pic,pic.length,'','N')==2)){
        score+=2;
        // debugger;
      }
      
      if (countToken(pic,pic.length,human)==3 && (countOpen(pic,pic.length,'','N')==1)){
        score-=4;
        
      }

    }
  }
  

  // score vertical
  
  for(let i=5;i>2;i--){
    for(let j=0;j<7;j++){
      let pic=[];
      for(let k=0;k<4;k++){
        pic.push(board[i-k][j]);
      }
      
    
      if(countToken(pic,pic.length,ai)==4){
        score+=100;
        
      }
      else if (countToken(pic,pic.length,ai)==3 && (countOpen(pic,pic.length,'','N')==1)){
        score+=5;
        
      }
      else if (countToken(pic,pic.length,ai)==2 && (countOpen(pic,pic.length,'','N')==2)){
        score+=2;
      
        
      }

      if (countToken(pic,pic.length,human)==3 && (countOpen(pic,pic.length,'','N')==1)){
        score-=4;
        
      }
    }
  }

  
  

  // //score positively sloped diagnol
  
  for(let i=5;i>2;i--){
    for(let j=0;j<4;j++){
      let pic=[];
      for(let k=0;k<4;k++){
        pic.push(board[i-k][j+k]);
      }
      if(countToken(pic,pic.length,ai)==4){
        score+=100;
        
      }
      else if (countToken(pic,pic.length,ai)==3 && (countOpen(pic,pic.length,'','N')==1)){
        score+=5;
        
      }
      else if (countToken(pic,pic.length,ai)==2 && (countOpen(pic,pic.length,'','N')==2)){
        score+=2;
       
      }

      if (countToken(pic,pic.length,human)==3 && (countOpen(pic,pic.length,'','N')==1)){
        score-=4;
        
      }
    }
  }
  
  // // //score negatively sloped diagnol
  
  for(let i=0;i<3;i++){
    for(let j=0;j<4;j++){
      let pic=[];
      for(let k=0;k<4;k++){
        pic.push(board[i+k][j+k]);
      }
      if(countToken(pic,pic.length,ai)==4){
        score+=100;
      }
      else if (countToken(pic,pic.length,ai)==3 && (countOpen(pic,pic.length,'','N')==1)){
        score+=5;
      }
      else if (countToken(pic,pic.length,ai)==2 && (countOpen(pic,pic.length,'','N')==2)){
        score+=2;
      }

      if (countToken(pic,pic.length,human)==3 && (countOpen(pic,pic.length,'','N')==1)){
        score-=4;
      }
    }
  }
  // debugger;
  return score;
}

function minimax(board,depth,isMaximizing,alpha,beta){
  
  let maxFlag=false;
  let minFlag=false;
  let result=checkWinner();
  if(result!=null||depth==0){
    if(result!=null){
      return scores[result];
    }
    else{ 
      
      winner=scorePosition(board);
      
      return scorePosition(board);
    }
    
  }

  if(isMaximizing){
    
    let bestScore = -Infinity;
    for(let i=5;i>-1;i--){
      for(let j=0;j<7;j++){  
        if(board[i][j]==''){
          board[i][j]=ai;
          if(i>0){
            board[i-1][j]='';
          }
          let score =minimax(board,depth-1,false,alpha,beta);
          board[i][j]='';
          if(i>0){
            board[i-1][j]='N';
          }
          
          bestScore=max(score,bestScore)
         
          alpha=max(score,alpha);
          if(alpha>=beta){
            maxFlag=true;
            break;
          }
        }
      }
      if(maxFlag==true){
        break;
      }
    }
    return bestScore;
  }
  

  else{
    let bestScore = Infinity;
    for(let i=5;i>-1;i--){
      for(let j=0;j<7;j++){  
        if(board[i][j]==''){
          board[i][j]=human;
          if(i>0){
            board[i-1][j]='';
          }
          let score =minimax(board,depth-1,true,alpha,beta);
          board[i][j]='';
          if(i>0){
            board[i-1][j]='N';
          }
          bestScore=min(score,bestScore);
          beta=min(score,beta);
          if(alpha>=beta){
            minFlag=true;
            break;
          }
        }
       
      }
      if(minFlag==true){
        break;
      }
    }
    return bestScore;
  }
}



function draw() {
  background(0,96,255);
 

  for(let i=1;i<8;i++){
    line(w*i,0,w*i,height);
    
  }

  for(let i=1;i<7;i++){
    line(0,h*i,width,h*i);
    
  }
  for(let i =0;i<6;i++){
    for(let j=0;j<7;j++){
      
      let x=w*j +w/2;
      let y=h*i +h/2;
      textSize(32);
      strokeWeight(4);
      let spot=board[i][j];
      if(spot=='Y'){
        fill(255, 204, 0);
        ellipse(x,y,w/2);
      } else if(spot=='R'){
        fill(191, 10, 48);
        ellipse(x,y,w/2);
      }

    }
  }
  
  checkWinner();
  let result=checkWinner();
  if(result!=null){
    noLoop();
    console.log(result);
  }
}

