import { initializeBoards } from "./board";
import {
    Player,
    assignPlayerEnemies,
    initializeUserPlayer,
    initializeComputerPlayer
} from "./player";
import { getShipsAr } from "./ship";
import {
    addBoardAttackListeners,
    addStartGameClickListener
} from "./user-input";


const initializeGame = () => {
    const leftPlayer = Player('Player 1');
    const rightPlayer = Player('Player 2');
    const boardSize = 10;
    const shipsAr = getShipsAr(boardSize);

    leftPlayer.turn = true;

    assignPlayerEnemies(leftPlayer, rightPlayer);
    initializeBoards(leftPlayer, rightPlayer, boardSize);
    initializeUserPlayer(leftPlayer, shipsAr);
    addStartGameClickListener(leftPlayer, rightPlayer, shipsAr);
};

const initializeGameAgainstComputer = (userPlayer, computerPlayer, shipsAr) => {
    addBoardAttackListeners(userPlayer);
    initializeComputerPlayer(shipsAr, computerPlayer);
    userPlayer.turn = true;
};

export { initializeGame, initializeGameAgainstComputer };