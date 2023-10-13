const boardSection = (minX, minY) => {
    return {
        sectionSpaceWidth: null,
        sectionSpaceLength: null,
        minX: minX,
        minY: minY,
        maxX: null,
        maxY: null,

        _setMaxX(boardWidth) {
            this.maxX = this.minX + this.sectionSpaceWidth;
            if (this.maxX > boardWidth) {
                this.maxX = boardWidth;
            }
        },

        _setMaxY(boardLength) {
            this.maxY = this.minY + this.sectionSpaceLength;
            if (this.maxY > boardLength) {
                this.maxY = boardLength;
            }
        },

        setSectionBoundaries(board) {
            this._setMaxX(board.boardWidth);
            this._setMaxY(board.boardLength);
        },
    };
};

const createBoardSection = (minX, minY) => {
    const newSection = boardSection(minX, minY);
    return newSection;
};

const getMinXValues = (shipsAr, boardWidth) => {
    let minXValuesAr = [];
    let minX = null;
    const columnCount = Math.ceil(shipsAr.length / 2);
    const columnDistance = Math.ceil(boardWidth / columnCount);

    for (let i = 0; i < columnCount; i++) {
        minX = i * columnDistance + 1;
        minXValuesAr.push(minX);
    }
    return minXValuesAr;
};

const getMinYValues = (shipsAr, boardLength) => {
    let minYValuesAr = [];
    let minY = null;
    const rowCount = Math.floor(shipsAr.length / 2);
    const rowDistance = Math.ceil(boardLength / rowCount);

    for (let i = 0; i < rowCount; i++) {
        minY = i * rowDistance + 1;
        minYValuesAr.push(minY);
    }
    return minYValuesAr;
};

const setSectionsSpacing = (board, shipsAr, sectionsAr) => {
    for (let i = 0; i < sectionsAr.length; i++) {
        if (board.isPlacingVertically) {
            sectionsAr[i].sectionSpaceLength = shipsAr.length - shipsAr[i].shipLength;
            sectionsAr[i].sectionSpaceWidth = shipsAr.length - 1;
        } else {
            sectionsAr[i].sectionSpaceLength = shipsAr.length - 1;
            sectionsAr[i].sectionSpaceWidth = shipsAr.length - shipsAr[i].shipLength;
        }
        sectionsAr[i].setSectionBoundaries(board);
    }
};

const getBoardSectionsAr = (shipsAr, board) => {
    let sectionsAr = [];
    let newSection = null;
    const minXValues = getMinXValues(shipsAr, board.boardWidth);
    const minYValues = getMinYValues(shipsAr, board.boardLength);

    for (let y = 0; y < minYValues.length; y++) {
        for (let x = 0; x < minXValues.length; x++) {
            newSection = createBoardSection(minXValues[x], minYValues[y]);
            sectionsAr.push(newSection);
        }
    }

    setSectionsSpacing(board, shipsAr, sectionsAr);

    return sectionsAr;
};

export { getBoardSectionsAr };