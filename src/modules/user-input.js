import { attackPlayerBoard } from "./page-dom";

const addPosClickAttack = (posDiv, player, pos) => {
    posDiv.addEventListener('click', () => {
        attackPlayerBoard(posDiv, player, pos);
    });
};

const addBoardAttackListeners = (player) => {
    const board = player.playerBoard;
    const boardSideID = board.boardSide;
    let pos = [];
    let posDiv = null;

    for (let y = board.length; y >= 1; y--) {
        for (let x = 1; x <= board.width; x++) {
            pos = `${x}-${y}`;
            posDiv = document.querySelector(`#${boardSideID}-${pos}`);
            addPosClickAttack(posDiv, player, pos);
        }
    }
};

export { addBoardAttackListeners };