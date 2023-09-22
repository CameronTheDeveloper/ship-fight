const player = (name = 'player') => {
    return {
        name: name,
        playerBoard: null,
        enemy: null,

        attackPos(cord) {
            this.enemy.playerBoard.receiveAttack(cord);
        },
    };
};

export { player };