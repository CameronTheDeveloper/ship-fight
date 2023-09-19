const ship = (length) => {
    return {
        length: length,
        hits: 0,
        cords: [],
        hit() {
            this.hits++;
        },
        hasSunk() {
            return this.hits >= this.length;
        }
    };
};

export { ship };