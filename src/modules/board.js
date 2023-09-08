const boardPos = (x, y) => {
    return {
        x: x,
        y: y,
        taken: false,
    };
};

const board = (length = 10, width = 10) => {
    return {
        pos: new map(),
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
        getHeightAr() {

        },
        getWidthAr() {

        },
        getPositions() {
            heightAr = this.getHeightAr();
            widthAr = this.getWidthAr();
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