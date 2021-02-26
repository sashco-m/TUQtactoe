$(document).ready(function(){

  let turn = "A";
  let next_turn = "B"

  //win disables the game if true
  var win = false;
  //keep track of empty for draw condition
  var empty = 9;
  //initialize a board 2d array
  //var board = new Array(3).fill(0).map(() => new Array(3).fill(0));
  var board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  $("td").click(function(){
    let id = $(this).attr('id')
    let invalid = false;
    
    //stops game if player wins
    if(!win){
      //if valid square chosen
      if($("#"+id).attr("class") != "chosen"){

        $("#"+id+turn).removeClass();
        $("#"+id).addClass("chosen");
        //set the matrix entry to their letter
        board[Math.floor(id / 3)][id % 3] = turn;
        //one less square
        empty--;
        //check win condition
        let check = checkwin(empty);
        if(check == 1){
          $("#turn").html("Player "+turn+" Wins! (refresh to restart)");
          win = true;
          return;
        }else if(check == -1){
          $("#turn").html("Draw! (refresh to restart)");
          win = true;
          return;
        }
      }else{
        //they clicked on a full square, invalid move
        invalid = true;
      }
    
      //switch turns
      if(!invalid){
        $("#turn").html("It's now player "+next_turn+"'s turn!");
        let temp = next_turn;
        next_turn = turn;
        turn = temp;
      }
    }
  });


  function checkwin(empty){
    var win = 0;
    //check rows
    for(var i = 0; i < 3;i++){
      if(board[i][0]==board[i][1]&& board[i][1]==board[i][2]){
        win = 1;
      }
    }
    //check columns
    for(var i = 0; i < 3;i++){
      if(board[0][i]==board[1][i]&& board[1][i]==board[2][i]){
        win = 1;
      }
    }
    //check diag
    if(board[0][0]==board[1][1]&& board[1][1]==board[2][2] ||
       board[0][2]==board[1][1]&& board[1][1]==board[2][0] ){
         win = 1;
    }
    //check for draw
    if(empty == 0 && win == 0){
      win = -1;
    }

    return win;
  }

});