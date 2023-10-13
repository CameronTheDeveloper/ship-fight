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

export { Ship, placePlayerShip };