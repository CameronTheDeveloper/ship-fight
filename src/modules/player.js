const Player = (name = 'player') => {
    return {
        name: name,
        playerBoard: null,
        enemy: null,
        turn: false,
        selectedShipSize: 0,

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
            const availableAttacksLength = this.enemy.playerBoard.availableAttacks.length;
            const randomIndex = Math.floor(Math.random() * availableAttacksLength);

            return this.enemy.playerBoard.availableAttacks[randomIndex];
        },
    };
};

const assignPlayerEnemies = (leftPlayer, rightPlayer) => {
    leftPlayer.enemy = rightPlayer;
    rightPlayer.enemy = leftPlayer;
};

export { Player, assignPlayerEnemies };