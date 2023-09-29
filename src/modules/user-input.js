const addUserAttack = (pos) => {
    pos.classList.add('attacked');
};

const addPosClickEvent = (pos) => {
    pos.addEventListener('click', () => {
        addUserAttack(pos);
    });
};

const addPosHoverEvents = (pos) => {
    pos.addEventListener('mouseover', () => {
        pos.style.backgroundColor = 'rgba(0, 0, 0, .7)';
    });
    pos.addEventListener('mouseleave', () => {
        pos.style.backgroundColor = '';
    });
};

const addPosMouseEvents = (pos) => {
    addPosClickEvent(pos);
    addPosHoverEvents(pos);
};

export { addPosMouseEvents };