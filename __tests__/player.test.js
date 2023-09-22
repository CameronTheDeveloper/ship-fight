import { board } from "../src/modules/board";
import { ship } from "../src/modules/ship";
import { player } from "../src/modules/player";


describe('Player object', () => {
    let player1;
    let player2;
    let ship1;

    beforeEach(() => {
        player1 = player();
        player2 = player();
        player1.playerBoard = board();
        player2.playerBoard = board();
        ship1 = ship(1);

        player1.playerBoard.setSize(10, 10);
        player2.playerBoard.setSize(10, 10);
        player2.playerBoard.placeShip(ship1, [2, 2]);
        player1.enemy = player2;
        player2.enemy = player1;
        player1.turn = true;
    });

    it('should be able to attack enemy game board position', () => {
        player1.attackPos([5, 4]);
        expect(player2.playerBoard.attackedPositions[[5, 4]]).toEqual(true);
    });

    it('should prevent attacks after a miss', () => {
        player1.attackPos([5, 4]);
        expect(player1.attackPos([7, 2])).toBe(null);
    });

    xit('should attack again after a hit', () => {
        player1.attackPos([2, 2]);
        player1.attackPos([7, 2]);
        expect(player2.playerBoard.attackedPositions[[7, 2]]).toEqual(true);
    });
});


xdescribe('Player AI', () => {
    let player1;
    let player2;

    beforeEach(() => {
        player1 = player();
        player2 = player();

        player1.playerBoard = board();
        player2.playerBoard = board();

        player1.playerBoard.setSize(10, 10);
        player2.playerBoard.setSize(10, 10);
    });

    xit('should attack a random position', () => {

    });

    xit('should prevent attacking already attacked positions', () => {

    });
});