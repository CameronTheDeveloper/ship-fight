import { ship } from '../ship';

describe('Ship object', () => {
    const newShip = ship(5);
    it('Has a length', () => {
        expect(newShip.length).toBe(5);
    });
});
