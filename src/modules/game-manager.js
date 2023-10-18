import { Board } from "./board";
import { Player, assignPlayerEnemies } from "./player";
import {
    addBoardPositionsDOM,
    initBoardTopDOM
} from "./page-dom";

const createPlayerBoard = (player, boardSize, boardDiv, boardSide) => {
    const positionsDiv = boardDiv.querySelector('.board-positions');
    player.playerBoard = Board();

    player.playerBoard.setSize(boardSize);
    player.playerBoard.side = boardSide;
    addBoardPositionsDOM(player, positionsDiv);
    initBoardTopDOM(player, boardSide);
};

const initializeBoards = (leftPlayer, rightPlayer, boardSize) => {
    const leftBoardDiv = document.querySelector('#left-board');
    const rightBoardDiv = document.querySelector('#right-board');

    createPlayerBoard(leftPlayer, boardSize, leftBoardDiv, 'left-board');
    createPlayerBoard(rightPlayer, boardSize, rightBoardDiv, 'right-board');
};

const initializeGame = () => {
    const leftPlayer = Player('Player 1');
    const rightPlayer = Player('Player 2');

    assignPlayerEnemies(leftPlayer, rightPlayer);

    leftPlayer.turn = true;

    initializeBoards(leftPlayer, rightPlayer, 10);
};

export { initializeGame };