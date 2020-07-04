const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]

const availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8]

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
  position = e.target.classList[1][4]
  markPlayerMove(position)
  removeMove(parseInt(position))
  e.target.firstChild.innerHTML = playerCharacter
  if (checkForCatsGame()) {
    return
  }
  if (checkForWin('user')) {
    return
  }
  setTimeout(() => {
    computerEasyMove()
  }, 1000)
  console.log(availableMoves)
  console.log(board)
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

const markPlayerMove = position => {
  board[position] = 1
}

const markComputerMove = position => {
  board[position] = -1
}

const removeMove = position => {
  const index = availableMoves.indexOf(position)
  console.log('index: ', index)
  if (index > -1) {
    availableMoves.splice(index, 1)
  }
}

const checkForCatsGame = () => {
  if (availableMoves.length === 0) {
    document.querySelector('.announcements h2').innerHTML = "Cat's Game!"
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

  if (board[0] + board[1] + board[2] == numToWin) {
    console.log('win!')
    carryoutWin([0, 1, 2], player)
  } else if (board[3] + board[4] + board[5] == numToWin) {
    carryoutWin([3, 4, 5], player)
  } else if (board[6] + board[7] + board[8] == numToWin) {
    carryoutWin([6, 7, 8], player)
  } else if (board[0] + board[3] + board[6] == numToWin) {
    carryoutWin([0, 3, 6], player)
  } else if (board[1] + board[4] + board[7] == numToWin) {
    carryoutWin([1, 4, 7], player)
  } else if (board[2] + board[5] + board[8] == numToWin) {
    carryoutWin([2, 5, 8], player)
  } else if (board[0] + board[4] + board[8] == numToWin) {
    carryoutWin([0, 4, 8], player)
  } else if (board[2] + board[4] + board[6] == numToWin) {
    carryoutWin([2, 4, 6], player)
  } else {
    return false
  }
  return true
}

const carryoutWin = (winningPositions, player) => {
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
  return
}

document
  .querySelector('.character-selection')
  .addEventListener('click', onClick)

document
  .querySelectorAll('.box')
  .forEach(button => button.addEventListener('click', onMove))

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
