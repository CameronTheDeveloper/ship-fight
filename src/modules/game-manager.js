import { initializeBoards } from "./board";
import {
    Player,
    assignPlayerEnemies,
    initializeUserPlayer,
    initializeComputerPlayer
} from "./player";
import { getShipsAr } from "./ship";


const initializeGame = () => {
    const leftPlayer = Player('Player 1');
    const rightPlayer = Player('Player 2');
    const boardSize = 10;
    const shipsAr = getShipsAr(boardSize);

    leftPlayer.turn = true;

    assignPlayerEnemies(leftPlayer, rightPlayer);
    initializeBoards(leftPlayer, rightPlayer, boardSize);
    initializeUserPlayer(leftPlayer, shipsAr);
    initializeComputerPlayer(shipsAr, rightPlayer);
};

export { initializeGame };