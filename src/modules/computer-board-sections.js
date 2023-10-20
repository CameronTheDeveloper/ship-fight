const boardSection = (minX, maxY) => {
    return {
        sectionSpaceWidth: null,
        sectionSpaceLength: null,
        isPlacingVertically: true,
        minX: minX,
        minY: null,
        maxX: null,
        maxY: maxY,

        _setMaxX(boardSize) {
            this.maxX = this.minX + this.sectionSpaceWidth;
            if (this.maxX > boardSize) {
                this.maxX = boardSize;
            }
        },

        _setMinY() {
            this.minY = this.maxY - this.sectionSpaceLength;
            if (this.minY < 0) {
                this.minY = 0;
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
            this._setMinY();
        },
    };
};

const createBoardSection = (minX, maxY) => {
    const newSection = boardSection(minX, maxY);
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

const getMaxYValues = (shipsAr, boardSize) => {
    let maxYValuesAr = [];
    let maxY = null;
    const rowCount = Math.ceil(shipsAr.length / 2);
    const rowDistance = Math.ceil(boardSize / rowCount);

    for (let i = 1; i <= rowCount; i++) {
        maxY = i * rowDistance - 1;
        maxYValuesAr.push(maxY);
    }
    return maxYValuesAr;
};

const setSectionSpacing = (board, ship, section, shipCount) => {
    section.setRandomIsPlacingVertically();
    if (section.isPlacingVertically) {
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
    const maxYValues = getMaxYValues(shipsAr, board.boardSize);

    for (let y = 0; y < maxYValues.length; y++) {
        for (let x = 0; x < minXValues.length; x++) {
            newSection = createBoardSection(minXValues[x], maxYValues[y]);
            sectionsAr.push(newSection);
        }
    }

    for (let i = 0; i < sectionsAr.length; i++) {
        setSectionSpacing(board, shipsAr[i], sectionsAr[i], shipsAr.length);
    }

    return sectionsAr;
};

export { getBoardSectionsAr };