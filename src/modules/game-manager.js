import { board } from "./board";
import { player } from "./player";
import { displayBoardPositions } from "./page-dom";

const createPlayerBoard = (width, length, boardDiv) => {
    const playerBoard = board();
    const positionsDiv = boardDiv.querySelector('.board-positions');

    playerBoard.setSize(width, length);
    displayBoardPositions(playerBoard, positionsDiv);
    return playerBoard;
};

const createPlayer = (board, playerName) => {
    const newPlayer = player(playerName);

    newPlayer.playerBoard = board;
    return newPlayer;
};

const initializeGame = () => {
    const leftBoardDiv = document.querySelector('#board-left');
    const rightBoardDiv = document.querySelector('#board-right');

    const leftBoard = createPlayerBoard(4, 4, leftBoardDiv);
    const rightBoard = createPlayerBoard(4, 4, rightBoardDiv);

    const leftPlayer = createPlayer(leftBoard, 'Player 1');
    const rightPlayer = createPlayer(rightBoard, 'Player 2');
};

export { initializeGame };