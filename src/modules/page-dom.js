import { addBoardPosAttributes } from "./attributes";

const addDiv = (parent) => {
    const newDiv = document.createElement('div');
    parent.appendChild(newDiv);
    return newDiv;
};

const displayBoardPositions = (board, boardParent) => {
    for (let x = 0; x < board.width; x++) {
        for (let y = 0; y < board.length; y++) {
            let posDiv = addDiv(boardParent);
            addBoardPosAttributes(posDiv, x, y);
        }
    }
};

export { displayBoardPositions };
