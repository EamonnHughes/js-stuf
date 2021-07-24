var coins = 100
var cardlist = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  10,
  10,
  10,
  11,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  10,
  10,
  10,
  11,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  10,
  10,
  10,
  11,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  10,
  10,
  10,
  11,
]

const loadedJson = localStorage.getItem('coins')
coins = JSON.parse(loadedJson)

var pHand = [addCard(), addCard()]
var PIsDone = false
checkAce(pHand)

aiHand = [addCard(), addCard()]
checkAce(aiHand)

function checkForDead() {
  var pVar = 0
  let array = pHand
  for (let i = 0; i < array.length; i++) {
    let arrItem = array[i]
    pVar += arrItem
  }
  if (pVar > 21) {
    coins -= 1

    doAlert('You lost')

    resetWorld()
  }
  return pVar
}

function resetWorld() {
  PIsDone = false
  const coinsJson = JSON.stringify(coins)
  localStorage.setItem('coins', coinsJson)
  setTimeout(() => window.location.reload(), 3000)
}

function doAlert(s) {
  document.getElementById('alert').innerText = s
}

function checkAce(Hand) {
  for (let i = 0; i < Hand.length; i++) {
    if (Hand[i] == 11 && HandValue(Hand) > 21) {
      Hand[i] = 1
    }
  }
}

function updateOutput() {
  const outputDiv = document.getElementById('output')
  outputDiv.innerHTML =
    pHand.map((card) => "<span class='card'>" + card + '</span>').join(' ') +
    "<span class='score'>" +
    HandValue(pHand) +
    '</span>'
}

function updateCoins() {
  const div = document.getElementById('koins')

  div.innerText = coins
}

function updateEHand() {
  var aiHand2 = aiHand.slice(1)
  aiHand2.push
  const div = document.getElementById('enemyhand')
  if (PIsDone) {
    div.innerHTML = aiHand2
      .map((card) => "<span class = 'card'>" + card + '</span>')
      .join(' ')
  } else {
    div.innerHTML = aiHand
      .map((card) => "<span class = 'card'>" + card + '</span>')
      .join(' ')
  }
}

function addCard() {
  const index = Math.floor(Math.random(1) * cardlist.length)
  return cardlist.splice(index, 1)[0]
}

function doHit() {
  pHand.push(addCard())
  checkAce(pHand)
  updateOutput()
  setTimeout(() => checkForDead(), 1000)
}

function doStand() {
  updateCoins()
  updateEHand()
  updateOutput()
  PIsDone = true

  setTimeout(() => compareScore(), 1000)
}

function aiTurn() {
  var eVar = HandValue(aiHand)

  while (eVar < 17) {
    aiHand.push(addCard())
    eVar = HandValue(aiHand)
  }
  checkAce(aiHand)

  updateEHand()

  return {
    total: eVar,
    hand: aiHand,
  }
}

function HandValue(Hand) {
  let total = 0
  for (let i = 0; i < Hand.length; i++) {
    total += Hand[i]
  }
  return total
}

function compareScore() {
  const aiResult = aiTurn()
  let aiTotal = aiResult.total
  let aiHand = aiResult.hand
  if (aiTotal > checkForDead() && aiTotal <= 21) {
    coins -= 1
    updateCoins()
    doAlert('you lost')
    resetWorld()
  } else if (aiTotal == checkForDead()) {
    updateCoins()
    doAlert('push')
    resetWorld()
  } else if (aiTotal < checkForDead()) {
    coins += 2
    updateCoins()
    doAlert('you won')
    resetWorld()
  }
  if (aiTotal > 21) {
    coins += 2
    updateCoins()
    doAlert('you won')
    resetWorld()
  }
}

updateOutput()
updateCoins()
updateEHand()

//resetWorld();
