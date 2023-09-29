import { board } from "./board";
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

    const leftBoard = createPlayerBoard(4, 4, leftBoardDiv);
    const rightBoard = createPlayerBoard(4, 4, rightBoardDiv);
};

export { initializeGame };