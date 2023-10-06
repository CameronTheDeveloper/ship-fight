import './styles/index.css';
import './styles/content.css';
import { initializeGame } from './modules/game-manager';

const renderGame = () => {
    initializeGame();
};

renderGame();