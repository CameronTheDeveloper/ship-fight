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

xdescribe('Board object place ship', () => {

    let testBoard;
    let testShip1;
    let testShip2;
    let testShip3;

    beforeEach(() => {
        testBoard = board();
        testBoard.setSize(10, 10);
        testShip1 = ship(4);
        testShip2 = ship(3);
        testShip3 = ship(2);
        testShip4 = ship(3);
        testShip5 = ship(3);
        testBoard.isPlacingShipVertically = false;
        testBoard.placeShip(testShip1, [3, 5]);
        testBoard.isPlacingShipVertically = true;
        testBoard.placeShip(testShip2, [8, 8]);
    });

    xdescribe('when isPlacingShipVertically = false', () => {

        beforeEach(() => {
            testBoard.isPlacingShipVertically = false;
        });

        xit('should place a ship horizontally', () => {
            expect(testBoard.pos[3, 5].taken).toBe(true);
            expect(testBoard.pos[4, 5].taken).toBe(true);
            expect(testBoard.pos[5, 5].taken).toBe(true);
            expect(testBoard.pos[6, 5].taken).toBe(true);
        });

        xit('shouldn\'t place a ship horizontally if spot is already taken', () => {
            expect(testBoard.placeShip(testShip2, [3, 5])).toBeFalsy();
            expect(testBoard.placeShip(testShip2, [4, 5])).toBeFalsy();
            expect(testBoard.placeShip(testShip2, [5, 5])).toBeFalsy();
        });

        xit('shouldn\'t place a ship horizontally if adjacent spot is already taken', () => {
            expect(testBoard.placeShip(testShip3, [4, 4])).toBeFalsy();
            expect(testBoard.placeShip(testShip3, [6, 8])).toBeFalsy();
        });

        xit('shouldn\'t place a ship horizontally out-of-bounds', () => {
            expect(testBoard.placeShip(testShip4, [11, 12])).toBeFalsy();
            expect(testBoard.placeShip(testShip5, [9, 9])).toBeFalsy();
        });
    });

    xdescribe('when isPlacingShipVertically = true', () => {

        beforeEach(() => {
            testBoard.isPlacingShipVertically = true;
        });

        xit('should place a ship vertically', () => {
            expect(testBoard.pos[8, 8].taken).toBe(true);
            expect(testBoard.pos[8, 7].taken).toBe(true);
            expect(testBoard.pos[8, 6].taken).toBe(true);
        });

        xit('shouldn\'t place a ship vertically if spot is already taken', () => {
            expect(testBoard.placeShip(testShip2, [8, 9])).toBeFalsy();
            expect(testBoard.placeShip(testShip2, [8, 8])).toBeFalsy();
            expect(testBoard.placeShip(testShip2, [8, 6])).toBeFalsy();
            expect(testBoard.placeShip(testShip2, [3, 5])).toBeFalsy();
        });

        xit('shouldn\'t place a ship vertically if adjacent spot is already taken', () => {
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