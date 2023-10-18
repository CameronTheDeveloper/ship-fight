const addBoardPosAttributes = (posDiv, pos, boardSide) => {
    posDiv.classList.add('board-pos');
    posDiv.setAttribute('id', `${boardSide}-${pos}`);
};

const addShipSelectionAttributes = (selectionDiv, shipLength) => {
    selectionDiv.classList.add('ship-selection');
    selectionDiv.classList.add(`ship-length-${shipLength}`);
};

const setActiveShipSelectionClass = (selectedShipDiv) => {
    const oldSelectedDiv = document.querySelector('#ship-selections .selected');

    if (oldSelectedDiv) {
        oldSelectedDiv.classList.remove('selected');
    }
    selectedShipDiv.classList.add('selected');
};

export { addBoardPosAttributes, addShipSelectionAttributes, setActiveShipSelectionClass };