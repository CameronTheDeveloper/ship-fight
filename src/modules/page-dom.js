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

const addBoardPositionsDOM = (boardPlayer, boardParent) => {
    const board = boardPlayer.playerBoard;
    setGridTemplate(boardParent, board.width, board.length);
    for (let y = board.length; y >= 1; y--) {
        for (let x = 1; x <= board.width; x++) {
            let posDiv = addDiv(boardParent);
            let pos = [x, y];
            addBoardPosAttributes(posDiv, x, y, board.boardSide);
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

const attackBoardDOM = (posDiv, attackHit) => {
    if (attackHit != null) {
        posDiv.classList.add('attacked');

        if (attackHit) {
            posDiv.classList.add('hit');
        } else {
            posDiv.classList.add('miss');
        }
    }
};

const attackAdjacentPositions = (board, pos) => {

    const adjPositions = board.getAdjacentPositions(pos);

    for (let adjPos of adjPositions) {
        let adjPosDivID = `${board.boardSide}-${JSON.stringify(adjPos)}`;
        let adjPosDiv = document.getElementById(adjPosDivID);
        let attackHit = board.receiveAttack(adjPos);

        attackBoardDOM(adjPosDiv, attackHit);
    }
};

const sinkShipDOM = (board, ship) => {
    for (let i = 0; i < ship.cords.length; i++) {
        attackAdjacentPositions(board, ship.cords[i]);
    }
};

const attackPlayerBoard = (posDiv, board, pos) => {
    let attackHit = board.receiveAttack(pos);

    attackBoardDOM(posDiv, attackHit);

    if (attackHit) {
        let ship = board.getShip(pos);
        if (ship.hasSunk()) {
            sinkShipDOM(board, ship);
        }
    }
};

export {
    addBoardPositionsDOM,
    placeShipDOM,
    attackPlayerBoard,
    initBoardTopDOM
};
