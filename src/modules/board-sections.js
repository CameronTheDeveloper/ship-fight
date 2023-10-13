const boardSection = (sectionSpace) => {
    return {
        sectionSpace: sectionSpace,
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

        _setMaxX(boardWidth) {
            this.maxX = this.minX + this.sectionSpace;
            if (this.maxX > boardWidth) {
                this.maxX = boardWidth;
            }
        },

        _setMaxY(boardHeight) {
            this.maxY = this.minY + this.sectionSpace;
            if (this.maxY > boardHeight) {
                this.maxY = boardHeight;
            }
        },

        setSectionBoundaries(newMinX, newMinY, board) {
            this._setMinX(newMinX);
            this._setMinY(newMinY);
            this._setMaxX(board.boardWidth);
            this._setMaxY(board.boardHeight);
        },
    };
};

const createBoardSection = (board, sectionSpace, minX, minY) => {
    const newSection = boardSection(sectionSpace);
    newSection.setSectionBoundaries(minX, minY, board);
    return newSection;
};

const getMinXValues = (shipsAr, boardWidth) => {
    let minXValuesAr = [];
    let minX = null;
    const columnCount = Math.ceil(shipsAr.length / 2);
    const columnDistance = Math.ceil(boardWidth / columnCount);

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
    const sectionSpace = minYValues[1];

    for (let y = 0; y < minYValues.length; y++) {
        for (let x = 0; x < minXValues.length; x++) {
            newSection = createBoardSection(board, sectionSpace, minXValues[x], minYValues[y]);
            sectionsAr.push(newSection);
        }
    }

    return sectionsAr;
};

export { getBoardSectionsAr };