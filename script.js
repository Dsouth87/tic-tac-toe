let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]

let availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8]

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
const sides = [1, 3, 5, 7]
let win = false
let difficulty
let playerCharacter
let computerCharacter
let blockingMove

const onClickCharacter = e => {
  if (e.target.innerHTML.trim() === 'X') {
    playerCharacter = 'X'
    computerCharacter = 'O'
  } else {
    playerCharacter = 'O'
    computerCharacter = 'X'
  }

  document.querySelector('.pre-game-options').classList.add('dissapear')

  setTimeout(() => {
    firstMove()
  }, 1000)
}

const onMove = e => {
  disableAllButtons()

  position = e.target.classList[1][4]

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
    switch (difficulty) {
      case 'Easy':
        computerEasyMove()

        break
      case 'Medium':
        computerMediumMove()

        break
      case 'Hard':
        computerHardMove()

        break
      default:
        return
    }

    if (!win) {
      enableButtons()
    }
  }, 1000)
}

const computerEasyMove = () => {
  const position =
    availableMoves[Math.floor(Math.random() * availableMoves.length)]
  document.querySelector(`.btn-${position}`).innerHTML = computerCharacter
  markComputerMove(position)
  removeMove(position)

  checkForWin('computer')
  checkForCatsGame()
}

const computerMediumMove = () => {
  let winningMove = findWin()
  blockingMove = findBlock()

  if (winningMove || String(winningMove) === '0') {
    markComputerMove(winningMove)
    removeMove(winningMove)
    checkForWin('computer')

    return
  } else if (blockingMove || String(blockingMove) === '0') {
    markComputerMove(blockingMove)
    removeMove(blockingMove)
    checkForWin('computer')

    return
  } else {
    computerEasyMove()
  }
}

const computerHardMove = () => {
  if (availableMoves.length === 8) {
    const firstMove = findFirstMove()
    markComputerMove(firstMove)
    removeMove(firstMove)
  } else if (availableMoves.length === 6) {
    blockingMove = findBlock()

    if (blockingMove || String(blockingMove) === '0') {
      computerMediumMove()
      return
    }
    const secondMove = findSecondMove()
    if (secondMove || secondMove === 0) {
      markComputerMove(secondMove)
      removeMove(secondMove)
    } else {
      computerMediumMove()
    }
  } else {
    computerMediumMove()
  }
}

const findFirstMove = () => {
  const index = board.indexOf(1)
  if (index === 4) {
    return corners[Math.floor(Math.random() * 4)]
  } else {
    return 4
  }
}

const findSecondMove = () => {
  if (board[0] + board[8] === 2 || board[2] + board[6] === 2) {
    return sides[Math.floor(Math.random() * 4)]
  } else if (board[4] + board[0] === 2 || board[4] + board[8] === 2) {
    return [2, 6][Math.floor(Math.random() * 2)]
  } else if (board[4] + board[2] === 2 || board[4] + board[6] === 2) {
    return [0, 8][Math.floor(Math.random() * 2)]
  } else if (board[0] + board[7] === 2) {
    return [3, 6][Math.floor(Math.random() * 2)]
  } else if (board[0] + board[5] === 2) {
    return [1, 2][Math.floor(Math.random() * 2)]
  } else if (board[2] + board[3] === 2) {
    return [0, 1][Math.floor(Math.random() * 2)]
  } else if (board[2] + board[7] === 2) {
    return [5, 8][Math.floor(Math.random() * 2)]
  } else if (board[8] + board[3] === 2) {
    return [6, 7][Math.floor(Math.random() * 2)]
  } else if (board[8] + board[1] === 2) {
    return [2, 5][Math.floor(Math.random() * 2)]
  } else if (board[6] + board[1] === 2) {
    return [0, 3][Math.floor(Math.random() * 2)]
  } else if (board[6] + board[5] === 2) {
    return [7, 8][Math.floor(Math.random() * 2)]
  } else {
    return false
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
      for (let j = 0; j < 3; j++) {
        if (board[winningCombos[i][j]] === 0) {
          document.querySelector(
            `.btn-${winningCombos[i][j]}`
          ).innerHTML = computerCharacter

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
  document.querySelector(`.btn-${position}`).innerHTML = computerCharacter
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

const disableAllButtons = () => {
  document.querySelectorAll('button').forEach(button => {
    button.disabled = 'disabled'
  })
}

const enableAllButtons = () => {
  document.querySelectorAll('button').forEach(button => {
    button.disabled = false
  })
}

const enableButtons = () => {
  availableMoves.forEach(position => {
    document.querySelector(`.btn-${position}`).disabled = false
  })
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

  win = true
  disableAllButtons()
  document.querySelector('.announcements h2').innerHTML = `${playerChar} Wins!`
  document.querySelector('.play-again-btn').style.display = 'block'
  document.querySelector('.play-again-btn').classList.add('btn-fade-in')
  return
}

const onClickBack = () => {
  location.reload()
  return false
}

const onClickPlayAgain = () => {
  document.querySelectorAll('button').forEach(button => {
    button.innerHTML = ''
  })
  document.querySelector('.announcements h2').innerHTML = ''
  availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  document.querySelector('.play-again-btn').style.display = 'none'
  document.querySelector('.play-again-btn').classList.remove('btn-fade-in')
  win = false
  document.querySelectorAll('.box').forEach(box => {
    let position = box.classList[1][4]
    box.className = `box box-${position}`
  })
  enableAllButtons()
}

const onClickDifficulty = e => {
  difficulty = e.target.innerHTML
  e.target.classList.add('selected')
  switch (e.target.innerHTML) {
    case 'Hard':
      e.target.style.color = 'rgba(255, 0, 0, 0.666)'
      document.querySelector('.easy').style.color = '#222'
      document.querySelector('.medium').style.color = '#222'
      break
    case 'Medium':
      e.target.style.color = 'rgba(255, 255, 0, 0.927)'
      document.querySelector('.hard').style.color = '#222'
      document.querySelector('.easy').style.color = '#222'
      break

    case 'Easy':
      e.target.style.color = 'rgba(0, 128, 0, 0.892)'
      document.querySelector('.hard').style.color = '#222'
      document.querySelector('.medium').style.color = '#222'
      break
    default:
      return
  }
  document.querySelector('.difficulty-selection').classList.add('de-emphasize')
  document.querySelectorAll('.difficulty-level').forEach(difficulty => {
    if (!difficulty.classList.contains('selected')) {
      difficulty.classList.add('de-emphasize')
    }
  })
  document.querySelectorAll('.character').forEach(character => {
    character.disabled = false
    character.classList.remove('de-emphasize')
  })

  document
    .querySelector('.character-selection')
    .classList.remove('de-emphasize')
}
document
  .querySelector('.character-selection')
  .addEventListener('click', onClickCharacter)

document
  .querySelector('.difficulty-levels')
  .addEventListener('click', onClickDifficulty)

document
  .querySelectorAll('.game-tile')
  .forEach(button => button.addEventListener('click', onMove))

document
  .querySelector('.play-again-btn')
  .addEventListener('click', onClickPlayAgain)

document.querySelector('.back-btn').addEventListener('click', onClickBack)

const firstMove = () => {
  if (Math.floor(Math.random() * 10) % 2 === 0) {
    document.querySelector('.announcements h2').innerHTML = ''
  } else {
    document.querySelector('.announcements h2').innerHTML = ''
  }
}
