import { Board } from '../src/modules/board';
import { Ship } from '../src/modules/ship';

let testBoard = null;

beforeEach(() => {
    testBoard = Board();
    testBoard.setSize(10, 10);
});

describe('Board object placeShip()', () => {

    let testShip1 = null;
    let testShip2 = null;
    let testShip3 = null;
    let testShip4 = null;

    beforeEach(() => {
        testShip1 = Ship(4);
        testShip2 = Ship(3);
        testShip3 = Ship(2);
        testShip4 = Ship(3);
        testBoard.isPlacingShipVertically = false;
        testShip1.cords = testBoard.placeShip(testShip1, '3_5');
        testBoard.isPlacingShipVertically = true;
        testShip2.cords = testBoard.placeShip(testShip2, '8_8');
    });

    describe('when isPlacingShipVertically = false', () => {

        beforeEach(() => {
            testBoard.isPlacingShipVertically = false;
        });

        it('should place a ship horizontally', () => {
            expect(testShip1.cords).toEqual(['3_5', '4_5', '5_5', '6_5']);
        });

        it('shouldn\'t place a ship horizontally if spot is already taken', () => {
            expect(testBoard.placeShip(testShip3, '3_5')).toBe(null);
            expect(testBoard.placeShip(testShip3, '4_5')).toBe(null);
            expect(testBoard.placeShip(testShip3, '5_5')).toBe(null);
        });

        it('shouldn\'t place a ship horizontally if adjacent spot is already taken', () => {
            expect(testBoard.placeShip(testShip3, '4_4')).toBe(null);
            expect(testBoard.placeShip(testShip3, '6_8')).toBe(null);
        });

        it('shouldn\'t place a ship horizontally out-of-bounds', () => {
            expect(testBoard.placeShip(testShip4, '11_12')).toBe(null);
            expect(testBoard.placeShip(testShip4, '-4_12')).toBe(null);
            expect(testBoard.placeShip(testShip4, '4_-4')).toBe(null);
            expect(testBoard.placeShip(testShip4, '9_9')).toBe(null);
        });
    });

    describe('when isPlacingShipVertically = true', () => {

        beforeEach(() => {
            testBoard.isPlacingShipVertically = true;
        });

        it('should place a ship vertically', () => {
            expect(testShip2.cords).toEqual(['8_8', '8_7', '8_6']);
        });

        it('shouldn\'t place a ship vertically if spot is already taken', () => {
            expect(testBoard.placeShip(testShip3, '8_8')).toBe(null);
            expect(testBoard.placeShip(testShip3, '8_7')).toBe(null);
            expect(testBoard.placeShip(testShip3, '8_6')).toBe(null);
            expect(testBoard.placeShip(testShip3, '3_5')).toBe(null);
        });

        it('shouldn\'t place a ship vertically if adjacent spot is already taken', () => {
            expect(testBoard.placeShip(testShip3, '2_4')).toBe(null);
            expect(testBoard.placeShip(testShip3, '7_5')).toBe(null);
        });

        it('shouldn\'t place a ship vertically out-of-bounds', () => {
            expect(testBoard.placeShip(testShip4, '11_12')).toBe(null);
            expect(testBoard.placeShip(testShip4, '-4_2')).toBe(null);
            expect(testBoard.placeShip(testShip4, '4_-4')).toBe(null);
            expect(testBoard.placeShip(testShip4, '9_1')).toBe(null);
        });
    });
});

describe('Board object getShip()', () => {

    let testShip1 = null;

    beforeEach(() => {
        testShip1 = Ship(3);
        testBoard.isPlacingShipVertically = false;
        testShip1.cords = testBoard.placeShip(testShip1, '3_5');
    });

    it('should return the correct ship object', () => {
        expect(testBoard.getShip('3_5')).toBe(testShip1);
    });
});

