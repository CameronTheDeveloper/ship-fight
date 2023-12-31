import {
    addShipSelectionsDOM,
    placeComputerShips,
    attackPlayerBoard,
    attackRandomPos,
} from "./page-dom";
import {
    addBoardPlaceShipListeners,
    addClickTogglePlaceVertical
} from "./user-input";
import { getBoardSectionsAr } from "./computer-board-sections";
import { shuffleShipsAr } from "./ship";

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

const initializeUserPlayer = (player, shipsAr) => {
    addShipSelectionsDOM(player, shipsAr);
    addBoardPlaceShipListeners(player, shipsAr);
    addClickTogglePlaceVertical(player.playerBoard);
};

const initializeComputerPlayer = (shipsAr, computerPlayer) => {
    const computerBoard = computerPlayer.playerBoard;
    const shuffledShipsAr = shuffleShipsAr(shipsAr);
    const boardSectionsAr = getBoardSectionsAr(shuffledShipsAr, computerBoard);
    placeComputerShips(shuffledShipsAr, boardSectionsAr, computerBoard);
};

const simulateUserAttackComputer = (posDiv, userPlayer, pos) => {
    attackPlayerBoard(posDiv, userPlayer, pos);
};

const simulateComputerAttacks = (computerPlayer) => {
    setTimeout(() => {
        attackRandomPos(computerPlayer);
        if (computerPlayer.turn) {
            simulateComputerAttacks(computerPlayer);
        }
    }, 1000);
};

const simulateUserVsComputerTurn = (posDiv, userPlayer, pos) => {
    const computerPlayer = userPlayer.enemy;

    simulateUserAttackComputer(posDiv, userPlayer, pos);
    if (computerPlayer.turn) {
        simulateComputerAttacks(computerPlayer);
    }
};

export {
    Player,
    assignPlayerEnemies,
    initializeUserPlayer,
    initializeComputerPlayer,
    simulateUserVsComputerTurn,
};