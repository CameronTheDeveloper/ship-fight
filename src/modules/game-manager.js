import { Board, createPlayerBoard } from "./board";
import { Player, assignPlayerEnemies } from "./player";
import {
    addBoardPositionsDOM,
    initBoardTopDOM
} from "./page-dom";


const initializeBoards = (leftPlayer, rightPlayer, boardSize) => {
    const leftBoardDiv = document.querySelector('#left-board');
    const rightBoardDiv = document.querySelector('#right-board');

    createPlayerBoard(leftPlayer, boardSize, leftBoardDiv, 'left-board');
    createPlayerBoard(rightPlayer, boardSize, rightBoardDiv, 'right-board');
};

const initializeGame = () => {
    const leftPlayer = Player('Player 1');
    const rightPlayer = Player('Player 2');

    assignPlayerEnemies(leftPlayer, rightPlayer);

    leftPlayer.turn = true;

    initializeBoards(leftPlayer, rightPlayer, 10);
};

export { initializeGame };