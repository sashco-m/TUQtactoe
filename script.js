$(document).ready(function(){

  var Aturn = true;
  var win = false;
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
    //determine turn
    let turn = "A";
    let next_turn = "B"
    if(!Aturn){
      turn = "B";
      next_turn = "A"
    }
    //stops game if player wins
    if(!win){
      if($("#"+id).attr("class") != "chosen"){
        $("#"+id+turn).removeClass();
        $("#"+id).addClass("chosen");
        board[Math.floor(id / 3)][id % 3] = turn;
        empty--;
        //check win condition
        let check = checkwin(empty);
        if(check == 1){
          $("#turn").html("Player "+turn+" Wins!");
          win = true;
          return;
        }else if(check == -1){
          $("#turn").html("Draw!");
          win = true;
          return;
        }
      }else{
        invalid = true;
      }
    
      //switch turns
      if(!invalid){
        $("#turn").html("It's now player "+next_turn+"'s turn!");
        Aturn = !Aturn;
      }
    }
  });


  function checkwin(){
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
    if(empty == 0 && win == 0){
      win = -1;
    }

    return win;
  }

});