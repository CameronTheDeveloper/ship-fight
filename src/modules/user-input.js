import { attackPlayerBoard } from "./page-dom";

const addPosClickEvent = (posDiv, boardPlayer, pos) => {
    posDiv.addEventListener('click', () => {
        attackPlayerBoard(posDiv, boardPlayer, pos);
    });
};

const addPosMouseEvents = (posDiv, boardPlayer, pos) => {
    addPosClickEvent(posDiv, boardPlayer, pos);
};

export { addPosMouseEvents };