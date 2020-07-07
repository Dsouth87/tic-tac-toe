const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]

const availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const corners = [0, 2, 6, 8]

let playerCharacter
let computerCharacter

const onClick = e => {
  if (e.target.innerHTML === 'X') {
    playerCharacter = 'X'
    computerCharacter = 'O'
  } else {
    playerCharacter = 'O'
    computerCharacter = 'X'
  }

  document.querySelector('.character-selection').className =
    'character-selection dissapear'
  setTimeout(() => {
    firstMove()
  }, 1000)
}

const onMove = e => {
  disableButtons()

  position = e.target.classList[0][4]

  markPlayerMove(position)
  removeMove(parseInt(position))
  e.target.innerHTML = playerCharacter
  if (checkForWin('user')) {
    return
  }
  if (checkForCatsGame()) {
    return
  }

  setTimeout(() => {
    computerHardMove()
    enableButtons()
  }, 1000)

  console.log('available moves: ', availableMoves)
  console.log('gameboard: ', board)
}

const computerEasyMove = () => {
  const position =
    availableMoves[Math.floor(Math.random() * availableMoves.length)]

  document.querySelector(
    `.box-${position}`
  ).firstChild.innerHTML = computerCharacter
  markComputerMove(position)
  removeMove(position)
  checkForWin('computer')
  checkForCatsGame()
}

const computerMediumMove = () => {
  let winningMove = findWin()
  let blockingMove = findBlock()

  if (winningMove) {
    console.log('winning move: ', winningMove)
    markComputerMove(winningMove)
    removeMove(winningMove)
    checkForWin('computer')
    console.log('computer wins!')
    return
  } else if (blockingMove | (String(blockingMove) === '0')) {
    console.log('blocking move: ', blockingMove)
    markComputerMove(blockingMove)
    removeMove(blockingMove)
    checkForWin('computer')
    console.log('computer blocks!')
    return
  } else {
    computerEasyMove()
  }
}

const findFirstMove = () => {
  const index = board.indexOf(1)
  if (index === 4) {
    const move = corners[Math.floor(Math.random() * 4)]
    return move
  } else {
    return 4
  }
}

const computerHardMove = () => {
  if (availableMoves.length === 8) {
    const firstMove = findFirstMove()
    markComputerMove(firstMove)
    removeMove(firstMove)
  } else {
    computerMediumMove()
  }
}

const findBlock = () => {
  for (let i = 0; i < winningCombos.length; i++) {
    if (
      board[winningCombos[i][0]] +
        board[winningCombos[i][1]] +
        board[winningCombos[i][2]] ===
      2
    ) {
      console.log('combo to block: ', winningCombos[i])
      for (let j = 0; j < 3; j++) {
        if (board[winningCombos[i][j]] === 0) {
          return winningCombos[i][j]
        }
      }
      break
    }
  }
  return false
}

const findWin = () => {
  for (let i = 0; i < winningCombos.length; i++) {
    if (
      board[winningCombos[i][0]] +
        board[winningCombos[i][1]] +
        board[winningCombos[i][2]] ===
      -2
    ) {
      console.log('finding win: ', winningCombos[i])
      for (let j = 0; j < 3; j++) {
        console.log('foo: ', board[winningCombos[i][j]])
        if (board[winningCombos[i][j]] === 0) {
          console.log('winning position: ', winningCombos[i][j])
          document.querySelector(
            `.box-${winningCombos[i][j]}`
          ).firstChild.innerHTML = computerCharacter
          console.log(
            'board[winningCombos[i][j]]: ',
            board[winningCombos[i][j]]
          )
          console.log('winningCombos[i][j]: ', winningCombos[i][j])

          return winningCombos[i][j]
        }
      }
      break
    }
  }
  return false
}

const markPlayerMove = position => {
  board[position] = 1
}

const markComputerMove = position => {
  board[position] = -1
  document.querySelector(
    `.box-${position}`
  ).firstChild.innerHTML = computerCharacter
}

const removeMove = position => {
  const index = availableMoves.indexOf(position)

  if (index > -1) {
    availableMoves.splice(index, 1)
  }
}

const checkForCatsGame = () => {
  if (availableMoves.length === 0) {
    document.querySelector('.announcements h2').innerHTML = "Cat's Game!"
    document.querySelectorAll('.box').forEach(box => {
      if (box.querySelector('button').innerHTML === 'X') {
        box.classList.add('X-win')
      } else {
        box.classList.add('O-win')
      }
    })
    document.querySelector('.play-again-btn').style.display = 'block'
    document.querySelector('.play-again-btn').classList.add('btn-fade-in')
    return true
  } else {
    return false
  }
}

const checkForWin = player => {
  var numToWin

  if (player === 'user') {
    numToWin = 3
  } else if (player === 'computer') {
    numToWin = -3
  }

  for (let i = 0; i < winningCombos.length; i++) {
    if (
      board[winningCombos[i][0]] +
        board[winningCombos[i][1]] +
        board[winningCombos[i][2]] ===
      numToWin
    ) {
      Win(
        [winningCombos[i][0], winningCombos[i][1], winningCombos[i][2]],
        player
      )
      return true
    }
  }
  return false
}

const disableButton = position => {
  document.querySelector(`btn-${position}`).disabled = 'disabled'
}

const enableButton = position => {
  document.querySelector(`btn-${position}`).disabled = false
}

const Win = (winningPositions, player) => {
  var playerChar
  if (player == 'user') {
    playerChar = playerCharacter
  } else if (player == 'computer') {
    playerChar = computerCharacter
  }
  for (let i = 0; i < winningPositions.length; i++) {
    document
      .querySelector(`.box-${winningPositions[i]}`)
      .classList.add(`${playerChar}-win`)
  }
  // document.querySelectorAll('.box a').forEach(button => {
  //   button.disabled = true
  // })
  document.querySelector('.announcements h2').innerHTML = `${playerChar} Wins!`
  document.querySelector('.play-again-btn').style.display = 'block'
  document.querySelector('.play-again-btn').classList.add('btn-fade-in')
  return
}

const onClickPlayAgain = () => {
  location.reload()
  return false
}

document
  .querySelector('.character-selection')
  .addEventListener('click', onClick)

document
  .querySelectorAll('button')
  .forEach(button => button.addEventListener('click', onMove))

document
  .querySelector('.play-again-btn')
  .addEventListener('click', onClickPlayAgain)

const firstMove = () => {
  if (Math.floor(Math.random() * 10) % 2 === 0) {
    document.querySelector('.announcements h2').innerHTML =
      'Player 1 goes first'
  } else {
    document.querySelector('.announcements h2').innerHTML =
      'Computer goes first'
  }
}

//TODO: cats game if you win on last move

// let characters = document.querySelectorAll('.character-selection .character')
// console.log(characters)
