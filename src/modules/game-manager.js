import { board } from "./board";
import { player } from "./player";
import { ship } from "./ship";
import { addBoardPositionsDOM, placeShipDOM } from "./page-dom";

const createPlayerBoard = (width, length, boardDiv, boardSide) => {
    const playerBoard = board();
    const positionsDiv = boardDiv.querySelector('.board-positions');

    playerBoard.setSize(width, length);
    addBoardPositionsDOM(playerBoard, positionsDiv, boardSide);
    return playerBoard;
};

const placePlayerShip = (board, shipSize, headCord) => {
    const playerShip = ship(shipSize);
    playerShip.cords = board.placeShip(playerShip, headCord);
    placeShipDOM(playerShip.cords, 'left-board');
};

const initializeGame = () => {
    const leftBoardDiv = document.querySelector('#left-board');
    const rightBoardDiv = document.querySelector('#right-board');

    const leftPlayer = player('Player 1');
    const rightPlayer = player('Player 2');


    leftPlayer.playerBoard = createPlayerBoard(4, 4, leftBoardDiv, 'left-board');
    rightPlayer.playerBoard = createPlayerBoard(4, 4, rightBoardDiv, 'right-board');

    placePlayerShip(leftPlayer.playerBoard, 2, [2, 3]);
    // placePlayerShip(leftPlayer.playerBoard, 2, [1, 1]);
};

export { initializeGame };