const board = () => {

    return {
        pos: new Map(),
        length: 0,
        width: 0,
        shipCount: 0,
        isPlacingShipVertically: false,
        takenPositions: {},

        setBoardPos(newPos) {
            this.pos.set(newPos, []);
        },

        setAdjBoardPos(position, adjPosition) {
            this.pos.get(position).push(adjPosition);
        },

        _connectAdjPositions() {
            const adjPosDistances = [[0, 1], [1, 1], [1, 0], [1, -1],
            [0, -1], [-1, -1], [-1, 0], [-1, 1]];
            let posKeys = this.pos.keys();

            for (let position of posKeys) {
                for (let adjPosDistance of adjPosDistances) {
                    let xPos = position[0] + adjPosDistance[0];
                    let yPos = position[0] + adjPosDistance[1];
                    if (xPos >= 1 && yPos >= 1 && xPos <= this.width && yPos <= this.length) {
                        let adjPosition = [xPos, yPos];
                        this.setAdjBoardPos(position, adjPosition);
                    }
                }
            }
        },

        setSize(widthInput, lengthInput) {
            this.width = widthInput;
            this.length = lengthInput;

            for (let i = 1; i <= this.width; i++) {
                for (let j = 1; j <= this.length; j++) {
                    this.setBoardPos([i, j]);
                }
            }
            this._connectAdjPositions();
        },

        _placeShipHorizontally(xCord, yCord, shipLength) {
            let shipCordsAr = [];
            let shipCord = [];

            for (let i = 0; i < shipLength; i++) {
                shipCord = [xCord + i, yCord];
                if (this.takenPositions[shipCord]) {
                    return null;
                }
                this.takenPositions[shipCord] = true;
                shipCordsAr.push(shipCord);
            }
            return shipCordsAr;
        },

        _placeShipVertically(xCord, yCord, shipLength) {
            let shipCordsAr = [];
            let shipCord = [];

            for (let i = 0; i < shipLength; i++) {
                shipCord = [xCord, yCord - i];
                if (this.takenPositions[shipCord]) {
                    return null;
                }
                this.takenPositions[shipCord] = true;
                shipCordsAr.push(shipCord);
            }
            return shipCordsAr;
        },

        _placeShipAdjCords(shipCords) {
            let shipCord;
            for (let i = 0; i < shipCords.length; i++) {
                shipCord = this.pos.get(shipCords[i]);
            }
            //get this.pos adjCords
            //mark adjCords as taken
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

            // this._placeShipAdjCords(shipCords);
            this.shipCount++;

            return shipCords;
        },
    };
};

export { board };