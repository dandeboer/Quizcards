let deckPk = document.querySelector('#deck-pk')
let deckLength = document.querySelector('#deck-length')
let restartButton = document.querySelector('#restart-button')
let cardUp = true

restartButton.addEventListener('click', restartQuiz)

function getDeck() {
    fetch(`/details/${deckPk.textContent}/quiz/cards/`)
        .then(response => response.json())
        .then(response => {
            window.deckData = response
            generateTest(response)
        })
        .catch((error) => {
            console.error(error)
        })
}

function generateTest(cardData) {
    let currentCard = 0
    let numberCorrect = 0
    let numberIncorrect = 0
    let currentQuestion = Object.keys(cardData)[currentCard]
    let currentAnswer = Object.values(cardData)[currentCard]


    let card = document.querySelector('#card')
    card.addEventListener('click', rotateCard)
    function rotateCard() {
        card.classList.toggle('card')
        card.classList.toggle('rotate')
        cardUp = !cardUp

    }

    setCardText(currentQuestion, currentAnswer)

    let markCorrect = document.querySelector('#mark-correct')
    markCorrect.addEventListener('click', function () {
        numberCorrect += 1
        currentCard += 1
        currentQuestion = Object.keys(cardData)[currentCard]
        currentAnswer = Object.values(cardData)[currentCard]
        updateCI(numberCorrect, 'correct')
        quizState(currentCard, currentQuestion, currentAnswer, card, rotateCard, cardData)
    })
    let markIncorrect = document.querySelector('#mark-incorrect')
    markIncorrect.addEventListener('click', function () {
        numberIncorrect += 1
        currentCard += 1
        currentQuestion = Object.keys(cardData)[currentCard]
        currentAnswer = Object.values(cardData)[currentCard]
        updateCI(numberIncorrect, 'incorrect')
        quizState(currentCard, currentQuestion, currentAnswer, card, rotateCard, cardData)
    })
}

function setCardText(question, answer) {
    let cardQuestion = document.querySelector('#card-question')
    let cardAnswer = document.querySelector('#card-answer')
    cardQuestion.innerText = question
    cardAnswer.innerText = answer
}

function updateCI(number, cOrI) {
    let correctDisplay = document.querySelector('#correct-display')
    let incorrectDisplay = document.querySelector('#incorrect-display')
    if (cOrI === 'correct') {
        correctDisplay.innerText = number
    }
    else if (cOrI === 'incorrect') {
        incorrectDisplay.innerText = number
    }

}

function updateOf(current) {
    let numberOf = document.querySelector('#number-of')
    numberOf.innerText = current
}

function quizState(currentCard, currentQuestion, currentAnswer, card, rotateCard) {
    if (currentCard == deckLength.innerText) {
        let resultsDisplay = document.querySelector('#results-display')
        resultsDisplay.classList.remove('visibility-hidden')
        rotateCard()
        card.removeEventListener('click', rotateCard)
        let cardQuestion = document.querySelector('#card-question')
        cardQuestion.innerText = "Quiz complete"
    }
    else {
        setCardText(currentQuestion, currentAnswer)
        updateOf(currentCard + 1)
    }
}

function restartQuiz() {
    let cardQuestion = document.querySelector('#card-question')
    let cardAnswer = document.querySelector('#card-answer')
    let card = document.querySelector('#card')
    let numberOf = document.querySelector('#number-of')
    let resultsDisplay = document.querySelector('#results-display')

    resultsDisplay.classList.add('visibility-hidden')
    numberOf.innerText = "1"
    cardQuestion.innerText = ''
    cardAnswer.innerText = ''

    let arr = []
    let obj
    for (let [key, value] of Object.entries(deckData)) {
        obj = {}
        obj[key] = value
        arr.push(obj)
    }
    console.log(arr)
    shuffle(arr) 
    console.log(arr)
    // let shuffledDeckData = {}
    // for (let item in arr) {
    //     console.log(item)
    // }
    // if (cardUp == false) {
    //     card.classList.toggle('card')
    //     card.classList.toggle('rotate')
    //     cardUp = !cardUp

    // }
    // else {

    // }
    // generateTest(deckData[0])
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
    // array.sort( () => Math.random() - 0.5)
}

getDeck()

// test = { 'thingy': 'bruh', 'this': 'a pain', 'why cant': 'this be simple' }
// arr = []
// let obj
// for (let [key, value] of Object.entries(test)) {
//     // console.log(`${key}: ${value}`);
//     obj = {}
//     obj[key] = value
//     arr.push(obj)
// }

