let deckPk = document.querySelector('#deck-pk')
let deckLength = document.querySelector('#deck-length')
let restartButton = document.querySelector('#restart-button')
let cardUp = true
let markCorrect = document.querySelector('#mark-correct')
let markIncorrect = document.querySelector('#mark-incorrect')
let firstGeneration = true
let cardQuestion = document.querySelector('#card-question')
let cardAnswer = document.querySelector('#card-answer')

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



    if (firstGeneration === true) {
        card.addEventListener('click', rotateCard)
        setCardText(currentQuestion, currentAnswer)
        markCorrect.addEventListener('click', correctFunction)
        function correctFunction() {
            numberCorrect += 1
            currentCard += 1
            currentQuestion = Object.keys(cardData)[currentCard]
            currentAnswer = Object.values(cardData)[currentCard]
            updateCI(numberCorrect, 'correct')
            quizState(currentCard, currentQuestion, currentAnswer, card, rotateCard, cardData)
        }
        markIncorrect.addEventListener('click', incorrectFunction)
        function incorrectFunction() {
            numberIncorrect += 1
            currentCard += 1
            currentQuestion = Object.keys(cardData)[currentCard]
            currentAnswer = Object.values(cardData)[currentCard]
            updateCI(numberIncorrect, 'incorrect')
            quizState(currentCard, currentQuestion, currentAnswer, card, rotateCard, cardData)
        }
    }
    else {
        if (cardUp === false) {
            rotateCard()
            setTimeout(function () {
                setCardText(currentQuestion, currentAnswer)
            }, 200)
        }
        else {
            markCorrect.classList.toggle('visibility-hidden')
            markIncorrect.classList.toggle('visibility-hidden')
            rotateCard()
            setTimeout(function () {
                rotateCard()
                setTimeout(function () {
                    markCorrect.classList.toggle('visibility-hidden')
                    markIncorrect.classList.toggle('visibility-hidden')
                    setCardText(currentQuestion, currentAnswer)
                }, 200)
            }, 400)

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
        cardQuestion.innerText = "Quiz complete"
    }
    else {
        setCardText(currentQuestion, currentAnswer)
        updateOf(currentCard + 1)
    }
}

function restartQuiz() {
    let numberOf = document.querySelector('#number-of')
    let resultsDisplay = document.querySelector('#results-display')
    let correctDisplay = document.querySelector('#correct-display')
    let incorrectDisplay = document.querySelector('#incorrect-display')

    resultsDisplay.classList.add('visibility-hidden')
    numberOf.innerText = "1"
    cardQuestion.innerText = ''
    cardAnswer.innerText = ''
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