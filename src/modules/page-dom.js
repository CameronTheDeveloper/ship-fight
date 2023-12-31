import { addBoardPosAttributes, addShipSelectionAttributes } from "./attributes";
import { getRandomPos } from "./board";
import { addClickShipSelection } from "./user-input";

const addDiv = (parent) => {
    const newDiv = document.createElement('div');
    parent.appendChild(newDiv);
    return newDiv;
};

const setGridTemplate = (element, width, length) => {
    element.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${length}, 1fr)`;
};

const activateStartButtonDOM = () => {
    const startGameButton = document.querySelector('#start-game-button button');
    startGameButton.setAttribute('class', 'active');
};

const deActivateStartButtonDOM = () => {
    const startGameButton = document.querySelector('#start-game-button button');
    startGameButton.setAttribute('class', 'inactive');
};

const hideStartButtonDOM = () => {
    const startGameButtonDiv = document.querySelector('#start-game-button');
    startGameButtonDiv.setAttribute('class', 'invisible');
};

const hideShipMenuDOM = () => {
    const shipMenu = document.querySelector('.ship-menu');
    shipMenu.classList.add('inactive');
};

const addBoardPositionsDOM = (board, boardParentDiv) => {
    const positionsDiv = boardParentDiv.querySelector('.board-positions');
    let posDiv = null;
    let pos = null;

    setGridTemplate(positionsDiv, board.boardSize, board.boardSize);
    for (let y = board.boardSize; y >= 1; y--) {
        for (let x = 1; x <= board.boardSize; x++) {
            pos = `${x}_${y}`;
            posDiv = addDiv(positionsDiv);
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

const initPlayerBoardsDOM = (leftPlayer, rightPlayer, leftBoardSide, rightBoardSide) => {
    const leftBoardDiv = document.querySelector(`#${leftBoardSide}`);
    const rightBoardDiv = document.querySelector(`#${rightBoardSide}`);

    addBoardPositionsDOM(leftPlayer.playerBoard, leftBoardDiv);
    addBoardPositionsDOM(rightPlayer.playerBoard, rightBoardDiv);
    initBoardTopDOM(leftPlayer, leftBoardSide);
    initBoardTopDOM(rightPlayer, rightBoardSide);
};

const updateShipCountDOM = (board) => {
    const shipCountDiv = document.querySelector(`#${board.side} .stats .ships-remaining span`);
    shipCountDiv.textContent = `${board.shipsRemaining}`;
};

const addShipSelectionsDOM = (player, shipsAr) => {
    const shipSelectionsDiv = document.querySelector('.ship-selections');
    let selectionDiv = null;
    let shipSelectionLength = null;

    for (let i = 0; i < shipsAr.length; i++) {
        shipSelectionLength = shipsAr[i].shipSize;
        selectionDiv = document.createElement('div');
        selectionDiv.textContent = shipSelectionLength;
        shipSelectionsDiv.appendChild(selectionDiv);
        addShipSelectionAttributes(selectionDiv, shipSelectionLength);
        addClickShipSelection(selectionDiv, player, shipSelectionLength);
    }

    setGridTemplate(shipSelectionsDiv, shipsAr.length, 1);
};

const togglePlaceVertButtonDisplay = (button, text) => {
    const textSpan = button.querySelector('span');
    textSpan.textContent = text;
    button.setAttribute('class', `${text.toLowerCase()}`);
};

const placeShipCord = (divID) => {
    const shipDiv = document.getElementById(divID);
    shipDiv.classList.add('taken');
};

const placeShipDOM = (shipCords, board) => {
    let divID = null;
    for (let i = 0; i < shipCords.length; i++) {
        divID = `${board.side}-${shipCords[i]}`;
        placeShipCord(divID);
    }
    updateShipCountDOM(board);
};

const placeRandomShip = (ship, section, board) => {
    const headCord = getRandomPos(section.minX, section.maxX, section.minY, section.maxY);
    if (section.isPlacingVertically) {
        board.isPlacingShipVertically = true;
    } else {
        board.isPlacingShipVertically = false;
    }
    ship.cords = board.placeShip(ship, headCord);
    placeShipDOM(ship.cords, board);
};

const placeComputerShips = (shipsAr, sectionsAr, board) => {
    for (let i = 0; i < shipsAr.length; i++) {
        placeRandomShip(shipsAr[i], sectionsAr[i], board);
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


const displayWinnerDOM = (winnerPlayer) => {
    const winnerNameText = document.querySelector('#winner-name-text');
    const winnerBoardDiv = document.getElementById(winnerPlayer.playerBoard.side);
    winnerBoardDiv.classList.add('winner');
    winnerNameText.textContent = `${winnerPlayer.name} Wins!`;
};

const endGame = (winnerPlayer) => {
    winnerPlayer.turn = false;
    winnerPlayer.enemy.turn = false;
    displayWinnerDOM(winnerPlayer);
};

const sinkShipDOM = (player, enemyPlayer, ship) => {
    for (let i = 0; i < ship.cords.length; i++) {
        attackAdjacentPositions(enemyPlayer.playerBoard, ship.cords[i]);
    }

    if (enemyPlayer.playerBoard.gameIsOver()) {
        endGame(player);
    }
};

const attackPlayerBoard = (posDiv, player, pos) => {
    const attackHit = player.attackPos(pos);
    const enemyPlayer = player.enemy;

    attackBoardDOM(posDiv, attackHit);
    if (attackHit) {
        const ship = enemyPlayer.playerBoard.getShip(pos);
        if (ship.hasSunk()) {
            sinkShipDOM(player, enemyPlayer, ship);
            updateShipCountDOM(enemyPlayer.playerBoard);
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
    initPlayerBoardsDOM,
    addShipSelectionsDOM,
    togglePlaceVertButtonDisplay,
    placeShipDOM,
    activateStartButtonDOM,
    hideStartButtonDOM,
    hideShipMenuDOM,
    placeComputerShips,
    attackPlayerBoard,
    attackRandomPos,
};
