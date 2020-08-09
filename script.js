// Játék állapota
const initialStones = [
    {
      position: [0, 0], // [row, col]
      finished: false, // reached the final row
      captured: false, // captured by the opponent
      id: 'stone_light_0',
      player: 0,
      enemies : [],
      emptyFields : []
    },
    {
      position: [0, 2],
      finished: false,
      captured: false,
      id: 'stone_light_1',
      player: 0,
      enemies : [],
      emptyFields : []
    },
    {
      position: [0, 4],
      finished: false,
      captured: false,
      id: 'stone_light_2',
      player: 0,
      enemies : [],
      emptyFields : []
    },
    {
      position: [0, 6],
      finished: false,
      captured: false,
      id: 'stone_light_3',
      player: 0,
      enemies : [],
      emptyFields : []
    },
    {
      position: [1, 1],
      finished: false,
      captured: false,
      id: 'stone_light_4',
      player: 0,
      enemies : [],
      emptyFields : []
    },
    {
      position: [1, 3],
      finished: false,
      captured: false,
      id: 'stone_light_5',
      player: 0,
      enemies : [],
      emptyFields : []
    },
    {
      position: [1, 5],
      finished: false,
      captured: false,
      id: 'stone_light_6',
      player: 0,
      enemies : [],
      emptyFields : []
    },
    {
      position: [1, 7],
      finished: false,
      captured: false,
      id: 'stone_light_7',
      player: 0,
      enemies : [],
      emptyFields : []
    },
    {
      position: [2, 0],
      finished: false,
      captured: false,
      id: 'stone_light_8',
      player: 0,
      enemies : [],
      emptyFields : []
    },
    {
      position: [2, 2],
      finished: false,
      captured: false,
      id: 'stone_light_9',
      player: 0,
      enemies : [],
      emptyFields : []
    },
    {
      position: [2, 4],
      finished: false,
      captured: false,
      id: 'stone_light_10',
      player: 0,
      enemies : [],
      emptyFields : []
    },
    {
      position: [2, 6],
      finished: false,
      captured: false,
      id: 'stone_light_11',
      player: 0,
      enemies : [],
      emptyFields : []
    },
    {
      position: [5, 1],
      finished: false,
      captured: false,
      id: 'stone_dark_0',
      player: 1,
      enemies : [],
      emptyFields : []
    },
    {
      position: [5, 3],
      finished: false,
      captured: false,
      id: 'stone_dark_1',
      player: 1,
      enemies : [],
      emptyFields : []
    },
    {
      position: [5, 5],
      finished: false,
      captured: false,
      id: 'stone_dark_2',
      player: 1,
      enemies : [],
      emptyFields : []
    },
    {
      position: [5, 7],
      finished: false,
      captured: false,
      id: 'stone_dark_3',
      player: 1,
      enemies : [],
      emptyFields : []
    },
    {
      position: [6, 0],
      finished: false,
      captured: false,
      id: 'stone_dark_4',
      player: 1,
      enemies : [],
      emptyFields : []
    },
    {
      position: [6, 2],
      finished: false,
      captured: false,
      id: 'stone_dark_5',
      player: 1,
      enemies : [],
      emptyFields : []
    },
    {
      position: [6, 4],
      finished: false,
      captured: false,
      id: 'stone_dark_6',
      player: 1,
      enemies : [],
      emptyFields : []
    },
    {
      position: [6, 6],
      finished: false,
      captured: false,
      id: 'stone_dark_7',
      player: 1,
      enemies : [],
      emptyFields : []
    },
    {
      position: [7, 1],
      finished: false,
      captured: false,
      id: 'stone_dark_8',
      player: 1,
      enemies : [],
      emptyFields : []
    },
    {
      position: [7, 3],
      finished: false,
      captured: false,
      id: 'stone_dark_9',
      player: 1,
      enemies : [],
      emptyFields : []
    },
    {
      position: [7, 5],
      finished: false,
      captured: false,
      id: 'stone_dark_10',
      player: 1,
      enemies : [],
      emptyFields : []
    },
    {
      position: [7, 7],
      finished: false,
      captured: false,
      id: 'stone_dark_11',
      player: 1,
      enemies : [],
      emptyFields : []
    }
  ];
  
  const initialState = {
    winner: undefined,
    stones: initialStones,
    selectedStone: undefined,
    player: 0
  };
  
  const getNextState = function(state, action) {
    const { type, payload } = action;
    switch (type) {
      case 'stone.toggle':
        return {
          ...state,
          selectedStone: state.selectedStone === payload ? undefined : payload
        }
      case 'stone.move':
        return {
          ...state,
          stones: state.stones.map(stone => stone.id === state.selectedStone ? {...stone, position: payload} : stone),
          selectedStone: undefined
        }
    }
  }
  
  const drawBoard = function(state) {
    state.stones.forEach(stone => {
      const { position, captured, id } = stone;
      const [row, col] = position;
  
      const stoneEl = document.getElementById(id);
      if (captured)
        if (stone.player)
          stoneEl.setAttribute("style", `bottom: 97px; left: 576px`)
        else
          stoneEl.setAttribute("style", `bottom: 415px; left: 576px`)
      else
        stoneEl.setAttribute("style", `bottom: ${row * 64 + 12}px; left: ${col * 64 + 12}px`);
  
      if (id === state.selectedStone)
        stoneEl.classList.add('selected');
      else
        stoneEl.classList.remove('selected');
    });
  }
  
  let appState = initialState;
  
  const handleAction = function(action) {
    appState = getNextState(appState, action);
    drawBoard(appState);
    appState.stones.forEach(stone => {
      upadateEnemies(stone)
      findEmptyFields(stone)
    });
    
    player = appState.player ? "red" : "green"
    actualPlayer(player)
    isGameEnd()
  }
  
  const toggleStone = function(id) {
    if (appState.player == appState.stones.find(stone => stone.id === id && !stone.captured).player) {
      handleAction({ type: 'stone.toggle', payload: id });  
      stone = appState.stones.find(stone => stone.id == appState.selectedStone)
    }
  }
  
  const moveStone = function(row, col) {
    if (isEmpty(row, col)) {
      stone = appState.stones.find(stone => stone.id === appState.selectedStone)
      let move = canMove(stone, row, col)
      if (move) {
        difference = stone.player ? stone.position[0] - row : row - stone.position[0]
        if (difference == 2) {
          let pos = handleCapture(stone, row, col)
          // handleAction({ type: 'stone.captured', payload: [pos[0], pos[1]] });
          capturedStone = appState.stones.find(s => s.position[0] == pos[0] && s.position[1] == pos[1])
          capturedStone.captured = true
        }
        handleAction({ type: 'stone.move', payload: [row, col] });
        appState.player = !appState.player
        
      player = appState.player ? "red" : "green"
      actualPlayer(player)
      } 
    }
  }

  const handleNewGameButton = function () {
    location.reload();
  }

  let whoWon = initialState["winner"];

  const theWinnerIs = function (whoWon) {
    if (whoWon === "red"){
      return document.getElementById('anybodyWon').innerHTML = `<h1>"A piros nyert!"</h1>`;
    }
    if (whoWon === "green") {
      return document.getElementById('anybodyWon').innerHTML = `<h1>"A zöld nyert!"</h1>`;
    }
    else {
      return document.getElementById('anybodyWon').innerHTML = "Nincs nyertes!";
    }
  }

  const actualPlayer = function () {
    if (player === "red"){
      return document.getElementById('actualPlayer').innerHTML = `<h1>A piros következik!</h1>`;
    } else {
      return document.getElementById('actualPlayer').innerHTML = `<h1>A zöld következik!</h1>`;
    }
  }

  const isEmpty = function(row, col){
    return !(appState.stones.some(stone => stone.position[0] == row && stone.position[1] == col && !stone.captured))
  }

  const canMove = function(stone, row, col){
    let ret = false
    for (let i = 0; i < stone.emptyFields.length; i++) {
      if (stone.emptyFields[i][0] == row && stone.emptyFields[i][1] == col) {
        ret = true
      }
    }

    return ret;
  }

  const findEnemies = function(row, col, player){
    return appState.stones.filter(s => s.position[0] == row && s.position[1] == col && s.player != player);
  }

  const upadateEnemies = function(stone){
    newRow = stone.player ? stone.position[0] - 1 : stone.position[0] + 1
    stone.enemies = findEnemies(newRow, stone.position[1] - 1, stone.player).concat(findEnemies(newRow, stone.position[1] + 1, stone.player)) 
  }

  const findEmptyFields = function(stone){
    let newPositions = []

    newRow = stone.player ? stone.position[0] - 1 : stone.position[0] + 1
    newRow = (newRow == -1 || newRow == 8) ? -1 : newRow

    newColLeft = stone.position[1] - 1
    newColRigth = stone.position[1] + 1

    addNewPosition(newPositions, newRow, newColLeft, newColRigth)

    if (stone.enemies.length != 0) {
      enemyXY = []
      stone.enemies.forEach(element => {
        enemyXY.push(getCoordinates(element))  
      });

      enemyXY.forEach(coordinates => {
        if (coordinates[1] < stone.position[1]) {
          newColLeft = coordinates[1] - 1
        } else {
          newColLeft = coordinates[1] + 1
        }

        newRow = stone.player ? stone.position[0] - 2 : stone.position[0] + 2
        newRow = (newRow == -1 || newRow == 8) ? -1 : newRow

        addNewPosition(newPositions, newRow, newColLeft, newColRigth)
      });
    }

    stone.emptyFields = newPositions
  }

  const getCoordinates = function(stone){
    return [stone.position[0], stone.position[1]]
  }

  const addNewPosition = function(positions, newRow, newColLeft, newColRigth){
    if (newRow != -1) {
      if (newColLeft != -1) {
        if (isEmpty(newRow, newColLeft)) {
          positions.push([newRow, newColLeft]) 
        }
      }
      if(newColRigth != 8){
        if (isEmpty(newRow, newColRigth)) {
          positions.push([newRow, newColRigth]) 
        }
      }
    }
  }

  const handleCapture = function(stone, row, col){
    let x = stone.player ? row + 1 :  row - 1
    let y = stone.position[1] < col ? stone.position[1] + 1 : stone.position[1] - 1
    return [x, y]
  }

  const isGameEnd = function(){
    let dark = appState.stones.filter(s => !s.captured && s.player)
    let light = appState.stones.filter(s => !s.captured && !s.player)

    if (dark.length == 0 || light.length == 0) {
      won = dark.length == 0 ? "green" :  "red"
      theWinnerIs(won)
    }
  }