describe('Board object getAdjacentPositions()', () => {
    let testShip1 = null;

    beforeEach(() => {
        testShip1 = Ship(2);
        testBoard.isPlacingShipVertically = false;
        testShip1.cords = testBoard.placeShip(testShip1, '3_5');
    });


    it('should return the adjacent positions of a given position', () => {
        expect(testBoard.getAdjacentPositions('3_2')).toEqual(expect.arrayContaining(['4_2',
            '4_1', '3_1', '2_1', '2_2', '2_3', '3_3', '4_3']));
    });
});

describe('Board object receiveAttack()', () => {
    let testShip1 = null;
    let testShip2 = null;

    beforeEach(() => {
        testShip1 = Ship(4);
        testShip2 = Ship(3);
        testBoard.isPlacingShipVertically = false;
        testShip1.cords = testBoard.placeShip(testShip1, '3_5');
        testBoard.isPlacingShipVertically = true;
        testShip2.cords = testBoard.placeShip(testShip2, '8_8');
    });

    it('should report that an attack hit', () => {
        expect(testBoard.receiveAttack('3_5')).toBe(true);
    });

    it('should report that an attack missed', () => {
        expect(testBoard.receiveAttack('1_1')).toBe(false);
    });

    xit('should prevent multiple attacks on the same position', () => {
        testBoard.receiveAttack('5_4');
        expect(testBoard.receiveAttack('5_4')).toBe(null);
    });

    xit('should prevent out-of-bounds attacks', () => {
        expect(testBoard.receiveAttack('12_4')).toBe(null);
        expect(testBoard.receiveAttack('5_-4')).toBe(null);
        expect(testBoard.receiveAttack('5_-1')).toBe(null);
        expect(testBoard.receiveAttack('-2_4')).toBe(null);
    });

    xit('should record missed attack on adjacent ship cord', () => {
        testBoard.receiveAttack('3_4');
        expect(testBoard.missedAttacks['3_4']).toEqual(true);
    });

    xit('should add hits to the correct ship', () => {
        testBoard.receiveAttack('3_5');
        testBoard.receiveAttack('4_5');
        expect(testShip1.hits).toBe(2);
    });

    xit('should sink a ship with enough hits', () => {
        testBoard.receiveAttack('3_5');
        testBoard.receiveAttack('4_5');
        testBoard.receiveAttack('5_5');
        testBoard.receiveAttack('6_5');

        expect(testShip1.hasSunk()).toBe(true);
    });
});

xdescribe('Board object gameIsOver', () => {

    let testBoard = null;
    let testShip1 = null;
    let testShip2 = null;

    beforeEach(() => {
        testBoard = Board();
        testBoard.setSize(10, 10);
        testShip1 = Ship(4);
        testShip2 = Ship(3);
        testBoard.isPlacingShipVertically = false;
        testShip1.cords = testBoard.placeShip(testShip1, '3_5');
        testBoard.isPlacingShipVertically = true;
        testShip2.cords = testBoard.placeShip(testShip2, '8_8');
    });

    it('shouldn\'t report \'game over\' if ships are still alive', () => {
        testBoard.receiveAttack('3_5');
        testBoard.receiveAttack('4_5');
        testBoard.receiveAttack('5_5');
        testBoard.receiveAttack('6_5');

        expect(testBoard.gameIsOver()).toBe(false);
    });

    it('should report \'game over\' if all ships have sunk', () => {
        testBoard.receiveAttack('3_5');
        testBoard.receiveAttack('4_5');
        testBoard.receiveAttack('5_5');
        testBoard.receiveAttack('6_5');

        testBoard.receiveAttack('8_8');
        testBoard.receiveAttack('8_7');
        testBoard.receiveAttack('8_6');

        expect(testBoard.gameIsOver()).toBe(true);
    });
});

xdescribe('Board Object clearAvailableAttacks', () => {
    it('should prevent attacks on the board', () => {
        testBoard.clearAvailableAttacks();
        expect(testBoard.receiveAttack('5_5')).toBe(null);
    });
});