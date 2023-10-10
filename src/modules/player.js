const Player = (name = 'player') => {
    return {
        name: name,
        playerBoard: null,
        enemy: null,
        turn: false,
        selectedShip: null,

        _switchTurn() {
            this.turn = false;
            this.enemy.turn = true;
        },

        attackPos(cord) {
            if (!this.turn) {
                return null;
            }

            let attackHit = this.enemy.playerBoard.receiveAttack(cord);

            if (attackHit == false) {
                this._switchTurn();
            }
            return attackHit;
        },

        getRandomAttackPos() {
            const enemyBoardLength = this.enemy.playerBoard.availableAttacks.length;
            const randomIndex = Math.floor(Math.random(0, enemyBoardLength - 1));

            return this.enemy.playerBoard.availableAttacks[randomIndex];
        },
    };
};

export { Player };