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

const initializeGame = () => {
    const leftBoardDiv = document.querySelector('#board-left');
    const rightBoardDiv = document.querySelector('#board-right');

    const leftPlayer = player('Player 1');
    const rightPlayer = player('Player 2');

    leftPlayer.playerBoard = createPlayerBoard(4, 4, leftBoardDiv);
    rightPlayer.playerBoard = createPlayerBoard(4, 4, rightBoardDiv);
};

export { initializeGame };