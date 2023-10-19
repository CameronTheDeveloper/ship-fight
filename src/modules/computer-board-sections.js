const boardSection = (minX, minY) => {
    return {
        sectionSpaceWidth: null,
        sectionSpaceLength: null,
        isPlacingVertically: false,
        minX: minX,
        minY: minY,
        maxX: null,
        maxY: null,

        _setMaxX(boardSize) {
            this.maxX = this.minX + this.sectionSpaceWidth;
            if (this.maxX > boardSize) {
                this.maxX = boardSize;
            }
        },

        _setMaxY(boardSize) {
            this.maxY = this.minY + this.sectionSpaceLength;
            if (this.maxY > boardSize) {
                this.maxY = boardSize;
            }
        },

        setRandomIsPlacingVertically() {
            const randomNum = Math.round(Math.random());

            if (randomNum == 0) {
                this.isPlacingVertically = true;
            } else {
                this.isPlacingVertically = false;
            }
        },

        setSectionBoundaries(board) {
            this._setMaxX(board.boardSize);
            this._setMaxY(board.boardSize);
        },
    };
};

const createBoardSection = (minX, minY) => {
    const newSection = boardSection(minX, minY);
    return newSection;
};

const getMinXValues = (shipsAr, boardSize) => {
    let minXValuesAr = [];
    let minX = null;
    const columnCount = Math.ceil(shipsAr.length / 2);
    const columnDistance = Math.ceil(boardSize / columnCount);

    for (let i = 0; i < columnCount; i++) {
        minX = i * columnDistance + 1;
        minXValuesAr.push(minX);
    }
    return minXValuesAr;
};

const getMinYValues = (shipsAr, boardSize) => {
    let minYValuesAr = [];
    let minY = null;
    const rowCount = Math.floor(shipsAr.length / 2);
    const rowDistance = Math.ceil(boardSize / rowCount);

    for (let i = 0; i < rowCount; i++) {
        minY = i * rowDistance + 1;
        minYValuesAr.push(minY);
    }
    return minYValuesAr;
};

const setSectionSpacing = (board, ship, section, shipCount) => {
    if (board.isPlacingVertically) {
        section.sectionSpaceLength = shipCount - ship.shipSize;
        section.sectionSpaceWidth = shipCount - 1;
    } else {
        section.sectionSpaceLength = shipCount - 1;
        section.sectionSpaceWidth = shipCount - ship.shipSize;
    }
    section.setSectionBoundaries(board);
};

const getBoardSectionsAr = (shipsAr, board) => {
    let sectionsAr = [];
    let newSection = null;
    const minXValues = getMinXValues(shipsAr, board.boardSize);
    const minYValues = getMinYValues(shipsAr, board.boardSize);

    for (let y = 0; y < minYValues.length; y++) {
        for (let x = 0; x < minXValues.length; x++) {
            newSection = createBoardSection(minXValues[x], minYValues[y]);
            sectionsAr.push(newSection);
        }
    }

    for (let i = 0; i < sectionsAr.length; i++) {
        setSectionSpacing(board, shipsAr[i], sectionsAr[i], shipsAr.length);
    }

    return sectionsAr;
};

export { getBoardSectionsAr };