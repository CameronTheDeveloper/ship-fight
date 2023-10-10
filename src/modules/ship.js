import { placeShipDOM } from "./page-dom";

const Ship = (length) => {
    return {
        length: length,
        hits: 0,
        cords: [],
        hit() {
            this.hits++;
        },
        hasSunk() {
            return this.hits >= this.length;
        }
    };
};

const placePlayerShip = (board, shipSize, headCord) => {
    const playerShip = Ship(shipSize);
    playerShip.cords = board.placeShip(playerShip, headCord);
    placeShipDOM(playerShip.cords, board.side);
};

export { Ship, placePlayerShip };