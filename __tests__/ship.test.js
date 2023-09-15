import { ship } from '../src/modules/ship';



describe('Ship object', () => {

    let ship1;

    beforeEach(() => {
        ship1 = ship(3);
    });

    it('should take hits', () => {
        ship1.hit();
        ship1.hit();
        expect(ship1.hits).toBe(2);
    });

    it('should not sink without enough hits', () => {
        ship1.hit();
        ship1.checkIfSunk();
        expect(ship1.isSunk).toBe(false);
    });

    it('should sink with enough hits', () => {
        ship1.hit();
        ship1.hit();
        ship1.hit();
        ship1.checkIfSunk();
        expect(ship1.isSunk).toBe(true);
    });
});

