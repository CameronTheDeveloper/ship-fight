const attackPlayerBoard = (posDiv, board, pos) => {
    let attackHit = board.receiveAttack(pos);
    if (attackHit != null) {
        posDiv.classList.add('attacked');

        if (attackHit) {
            posDiv.classList.add('hit');
        } else {
            posDiv.classList.add('miss');
        }
    }
};

const addPosClickEvent = (posDiv, board, pos) => {
    posDiv.addEventListener('click', () => {
        attackPlayerBoard(posDiv, board, pos);
    });
};

const addPosMouseEvents = (posDiv, board, pos) => {
    addPosClickEvent(posDiv, board, pos);
};

export { addPosMouseEvents };