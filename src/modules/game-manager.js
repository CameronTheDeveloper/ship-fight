import { Board, createPlayerBoard } from "./board";
import { Player, assignPlayerEnemies } from "./player";
import {
    addBoardPositionsDOM,
    initBoardTopDOM
} from "./page-dom";


const initializeBoards = (leftPlayer, rightPlayer, boardSize) => {
    const leftBoardSide = 'left-board';
    const rightBoardSide = 'right-board';
    const leftBoardDiv = document.querySelector(`#${leftBoardSide}`);
    const rightBoardDiv = document.querySelector(`#${rightBoardSide}`);

    leftPlayer.playerBoard = createPlayerBoard(boardSize, leftBoardSide);
    rightPlayer.playerBoard = createPlayerBoard(boardSize, rightBoardSide);

    addBoardPositionsDOM(leftPlayer.playerBoard, leftBoardDiv);
    addBoardPositionsDOM(rightPlayer.playerBoard, rightBoardDiv);
    initBoardTopDOM(leftPlayer, leftBoardSide);
    initBoardTopDOM(rightPlayer, rightBoardSide);
};

const initializeGame = () => {
    const leftPlayer = Player('Player 1');
    const rightPlayer = Player('Player 2');

    assignPlayerEnemies(leftPlayer, rightPlayer);

    leftPlayer.turn = true;

    initializeBoards(leftPlayer, rightPlayer, 10);
};

export { initializeGame };