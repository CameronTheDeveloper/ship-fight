import { addBoardPosAttributes } from "./attributes";

const addDiv = (parent) => {
    const newDiv = document.createElement('div');
    parent.appendChild(newDiv);
    return newDiv;
};

const setGridTemplate = (element, width, length) => {
    element.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${length}, 1fr)`;
};

const addBoardPositionsDOM = (player, boardParent) => {
    const board = player.playerBoard;
    let posDiv = null;
    let pos = null;

    setGridTemplate(boardParent, board.boardWidth, board.boardLength);
    for (let y = board.boardLength; y >= 1; y--) {
        for (let x = 1; x <= board.boardWidth; x++) {
            pos = `${x}_${y}`;
            posDiv = addDiv(boardParent);
            addBoardPosAttributes(posDiv, pos, board.side);
        }
    }
};

const initBoardTopDOM = (player, boardSide) => {
    const playerNameDiv = document.querySelector(`#${boardSide} .board-top .player-name`);
    const shipsRemainingNumberDiv = document.querySelector(`#${boardSide} .board-top .ships-remaining span`);

    playerNameDiv.textContent = player.name;
    shipsRemainingNumberDiv.textContent = 0;
};

const placeShipCord = (divID) => {
    const shipDiv = document.getElementById(divID);
    shipDiv.classList.add('taken');
};

const placeShipDOM = (shipCords, boardSide) => {
    let divID = null;

    for (let i = 0; i < shipCords.length; i++) {
        divID = `${boardSide}-${shipCords[i]}`;
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
    let adjPosDivID = null;
    let adjPosDiv = null;
    let attackHit = null;

    for (let adjPos of adjPositions) {
        adjPosDivID = `${board.side}-${adjPos}`;
        adjPosDiv = document.getElementById(adjPosDivID);
        attackHit = board.receiveAttack(adjPos);

        attackBoardDOM(adjPosDiv, attackHit);
    }
};

const endGameDOM = (winnerPlayer) => {
    const winnerNameDiv = document.querySelector('#winner-name-display');
    const winnerBoardDiv = document.getElementById(winnerPlayer.playerBoard.side);

    winnerBoardDiv.classList.add('winner');
    winnerNameDiv.textContent = `${winnerPlayer.name} Wins!`;
    winnerPlayer.playerBoard.clearAvailableAttacks();
    winnerPlayer.enemy.playerBoard.clearAvailableAttacks();
};

const sinkShipDOM = (player, ship) => {
    for (let i = 0; i < ship.cords.length; i++) {
        attackAdjacentPositions(player.playerBoard, ship.cords[i]);
    }

    if (player.playerBoard.gameIsOver()) {
        endGameDOM(player.enemy);
    }
};

const attackPlayerBoard = (posDiv, player, pos) => {
    let attackHit = player.attackPos(pos);

    attackBoardDOM(posDiv, attackHit);

    if (attackHit) {
        let ship = player.playerBoard.getShip(pos);
        if (ship.hasSunk()) {
            sinkShipDOM(player, ship);
        }
    }
};

const attackRandomPos = (player) => {
    const randomAttackPos = player.getRandomAttackPos();
    const enemySide = player.enemy.playerBoard.side;
    const attackPosDiv = document.querySelector(`#${enemySide}-${randomAttackPos}`);

    attackPlayerBoard(attackPosDiv, player, randomAttackPos);
};

export {
    addBoardPositionsDOM,
    placeShipDOM,
    attackPlayerBoard,
    initBoardTopDOM,
    attackRandomPos
};
