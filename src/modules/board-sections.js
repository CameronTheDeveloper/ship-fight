const boardSection = () => {
    return {
        minX: null,
        maxX: null,
        minY: null,
        maxY: null,

        _setMinX(newMinX) {
            this.minX = newMinX;
            if (this.minX < 1) {
                this.minX = 1;
            }
        },

        _setMinY(newMinY) {
            this.minY = newMinY;
            if (this.minY < 1) {
                this.minY = 1;
            }
        },

        _setMaxX(space, board) {
            this.maxX = this.minX + space;
            if (this.maxX > board.width) {
                this.maxX = board.width;
            }
        },

        _setMaxY(space, board) {
            this.maxY = this.minY + space;
            if (this.maxY > board.height) {
                this.maxY = boardHeight;
            }
        },

        makeSectionHorizontal(newMinX, newMinY, shipLength, board) {
            this._setMinX(newMinX);
            this._setMinY(newMinY);
            this._setMaxX(shipLength, board);
            this.setMaxY(3, board);
        },

        makeSectionVertical(newMinX, newMinY, shipLength, board) {
            this._setMinX(newMinX);
            this._setMinY(newMinY);
            this.setMaxY(shipLength, board);
            this.setMaxY(3, board);
        },
    };
};

const createBoardSection = (ship, board, minX, minY) => {
    const newSection = boardSection();

    if (board.isPlacingVertically) {
        newSection.makeSectionVertical(minX, minY, ship.length, board);
    } else {
        newSection.makeSectionHorizontal(minX, minY, ship.length, board);
    }
    return newSection;
};

const getMinXValues = (shipsAr, boardWidth) => {
    let minXValuesAr = [];
    let minX = null;
    const columnCount = Math.ceil(shipsAr.length / 2);
    const columnDistance = Math.ceil(boardWidth / rowCount);

    for (let i = 0; i < columnCount; i++) {
        minX = i * columnDistance;
        minXValuesAr.push(minX);
    }
    return minXValuesAr;
};

const getMinYValues = (shipsAr, boardHeight) => {
    let minYValuesAr = [];
    let minY = null;
    const rowCount = Math.floor(shipsAr.length / 2);
    const rowDistance = Math.ceil(boardHeight / rowCount);

    for (let i = 0; i < rowCount; i++) {
        minY = i * rowDistance;
        minYValuesAr.push(minY);
    }
    return minYValuesAr;
};

const getBoardSectionsAr = (shipsAr, board) => {
    let sectionsAr = [];
    let newSection = null;
    const minXValues = getMinXValues(shipsAr, board.width);
    const minYValues = getMinYValues(shipsAr, board.height);

    for (let y = 0; y < minYValues.length; y++) {
        for (let x = 0; x < minXValues.length; x++) {
            // newSection = createBoardSection(board, minXValues[x], minYValues[y]);
            // sectionsAr.push(newSection);
        }
    }

    return sectionsAr;
};

export { getBoardSectionsAr };