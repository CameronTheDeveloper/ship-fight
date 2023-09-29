import './styles/index.css';
import './styles/board.css';
import { initializeGame } from './modules/game-manager';

const renderGame = () => {
    initializeGame();
};

renderGame();