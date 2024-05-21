var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')

var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var colors = ['#090979', '#717909', '#790913', '#790973', '#520979', '#17f2e1', '#074a87', '#e7a4dc', '#25f604', '#000000', '#dfab0b', '#f1f22a', '#40f2ed', '#af22a4']

var score = 0
var isGameStarted = false

$game.addEventListener('click', hendlerBoxClick)

$start.addEventListener('click', startGame)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')

    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)

    var interval = setInterval(function () {
        var time = parseFloat($time.textContent)

        console.log('interval', $time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }

    }, 100)

    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    var timer = +$gameTime.value
    $time.textContent = timer.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
    setGameScore()
    $gameTime.removeAttribute('disabled')
}

function hendlerBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}



function renderBox() {
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize

    var randomColorIndex = getRandom(0, colors.length)

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]

    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')


    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
