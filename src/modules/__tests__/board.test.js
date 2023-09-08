import { board } from '../board';
import { ship } from '../ship';

xdescribe('Board initialization and properties', () => {
    let testBoard;

    beforeEach(() => {
        testBoard = board();
        testBoard.setSize(11, 7);
    });

    it('should have the correct length', () => {
        expect(testBoard.length).toBe(11);
    });

    it('should have the correct width', () => {
        expect(testBoard.width).toBe(7);
    });

});

xdescribe('Board object placeShip()', () => {

    let testBoard;
    let ship1;

    beforeEach(() => {
        testBoard = board();
        testShip1 = ship(4);
    });

    xit('should place a ship vertically', () => {
        placeShipVertically(ship1, [5, 5]);
        expect(board.pos[5, 5].taken).toBe(true);
        expect(board.pos[5, 4].taken).toBe(true);
        expect(board.pos[5, 3].taken).toBe(true);
        expect(board.pos[5, 2].taken).toBe(true);
    });

    xit('should place a ship horizontally', () => {
        placeShipHorizontally(ship1, [5, 5]);
        expect(board.pos[5, 5].taken).toBe(true);
        expect(board.pos[6, 5].taken).toBe(true);
        expect(board.pos[7, 5].taken).toBe(true);
        expect(board.pos[8, 5].taken).toBe(true);

    });
});

xdescribe('Board object receiveAttack()', () => {
    it('marks coordinate as \'attacked\' when receiving attack', () => {

    });
});