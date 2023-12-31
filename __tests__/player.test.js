import { Board } from "../src/modules/board";
import { Ship } from "../src/modules/ship";
import { Player } from "../src/modules/player";


describe('Player object', () => {
    let player1;
    let player2;
    let ship1;

    beforeEach(() => {
        player1 = Player();
        player2 = Player();
        player1.playerBoard = Board();
        player2.playerBoard = Board();
        ship1 = Ship(1);

        player1.playerBoard.setSize(10);
        player2.playerBoard.setSize(10);
        player2.playerBoard.placeShip(ship1, '2_2');
        player1.enemy = player2;
        player2.enemy = player1;
        player1.turn = true;
    });

    it('should be able to attack enemy game board position', () => {
        player1.attackPos('5_4');
        expect(player2.playerBoard.missedAttacks['5_4']).toEqual(true);
    });

    it('should prevent attacks after a miss', () => {
        player1.attackPos('5_4');
        expect(player1.attackPos('7_2')).toBe(null);
    });

    it('should attack again after a hit', () => {
        player1.attackPos('2_2');
        expect(player1.attackPos('7_2')).not.toBe(null);;
    });
});