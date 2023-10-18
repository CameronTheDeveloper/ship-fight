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

const initializeGame = () => {
    const leftBoardDiv = document.querySelector('#left-board');
    const rightBoardDiv = document.querySelector('#right-board');

    const leftPlayer = Player('Player 1');
    const rightPlayer = Player('Player 2');

    assignPlayerEnemies(leftPlayer, rightPlayer);

    leftPlayer.turn = true;

    assignPlayerEnemies(leftPlayer, rightPlayer);

    createPlayerBoard(leftPlayer, 10, leftBoardDiv, 'left-board');
    createPlayerBoard(rightPlayer, 10, rightBoardDiv, 'right-board');

};

export { initializeGame };