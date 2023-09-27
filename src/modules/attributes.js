const addBoardPosAttributes = (pos, x, y) => {
    pos.classList.add('board-pos');
    pos.classList.add(`${x},${y}`);
};

export { addBoardPosAttributes };