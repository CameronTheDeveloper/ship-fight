/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/attributes.js":
/*!***********************************!*\
  !*** ./src/modules/attributes.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addBoardPosAttributes: () => (/* binding */ addBoardPosAttributes),
/* harmony export */   addShipSelectionAttributes: () => (/* binding */ addShipSelectionAttributes),
/* harmony export */   setActiveShipSelectionClass: () => (/* binding */ setActiveShipSelectionClass)
/* harmony export */ });
const addBoardPosAttributes = (posDiv, pos, boardSide) => {
  posDiv.classList.add('board-pos');
  posDiv.setAttribute('id', `${boardSide}-${pos}`);
};
const addShipSelectionAttributes = (selectionDiv, shipSize) => {
  selectionDiv.classList.add('ship-selection');
  selectionDiv.classList.add(`ship-length-${shipSize}`);
};
const setActiveShipSelectionClass = selectedShipDiv => {
  const oldSelectedDiv = document.querySelector('.ship-selections .selected');
  if (oldSelectedDiv) {
    oldSelectedDiv.classList.remove('selected');
  }
  selectedShipDiv.classList.add('selected');
};


/***/ }),

/***/ "./src/modules/board.js":
/*!******************************!*\
  !*** ./src/modules/board.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Board: () => (/* binding */ Board),
/* harmony export */   getRandomPos: () => (/* binding */ getRandomPos),
/* harmony export */   initializeBoards: () => (/* binding */ initializeBoards)
/* harmony export */ });
/* harmony import */ var _page_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-dom */ "./src/modules/page-dom.js");

const Board = () => {
  return {
    pos: new Map(),
    shipCord: new Map(),
    side: null,
    boardSize: 0,
    shipsRemaining: 0,
    isPlacingShipVertically: false,
    takenPositions: {},
    availableAttacks: [],
    missedAttacks: {},
    _addPosition(stringPos) {
      this.pos.set(stringPos, []);
    },
    _addAvailableAttack(stringPos) {
      this.availableAttacks.push(stringPos);
    },
    _setBoardPos(newPos) {
      this._addPosition(newPos);
      this._addAvailableAttack(newPos);
    },
    _setBoardAdjPos(position, adjPosition) {
      this.pos.get(position).push(adjPosition);
    },
    _setShipCord(cord, ship) {
      this.shipCord.set(cord, ship);
    },
    getShip(cord) {
      return this.shipCord.get(cord);
    },
    _posTaken(cord) {
      return this.shipCord.get(cord);
    },
    _removeAvailableAttack(position) {
      const posIndex = this.availableAttacks.indexOf(position);
      if (posIndex >= 0 && posIndex <= this.availableAttacks.length) {
        this.availableAttacks.splice(posIndex, 1);
      }
    },
    _attackIsAvailable(position) {
      return this.availableAttacks.includes(position);
    },
    _connectAdjPositions() {
      const adjPosDistances = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
      let posKeys = this.pos.keys();
      let xPos = null;
      let yPos = null;
      for (let position of posKeys) {
        for (let adjPosDistance of adjPosDistances) {
          xPos = +position.split('_')[0] + adjPosDistance[0];
          yPos = +position.split('_')[1] + adjPosDistance[1];
          if (xPos >= 1 && yPos >= 1 && xPos <= this.boardSize && yPos <= this.boardSize) {
            let adjPosition = `${xPos}_${yPos}`;
            this._setBoardAdjPos(position, adjPosition);
          }
        }
      }
    },
    setSize(sizeInput) {
      this.boardSize = sizeInput;
      for (let i = 1; i <= this.boardSize; i++) {
        for (let j = 1; j <= this.boardSize; j++) {
          this._setBoardPos(`${i}_${j}`);
        }
      }
      this._connectAdjPositions();
    },
    _outOfBounds(cords) {
      let xCord = +cords.split('_')[0];
      let yCord = +cords.split('_')[1];
      if (xCord > this.boardSize || yCord > this.boardSize || xCord < 1 || yCord < 1) {
        return true;
      } else {
        return false;
      }
    },
    _placeShipHorizontally(xCord, yCord, ship) {
      let shipCordsAr = [];
      let shipCord = '';
      for (let i = 0; i < ship.shipSize; i++) {
        shipCord = `${+xCord + i}_${yCord}`;
        if (this.takenPositions[shipCord] || this._outOfBounds(shipCord)) {
          return null;
        }
        shipCordsAr.push(shipCord);
      }
      for (let j = 0; j < shipCordsAr.length; j++) {
        this._setShipCord(shipCordsAr[j], ship);
        this.takenPositions[shipCordsAr[j]] = true;
      }
      return shipCordsAr;
    },
    _placeShipVertically(xCord, yCord, ship) {
      let shipCordsAr = [];
      let shipCord = '';
      for (let i = 0; i < ship.shipSize; i++) {
        shipCord = `${+xCord}_${yCord - i}`;
        if (this.takenPositions[shipCord] || this._outOfBounds(shipCord)) {
          return null;
        }
        this.takenPositions[shipCord] = true;
        this._setShipCord(shipCord, ship);
        shipCordsAr.push(shipCord);
      }
      return shipCordsAr;
    },
    _placeShipAdjCords(shipCords) {
      let shipCord = [];
      for (let i = 0; i < shipCords.length; i++) {
        shipCord = this.pos.get(shipCords[i]);
        for (let adjCord of shipCord) {
          this.takenPositions[adjCord] = true;
        }
      }
    },
    placeShip(ship, headCord) {
      let xCord = headCord.split('_')[0];
      let yCord = headCord.split('_')[1];
      let shipCords = [];
      if (this._outOfBounds(headCord)) {
        return null;
      }
      if (this.isPlacingShipVertically) {
        shipCords = this._placeShipVertically(xCord, yCord, ship);
      } else {
        shipCords = this._placeShipHorizontally(xCord, yCord, ship);
      }
      if (shipCords) {
        this._placeShipAdjCords(shipCords);
        this.shipsRemaining++;
      }
      return shipCords;
    },
    getAdjacentPositions(position) {
      let adjPosAr = [];
      let adjPositions = this.pos.get(position);
      for (let adjPos of adjPositions) {
        adjPosAr.push(adjPos);
      }
      return adjPosAr;
    },
    _sinkShip() {
      this.shipsRemaining--;
    },
    _hitShip(position) {
      let ship = this.getShip(position);
      ship.hit();
      if (ship.hasSunk()) {
        this._sinkShip();
      }
    },
    _attackHit(position) {
      if (this._posTaken(position)) {
        this._hitShip(position);
        return true;
      }
      this.missedAttacks[position] = true;
      return false;
    },
    receiveAttack(position) {
      if (this._outOfBounds(position) || !this._attackIsAvailable(position)) {
        return null;
      }
      this._removeAvailableAttack(position);
      return this._attackHit(position);
    },
    clearAvailableAttacks() {
      this.availableAttacks = [];
    },
    gameIsOver() {
      return this.shipsRemaining <= 0;
    }
  };
};
const createPlayerBoard = (boardSize, boardSide) => {
  const playerBoard = Board();
  playerBoard.setSize(boardSize);
  playerBoard.side = boardSide;
  return playerBoard;
};
const getRandomPos = (minX, maxX, minY, maxY) => {
  const xPos = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  const yPos = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
  return `${xPos}_${yPos}`;
};
const initializeBoards = (leftPlayer, rightPlayer, boardSize) => {
  const leftBoardSide = 'left-board';
  const rightBoardSide = 'right-board';
  leftPlayer.playerBoard = createPlayerBoard(boardSize, leftBoardSide);
  rightPlayer.playerBoard = createPlayerBoard(boardSize, rightBoardSide);
  (0,_page_dom__WEBPACK_IMPORTED_MODULE_0__.initPlayerBoardsDOM)(leftPlayer, rightPlayer, leftBoardSide, rightBoardSide);
};


