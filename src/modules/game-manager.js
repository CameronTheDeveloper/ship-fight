import { Board, createPlayerBoard } from "./board";
import { Player, assignPlayerEnemies } from "./player";
import { getShipsAr } from "./ship";
import { getBoardSectionsAr } from "./computer-board-sections";
import {
    initPlayerBoardsDOM,
    addShipSelectionsDOM,
    placeComputerShips
} from "./page-dom";
import {
    addBoardPlaceShipListeners,
    addBoardAttackListeners
} from "./user-input";


const initializeBoards = (leftPlayer, rightPlayer, boardSize) => {
    const leftBoardSide = 'left-board';
    const rightBoardSide = 'right-board';

    leftPlayer.playerBoard = createPlayerBoard(boardSize, leftBoardSide);
    rightPlayer.playerBoard = createPlayerBoard(boardSize, rightBoardSide);

    initPlayerBoardsDOM(leftPlayer, rightPlayer, leftBoardSide, rightBoardSide);
};

const initializeHumanPlayer = (player, shipsAr) => {
    addShipSelectionsDOM(player, shipsAr);
    addBoardPlaceShipListeners(player);
    addBoardAttackListeners(player);
};

const initializeComputerPlayer = (shipsAr, computerPlayer) => {
    const computerBoard = computerPlayer.playerBoard;
    const boardSectionsAr = getBoardSectionsAr(shipsAr, computerBoard);
    placeComputerShips(shipsAr, boardSectionsAr, computerBoard);
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