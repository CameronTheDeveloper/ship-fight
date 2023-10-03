import { addBoardPosAttributes } from "./attributes";
import { addPosMouseEvents } from "./user-input";

const addDiv = (parent) => {
    const newDiv = document.createElement('div');
    parent.appendChild(newDiv);
    return newDiv;
};

const setGridTemplate = (element, width, length) => {
    element.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${length}, 1fr)`;
};

const addBoardPositionsDOM = (board, boardParent, boardSide) => {
    setGridTemplate(boardParent, board.width, board.length);
    for (let y = board.length; y >= 1; y--) {
        for (let x = 1; x <= board.width; x++) {
            let posDiv = addDiv(boardParent);
            let pos = [x, y];
            addBoardPosAttributes(posDiv, x, y, boardSide);
            addPosMouseEvents(posDiv, board, pos);
        }
    }
};

const initBoardTopDOM = (player, boardSide) => {
    const boardDiv = document.getElementById(boardSide);
    const boardTopDiv = boardDiv.querySelector('.board-top');
    const playerNameDiv = boardTopDiv.querySelector('.player-name');
    const shipsRemainingDiv = boardTopDiv.querySelector('.ships-remaining');
    const shipsRemainingNumberDiv = shipsRemainingDiv.querySelector('span');

    playerNameDiv.textContent = player.name;
    shipsRemainingNumberDiv.textContent = 0;
};

const placeShipCord = (divID) => {
    const shipDiv = document.getElementById(divID);
    shipDiv.classList.add('taken');
};

const placeShipDOM = (shipCords, boardSide) => {
    for (let i = 0; i < shipCords.length; i++) {
        let divID = `${boardSide}-[${shipCords[i]}]`;
        placeShipCord(divID);
    }
};

const attackBoardDOM = (posDiv, board, pos) => {
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

const attackPlayerBoard = (posDiv, board, pos) => {
    attackBoardDOM(posDiv, board, pos);
};

export {
    addBoardPositionsDOM,
    placeShipDOM,
    attackPlayerBoard,
    initBoardTopDOM
};
