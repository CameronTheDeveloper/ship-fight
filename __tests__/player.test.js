import { board } from "../src/modules/board";

xdescribe('Player object', () => {
    let player1;
    let player2;

    beforeEach(() => {
        player1 = player();
        player2 = player();

        player1.playerBoard = board();
        player2.playerBoard = board();

        player1.playerBoard.setSize(10, 10);
        player2.playerBoard.setSize(10, 10);
    });

    xit('should be able to attack enemy game board', () => {
        player1.attackPos([5, 4]);
        expect(player2.playerBoard.attackedPositions[[5, 4]]).toEqual(true);
    });
});


xdescribe('Player AI', () => {
    let player1;
    let player2;



    beforeEach(() => {
        player1 = player();
        player2 = player();

        player1.playerBoard = board();
        player2.playerBoard = board();

        player1.playerBoard.setSize(10, 10);
        player2.playerBoard.setSize(10, 10);
    });

    xit('should attack a random position', () => {

    });

    xit('should prevent attacking already attacked positions', () => {

    });
});