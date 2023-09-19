import { board } from '../src/modules/board';
import { ship } from '../src/modules/ship';

describe('Board initialization and properties', () => {
    let testBoard = null;

    beforeEach(() => {
        testBoard = board();
        testBoard.setSize(11, 7);
    });

    it('should have the correct length', () => { //Remove if implementation changes
        expect(testBoard.width).toBe(11);
    });

    it('should have the correct width', () => { //Remove if implementation changes
        expect(testBoard.length).toBe(7);
    });
});

describe('Board object placeShip()', () => {

    let testBoard = null;
    let testShip1 = null;
    let testShip2 = null;
    let testShip3 = null;
    let testShip4 = null;

    let ship1_cords = null;
    let ship2_cords = null;

    beforeEach(() => {
        testBoard = board();
        testBoard.setSize(10, 10);
        testShip1 = ship(4);
        testShip2 = ship(3);
        testShip3 = ship(2);
        testShip4 = ship(3);
        testBoard.isPlacingShipVertically = false;
        ship1_cords = testBoard.placeShip(testShip1, [3, 5]);
        testBoard.isPlacingShipVertically = true;
        ship2_cords = testBoard.placeShip(testShip2, [8, 8]);
    });

    describe('when isPlacingShipVertically = false', () => {

        beforeEach(() => {
            testBoard.isPlacingShipVertically = false;
        });

        it('should place a ship horizontally', () => {
            expect(ship1_cords).toEqual([[3, 5], [4, 5], [5, 5], [6, 5]]);
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
            expect(ship2_cords).toEqual([[8, 8], [8, 7], [8, 6]]);
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
    let testBoard = null;
    let testShip1 = null;
    let testShip2 = null;
    let ship1_cords = null;
    let ship2_cords = null;

    beforeEach(() => {
        testBoard = board();
        testBoard.setSize(10, 10);
        testShip1 = ship(4);
        testShip2 = ship(3);
        testBoard.isPlacingShipVertically = false;
        ship1_cords = testBoard.placeShip(testShip1, [3, 5]);
        testBoard.isPlacingShipVertically = true;
        ship2_cords = testBoard.placeShip(testShip2, [8, 8]);
    });

    it('should record position as \'attacked\'', () => {
        testBoard.receiveAttack([5, 4]);
        expect(testBoard.attackedPositions[[5, 4]]).toEqual(true);
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

    xit('should sink a ship with enough hits', () => {
        expect(testShip1.isSunk).toBe(false);

        testBoard.receiveAttack([3, 5]);
        testBoard.receiveAttack([4, 5]);
        testBoard.receiveAttack([5, 5]);
        testBoard.receiveAttack([6, 5]);

        expect(testShip1.isSunk).toBe(true);
    });

    xit('should report that all ships have sunk', () => {
        expect(testBoard.gameOver).toBe(false);

        testBoard.receiveAttack([3, 5]);
        testBoard.receiveAttack([4, 5]);
        testBoard.receiveAttack([5, 5]);
        testBoard.receiveAttack([6, 5]);

        testBoard.receiveAttack([8, 8]);
        testBoard.receiveAttack([8, 7]);
        testBoard.receiveAttack([8, 6]);

        expect(testBoard.gameOver).toBe(true);
    });
});