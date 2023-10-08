const addBoardPosAttributes = (posDiv, pos, boardSide) => {
    posDiv.classList.add('board-pos');
    posDiv.setAttribute('id', `${boardSide}-[${pos}]`);
};

export { addBoardPosAttributes };