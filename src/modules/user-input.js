import { attackPlayerBoard } from "./page-dom";

const addPosClickAttack = (posDiv, boardPlayer, pos) => {
    posDiv.addEventListener('click', () => {
        attackPlayerBoard(posDiv, boardPlayer, pos);
    });
};

const addPosMouseEvents = (posDiv, boardPlayer, pos) => {
    addPosClickAttack(posDiv, boardPlayer, pos);
};

export { addPosMouseEvents };