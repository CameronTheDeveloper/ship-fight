import { board } from '../board';
import { ship } from '../ship';

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

describe('Board object place ship', () => {

    let testBoard;
    let testShip1;
    let testShip2;
    let testShip3;
    let testShip4;
    let testShip5;

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

        xit('shouldn\'t place a ship horizontally out-of-bounds', () => {
            expect(testBoard.placeShip(testShip4, [11, 12])).toBeFalsy();
            expect(testBoard.placeShip(testShip5, [9, 9])).toBeFalsy();
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

        xit('shouldn\'t place a ship vertically out-of-bounds', () => {
            expect(testBoard.placeShip(testShip4, [11, 12])).toBeFalsy();
            expect(testBoard.placeShip(testShip5, [9, 9])).toBeFalsy();
        });
    });
});

xdescribe('Board object receiveAttack()', () => {
    it('marks coordinate as \'attacked\' when receiving attack', () => {

    });
});