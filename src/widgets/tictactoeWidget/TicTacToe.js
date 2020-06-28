import React, { useState , useEffect, useCallback} from "react";
import styled from "styled-components";
import  {Tri}  from './a.png';
import './App.css';
import circle  from './cc.png';
import triangle from './triangle.png';
import Board from './Board';
//import {  PLAYER_T, PLAYER_O, SQUARE_DIMS } from "./constants";

const arr = new Array(3 ** 2).fill(null);
let PLAYER_O='O';
let PLAYER_T='T';
let  SQUARE_DIMS = 100;
 const GAME_STATES = {
    notStarted: "not_started",
    inProgress: "in_progress",
    over: "over"
  };
  const switchPlayer = player => {
    return player === PLAYER_T ? PLAYER_O : PLAYER_T;
  };
const TicTacToe = () => {
const [players, setPlayers] = useState({ human: null, computer: null });
const [gameState, setGameState] = useState(GAME_STATES.notStarted);
const [winner, setWinner] = useState(null);
const board = new Board();
//...
const choosePlayer = option => {
  setPlayers({ human: option, computer: switchPlayer(option) });
  setGameState(GAME_STATES.inProgress);
  setNextMove(PLAYER_T); // Set the Player T to make the first move
};
  const [grid, setGrid] = useState(arr);

  const [nextMove, setNextMove] = useState(null);
//   const [players, setPlayers] = useState({
//     human: PLAYER_T,
//     computer: PLAYER_O
//   });
 // setNextMove(PLAYER_T)
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const move = (index, player) => {
    setGrid(grid => {
      const gridCopy = grid.concat();
      gridCopy[index] = player;
      return gridCopy;
    });
  };
  const computerMove = useCallback(() => {
    let index = getRandomInt(0, 8);
    while (grid[index]) {
      index = getRandomInt(0, 8);
    }
  
    move(index, players.computer);
    setNextMove(players.human);
  
  }, [move, grid, players]);

  const humanMove = index => {
    if (!grid[index] && nextMove === players.human) {
      move(index, players.human);
      setNextMove(players.computer);
    }
  };

  useEffect(() => {
    let timeout;
    if (
      nextMove !== null &&
      nextMove === players.computer &&
      gameState !== GAME_STATES.over
    ) {
      // Delay computer moves to make them more natural
      timeout = setTimeout(() => {
        computerMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, computerMove, players.computer, gameState]);




  //...
 

  //...

  useEffect(() => {
    const winner = board.getWinner(grid);
    const declareWinner = winner => {
      let winnerStr;
      switch (winner) {
        case PLAYER_T:
          winnerStr = "Player T wins!";
          break;
        case PLAYER_O:
          winnerStr = "Player O wins!";
          break;
        case 0:
        default:
          winnerStr = "It's a draw";
      }
      setGameState(GAME_STATES.over);
      setWinner(winnerStr);
    };

    if (winner !== null && gameState !== GAME_STATES.over) {
      declareWinner(winner);
    }
  }, [gameState, grid, nextMove]);


  
  // return gameState === GAME_STATES.notStarted ? (
  //   <Screen>
  //     <Inner>
  //       <ChooseText >Choose your player</ChooseText>
  //       <ButtonRow>
  //         <button  onClick={() => choosePlayer(PLAYER_T)}>Triangle</button>
  //         <p>or</p>
  //         <button onClick={() => choosePlayer(PLAYER_O)}>Circle</button>
  //       </ButtonRow>
  //     </Inner>
  //   </Screen>
  // ) : (
  //   <Container dims={3}>
  //     {grid.map((value, index) => {
  //       const isActive = value !== null;

  //       return (
  //         <Square id ={'a'+index}
  //           key={index}
  //           onClick={() => humanMove(index)}
  //         >
  //           {isActive && <Marker>{value === PLAYER_T ? <img src={triangle} alt="" /> : <img src={circle} alt="" />}</Marker>}
  //         </Square>
  //       );
  //     })}
  //   </Container>
  // );
  const startNewGame = () => {
    setGameState(GAME_STATES.notStarted);
    setGrid(arr);
  };
  
  switch (gameState) {
    case GAME_STATES.notStarted:
    default:
      return (
        <Screen>
          <Inner>
            <ChooseText>Choose your player</ChooseText>
            <ButtonRow>
              <button onClick={() => choosePlayer(PLAYER_T)}>Triangle</button>
              <p>or</p>
              <button onClick={() => choosePlayer(PLAYER_O)}>Circle</button>
            </ButtonRow>
          </Inner>
        </Screen>
      );
    case GAME_STATES.inProgress:
      return (
        <Container dims={3}>
          {grid.map((value, index) => {
            const isActive = value !== null;
  
            return (
              <Square id={'a'+index}
                key={index}
                onClick={() => humanMove(index)}
              >
                {isActive && <Marker>{value === PLAYER_T ? <img src={triangle} alt="" className='scale-in-center' /> : <img src={circle} alt=""  className='scale-in-center'/>}</Marker>}
              </Square>
            );
          })}
        </Container>
      );
    case GAME_STATES.over:
      return (
        <div>
           <ChooseText>{winner}</ChooseText>
          <button onClick={startNewGame}>Start over</button>
        </div>
      );
  }

  
};
const ButtonRow = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-between;
 
`;

const Screen = styled.div`
color:white;

`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: ${({ dims }) => `${dims * (SQUARE_DIMS + 4)}px`};
  flex-flow: wrap;
  position: relative;
  align-items:center;
  background-color:white;
  border: 1px solid gray;
    border-radius: 50px;
    -webkit-box-shadow: 2px 2px 29px 4px rgba(212,212,212,0.41);
    -moz-box-shadow: 2px 2px 29px 4px rgba(212,212,212,0.41);
    box-shadow: 2px 2px 29px 4px rgba(212,212,212,0.41);
`;

const Square = styled.div`
position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height:100px;
  border: 1px solid lightgray;
  overflow:hidden;
  &:hover {
    cursor: pointer;
  }
  

  
`;

const Marker = styled.p`

  align-items:center;
`;


const ChooseText = styled.p`
color:white;
`;
export default TicTacToe;