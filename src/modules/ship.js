const ship = (length) => {
    return {
        length: length,
        health: length,
        sunk: false,
    };
};

module.exports = ship;