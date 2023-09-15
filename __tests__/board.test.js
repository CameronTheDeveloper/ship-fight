import { board } from '../src/modules/board';
import { ship } from '../src/modules/ship';

describe('Board initialization and properties', () => {
    let testBoard;

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

    let testBoard;
    let testShip1;
    let testShip2;
    let testShip3;
    let testShip4;
    let testShip5;
    let testShip6;
    let testShip7;

    let ship1_cords;
    let ship2_cords;

    beforeEach(() => {
        testBoard = board();
        testBoard.setSize(10, 10);
        testShip1 = ship(4);
        testShip2 = ship(3);
        testShip3 = ship(2);
        testShip4 = ship(3);
        testShip5 = ship(3);
        testShip6 = ship(1);
        testShip7 = ship(2);
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
            expect(testBoard.placeShip(testShip2, [3, 5])).toBeFalsy();
            expect(testBoard.placeShip(testShip2, [4, 5])).toBeFalsy();
            expect(testBoard.placeShip(testShip2, [5, 5])).toBeFalsy();
        });

        it('shouldn\'t place a ship horizontally if adjacent spot is already taken', () => {
            expect(testBoard.placeShip(testShip3, [4, 4])).toBeFalsy();
            expect(testBoard.placeShip(testShip3, [6, 8])).toBeFalsy();
        });

        it('shouldn\'t place a ship horizontally out-of-bounds', () => {
            expect(testBoard.placeShip(testShip4, [11, 12])).toBeFalsy();
            expect(testBoard.placeShip(testShip5, [-4, 12])).toBeFalsy();
            expect(testBoard.placeShip(testShip6, [4, -4])).toBeFalsy();
            expect(testBoard.placeShip(testShip7, [9, 9])).toBeFalsy();
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
            expect(testBoard.placeShip(testShip2, [8, 9])).toBeFalsy();
            expect(testBoard.placeShip(testShip2, [8, 8])).toBeFalsy();
            expect(testBoard.placeShip(testShip2, [8, 6])).toBeFalsy();
            expect(testBoard.placeShip(testShip2, [3, 5])).toBeFalsy();
        });

        it('shouldn\'t place a ship vertically if adjacent spot is already taken', () => {
            expect(testBoard.placeShip(testShip3, [2, 4])).toBeFalsy();
            expect(testBoard.placeShip(testShip3, [7, 5])).toBeFalsy();
        });

        it('shouldn\'t place a ship vertically out-of-bounds', () => {
            expect(testBoard.placeShip(testShip4, [11, 12])).toBeFalsy();
            expect(testBoard.placeShip(testShip5, [-4, 12])).toBeFalsy();
            expect(testBoard.placeShip(testShip6, [4, -4])).toBeFalsy();
            expect(testBoard.placeShip(testShip7, [9, 9])).toBeFalsy();
        });
    });
});

describe('Board object receiveAttack()', () => {
    let testBoard;
    let testShip1;
    let testShip2;
    let ship1_cords;
    let ship2_cords;

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

    it('should mark position as \'attacked\'', () => {
        testBoard.receiveAttack([5, 4]);
        expect(testBoard.attackedPositions[5, 4]).toEqual(true);
    });

    xit('should prevent multiple attacks on the same position', () => {
        testBoard.receiveAttack([5, 4]);
        expect(testBoard.receiveAttack([5, 4])).toBeFalsy();
    });

    xit('should prevent out-of-bounds attacks', () => {
        expect(testBoard.receiveAttack([12, 4])).toBeFalsy();
        expect(testBoard.receiveAttack([5, 41])).toBeFalsy();
        expect(testBoard.receiveAttack([5, -1])).toBeFalsy();
        expect(testBoard.receiveAttack([-2, 4])).toBeFalsy();

    });

    xit('should mark attack as \'missed\' when not hitting ship cord', () => {
        testBoard.receiveAttack([2, 3]);
        expect(testBoard.missedAttacks[2, 3]).toEqual(true);
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