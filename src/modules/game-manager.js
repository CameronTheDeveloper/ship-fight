import { Board } from "./board";
import { Player } from "./player";
import {
    addBoardPositionsDOM,
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



const initializeGame = () => {
    const leftBoardDiv = document.querySelector('#left-board');
    const rightBoardDiv = document.querySelector('#right-board');

    const leftPlayer = Player('Player 1');
    const rightPlayer = Player('Player 2');

    leftPlayer.turn = true;

    assignPlayerEnemies(leftPlayer, rightPlayer);

    createPlayerBoard(leftPlayer, 4, 4, leftBoardDiv, 'left-board');
    createPlayerBoard(rightPlayer, 4, 4, rightBoardDiv, 'right-board');

};

export { initializeGame };