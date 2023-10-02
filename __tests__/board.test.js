import { board } from '../src/modules/board';
import { ship } from '../src/modules/ship';

let testBoard = null;

beforeEach(() => {
    testBoard = board();
    testBoard.setSize(10, 10);
});

describe('Board object placeShip()', () => {

    let testShip1 = null;
    let testShip2 = null;
    let testShip3 = null;
    let testShip4 = null;

    beforeEach(() => {
        testShip1 = ship(4);
        testShip2 = ship(3);
        testShip3 = ship(2);
        testShip4 = ship(3);
        testBoard.isPlacingShipVertically = false;
        testShip1.cords = testBoard.placeShip(testShip1, [3, 5]);
        testBoard.isPlacingShipVertically = true;
        testShip2.cords = testBoard.placeShip(testShip2, [8, 8]);
    });

    describe('when isPlacingShipVertically = false', () => {

        beforeEach(() => {
            testBoard.isPlacingShipVertically = false;
        });

        it('should place a ship horizontally', () => {
            expect(testShip1.cords).toEqual([[3, 5], [4, 5], [5, 5], [6, 5]]);
        });

        it('shouldn\'t place a ship horizontally if spot is already taken', () => {
            expect(testBoard.placeShip(testShip3, [3, 5])).toBe(null);
            expect(testBoard.placeShip(testShip3, [4, 5])).toBe(null);
            expect(testBoard.placeShip(testShip3, [5, 5])).toBe(null);
        });

        it('shouldn\'t place a ship horizontally if adjacent spot is already taken', () => {
            expect(testBoard.placeShip(testShip3, [4, 4])).toBe(null);
            expect(testBoard.placeShip(testShip3, [6, 8])).toBe(null);
        });

        it('shouldn\'t place a ship horizontally out-of-bounds', () => {
            expect(testBoard.placeShip(testShip4, [11, 12])).toBe(null);
            expect(testBoard.placeShip(testShip4, [-4, 12])).toBe(null);
            expect(testBoard.placeShip(testShip4, [4, -4])).toBe(null);
            expect(testBoard.placeShip(testShip4, [9, 9])).toBe(null);
        });
    });

    describe('when isPlacingShipVertically = true', () => {

        beforeEach(() => {
            testBoard.isPlacingShipVertically = true;
        });

        it('should place a ship vertically', () => {
            expect(testShip2.cords).toEqual([[8, 8], [8, 7], [8, 6]]);
        });

        it('shouldn\'t place a ship vertically if spot is already taken', () => {
            expect(testBoard.placeShip(testShip3, [8, 8])).toBe(null);
            expect(testBoard.placeShip(testShip3, [8, 7])).toBe(null);
            expect(testBoard.placeShip(testShip3, [8, 6])).toBe(null);
            expect(testBoard.placeShip(testShip3, [3, 5])).toBe(null);
        });

        it('shouldn\'t place a ship vertically if adjacent spot is already taken', () => {
            expect(testBoard.placeShip(testShip3, [2, 4])).toBe(null);
            expect(testBoard.placeShip(testShip3, [7, 5])).toBe(null);
        });

        it('shouldn\'t place a ship vertically out-of-bounds', () => {
            expect(testBoard.placeShip(testShip4, [11, 12])).toBe(null);
            expect(testBoard.placeShip(testShip4, [-4, 12])).toBe(null);
            expect(testBoard.placeShip(testShip4, [4, -4])).toBe(null);
            expect(testBoard.placeShip(testShip4, [9, 1])).toBe(null);
        });
    });
});

describe('Board object receiveAttack()', () => {
    let testShip1 = null;
    let testShip2 = null;

    beforeEach(() => {
        testShip1 = ship(4);
        testShip2 = ship(3);
        testBoard.isPlacingShipVertically = false;
        testShip1.cords = testBoard.placeShip(testShip1, [3, 5]);
        testBoard.isPlacingShipVertically = true;
        testShip2.cords = testBoard.placeShip(testShip2, [8, 8]);
    });

    it('should prevent multiple attacks on the same position', () => {
        testBoard.receiveAttack([5, 4]);
        expect(testBoard.receiveAttack([5, 4])).toBe(null);
    });

    it('should prevent out-of-bounds attacks', () => {
        expect(testBoard.receiveAttack([12, 4])).toBe(null);
        expect(testBoard.receiveAttack([5, 41])).toBe(null);
        expect(testBoard.receiveAttack([5, -1])).toBe(null);
        expect(testBoard.receiveAttack([-2, 4])).toBe(null);

    });

    it('should record attack as \'missed\' when not hitting ship cord', () => {
        testBoard.receiveAttack([2, 3]);
        expect(testBoard.missedAttacks[[2, 3]]).toEqual(true);
    });

    it('should record missed attack on adjacent ship cord', () => {
        testBoard.receiveAttack([3, 4]);
        expect(testBoard.missedAttacks[[3, 4]]).toEqual(true);

    });

    it('should add hits to the correct ship', () => {
        testBoard.receiveAttack([3, 5]);
        testBoard.receiveAttack([4, 5]);
        expect(testShip1.hits).toBe(2);
    });

    it('should sink a ship with enough hits', () => {
        testBoard.receiveAttack([3, 5]);
        testBoard.receiveAttack([4, 5]);
        testBoard.receiveAttack([5, 5]);
        testBoard.receiveAttack([6, 5]);

        expect(testShip1.hasSunk()).toBe(true);
    });

    it('should prevent attacks on sunk ship adjacent positions', () => {
        testBoard.receiveAttack([3, 5]);
        testBoard.receiveAttack([4, 5]);
        testBoard.receiveAttack([5, 5]);
        testBoard.receiveAttack([6, 5]);

        expect(testBoard.receiveAttack([2, 5])).toBe(null);
        expect(testBoard.receiveAttack([4, 6])).toBe(null);
        expect(testBoard.receiveAttack([7, 5])).toBe(null);
        expect(testBoard.receiveAttack([5, 4])).toBe(null);
    });
});

describe('Board object gameIsOver', () => {

    let testBoard = null;
    let testShip1 = null;
    let testShip2 = null;

    beforeEach(() => {
        testBoard = board();
        testBoard.setSize(10, 10);
        testShip1 = ship(4);
        testShip2 = ship(3);
        testBoard.isPlacingShipVertically = false;
        testShip1.cords = testBoard.placeShip(testShip1, [3, 5]);
        testBoard.isPlacingShipVertically = true;
        testShip2.cords = testBoard.placeShip(testShip2, [8, 8]);
    });

    it('shouldn\'t report \'game over\' if ships are still alive', () => {
        testBoard.receiveAttack([3, 5]);
        testBoard.receiveAttack([4, 5]);
        testBoard.receiveAttack([5, 5]);
        testBoard.receiveAttack([6, 5]);

        expect(testBoard.gameIsOver()).toBe(false);
    });

    it('should report \'game over\' if all ships have sunk', () => {
        testBoard.receiveAttack([3, 5]);
        testBoard.receiveAttack([4, 5]);
        testBoard.receiveAttack([5, 5]);
        testBoard.receiveAttack([6, 5]);

        testBoard.receiveAttack([8, 8]);
        testBoard.receiveAttack([8, 7]);
        testBoard.receiveAttack([8, 6]);

        expect(testBoard.gameIsOver()).toBe(true);
    });
});