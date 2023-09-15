const ship = (length) => {
    return {
        length: length,
        hits: 0,
        isSunk: false,

        hit() {
            this.hits++;
        },
        checkIfSunk() {
            if (this.hits >= this.length) {
                this.isSunk = true;
            }
        }
    };
};

export { ship };