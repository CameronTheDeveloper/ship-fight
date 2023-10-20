import { togglePlaceVertButtonDisplay } from "./page-dom";
import { simulateUserVsComputerTurn } from "./player";
import { placePlayerShip } from "./ship";
import { setActiveShipSelectionClass } from "./attributes";

const addPosClickAttack = (posDiv, player, pos) => {
    posDiv.addEventListener('click', () => {
        simulateUserVsComputerTurn(posDiv, player, pos);
    });
};

const addBoardAttackListeners = (player) => {
    const board = player.playerBoard;
    const boardSideID = player.enemy.playerBoard.side;
    let pos = [];
    let posDiv = null;

    for (let y = board.boardSize; y >= 1; y--) {
        for (let x = 1; x <= board.boardSize; x++) {
            pos = `${x}_${y}`;
            posDiv = document.querySelector(`#${boardSideID}-${pos}`);
            addPosClickAttack(posDiv, player, pos);
        }
    }
};

const addClickTogglePlaceVertical = (board) => {
    const placeVertButton = document.querySelector('#toggle-vertical-placement button');
    placeVertButton.addEventListener('click', () => {
        if (board.isPlacingShipVertically) {
            board.isPlacingShipVertically = false;
            togglePlaceVertButtonDisplay(placeVertButton, 'Horizontal');
        } else {
            board.isPlacingShipVertically = true;
            togglePlaceVertButtonDisplay(placeVertButton, 'Vertical');
        }
    });
};

const addClickShipSelection = (shipSelectionDiv, player, shipSize) => {
    shipSelectionDiv.addEventListener('click', () => {
        player.selectedShipSize = shipSize;
        setActiveShipSelectionClass(shipSelectionDiv);
    });
};

const removeClickShipSelection = () => {
    const oldSelectedDiv = document.querySelector('#ship-selections .selected');

    if (oldSelectedDiv) {
        oldSelectedDiv.classList.remove('selected');
        oldSelectedDiv.remove();
    }
};

const addPosClickPlaceShip = (posDiv, player, pos) => {
    posDiv.addEventListener('click', () => {
        placePlayerShip(player, pos);
    });
};

const addBoardPlaceShipListeners = (player) => {
    const board = player.playerBoard;
    const boardSideID = board.side;
    let pos = [];
    let posDiv = null;
    for (let y = board.boardSize; y >= 1; y--) {
        for (let x = 1; x <= board.boardSize; x++) {
            pos = `${x}_${y}`;
            posDiv = document.querySelector(`#${boardSideID}-${pos}`);
            addPosClickPlaceShip(posDiv, player, pos);
        }
    }
};

export {
    addClickTogglePlaceVertical,
    addBoardAttackListeners,
    addClickShipSelection,
    removeClickShipSelection,
    addBoardPlaceShipListeners
};