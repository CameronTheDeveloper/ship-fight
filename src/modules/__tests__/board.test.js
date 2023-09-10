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
    });

    xdescribe('Board placeShipHorizontally()', () => {

        xit('should place a ship horizontally', () => {
            placeShipHorizontally(testShip1, [5, 5]);
            expect(testBoard.pos[5, 5].taken).toBe(true);
            expect(testBoard.pos[6, 5].taken).toBe(true);
            expect(testBoard.pos[7, 5].taken).toBe(true);
            expect(testBoard.pos[8, 5].taken).toBe(true);
        });

        xit('shouldn\'t place a ship horizontally if spot is already taken', () => {
            placeShipHorizontally(testShip1, [5, 5]);
            expect(placeShipHorizontally(testShip2, [6, 5])).toBeFalsy();
            expect(placeShipHorizontally(testShip2, [7, 5])).toBeFalsy();
            expect(placeShipHorizontally(testShip2, [8, 5])).toBeFalsy();
        });

        xit('shouldn\'t place a ship horizontally if adjacent spot is already taken', () => {
            placeShipHorizontally(testShip1, [3, 5]);
            placeShipVertically(testShip2, [8, 8]);
            expect(placeShipHorizontally(testShip3, [4, 4])).toBeFalsy();
            expect(placeShipHorizontally(testShip3, [6, 8])).toBeFalsy();
        });

        xit('shouldn\'t place a ship horizontally out-of-bounds', () => {
            expect(placeShipHorizontally(testShip1, [11, 12])).toBeFalsy();
            expect(placeShipHorizontally(testShip2, [9, 9])).toBeFalsy();
        });
    });

    xdescribe('Board placeShipVertically()', () => {

        xit('should place a ship vertically', () => {
            placeShipVertically(testShip1, [5, 5]);
            expect(testBoard.pos[5, 5].taken).toBe(true);
            expect(testBoard.pos[5, 4].taken).toBe(true);
            expect(testBoard.pos[5, 3].taken).toBe(true);
            expect(testBoard.pos[5, 2].taken).toBe(true);
        });

        xit('shouldn\'t place a ship vertically if spot is already taken', () => {
            placeShipVertically(testShip1, [7, 7]);
            expect(placeShipVertically(testShip2, [7, 7])).toBeFalsy();
            expect(placeShipVertically(testShip2, [7, 6])).toBeFalsy();
            expect(placeShipVertically(testShip2, [7, 5])).toBeFalsy();
            expect(placeShipVertically(testShip2, [7, 4])).toBeFalsy();
        });

        xit('shouldn\'t place a ship vertically if adjacent spot is already taken', () => {
            placeShipHorizontally(testShip2, [3, 5]);
            placeShipVertically(testShip1, [8, 8]);
            expect(placeShipVertically(testShip3, [2, 4])).toBeFalsy();
            expect(placeShipVertically(testShip3, [7, 5])).toBeFalsy();
        });

        xit('shouldn\'t place a ship vertically out-of-bounds', () => {
            expect(placeShipVertically(testShip2, [11, 12])).toBeFalsy();
            expect(placeShipVertically(testShip1, [9, 9])).toBeFalsy();
        });
    });
});




xdescribe('Board object receiveAttack()', () => {
    it('marks coordinate as \'attacked\' when receiving attack', () => {

    });
});