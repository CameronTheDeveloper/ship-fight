const Board = () => {

    return {
        pos: new Map(),
        shipCord: new Map(),
        side: null,
        boardLength: 0,
        boardWidth: 0,
        shipsRemaining: 0,
        isPlacingShipVertically: false,
        takenPositions: {},
        availableAttacks: [],
        missedAttacks: {},

        _addPosition(stringPos) {
            this.pos.set(stringPos, []);
        },

        _addAvailableAttack(stringPos) {
            this.availableAttacks.push(stringPos);
        },

        _setBoardPos(newPos) {
            this._addPosition(newPos);
            this._addAvailableAttack(newPos);
        },

        _setBoardAdjPos(position, adjPosition) {
            this.pos.get(position).push(adjPosition);
        },

        _setShipCord(cord, ship) {
            this.shipCord.set(cord, ship);
        },

        getShip(cord) {
            return this.shipCord.get(JSON.stringify(cord));
        },

        _posTaken(cord) {
            return this.shipCord.get(JSON.stringify(cord));
        },

        _removeAvailableAttack(position) {
            const posIndex = this.availableAttacks.indexOf(JSON.stringify(position));
            if (posIndex >= 0 && posIndex <= this.availableAttacks.length) {
                this.availableAttacks.splice(posIndex, 1);
            }
        },

        _attackIsAvailable(position) {
            return this.availableAttacks.includes(JSON.stringify(position));
        },

        _connectAdjPositions() {
            const adjPosDistances = [[0, 1], [1, 1], [1, 0], [1, -1],
            [0, -1], [-1, -1], [-1, 0], [-1, 1]];
            let posKeys = this.pos.keys();

            for (let position of posKeys) {
                let xPos = +position.split('_')[0];
                let yPos = +position.split('_')[1];
                for (let adjPosDistance of adjPosDistances) {
                    xPos += adjPosDistance[0];
                    yPos += adjPosDistance[1];
                    if (xPos >= 1 && yPos >= 1 && xPos <= this.boardWidth && yPos <= this.boardLength) {
                        let adjPosition = `${xPos}_${yPos}`;
                        this._setBoardAdjPos(position, adjPosition);
                    }
                }
            }
        },

        setSize(widthInput, lengthInput) {
            this.boardWidth = widthInput;
            this.boardLength = lengthInput;

            for (let i = 1; i <= this.boardWidth; i++) {
                for (let j = 1; j <= this.boardLength; j++) {
                    this._setBoardPos(`${i}_${j}`);
                }
            }
            this._connectAdjPositions();
        },

        _outOfBounds(cords) {
            let xCord = +cords.split('_')[0];
            let yCord = +cords.split('_')[1];


            if (xCord > this.boardWidth || yCord > this.boardLength ||
                xCord < 1 || yCord < 1) {
                return true;
            } else {
                return false;
            }
        },

        _placeShipHorizontally(xCord, yCord, ship) {
            let shipCordsAr = [];
            let shipCord = '';

            for (let i = 0; i < ship.length; i++) {
                shipCord = `${+xCord + i}_${yCord}`;
                if (this.takenPositions[shipCord] ||
                    this._outOfBounds(shipCord)) {
                    return null;
                }
                this.takenPositions[shipCord] = true;
                this._setShipCord(shipCord, ship);
                shipCordsAr.push(shipCord);
            }
            return shipCordsAr;
        },

        _placeShipVertically(xCord, yCord, ship) {
            let shipCordsAr = [];
            let shipCord = '';

            for (let i = 0; i < ship.length; i++) {
                shipCord = `${+xCord + i}_${yCord}`;
                if (this.takenPositions[shipCord] ||
                    this._outOfBounds(shipCord)) {
                    return null;
                }
                this.takenPositions[shipCord] = true;
                this._setShipCord(shipCord, ship);
                shipCordsAr.push(shipCord);
            }
            return shipCordsAr;
        },

        _placeShipAdjCords(shipCords) {
            let shipCord = [];
            for (let i = 0; i < shipCords.length; i++) {
                shipCord = this.pos.get(shipCords[i]);
                for (let adjCord of shipCord) {
                    this.takenPositions[adjCord] = true;
                }
            }
        },

        placeShip(ship, headCord) {
            let xCord = headCord.split('_')[0];
            let yCord = headCord.split('_')[1];
            let shipCords = [];

            if (this._outOfBounds(headCord)) {
                return null;
            }

            if (this.isPlacingShipVertically) {
                shipCords = this._placeShipVertically(xCord, yCord, ship);
            } else {
                shipCords = this._placeShipHorizontally(xCord, yCord, ship);
            }


            if (shipCords) {
                this._placeShipAdjCords(shipCords);
                this.shipsRemaining++;
            }

            return shipCords;
        },

        getAdjacentPositions(position) {
            let adjPosAr = [];

            let key = JSON.stringify(position);
            let adjPositions = this.pos.get(key);
            for (let adjPos of adjPositions) {
                adjPosAr.push(adjPos);
            }

            return adjPosAr;
        },

        _sinkShip() {
            this.shipsRemaining--;
        },

        _hitShip(position) {
            let ship = this.getShip(position);
            ship.hit();
            if (ship.hasSunk()) {
                this._sinkShip();
            }
        },

        _attackHit(position) {
            if (this._posTaken(position)) {
                this._hitShip(position);
                return true;
            }

            this.missedAttacks[position] = true;
            return false;
        },

        receiveAttack(position) {

            if (this._outOfBounds(position) ||
                !this._attackIsAvailable(position)) {
                return null;
            }
            this._removeAvailableAttack(position);

            return this._attackHit(position);
        },

        clearAvailableAttacks() {
            this.availableAttacks = [];
        },

        gameIsOver() {
            return this.shipsRemaining <= 0;
        },
    };
};

export { Board };