const addUserAttack = (posDiv) => {
    posDiv.classList.add('attacked');
};

const addPosClickEvent = (posDiv) => {
    posDiv.addEventListener('click', () => {
        addUserAttack(posDiv);
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

const addPosMouseEvents = (posDiv) => {
    addPosClickEvent(posDiv);
    addPosHoverEvents(posDiv);
};

export { addPosMouseEvents };