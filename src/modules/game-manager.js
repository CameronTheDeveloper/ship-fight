import { Board, createPlayerBoard } from "./board";
import {
    Player,
    assignPlayerEnemies,
    initializeHumanPlayer,
    initializeComputerPlayer
} from "./player";
import { getShipsAr } from "./ship";
import {
    initPlayerBoardsDOM,
} from "./page-dom";


const initializeBoards = (leftPlayer, rightPlayer, boardSize) => {
    const leftBoardSide = 'left-board';
    const rightBoardSide = 'right-board';

    leftPlayer.playerBoard = createPlayerBoard(boardSize, leftBoardSide);
    rightPlayer.playerBoard = createPlayerBoard(boardSize, rightBoardSide);

    initPlayerBoardsDOM(leftPlayer, rightPlayer, leftBoardSide, rightBoardSide);
};

const initializeGame = () => {
    const leftPlayer = Player('Player 1');
    const rightPlayer = Player('Player 2');
    const boardSize = 10;
    const shipsAr = getShipsAr(boardSize);

    leftPlayer.turn = true;

    assignPlayerEnemies(leftPlayer, rightPlayer);
    initializeBoards(leftPlayer, rightPlayer, boardSize);
    initializeHumanPlayer(leftPlayer, shipsAr);
    initializeComputerPlayer(shipsAr, rightPlayer);
};

export { initializeGame };