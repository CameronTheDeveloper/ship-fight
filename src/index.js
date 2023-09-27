import './styles/index.css';
import './styles/board.css';
import { createPlayerBoard } from './modules/game-manager';

const renderGame = () => {
    const leftBoardDiv = document.querySelector('#board-left');
    const rightBoardDiv = document.querySelector('#board-right');

    const leftBoard = createPlayerBoard(4, 4, leftBoardDiv);
    const rightBoard = createPlayerBoard(4, 4, rightBoardDiv);

};

renderGame();