/***/ }),

/***/ "./src/modules/computer-board-sections.js":
/*!************************************************!*\
  !*** ./src/modules/computer-board-sections.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBoardSectionsAr: () => (/* binding */ getBoardSectionsAr)
/* harmony export */ });
const boardSection = (minX, maxY) => {
  return {
    sectionSpaceWidth: null,
    sectionSpaceLength: null,
    isPlacingVertically: true,
    minX: minX,
    minY: null,
    maxX: null,
    maxY: maxY,
    _setMaxX(boardSize) {
      this.maxX = this.minX + this.sectionSpaceWidth;
      if (this.maxX > boardSize) {
        this.maxX = boardSize;
      }
    },
    _setMinY() {
      this.minY = this.maxY - this.sectionSpaceLength;
      if (this.minY < 0) {
        this.minY = 0;
      }
    },
    setRandomIsPlacingVertically() {
      const randomNum = Math.round(Math.random());
      if (randomNum == 0) {
        this.isPlacingVertically = true;
      } else {
        this.isPlacingVertically = false;
      }
    },
    setSectionBoundaries(board) {
      this._setMaxX(board.boardSize);
      this._setMinY();
    }
  };
};
const createBoardSection = (minX, maxY) => {
  const newSection = boardSection(minX, maxY);
  return newSection;
};
const getMinXValues = (shipsAr, boardSize) => {
  let minXValuesAr = [];
  let minX = null;
  const columnCount = Math.ceil(shipsAr.length / 2);
  const columnDistance = Math.ceil(boardSize / columnCount);
  for (let i = 0; i < columnCount; i++) {
    minX = i * columnDistance + 1;
    minXValuesAr.push(minX);
  }
  return minXValuesAr;
};
const getMaxYValues = (shipsAr, boardSize) => {
  let maxYValuesAr = [];
  let maxY = null;
  const rowCount = Math.ceil(shipsAr.length / 2);
  const rowDistance = Math.ceil(boardSize / rowCount);
  for (let i = 1; i <= rowCount; i++) {
    maxY = i * rowDistance - 1;
    maxYValuesAr.push(maxY);
  }
  return maxYValuesAr;
};
const setSectionSpacing = (board, ship, section, shipCount) => {
  section.setRandomIsPlacingVertically();
  if (section.isPlacingVertically) {
    section.sectionSpaceLength = shipCount - ship.shipSize;
    section.sectionSpaceWidth = shipCount - 1;
  } else {
    section.sectionSpaceLength = shipCount - 1;
    section.sectionSpaceWidth = shipCount - ship.shipSize;
  }
  section.setSectionBoundaries(board);
};
const getBoardSectionsAr = (shipsAr, board) => {
  let sectionsAr = [];
  let newSection = null;
  const minXValues = getMinXValues(shipsAr, board.boardSize);
  const maxYValues = getMaxYValues(shipsAr, board.boardSize);
  for (let y = 0; y < maxYValues.length; y++) {
    for (let x = 0; x < minXValues.length; x++) {
      newSection = createBoardSection(minXValues[x], maxYValues[y]);
      sectionsAr.push(newSection);
    }
  }
  for (let i = 0; i < sectionsAr.length; i++) {
    setSectionSpacing(board, shipsAr[i], sectionsAr[i], shipsAr.length);
  }
  return sectionsAr;
};


/***/ }),

/***/ "./src/modules/game-manager.js":
/*!*************************************!*\
  !*** ./src/modules/game-manager.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeGame: () => (/* binding */ initializeGame),
