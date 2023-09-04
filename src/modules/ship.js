const ship = (length) => {
    return {
        length: length,
        health: length,
        sunk: false,
    };
};

export { ship };