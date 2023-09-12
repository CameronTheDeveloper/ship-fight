const board = () => {

    return {
        pos: new Map(),
        length: 0,
        width: 0,
        shipCount: 0,
        isPlacingShipVertically: false,
        takenPositions: [],

        setPosition(newPos) {
            this.pos.set(newPos, []);
        },

        setAdjacentPosition(position, adjPosition) {
            this.pos.get(position).push(adjPosition);
        },

        _connectPositions() {
            const adjPosDistances = [[0, 1], [1, 1], [1, 0], [1, -1],
            [0, -1], [-1, -1], [-1, 0], [-1, 1]];
            let posKeys = this.pos.keys();

            for (let position of posKeys) {
                for (let adjPosDistance of adjPosDistances) {
                    let xPos = position[0] + adjPosDistance[0];
                    let yPos = position[0] + adjPosDistance[1];
                    if (xPos >= 1 && yPos >= 1 && xPos <= this.width && yPos <= this.length) {
                        let adjPosition = [xPos, yPos];
                        this.setAdjacentPosition(position, adjPosition);
                    }
                }
            }
        },

        setSize(widthInput, lengthInput) {
            this.width = widthInput;
            this.length = lengthInput;

            for (let i = 1; i <= this.width; i++) {
                for (let j = 1; j <= this.length; j++) {
                    this.setPosition([i, j]);
                }
            }
            this._connectPositions();
        },

        _placeShipHorizontally(xCord, yCord, shipLength) {
            let shipPosAr = [];

            for (let i = 0; i < shipLength; i++) {
                shipPosAr.push([xCord + i, yCord]);
                this.takenPositions.push(shipPosAr);
            }
            return shipPosAr;
        },

        _placeShipVertically(xCord, yCord, shipLength) {
            let shipPosAr = [];

            for (let i = 0; i < shipLength; i++) {
                shipPosAr.push([xCord, yCord - i]);
                this.takenPositions.push(shipPosAr);
            }
            return shipPosAr;
        },

        placeShip(ship, headCord) {
            let xCord = headCord[0];
            let yCord = headCord[1];
            let shipCords;

            if (this.isPlacingShipVertically) {
                shipCords = this._placeShipVertically(xCord, yCord, ship.length);
            } else {
                shipCords = this._placeShipHorizontally(xCord, yCord, ship.length);
            }
            this.shipCount++;

            return shipCords;
        },
    };
};

export { board };