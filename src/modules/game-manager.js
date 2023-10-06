import { Board } from "./board";
import { Player } from "./player";
import { Ship } from "./ship";
import {
    addBoardPositionsDOM,
    placeShipDOM,
    initBoardTopDOM
} from "./page-dom";

const createPlayerBoard = (player, width, length, boardDiv, boardSide) => {
    const positionsDiv = boardDiv.querySelector('.board-positions');
    player.playerBoard = Board();

    player.playerBoard.setSize(width, length);
    player.playerBoard.boardSide = boardSide;
    addBoardPositionsDOM(player, positionsDiv);
    initBoardTopDOM(player, boardSide);
};

const assignPlayerEnemies = (player1, player2) => {
    player1.enemy = player2;
    player2.enemy = player1;
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

    leftPlayer.turn = true;

    assignPlayerEnemies(leftPlayer, rightPlayer);

    createPlayerBoard(leftPlayer, 4, 4, leftBoardDiv, 'left-board');
    createPlayerBoard(rightPlayer, 4, 4, rightBoardDiv, 'right-board');

    placePlayerShip(leftPlayer.playerBoard, 2, [2, 3]);
    placePlayerShip(leftPlayer.playerBoard, 2, [1, 1]);
    placePlayerShip(rightPlayer.playerBoard, 2, [1, 1]);
};

export { initializeGame };