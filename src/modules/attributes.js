const addBoardPosAttributes = (posDiv, pos, boardSide) => {
    posDiv.classList.add('board-pos');
    posDiv.setAttribute('id', `${boardSide}-${pos}`);
};

const addShipSelectionAttributes = (selectionDiv, shipLength) => {
    selectionDiv.classList.add('ship-selection');
    selectionDiv.classList.add(`ship-length-${shipLength}`);
};

export { addBoardPosAttributes, addShipSelectionAttributes };