/* harmony export */   initializeGameAgainstComputer: () => (/* binding */ initializeGameAgainstComputer)
/* harmony export */ });
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/modules/board.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* harmony import */ var _user_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-input */ "./src/modules/user-input.js");




const initializeGame = () => {
  const leftPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)('Player 1');
  const rightPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)('Player 2');
  const boardSize = 10;
  const shipsAr = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.getShipsAr)(boardSize);
  leftPlayer.turn = true;
  (0,_player__WEBPACK_IMPORTED_MODULE_1__.assignPlayerEnemies)(leftPlayer, rightPlayer);
  (0,_board__WEBPACK_IMPORTED_MODULE_0__.initializeBoards)(leftPlayer, rightPlayer, boardSize);
  (0,_player__WEBPACK_IMPORTED_MODULE_1__.initializeUserPlayer)(leftPlayer, shipsAr);
};
const initializeGameAgainstComputer = (userPlayer, computerPlayer, shipsAr) => {
  (0,_user_input__WEBPACK_IMPORTED_MODULE_3__.addBoardAttackListeners)(userPlayer);
  (0,_player__WEBPACK_IMPORTED_MODULE_1__.initializeComputerPlayer)(shipsAr, computerPlayer);
  userPlayer.turn = true;
};


/***/ }),

/***/ "./src/modules/page-dom.js":
/*!*********************************!*\
  !*** ./src/modules/page-dom.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activateStartButtonDOM: () => (/* binding */ activateStartButtonDOM),
/* harmony export */   addShipSelectionsDOM: () => (/* binding */ addShipSelectionsDOM),
/* harmony export */   attackPlayerBoard: () => (/* binding */ attackPlayerBoard),
/* harmony export */   attackRandomPos: () => (/* binding */ attackRandomPos),
/* harmony export */   hideShipMenuDOM: () => (/* binding */ hideShipMenuDOM),
/* harmony export */   hideStartButtonDOM: () => (/* binding */ hideStartButtonDOM),
/* harmony export */   initPlayerBoardsDOM: () => (/* binding */ initPlayerBoardsDOM),
/* harmony export */   placeComputerShips: () => (/* binding */ placeComputerShips),
/* harmony export */   placeShipDOM: () => (/* binding */ placeShipDOM),
/* harmony export */   togglePlaceVertButtonDisplay: () => (/* binding */ togglePlaceVertButtonDisplay)
/* harmony export */ });
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attributes */ "./src/modules/attributes.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board */ "./src/modules/board.js");
/* harmony import */ var _user_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-input */ "./src/modules/user-input.js");



