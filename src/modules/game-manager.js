import { Board } from "./board";
import { Player } from "./player";
import { Ship } from "./ship";
import {
    addBoardPositionsDOM,
    placeShipDOM,
    initBoardTopDOM
} from "./page-dom";

const createPlayerBoard = (width, length, boardDiv, boardSide, boardPlayer) => {
    const playerBoard = Board();
    const positionsDiv = boardDiv.querySelector('.board-positions');

    playerBoard.setSize(width, length);
    playerBoard.boardSide = boardSide;
    addBoardPositionsDOM(playerBoard, positionsDiv);
    initBoardTopDOM(boardPlayer, boardSide);

    return playerBoard;
};

const placePlayerShip = (board, shipSize, headCord) => {
    const playerShip = Ship(shipSize);
    playerShip.cords = board.placeShip(playerShip, headCord);
    placeShipDOM(playerShip.cords, 'left-board');
};

const initializeGame = () => {
    const leftBoardDiv = document.querySelector('#left-board');
    const rightBoardDiv = document.querySelector('#right-board');

    const leftPlayer = Player('Player 1');
    const rightPlayer = Player('Player 2');


    leftPlayer.playerBoard = createPlayerBoard(4, 4, leftBoardDiv, 'left-board', leftPlayer);
    rightPlayer.playerBoard = createPlayerBoard(4, 4, rightBoardDiv, 'right-board', rightPlayer);

    placePlayerShip(leftPlayer.playerBoard, 2, [2, 3]);
    // placePlayerShip(leftPlayer.playerBoard, 2, [1, 1]);
};

export { initializeGame };