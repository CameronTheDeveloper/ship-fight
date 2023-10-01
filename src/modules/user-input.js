import { attackPlayerBoard } from "./page-dom";

const addPosClickEvent = (posDiv, board, pos) => {
    posDiv.addEventListener('click', () => {
        attackPlayerBoard(posDiv, board, pos);
    });
};

const addPosMouseEvents = (posDiv, board, pos) => {
    addPosClickEvent(posDiv, board, pos);
};

export { addPosMouseEvents };