const addDiv = parent => {
  const newDiv = document.createElement('div');
  parent.appendChild(newDiv);
  return newDiv;
};
const setGridTemplate = (element, width, length) => {
  element.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  element.style.gridTemplateRows = `repeat(${length}, 1fr)`;
};
const activateStartButtonDOM = () => {
  const startGameButton = document.querySelector('#start-game-button button');
  startGameButton.setAttribute('class', 'active');
};
const deActivateStartButtonDOM = () => {
  const startGameButton = document.querySelector('#start-game-button button');
  startGameButton.setAttribute('class', 'inactive');
};
const hideStartButtonDOM = () => {
  const startGameButtonDiv = document.querySelector('#start-game-button');
  startGameButtonDiv.setAttribute('class', 'invisible');
};
const hideShipMenuDOM = () => {
  const shipMenu = document.querySelector('.ship-menu');
  shipMenu.classList.add('inactive');
};
const addBoardPositionsDOM = (board, boardParentDiv) => {
  const positionsDiv = boardParentDiv.querySelector('.board-positions');
  let posDiv = null;
  let pos = null;
  setGridTemplate(positionsDiv, board.boardSize, board.boardSize);
  for (let y = board.boardSize; y >= 1; y--) {
    for (let x = 1; x <= board.boardSize; x++) {
      pos = `${x}_${y}`;
      posDiv = addDiv(positionsDiv);
      (0,_attributes__WEBPACK_IMPORTED_MODULE_0__.addBoardPosAttributes)(posDiv, pos, board.side);
    }
  }
};
const initBoardTopDOM = (player, boardSide) => {
  const playerNameDiv = document.querySelector(`#${boardSide} .board-top .player-name`);
  const shipsRemainingNumberDiv = document.querySelector(`#${boardSide} .board-top .ships-remaining span`);
  playerNameDiv.textContent = player.name;
  shipsRemainingNumberDiv.textContent = 0;
};
const initPlayerBoardsDOM = (leftPlayer, rightPlayer, leftBoardSide, rightBoardSide) => {
  const leftBoardDiv = document.querySelector(`#${leftBoardSide}`);
  const rightBoardDiv = document.querySelector(`#${rightBoardSide}`);
  addBoardPositionsDOM(leftPlayer.playerBoard, leftBoardDiv);
  addBoardPositionsDOM(rightPlayer.playerBoard, rightBoardDiv);
  initBoardTopDOM(leftPlayer, leftBoardSide);
  initBoardTopDOM(rightPlayer, rightBoardSide);
};
const updateShipCountDOM = board => {
  const shipCountDiv = document.querySelector(`#${board.side} .stats .ships-remaining span`);
  shipCountDiv.textContent = `${board.shipsRemaining}`;
};
const addShipSelectionsDOM = (player, shipsAr) => {
  const shipSelectionsDiv = document.querySelector('.ship-selections');
  let selectionDiv = null;
  let shipSelectionLength = null;
  for (let i = 0; i < shipsAr.length; i++) {
    shipSelectionLength = shipsAr[i].shipSize;
    selectionDiv = document.createElement('div');
    selectionDiv.textContent = shipSelectionLength;
    shipSelectionsDiv.appendChild(selectionDiv);
    (0,_attributes__WEBPACK_IMPORTED_MODULE_0__.addShipSelectionAttributes)(selectionDiv, shipSelectionLength);
    (0,_user_input__WEBPACK_IMPORTED_MODULE_2__.addClickShipSelection)(selectionDiv, player, shipSelectionLength);
  }
  setGridTemplate(shipSelectionsDiv, shipsAr.length, 1);
};
const togglePlaceVertButtonDisplay = (button, text) => {
  const textSpan = button.querySelector('span');
  textSpan.textContent = text;
  button.setAttribute('class', `${text.toLowerCase()}`);
};
const placeShipCord = divID => {
  const shipDiv = document.getElementById(divID);
  shipDiv.classList.add('taken');
};
const placeShipDOM = (shipCords, board) => {
  let divID = null;
  for (let i = 0; i < shipCords.length; i++) {
    divID = `${board.side}-${shipCords[i]}`;
    placeShipCord(divID);
  }
  updateShipCountDOM(board);
};
const placeRandomShip = (ship, section, board) => {
  const headCord = (0,_board__WEBPACK_IMPORTED_MODULE_1__.getRandomPos)(section.minX, section.maxX, section.minY, section.maxY);
  if (section.isPlacingVertically) {
    board.isPlacingShipVertically = true;
  } else {
    board.isPlacingShipVertically = false;
  }
  ship.cords = board.placeShip(ship, headCord);
  placeShipDOM(ship.cords, board);
};
const placeComputerShips = (shipsAr, sectionsAr, board) => {
  for (let i = 0; i < shipsAr.length; i++) {
    placeRandomShip(shipsAr[i], sectionsAr[i], board);
  }
};
const attackBoardDOM = (posDiv, attackHit) => {
  if (attackHit != null) {
    posDiv.classList.add('attacked');
    if (attackHit) {
      posDiv.classList.add('hit');
    } else {
      posDiv.classList.add('miss');
    }
  }
};
const attackAdjacentPositions = (board, pos) => {
  const adjPositions = board.getAdjacentPositions(pos);
  let adjPosDivID = null;
  let adjPosDiv = null;
  let attackHit = null;
  for (let adjPos of adjPositions) {
    adjPosDivID = `${board.side}-${adjPos}`;
    adjPosDiv = document.getElementById(adjPosDivID);
    attackHit = board.receiveAttack(adjPos);
    attackBoardDOM(adjPosDiv, attackHit);
  }
};
const displayWinnerDOM = winnerPlayer => {
  const winnerNameText = document.querySelector('#winner-name-text');
  const winnerBoardDiv = document.getElementById(winnerPlayer.playerBoard.side);
  winnerBoardDiv.classList.add('winner');
  winnerNameText.textContent = `${winnerPlayer.name} Wins!`;
};
const endGame = winnerPlayer => {
  winnerPlayer.turn = false;
  winnerPlayer.enemy.turn = false;
  displayWinnerDOM(winnerPlayer);
};
const sinkShipDOM = (player, enemyPlayer, ship) => {
  for (let i = 0; i < ship.cords.length; i++) {
    attackAdjacentPositions(enemyPlayer.playerBoard, ship.cords[i]);
  }
  if (enemyPlayer.playerBoard.gameIsOver()) {
    endGame(player);
  }
};
const attackPlayerBoard = (posDiv, player, pos) => {
  const attackHit = player.attackPos(pos);
  const enemyPlayer = player.enemy;
  attackBoardDOM(posDiv, attackHit);
  if (attackHit) {
    const ship = enemyPlayer.playerBoard.getShip(pos);
    if (ship.hasSunk()) {
      sinkShipDOM(player, enemyPlayer, ship);
      updateShipCountDOM(enemyPlayer.playerBoard);
    }
  }
};
const attackRandomPos = player => {
  const randomAttackPos = player.getRandomAttackPos();
  const enemySide = player.enemy.playerBoard.side;
  const attackPosDiv = document.querySelector(`#${enemySide}-${randomAttackPos}`);
  attackPlayerBoard(attackPosDiv, player, randomAttackPos);
};


/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player),
/* harmony export */   assignPlayerEnemies: () => (/* binding */ assignPlayerEnemies),
/* harmony export */   initializeComputerPlayer: () => (/* binding */ initializeComputerPlayer),
/* harmony export */   initializeUserPlayer: () => (/* binding */ initializeUserPlayer),
/* harmony export */   simulateUserVsComputerTurn: () => (/* binding */ simulateUserVsComputerTurn)
/* harmony export */ });
/* harmony import */ var _page_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-dom */ "./src/modules/page-dom.js");
/* harmony import */ var _user_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-input */ "./src/modules/user-input.js");
/* harmony import */ var _computer_board_sections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computer-board-sections */ "./src/modules/computer-board-sections.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");




