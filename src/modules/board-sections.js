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

        createHorizontalSection(newMinX, newMinY, shipLength, board) {
            this._setMinX(newMinX);
            this._setMinY(newMinY);
            this._setMaxX(shipLength, board);
            this.setMaxY(3, board);
        },
    };


};

export { boardSection };