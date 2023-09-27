const addDiv = (parent) => {
    const newDiv = document.createElement('div');
    parent.appendChild(newDiv);
    return newDiv;
};

const displayBoardPositions = (board, boardParent) => {
    for (let i = 0; i < board.width; i++) {
        for (let j = 0; j < board.length; j++) {
            let posDiv = addDiv(boardParent);
        }
    }
};

export { displayBoardPositions };