const Player = function () {
  let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'player';
  return {
    name: name,
    playerBoard: null,
    enemy: null,
    turn: false,
    selectedShipSize: 0,
    _switchTurn() {
      this.turn = false;
      this.enemy.turn = true;
    },
    attackPos(cord) {
      if (!this.turn) {
        return null;
      }
      let attackHit = this.enemy.playerBoard.receiveAttack(cord);
      if (attackHit == false) {
        this._switchTurn();
      }
      return attackHit;
    },
    getRandomAttackPos() {
      const availableAttacksLength = this.enemy.playerBoard.availableAttacks.length;
      const randomIndex = Math.floor(Math.random() * availableAttacksLength);
      return this.enemy.playerBoard.availableAttacks[randomIndex];
    }
  };
};
const assignPlayerEnemies = (leftPlayer, rightPlayer) => {
  leftPlayer.enemy = rightPlayer;
  rightPlayer.enemy = leftPlayer;
};
const initializeUserPlayer = (player, shipsAr) => {
  (0,_page_dom__WEBPACK_IMPORTED_MODULE_0__.addShipSelectionsDOM)(player, shipsAr);
  (0,_user_input__WEBPACK_IMPORTED_MODULE_1__.addBoardPlaceShipListeners)(player, shipsAr);
  (0,_user_input__WEBPACK_IMPORTED_MODULE_1__.addClickTogglePlaceVertical)(player.playerBoard);
};
const initializeComputerPlayer = (shipsAr, computerPlayer) => {
  const computerBoard = computerPlayer.playerBoard;
  const shuffledShipsAr = (0,_ship__WEBPACK_IMPORTED_MODULE_3__.shuffleShipsAr)(shipsAr);
  const boardSectionsAr = (0,_computer_board_sections__WEBPACK_IMPORTED_MODULE_2__.getBoardSectionsAr)(shuffledShipsAr, computerBoard);
  (0,_page_dom__WEBPACK_IMPORTED_MODULE_0__.placeComputerShips)(shuffledShipsAr, boardSectionsAr, computerBoard);
};
const simulateUserAttackComputer = (posDiv, userPlayer, pos) => {
  (0,_page_dom__WEBPACK_IMPORTED_MODULE_0__.attackPlayerBoard)(posDiv, userPlayer, pos);
};
const simulateComputerAttacks = computerPlayer => {
  setTimeout(() => {
    (0,_page_dom__WEBPACK_IMPORTED_MODULE_0__.attackRandomPos)(computerPlayer);
    if (computerPlayer.turn) {
      simulateComputerAttacks(computerPlayer);
    }
  }, 1000);
};
const simulateUserVsComputerTurn = (posDiv, userPlayer, pos) => {
  const computerPlayer = userPlayer.enemy;
  simulateUserAttackComputer(posDiv, userPlayer, pos);
  if (computerPlayer.turn) {
    simulateComputerAttacks(computerPlayer);
  }
};


/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship),
/* harmony export */   getShipsAr: () => (/* binding */ getShipsAr),
/* harmony export */   placePlayerShip: () => (/* binding */ placePlayerShip),
/* harmony export */   shuffleShipsAr: () => (/* binding */ shuffleShipsAr)
/* harmony export */ });
/* harmony import */ var _page_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-dom */ "./src/modules/page-dom.js");
/* harmony import */ var _user_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-input */ "./src/modules/user-input.js");


const Ship = shipSize => {
  return {
    shipSize: shipSize,
    hits: 0,
    cords: [],
    hit() {
      this.hits++;
    },
    hasSunk() {
      return this.hits >= this.shipSize;
    }
  };
};
const placePlayerShip = (player, headCord) => {
  const board = player.playerBoard;
  const playerShip = Ship(player.selectedShipSize);
  playerShip.cords = board.placeShip(playerShip, headCord);
  if (playerShip.cords) {
    (0,_page_dom__WEBPACK_IMPORTED_MODULE_0__.placeShipDOM)(playerShip.cords, board);
    (0,_user_input__WEBPACK_IMPORTED_MODULE_1__.removeClickShipSelection)();
    player.selectedShipSize = null;
  }
};
const getShipsAr = boardSize => {
  const shipCount = Math.floor(boardSize / 2.5);
  let shipsAr = [];
  let shipSizesAr = [1, 2, 3, 4];
  let newShip = null;
  for (let i = 0; i < shipCount; i++) {
    newShip = Ship(shipSizesAr[i]);
    shipsAr.push(newShip);
    shipSizesAr.push(shipSizesAr[i]);
  }
  return shipsAr;
};
const shuffleShipsAr = shipsAr => {
  let shuffledShipsAr = [];
  let randomIndex = null;
  while (shipsAr.length > 0) {
    randomIndex = Math.floor(Math.random() * shipsAr.length);
    shuffledShipsAr.push(shipsAr[randomIndex]);
    shipsAr.splice(randomIndex, 1);
  }
  return shuffledShipsAr;
};


/***/ }),

/***/ "./src/modules/user-input.js":
/*!***********************************!*\
  !*** ./src/modules/user-input.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addBoardAttackListeners: () => (/* binding */ addBoardAttackListeners),
/* harmony export */   addBoardPlaceShipListeners: () => (/* binding */ addBoardPlaceShipListeners),
/* harmony export */   addClickShipSelection: () => (/* binding */ addClickShipSelection),
/* harmony export */   addClickTogglePlaceVertical: () => (/* binding */ addClickTogglePlaceVertical),
/* harmony export */   removeClickShipSelection: () => (/* binding */ removeClickShipSelection)
/* harmony export */ });
/* harmony import */ var _page_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-dom */ "./src/modules/page-dom.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attributes */ "./src/modules/attributes.js");
/* harmony import */ var _game_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game-manager */ "./src/modules/game-manager.js");





