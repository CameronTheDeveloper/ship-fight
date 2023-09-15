const board = () => {

    return {
        pos: new Map(),
        length: 0,
        width: 0,
        shipCount: 0,
        isPlacingShipVertically: false,
        takenPositions: {},
        attackedPositions: {},

        setBoardPos(newPos) {
            this.pos.set(JSON.stringify(newPos), []);
        },

        setBoardAdjPos(position, adjPosition) {
            this.pos.get(position).push(adjPosition);
        },

        _connectAdjPositions() {
            const adjPosDistances = [[0, 1], [1, 1], [1, 0], [1, -1],
            [0, -1], [-1, -1], [-1, 0], [-1, 1]];
            let posKeys = this.pos.keys();

            for (let position of posKeys) {
                let parsedPosition = JSON.parse([position]);
                for (let adjPosDistance of adjPosDistances) {
                    let xPos = parsedPosition[0] + adjPosDistance[0];
                    let yPos = parsedPosition[0] + adjPosDistance[1];
                    if (xPos >= 1 && yPos >= 1 && xPos <= this.width && yPos <= this.length) {
                        let adjPosition = [xPos, yPos];
                        this.setBoardAdjPos(position, adjPosition);
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
                if (this.takenPositions[shipCord]) {    //or shipCord is out of bounds
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
                shipCord = this.pos.get(JSON.stringify(shipCords[i]));
                for (let adjCord of shipCord) {
                    this.takenPositions[adjCord] = true;
                }
            }
        },

        placeShip(ship, headCord) {
            let xCord = headCord[0];
            let yCord = headCord[1];
            let shipCords;

            if (xCord > this.width || yCord > this.length ||
                xCord < 1 || yCord < 1) {
                return null;
            }

            if (this.isPlacingShipVertically) {
                shipCords = this._placeShipVertically(xCord, yCord, ship.length);
            } else {
                shipCords = this._placeShipHorizontally(xCord, yCord, ship.length);
            }

            if (shipCords) {
                this._placeShipAdjCords(shipCords);
                this.shipCount++;
            }

            return shipCords;
        },
        receiveAttack(position) {
            let attackedPos = JSON.stringify(position);

            if (this.attackedPositions[attackedPos]) {
                return null;
            }
            this.attackedPositions[attackedPos] = true;
        },
    };
};

export { board };