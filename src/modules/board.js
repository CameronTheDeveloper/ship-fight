const boardPos = (x, y) => {
    return {
        x: x,
        y: y,
        taken: false,
    };
};

const board = () => {

    return {
        pos: new Map(),
        length: 0,
        width: 0,
        shipCount: 0,
        shipVertical: true,

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
                    let xPos = position.x + adjPosDistance[0];
                    let yPos = position.y + adjPosDistance[1];
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
                    this.setPosition(boardPos(i, j));
                }
            }
            this._connectPositions();
        },

        // addShip(ship) {
        //     shipCount++;
        // },
    };
};

export { board };