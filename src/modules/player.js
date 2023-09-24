const player = (name = 'player') => {
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
            let attackedPos = [];

            attackedPos = this.enemy.playerBoard.receiveAttack(cord);

            if (!this.enemy.playerBoard.takenPositions[[attackedPos]]) {
                this._switchTurn();
            }
            return attackedPos;
        },
    };
};

export { player };