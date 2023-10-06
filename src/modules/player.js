const Player = (name = 'player') => {
    return {
        name: name,
        playerBoard: null,
        enemy: null,
        turn: false,

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

        _getRandomAttackPos() {
            const enemyBoardLength = this.enemy.playerBoard.availableAttacks.length;
            const randomIndex = Math.floor(Math.random(0, enemyBoardLength - 1));

            return this.enemy.playerBoard.availableAttacks[randomIndex];
        },

        attackRandomPos() {
            const randomPos = this._getRandomAttackPos();
            const attackedPos = this.attackPos(JSON.parse(randomPos));

            return attackedPos;
        },
    };
};

export { Player };