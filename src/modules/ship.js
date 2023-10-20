import { placeShipDOM } from "./page-dom";
import { removeClickShipSelection } from "./user-input";

const Ship = (shipSize) => {
    return {
        shipSize: shipSize,
        hits: 0,
        cords: [],
        hit() {
            this.hits++;
        },
        hasSunk() {
            return this.hits >= this.shipSize;
        }
    };
};

const placePlayerShip = (player, headCord) => {
    const board = player.playerBoard;
    const playerShip = Ship(player.selectedShipSize);

    playerShip.cords = board.placeShip(playerShip, headCord);
    if (playerShip.cords) {
        placeShipDOM(playerShip.cords, board);
        removeClickShipSelection();
        player.selectedShipSize = null;
    }
};

const getShipsAr = (boardSize) => {
    const shipCount = Math.floor(boardSize / 2.5);
    let shipsAr = [];
    let shipSizesAr = [1, 2, 3, 4];
    let newShip = null;

    for (let i = 0; i < shipCount; i++) {
        newShip = Ship(shipSizesAr[i]);
        shipsAr.push(newShip);
        shipSizesAr.push(shipSizesAr[i]);
    }

    return shipsAr;
};

const shuffleShipsAr = (shipsAr) => {
    let shuffledShipsAr = [];
    let randomIndex = null;

    while (shipsAr.length > 0) {
        randomIndex = Math.floor(Math.random() * shipsAr.length);
        shuffledShipsAr.push(shipsAr[randomIndex]);
        shipsAr.splice(randomIndex, 1);
    }
    return shuffledShipsAr;
};

export { Ship, placePlayerShip, getShipsAr, shuffleShipsAr };