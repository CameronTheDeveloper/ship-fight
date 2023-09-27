import { board } from "./board";
import { displayBoardPositions } from "./page-dom";

const createPlayerBoard = (width, length, boardDiv) => {
    const playerBoard = board();
    const positionsDiv = boardDiv.querySelector('.board-positions');

    playerBoard.setSize(width, length);
    displayBoardPositions(playerBoard, positionsDiv);
    return playerBoard;
};

export { createPlayerBoard };