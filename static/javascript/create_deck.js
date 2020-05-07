let deckForm = document.querySelector("#deck-form")
let cardForm = document.querySelector('#card-form')
let addCard1 = document.querySelector("#add-card1")
let addCard2 = document.querySelector("#add-card2")
let cardsDiv = document.querySelector("#cards-div")

deckForm.addEventListener('submit', e => {
    e.preventDefault()
    let deckTitle = document.querySelector("#deck-title")
    let deckDescription = document.querySelector("#deck-description")
    let data = { title: deckTitle.value, description: deckDescription.value }
    console.log(data)
    fetch('/deck/add/', {
        method: 'POST',
        headers: { 'Content-type': 'application/json', },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            window.pk = data.pk
            console.log("JsonResponse recieved")
            createButton()
        })
        .catch((error) => {
            console.error(error)
        })
})

function createButton() {
    let createDeckButton = document.querySelector('#create-deck-button')
    // createDeckButton.classList.remove('create-deck-button')
    createDeckButton.classList.add('visibility-hidden')
    addCard1.classList.remove("hidden")
    addCard1.classList.add('add-card1')
    addCard2.classList.remove("hidden")
    addCard2.classList.add('add-card2')
    let cardButton = document.querySelector("#add-card-button")
    cardButton.classList.remove('hidden')
    cardButton.classList.add('create-deck-button')
    cardButton.setAttribute("type", "submit")
}

cardForm.addEventListener('submit', e => {
    e.preventDefault()
    let questionInput = document.querySelector("#question-input")
    let answerInput = document.querySelector("#answer-input")
    let data = { pk: window.pk, question: questionInput.value, answer: answerInput.value }
    console.log(data)
    fetch('/deck/card/', {
        method: 'POST',
        headers: { 'Content-type': 'application.json', },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then(response => {
            console.log('Other JsonResponse recieved')
            console.log(response)
            displayNewCard(response)
            questionInput.value = ""
            answerInput.value = ""
        })
        .catch((error) => {
            console.error(error)
        })
})

// function displayNewCard(cardData) {
//     let div = document.createElement("div")
//     div.setAttribute("class", "deck")
//     cardsDiv.insertBefore(div, document.querySelector(".deck"))
//     let stuff = "<div><p>question: " + cardData.question + "</p><p>answer: " + cardData.answer + "</p></div>"
//     console.log(stuff)
//     let cardDiv = document.querySelector(".deck")
//     cardDiv.innerHTML = stuff
//     console.log(stuff)
// }

let cardNum = 1
function displayNewCard(cardData) {
    let cardHTML = `<div class='card-container'><div id='card${cardNum}' class='card'><div id='card-front' class='card-front'><p id='card-question'>${cardData.question}</p></div><div id='card-back' class='card-back'><p id='card-answer'>${cardData.answer}</p></div></div></div>`
    let div = document.createElement('div')
    cardsDiv.appendChild(div)
    div.innerHTML = cardHTML
    let card = document.querySelector(`#card${cardNum}`)
    console.log(card)
    card.addEventListener('click', function () {
        card.classList.toggle('card')
        card.classList.toggle('rotate')
    })
    cardNum += 1
}