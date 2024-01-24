function player(mark,player){
    this.player = player;
    this.mark = mark;
}
let index = 0;



const gameBoard = (function () {
    const  arr = ["","","","","","","","",""];

    const playerMove = function (e,mark) {
        const parts = e.target.id.split("-");
        const number = parseInt(parts[1], 10);
        
        if(arr[number] == ""){
            arr[number] = mark
            index = index == 0 ? 1 : 0;
        }  

    }



   return {
    arr,
    playerMove,

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
                gameBoard.playerMove(e,players[index].mark)
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


    return{
        render,
        handleclick,
        renderPlayers
        }



})();








const game = (function () {
    let player1;
    let player2;
const players = function() {
    player1 = new player("X",document.querySelector("#input1").value);
    player2 = new player("O",document.querySelector("#input2").value);
    let players = [player1,player2];
    return players;

}

const restart = function() {
    gameBoard.arr.fill("");
    index = 0;  
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

}
}
return{
    start,
    players,
    restart
}

})();



