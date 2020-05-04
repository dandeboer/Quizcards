let deckPk = document.querySelector('#deck-pk')
let deckLength = document.querySelector('#deck-length')
let restartButton = document.querySelector('#restart-button')
let cardUp = true
let markCorrect = document.querySelector('#mark-correct')
let firstGeneration = true

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
    currentCard = 0
    numberCorrect = 0
    numberIncorrect = 0
    let currentQuestion = Object.keys(cardData)[currentCard]
    let currentAnswer = Object.values(cardData)[currentCard]
    let card = document.querySelector('#card')

    card.addEventListener('click', rotateCard)
    setCardText(currentQuestion, currentAnswer)

    if (firstGeneration === true) {
        markCorrect.addEventListener('click', correctFunction)
        function correctFunction() {
            numberCorrect += 1
            currentCard += 1
            currentQuestion = Object.keys(cardData)[currentCard]
            currentAnswer = Object.values(cardData)[currentCard]
            updateCI(numberCorrect, 'correct')
            quizState(currentCard, currentQuestion, currentAnswer, card, rotateCard, cardData)
        }
        let markIncorrect = document.querySelector('#mark-incorrect')
        markIncorrect.addEventListener('click', incorrectFunction)
        function incorrectFunction () {
            numberIncorrect += 1
            currentCard += 1
            currentQuestion = Object.keys(cardData)[currentCard]
            currentAnswer = Object.values(cardData)[currentCard]
            updateCI(numberIncorrect, 'incorrect')
            quizState(currentCard, currentQuestion, currentAnswer, card, rotateCard, cardData)
        }
    }
    firstGeneration = false
}

function rotateCard() {
    card.classList.toggle('card')
    card.classList.toggle('rotate')
    cardUp = !cardUp
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
    let correctDisplay = document.querySelector('#correct-display')
    let incorrectDisplay = document.querySelector('#incorrect-display')

    resultsDisplay.classList.add('visibility-hidden')
    numberOf.innerText = "1"
    cardQuestion.innerText = ''
    cardAnswer.innerText = ''
    card.removeEventListener('click', rotateCard)
    correctDisplay.innerText = '0'
    incorrectDisplay.innerText = '0'

    let arr = []
    let obj
    for (let [key, value] of Object.entries(deckData)) {
        obj = {}
        obj[key] = value
        arr.push(obj)
    }
    // console.log(arr)
    shuffle(arr)
    // console.log(arr)
    let shuffledDeckData = {}
    for (let item in arr) {
        let currentItem = Object.entries(arr[item])
        // console.log(currentItem[0][0])
        // console.log(currentItem[0][1])
        shuffledDeckData[currentItem[0][0]] = currentItem[0][1]
    }
    generateTest(shuffledDeckData)
    // if (cardUp == false) {
    //     card.classList.toggle('card')
    //     card.classList.toggle('rotate')
    //     cardUp = !cardUp

    // }
    // else {

    // }
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
}

getDeck()
restartButton.addEventListener('click', restartQuiz)