const addPosClickAttack = (posDiv, player, pos) => {
  posDiv.addEventListener('click', () => {
    (0,_player__WEBPACK_IMPORTED_MODULE_1__.simulateUserVsComputerTurn)(posDiv, player, pos);
  });
};
const addBoardAttackListeners = player => {
  const board = player.playerBoard;
  const boardSideID = player.enemy.playerBoard.side;
  let pos = [];
  let posDiv = null;
  for (let y = board.boardSize; y >= 1; y--) {
    for (let x = 1; x <= board.boardSize; x++) {
      pos = `${x}_${y}`;
      posDiv = document.querySelector(`#${boardSideID}-${pos}`);
      addPosClickAttack(posDiv, player, pos);
    }
  }
};
const addClickTogglePlaceVertical = board => {
  const placeVertButton = document.querySelector('.toggle-vertical-placement button');
  placeVertButton.addEventListener('click', () => {
    if (board.isPlacingShipVertically) {
      board.isPlacingShipVertically = false;
      (0,_page_dom__WEBPACK_IMPORTED_MODULE_0__.togglePlaceVertButtonDisplay)(placeVertButton, 'Horizontal');
    } else {
      board.isPlacingShipVertically = true;
      (0,_page_dom__WEBPACK_IMPORTED_MODULE_0__.togglePlaceVertButtonDisplay)(placeVertButton, 'Vertical');
    }
  });
};
const addClickShipSelection = (shipSelectionDiv, player, shipSize) => {
  shipSelectionDiv.addEventListener('click', () => {
    player.selectedShipSize = shipSize;
    (0,_attributes__WEBPACK_IMPORTED_MODULE_3__.setActiveShipSelectionClass)(shipSelectionDiv);
  });
};
const removeClickShipSelection = () => {
  const oldSelectedDiv = document.querySelector('.ship-selections .selected');
  if (oldSelectedDiv) {
    oldSelectedDiv.classList.remove('selected');
    oldSelectedDiv.remove();
  }
};
const userShipsArePlaced = (shipsAr, playerBoard) => {
  return playerBoard.shipsRemaining >= shipsAr.length;
};
const addPosClickPlaceShip = (posDiv, player, pos, shipsAr) => {
  posDiv.addEventListener('click', () => {
    (0,_ship__WEBPACK_IMPORTED_MODULE_2__.placePlayerShip)(player, pos);
    if (userShipsArePlaced(shipsAr, player.playerBoard)) {
      addStartGameClickListener(player, player.enemy, shipsAr);
    }
    ;
  });
};
const addBoardPlaceShipListeners = (player, shipsAr) => {
  const board = player.playerBoard;
  const boardSideID = board.side;
  let pos = [];
  let posDiv = null;
  for (let y = board.boardSize; y >= 1; y--) {
    for (let x = 1; x <= board.boardSize; x++) {
      pos = `${x}_${y}`;
      posDiv = document.querySelector(`#${boardSideID}-${pos}`);
      addPosClickPlaceShip(posDiv, player, pos, shipsAr);
    }
  }
};
const addStartGameClickListener = (userPlayer, computerPlayer, shipsAr) => {
  const startGameButton = document.querySelector('#start-game-button button');
  (0,_page_dom__WEBPACK_IMPORTED_MODULE_0__.activateStartButtonDOM)();
  startGameButton.addEventListener('click', () => {
    (0,_game_manager__WEBPACK_IMPORTED_MODULE_4__.initializeGameAgainstComputer)(userPlayer, computerPlayer, shipsAr);
    (0,_page_dom__WEBPACK_IMPORTED_MODULE_0__.hideStartButtonDOM)();
    (0,_page_dom__WEBPACK_IMPORTED_MODULE_0__.hideShipMenuDOM)();
  });
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/content.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/content.css ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#content {
    background-color: rgb(42, 68, 237);
    display: grid;
    grid-template-rows: 1fr 15fr;
}

#content-top {
    display: grid;
    place-content: center;
}

#winner-name-display {
    position: relative;
    height: 10%;
    font-size: 2rem;
    font-weight: 900;
    font-style: italic;
    color: rgb(0, 255, 60);
}

/* Start Game Button */

#start-game-button button {
    height: 2em;
    width: 10em;
    font-weight: 700;
    border: 1px solid black;
    border-radius: 1em;
    border-width: 2px;
}

#start-game-button button.inactive {
    cursor: not-allowed;
    background-color: rgba(255, 47, 47, 0.214);
}

#start-game-button button.active {
    cursor: pointer;
    background-color: rgb(56, 211, 0);
}

#start-game-button button.active:hover {
    color: rgb(13, 0, 255);
    font-weight: 900;
    background-color: rgb(136, 255, 0);
    border: 1px dashed black;
}

#start-game-button.invisible {
    display: none;
}

/* Ship Menu */

.ship-menu {
    display: grid;
    grid-template-rows: 1fr 4fr;
    border: 0.5em double rgba(0, 0, 0, 0.514);
    border-radius: 0.5em;
    padding: 0.5em;
    height: 12em;
    margin: 0 5% 0 5%;
}

.ship-menu.inactive {
    display: none;
}

.ship-menu-top {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr
}

.ship-menu-title {
    justify-self: center;
}

.toggle-vertical-placement {
    justify-self: start;
}

.toggle-vertical-placement button {
    cursor: pointer;
    border-radius: 3em;
    padding: 0.5em;
    font-size: 0.8em;
    width: 7em;
    height: 4em;
}

.toggle-vertical-placement button span {
    font-weight: 700;
}

.toggle-vertical-placement button.vertical {
    background-color: rgb(64, 255, 0)
}

.toggle-vertical-placement button.horizontal {
    background-color: rgb(217, 255, 0)
}

.ship-menu-title {
    justify-self: center;
}

.ship-selections {
    display: grid;
    justify-self: center;
    margin-top: 3%;
    place-content: center;
    gap: 0.25em;
}

.ship-selection {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    cursor: pointer;
    border: 2px solid black
}

.ship-selection:hover {
    font-weight: bold;
    background-color: rgba(0, 255, 0, 0.759);
}

.ship-selection.selected {
    font-weight: bold;
    background-color: rgb(0, 255, 0);
}

/* Board container */

#board-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1em;
}

#left-board-container,
#right-board-container {
    display: grid;
    grid-template-rows: 1fr 3fr;
}

