function player(mark,player){
    this.player = player;
    this.mark = mark;
}



const gameBoard = (function () {
    const  arr = ["","","","","","","","",""];
    let winner = false;
    let draw = false;

    const boardReset = function(){
         winner = false;
         draw = false;
    }
    const checkForWinner = function (symbol) {
        // Check rows
        for (let i = 0; i < 9; i += 3) {
            if (arr[i] === symbol && arr[i + 1] === symbol && arr[i + 2] === symbol) {
                winner = true;
                return;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (arr[i] === symbol && arr[i + 3] === symbol && arr[i + 6] === symbol) {
                winner = true;
                return;
            }
        }

        // Check diagonals
        if (arr[0] === symbol && arr[4] === symbol && arr[8] === symbol) {
            winner = true;
            return;
        }
        if (arr[2] === symbol && arr[4] === symbol && arr[6] === symbol) {
            winner = true;
            return;
        }
    };

    const checkForDraw = function () {
        draw = arr.every(cell => cell !== "");
    };



    const playerMove = function (e,players) {
        const parts = e.target.id.split("-");
        const number = parseInt(parts[1], 10);
        if(arr[number] == "" && winner == false && draw == false){
            let i = game.switchplayer()
            let mark = players[i].mark
           // displayControler.renderplayerturn(i);
            
            arr[number] = mark;
            this.checkForWinner(mark);
            this.checkForDraw();
            if(winner == true){
                let message = `<h1>the winner is ${players[i].player}</h1>`
                document.querySelector(".message").innerHTML = message;
            
            }  
            else if(draw == true){
                let message = `<h1>draw</h1>`
                document.querySelector(".message").innerHTML = message;
            }

        }
        
    }

    
    
    return {
    arr,
    playerMove,
    checkForWinner,
    checkForDraw,
    boardReset

   }
   
   
})();


const displayControler = (function () {
    const render = function () {
        let boardhtml = ""; 
        gameBoard.arr.forEach((x,i) => {
            boardhtml += `<div class="square" id="square-${i}">${gameBoard.arr[i]}</div>`
        })
        
        document.querySelector(".gameboard").innerHTML = boardhtml;
        
    }
    
    const handleclick = function() {
        let players = game.players()
        
        let squares = document.querySelectorAll(".square");
        squares.forEach(x => {
            x.addEventListener("click", (e) => {
                gameBoard.playerMove(e,players)
                
                displayControler.render();
                
                handleclick();
                
            })
        })
        
        
    }
    
    const renderPlayers = function (p1,p2){
        let p = `<p>player one name:${p1.player} player one mark: ${p1.mark}</p>
        <p>player two name:${p2.player} player two mark: ${p2.mark}</p>`
        
        document.querySelector(".players").innerHTML = p;

    }
    
    //const renderplayerturn = function (i){
      //  let players  = game.players();
        
        //let playing = `<h1>turn: player ${players[i].player} played and their mark was = ${players[i].mark} $</h1>`
        //document.querySelector(".playing").innerHTML = playing;

    //}
    
    return{
        render,
        handleclick,
        renderPlayers,
       // renderplayerturn    
    }
    
    
    
})();








const game = (function () {
    let index = 0;
    let player1;
    let player2;
const players = function() {
    player1 = new player("X",document.querySelector("#input1").value);
    player2 = new player("O",document.querySelector("#input2").value);
    let players = [player1,player2];
    return players;

}

const switchplayer = function  (){
    let p = index;
    index = index == 0 ? 1 : 0;
		return p;
}




const restart = function() {
    gameBoard.arr.fill("");
    index = 0; 
    gameBoard.boardReset();
    document.querySelector(".message").innerHTML = "";

    player1 = new player("X",document.querySelector("#input1").value);
    player2 = new player("O",document.querySelector("#input2").value);
    displayControler.render();  
    displayControler.handleclick();  
    displayControler.renderPlayers(player1,player2);

}

const start = function() {
    if(document.querySelector("#input1").value != "" && document.querySelector("#input1").value != "")
 
 {   displayControler.render();
    displayControler.handleclick();
    displayControler.renderPlayers(player1,player2);
  //  displayControler.renderplayerturn(index);

}
}
return{
    start,
    players,
    restart,
    switchplayer
}

})();



