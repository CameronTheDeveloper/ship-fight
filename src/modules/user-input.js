const addPosClickEvent = (pos) => {
    pos.addEventListener('click', () => {
        pos.classList.add('attacked');
    });
};

const addPosMouseEvents = (pos) => {
    addPosClickEvent(pos);
};

export { addPosMouseEvents };