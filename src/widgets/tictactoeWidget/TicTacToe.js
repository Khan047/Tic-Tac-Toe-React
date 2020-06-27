import React, { useState , useEffect, useCallback} from "react";
import styled from "styled-components";
import  {Tri}  from './a.png';
import './App.css';
//import {  PLAYER_X, PLAYER_O, SQUARE_DIMS } from "./constants";

const arr = new Array(3 ** 2).fill(null);
let PLAYER_O='O';
let PLAYER_X='X';
let  SQUARE_DIMS = 100;
const TicTacToe = () => {
  const [grid, setGrid] = useState(arr);
  const [nextMove, setNextMove] = useState(null);
  const [players, setPlayers] = useState({
    human: PLAYER_X,
    computer: PLAYER_O
  });
 // setNextMove(PLAYER_X)
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
    if (!grid[index]) {
      move(index, players.human);
      setNextMove(players.computer);
    //   computerMove();
    }
  };
  useEffect(() => {
    let timeout;
    if (
      nextMove !== null &&
      nextMove === players.computer
    
    ) {
      // Delay computer moves to make them more natural
      timeout = setTimeout(() => {
        computerMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, computerMove, players.computer]);
  
  return (
    <Container dims={3}>
        {/* {setNextMove(PLAYER_X)} */}
      {grid.map((value, index) => {
        const isActive = value !== null;

        return (
          <Square id={'a'+index}
            key={index}
            onClick={() => humanMove(index)}
          >
            {isActive && <Marker>{value === PLAYER_X ?<img src="https://i.ibb.co/gPs5PY1/Screenshot-24.png" alt="Screenshot-24" border="0" height='40px' width ='40px' /> : <img src="https://i.ibb.co/DYr196q/c2.png" alt="c2" border="0"/>}</Marker>}
          </Square>
        );
      })}
    </Container>
  );
};

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

  color:black;
  align-items:center;
`;

export default TicTacToe;