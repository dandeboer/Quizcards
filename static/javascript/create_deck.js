let deckButtonForm = document.querySelector("#deck-button-form")
let addCard = document.querySelector("#add-card")
let cardsDiv = document.querySelector("#cards-div")

deckButtonForm.addEventListener('submit', e => {
    e.preventDefault()
    let deckTitle = document.querySelector("#deck-title")
    let deckDescription = document.querySelector("#deck-description")
    let data = {title: deckTitle.value, description: deckDescription.value}
    console.log(data)
    fetch('/deck/add/', {
        method: 'POST',
        headers: {'Content-type': 'application/json',},
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
        console.error('JSON response ERROR')
    })
})

function createButton() {
    addCard.classList.remove("hidden")
    addCard.setAttribute("class", "add-button")
    let cardButton = document.querySelector("#add-card-button")
    cardButton.setAttribute("type", "submit")
}

addCard.addEventListener('submit', e => {
    e.preventDefault()
    let questionInput = document.querySelector("#question-input")
    let answerInput = document.querySelector("#answer-input")
    let data = {pk: window.pk, question: questionInput.value, answer: answerInput.value}
    console.log(data)
    fetch('http://127.0.0.1:8000/deck/card/', {
        method: 'POST',
        headers: {'Content-type': 'application.json',},
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
        console.error('Other JSON response ERROR')
    })
})

function displayNewCard(cardData) {
    let div = document.createElement("div")
    div.setAttribute("class", "deck")
    cardsDiv.insertBefore(div, document.querySelector(".deck"))
    let stuff = "<div><p>question: " + cardData.question + "</p><p>answer: " + cardData.answer + "</p></div>"
    console.log(stuff)
    let cardDiv = document.querySelector(".deck")
    cardDiv.innerHTML = stuff
    console.log(stuff)
}