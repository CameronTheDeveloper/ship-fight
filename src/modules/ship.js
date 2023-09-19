const ship = (length) => {
    return {
        length: length,
        hits: 0,

        hit() {
            this.hits++;
        },
        hasSunk() {
            return this.hits >= this.length;
        }
    };
};

export { ship };