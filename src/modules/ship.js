import { placeShipDOM } from "./page-dom";

const Ship = (shipLength) => {
    return {
        shipLength: shipLength,
        hits: 0,
        cords: [],
        hit() {
            this.hits++;
        },
        hasSunk() {
            return this.hits >= this.shipLength;
        }
    };
};

const placePlayerShip = (board, shipSize, headCord) => {
    const playerShip = Ship(shipSize);
    playerShip.cords = board.placeShip(playerShip, headCord);
    if (playerShip.cords) {
        placeShipDOM(playerShip.cords, board.side);
    }
};

const getShipsAr = (boardWidth) => {
    const shipCount = Math.floor(boardWidth / 2.5);
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

export { Ship, getShipsAr, placePlayerShip };