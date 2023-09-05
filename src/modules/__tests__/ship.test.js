import { ship } from '../ship';

describe('Ship object', () => {
    const ship1 = ship(3);

    it('takes hits', () => {
        ship1.hit();
        ship1.hit();
        expect(ship1.hits).toBe(2);
    });

    it('hasn\'t sunk with hits less than length', () => {
        expect(ship1.sunk).toBe(false);
    });

    it('has sunk when hits = length', () => {
        ship1.hit();
        expect(ship1.sunk).toBe(true);
    });
});