.board {
    grid-row-start: 2;
    display: grid;
    grid-template-rows: 1fr 5fr;
    border: 4px solid black;
    margin: 5%;
    height: 40em;
}

.board.winner {
    border: 4px solid rgb(0, 255, 60);
}

/* Board top */

.board-top {
    border-bottom: 3px groove black;
    display: grid;
    grid-template-rows: 1fr 1fr;
    place-content: center;
    padding: 1em;
    font-size: 1.25em;
}

.player-name {
    font-style: italic;
    padding: .2em;
}

.stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: .2em;
    gap: 1.5em;
}

.board.winner .board-top {
    border-bottom: 3px solid rgb(0, 255, 60);
    color: rgb(0, 255, 60);
}


/* Board positions */

.board-positions {
    display: grid;
}

.board-pos {
    border: 1px solid black;
}

#right-board .board-pos {
    cursor: crosshair;
}

#right-board .board-pos.attacked {
    cursor: not-allowed;
}

#right-board .board-pos:hover {
    background-color: rgba(0, 0, 0, .7);
}

#right-board .board-pos.attacked.hit {
    background-color: rgb(89, 255, 0);
}

#left-board .board-pos.attacked.hit {
    background-color: rgb(32 35 2);
}

#right-board .board-pos.attacked.miss,
#left-board .board-pos.attacked.miss {
    background-color: rgb(95, 5, 5);
}

#left-board .board-pos.taken {
    background-color: rgba(89, 255, 0, 0.5);
}

