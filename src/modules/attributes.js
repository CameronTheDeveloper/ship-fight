const addBoardPosAttributes = (pos, x, y, boardSide) => {
    pos.classList.add('board-pos');
    pos.setAttribute('id', `${boardSide}-[${x},${y}]`);
};

export { addBoardPosAttributes };