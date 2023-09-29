import { addBoardPosAttributes } from "./attributes";
import { addPosMouseEvents } from "./user-input";

const addDiv = (parent) => {
    const newDiv = document.createElement('div');
    parent.appendChild(newDiv);
    return newDiv;
};

const setGridTemplate = (element, width, length) => {
    element.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${length}, 1fr)`;
};

const addBoardPositions = (board, boardParent) => {
    setGridTemplate(boardParent, board.width, board.length);
    for (let y = board.length; y >= 1; y--) {
        for (let x = 1; x <= board.width; x++) {
            let posDiv = addDiv(boardParent);
            let pos = [x, y];
            addBoardPosAttributes(posDiv, x, y);
            addPosMouseEvents(posDiv, board, pos);
        }
    }
};

export { addBoardPositions };
