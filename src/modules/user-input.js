const addUserAttack = (posDiv, board, pos) => {
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
        addUserAttack(posDiv, board, pos);
    });
};

const addPosHoverEvents = (posDiv) => {
    posDiv.addEventListener('mouseover', () => {
        posDiv.style.backgroundColor = 'rgba(0, 0, 0, .7)';
    });
    posDiv.addEventListener('mouseleave', () => {
        posDiv.style.backgroundColor = '';
    });
};

const addPosMouseEvents = (posDiv, board, pos) => {
    addPosClickEvent(posDiv, board, pos);
    addPosHoverEvents(posDiv);
};

export { addPosMouseEvents };