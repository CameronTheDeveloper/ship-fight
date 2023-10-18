import { Board, createPlayerBoard } from "./board";
import { Player, assignPlayerEnemies } from "./player";
import {
    initPlayerBoardsDOM
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

    assignPlayerEnemies(leftPlayer, rightPlayer);

    leftPlayer.turn = true;

    initializeBoards(leftPlayer, rightPlayer, 10);
};

export { initializeGame };