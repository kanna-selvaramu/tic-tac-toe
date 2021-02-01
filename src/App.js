import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [game_arr, setGameArray] = useState(new Array(9).fill("-1"));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState("no")

  function checkGameWin(index) {
    //check for diagonal 
    if(( game_arr[0] !== "-1" && game_arr[0] === game_arr[4] && game_arr[0] === game_arr[8]) || 
    (game_arr[2] !== "-1" && game_arr[2] === game_arr[4] && game_arr[2] === game_arr[6]))
      setWinner(game_arr[index]);
    
    //check for straight col
    if((game_arr[0] !== "-1" && game_arr[0] === game_arr[3] && game_arr[0] === game_arr[6]) || 
    (game_arr[1] !== "-1" && game_arr[1] === game_arr[4] && game_arr[1] === game_arr[7])  ||
    (game_arr[2] !== "-1" && game_arr[2] === game_arr[5] && game_arr[2] === game_arr[8]))
      setWinner(game_arr[index]);

    //check for straight row
    if((game_arr[0] !== "-1" && game_arr[0] === game_arr[1] && game_arr[0] === game_arr[2]) || 
    (game_arr[3] !== "-1" && game_arr[3] === game_arr[4] && game_arr[3]=== game_arr[5])  || 
    (game_arr[6] !== "-1" && game_arr[6] === game_arr[7] && game_arr[6] === game_arr[8]))
      setWinner(game_arr[index]);
      
    let ctr;
    for(ctr = 0; ctr < game_arr.length ; ctr++)
      if(game_arr[ctr] === "-1")
        break;

    if(ctr === game_arr.length)
      setWinner("draw");
  }

  function setGameArrayFn(index) {
    let arr = game_arr;
    if(game_arr[index] == "-1" && winner === "no" )
    {
      arr[index] = player; 
      player == "X" ? setPlayer("O") : setPlayer("X"); 
      console.log("setGameArray", arr);
      setGameArray(arr);
      console.log("Winner", checkGameWin(index))
    }
  }

  function reloadGame() {
    setGameArray(new Array(9).fill("-1")); 
    setWinner("no");
  }

  return (
    <div className = "cls_App">
      <div className = "cls_Title">
        TIC TAC TOE
      </div> 
      <div className = "cls_ReloadTitle" onClick = {() => reloadGame()}>
        Reload
      </div> 
      <div className = "cls_BodyWrapper">
          <div className = "cls_BodyCont">
            {
              game_arr.map((item, index) => {
                return(
                  <div className = "cls_BlockCont" id={`id_Block${index}`} key = {index} onClick = {() => setGameArrayFn(index)}>
                      {item}
                  </div>
                )
               
              })
            }
            <div className = "cls_WinnerMessage">
            {
              winner != "no" && winner != "draw"?  
                `${winner} has won the game`
              : winner === "draw" ? "Match is draw" : ""
            }
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
