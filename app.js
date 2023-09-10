const gameBoard = document.getElementById('game')
const scoreDisplay = document.getElementById('score')
let score = 0

const film = 11
const levels = ['easy', 'medium', 'hard']
const genres = [
    {
        name: 'Books',
        id: 10
    },
    {
        name: 'Film',
        id: 11
    },
    {
        name: 'Music',
        id: 12
    },
    {
        name: 'Video Games',
        id: 15
    },
]


function addGenre(genre) {
    const column = document.createElement('div')
    column.classList.add('genre-column')
    column.innerHTML = genre.name
    gameBoard.append(column)

    levels.forEach(level => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if(level === 'easy') {
            card.innerHTML = 100
        } else if (level === 'medium') {
            card.innerHTML = 200
        } else {
            card.innerHTML = 300
        }

        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
        .then(response => response.json())
        .then(data => {
            card.setAttribute('data-question', data.results[0].question)
            card.setAttribute('data-answer', data.results[0].correct_answer)
            card.setAttribute('data-value', card.innerHTML)
        })
        .then(done => {
            card.addEventListener('click', flipCard)
        })
        
    })
 }

genres.forEach(genre => addGenre(genre))


function flipCard() {
    this.innerHTML = ''
    this.style.fontSize = '15px'
    console.log('clicked')
    const textDisplay = document.createElement('div')
    const trueButton = document.createElement('button')
    const falseButton = document.createElement('button')
    trueButton.innerHTML = 'True'
    trueButton.classList.add('true-button')
    falseButton.innerHTML = 'False'
    falseButton.classList.add('false-button')
    trueButton.addEventListener('click', getResult)
    falseButton.addEventListener('click', getResult)
    textDisplay.innerHTML = this.getAttribute('data-question')
    this.append(textDisplay, trueButton, falseButton)

    allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))
}

function getResult() {
    allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))
    const cardOfButton = this.parentElement
    if(cardOfButton.getAttribute('data-answer') === this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add('correct-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
        }, 200)
    } else {
        cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
        }, 200)
    }
    cardOfButton.removeEventListener('click', flipCard)
    
}