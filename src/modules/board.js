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

        _getLengthAr(lengthInput) {
            let lengthAr = [];
            for (let i = 0; i < lengthInput; i++) {
                this.length++;
                lengthAr.push(i);
            }
            return lengthAr;
        },

        _getWidthAr(widthInput) {
            let widthAr = [];
            for (let i = 0; i < widthInput; i++) {
                this.width++;
                widthAr.push(i);
            }
            return widthAr;
        },

        setSize(lengthInput, widthInput) {
            const lengthAr = this._getLengthAr(lengthInput);
            const widthAr = this._getWidthAr(widthInput);

            for (let i = 0; i < lengthAr.length; i++) {
                for (let j = 0; j < widthAr.length; j++) {
                    this.setPosition([i, j]);
                }
            }

        },

        addShip(ship) {
            shipCount++;
        },
    };
};

// const connectPositions = (board, positionAr) => {
//     let widthAr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//     let heightAr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//     for (let position of positionAr) {
//         for (let i = 0; i < widthAr.length; i++) {
//             let xPos = position.x + widthAr[i];
//             let yPos = position.y + heightAr[i];
//             if (xPos >= 1 && yPos >= 1 && xPos <= 10 && yPos <= 10) {
//                 let adjPosition = [xPos, yPos];
//                 board.addAdjacentPosition(position, adjPosition);
//             }
//         }
//     }
// };

// const addBoardPositions = (board) => {

// };

export { board };