.board.winner .board-pos {
    border: 1px solid rgb(0, 255, 60);
}`, "",{"version":3,"sources":["webpack://./src/styles/content.css"],"names":[],"mappings":"AAAA;IACI,kCAAkC;IAClC,aAAa;IACb,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,qBAAqB;AACzB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,eAAe;IACf,gBAAgB;IAChB,kBAAkB;IAClB,sBAAsB;AAC1B;;AAEA,sBAAsB;;AAEtB;IACI,WAAW;IACX,WAAW;IACX,gBAAgB;IAChB,uBAAuB;IACvB,kBAAkB;IAClB,iBAAiB;AACrB;;AAEA;IACI,mBAAmB;IACnB,0CAA0C;AAC9C;;AAEA;IACI,eAAe;IACf,iCAAiC;AACrC;;AAEA;IACI,sBAAsB;IACtB,gBAAgB;IAChB,kCAAkC;IAClC,wBAAwB;AAC5B;;AAEA;IACI,aAAa;AACjB;;AAEA,cAAc;;AAEd;IACI,aAAa;IACb,2BAA2B;IAC3B,yCAAyC;IACzC,oBAAoB;IACpB,cAAc;IACd,YAAY;IACZ,iBAAiB;AACrB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;IACb;AACJ;;AAEA;IACI,oBAAoB;AACxB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,kBAAkB;IAClB,cAAc;IACd,gBAAgB;IAChB,UAAU;IACV,WAAW;AACf;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI,oBAAoB;AACxB;;AAEA;IACI,aAAa;IACb,oBAAoB;IACpB,cAAc;IACd,qBAAqB;IACrB,WAAW;AACf;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,UAAU;IACV,WAAW;IACX,kBAAkB;IAClB,eAAe;IACf;AACJ;;AAEA;IACI,iBAAiB;IACjB,wCAAwC;AAC5C;;AAEA;IACI,iBAAiB;IACjB,gCAAgC;AACpC;;AAEA,oBAAoB;;AAEpB;IACI,aAAa;IACb,8BAA8B;IAC9B,YAAY;AAChB;;AAEA;;IAEI,aAAa;IACb,2BAA2B;AAC/B;;AAEA;IACI,iBAAiB;IACjB,aAAa;IACb,2BAA2B;IAC3B,uBAAuB;IACvB,UAAU;IACV,YAAY;AAChB;;AAEA;IACI,iCAAiC;AACrC;;AAEA,cAAc;;AAEd;IACI,+BAA+B;IAC/B,aAAa;IACb,2BAA2B;IAC3B,qBAAqB;IACrB,YAAY;IACZ,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;IAClB,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,aAAa;IACb,UAAU;AACd;;AAEA;IACI,wCAAwC;IACxC,sBAAsB;AAC1B;;;AAGA,oBAAoB;;AAEpB;IACI,aAAa;AACjB;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,mCAAmC;AACvC;;AAEA;IACI,iCAAiC;AACrC;;AAEA;IACI,8BAA8B;AAClC;;AAEA;;IAEI,+BAA+B;AACnC;;AAEA;IACI,uCAAuC;AAC3C;;AAEA;IACI,iCAAiC;AACrC","sourcesContent":["#content {\n    background-color: rgb(42, 68, 237);\n    display: grid;\n    grid-template-rows: 1fr 15fr;\n}\n\n#content-top {\n    display: grid;\n    place-content: center;\n}\n\n#winner-name-display {\n    position: relative;\n    height: 10%;\n    font-size: 2rem;\n    font-weight: 900;\n    font-style: italic;\n    color: rgb(0, 255, 60);\n}\n\n/* Start Game Button */\n\n#start-game-button button {\n    height: 2em;\n    width: 10em;\n    font-weight: 700;\n    border: 1px solid black;\n    border-radius: 1em;\n    border-width: 2px;\n}\n\n#start-game-button button.inactive {\n    cursor: not-allowed;\n    background-color: rgba(255, 47, 47, 0.214);\n}\n\n#start-game-button button.active {\n    cursor: pointer;\n    background-color: rgb(56, 211, 0);\n}\n\n#start-game-button button.active:hover {\n    color: rgb(13, 0, 255);\n    font-weight: 900;\n    background-color: rgb(136, 255, 0);\n    border: 1px dashed black;\n}\n\n#start-game-button.invisible {\n    display: none;\n}\n\n/* Ship Menu */\n\n.ship-menu {\n    display: grid;\n    grid-template-rows: 1fr 4fr;\n    border: 0.5em double rgba(0, 0, 0, 0.514);\n    border-radius: 0.5em;\n    padding: 0.5em;\n    height: 12em;\n    margin: 0 5% 0 5%;\n}\n\n.ship-menu.inactive {\n    display: none;\n}\n\n.ship-menu-top {\n    display: grid;\n    grid-template-columns: 1fr 4fr 1fr\n}\n\n.ship-menu-title {\n    justify-self: center;\n}\n\n.toggle-vertical-placement {\n    justify-self: start;\n}\n\n.toggle-vertical-placement button {\n    cursor: pointer;\n    border-radius: 3em;\n    padding: 0.5em;\n    font-size: 0.8em;\n    width: 7em;\n    height: 4em;\n}\n\n.toggle-vertical-placement button span {\n    font-weight: 700;\n}\n\n.toggle-vertical-placement button.vertical {\n    background-color: rgb(64, 255, 0)\n}\n\n.toggle-vertical-placement button.horizontal {\n    background-color: rgb(217, 255, 0)\n}\n\n.ship-menu-title {\n    justify-self: center;\n}\n\n.ship-selections {\n    display: grid;\n    justify-self: center;\n    margin-top: 3%;\n    place-content: center;\n    gap: 0.25em;\n}\n\n.ship-selection {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 2em;\n    height: 2em;\n    border-radius: 1em;\n    cursor: pointer;\n    border: 2px solid black\n}\n\n.ship-selection:hover {\n    font-weight: bold;\n    background-color: rgba(0, 255, 0, 0.759);\n}\n\n.ship-selection.selected {\n    font-weight: bold;\n    background-color: rgb(0, 255, 0);\n}\n\n/* Board container */\n\n#board-container {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    padding: 1em;\n}\n\n#left-board-container,\n#right-board-container {\n    display: grid;\n    grid-template-rows: 1fr 3fr;\n}\n\n.board {\n    grid-row-start: 2;\n    display: grid;\n    grid-template-rows: 1fr 5fr;\n    border: 4px solid black;\n    margin: 5%;\n    height: 40em;\n}\n\n.board.winner {\n    border: 4px solid rgb(0, 255, 60);\n}\n\n/* Board top */\n\n.board-top {\n    border-bottom: 3px groove black;\n    display: grid;\n    grid-template-rows: 1fr 1fr;\n    place-content: center;\n    padding: 1em;\n    font-size: 1.25em;\n}\n\n.player-name {\n    font-style: italic;\n    padding: .2em;\n}\n\n.stats {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    padding: .2em;\n    gap: 1.5em;\n}\n\n.board.winner .board-top {\n    border-bottom: 3px solid rgb(0, 255, 60);\n    color: rgb(0, 255, 60);\n}\n\n\n/* Board positions */\n\n.board-positions {\n    display: grid;\n}\n\n.board-pos {\n    border: 1px solid black;\n}\n\n#right-board .board-pos {\n    cursor: crosshair;\n}\n\n#right-board .board-pos.attacked {\n    cursor: not-allowed;\n}\n\n#right-board .board-pos:hover {\n    background-color: rgba(0, 0, 0, .7);\n}\n\n#right-board .board-pos.attacked.hit {\n    background-color: rgb(89, 255, 0);\n}\n\n#left-board .board-pos.attacked.hit {\n    background-color: rgb(32 35 2);\n}\n\n#right-board .board-pos.attacked.miss,\n#left-board .board-pos.attacked.miss {\n    background-color: rgb(95, 5, 5);\n}\n\n#left-board .board-pos.taken {\n    background-color: rgba(89, 255, 0, 0.5);\n}\n\n.board.winner .board-pos {\n    border: 1px solid rgb(0, 255, 60);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/index.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif
}

#container {
    display: grid;
    grid-template-rows: 2fr 14fr 1fr;
    /* height: 100%; */
}

#header {
    background-color: rgb(194, 178, 128);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    padding: 1%;
}

#footer {
    background-color: rgb(194, 178, 128);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    padding: 0.8%;
}`, "",{"version":3,"sources":["webpack://./src/styles/index.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT;AACJ;;AAEA;IACI,aAAa;IACb,gCAAgC;IAChC,kBAAkB;AACtB;;AAEA;IACI,oCAAoC;IACpC,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,gBAAgB;IAChB,WAAW;AACf;;AAEA;IACI,oCAAoC;IACpC,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,gBAAgB;IAChB,aAAa;AACjB","sourcesContent":["* {\n    margin: 0;\n    font-family: Arial, Helvetica, sans-serif\n}\n\n#container {\n    display: grid;\n    grid-template-rows: 2fr 14fr 1fr;\n    /* height: 100%; */\n}\n\n#header {\n    background-color: rgb(194, 178, 128);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 1.2em;\n    padding: 1%;\n}\n\n#footer {\n    background-color: rgb(194, 178, 128);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 1.2em;\n    padding: 0.8%;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/content.css":
/*!********************************!*\
  !*** ./src/styles/content.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_content_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./content.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/content.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_content_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_content_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_content_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_content_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");
/* harmony import */ var _styles_content_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/content.css */ "./src/styles/content.css");
/* harmony import */ var _modules_game_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/game-manager */ "./src/modules/game-manager.js");



const renderGame = () => {
  (0,_modules_game_manager__WEBPACK_IMPORTED_MODULE_2__.initializeGame)();
};
renderGame();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map