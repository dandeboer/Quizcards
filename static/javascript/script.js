let deckButton = document.querySelector("#deck-button")

deckButton.addEventListener('click', createDeck)

function createDeck() {
    location.href = '/deck/'
}