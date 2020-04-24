let quizContainer = document.querySelector('#quiz-container')
let deckPk = document.querySelector('#deck-pk')
console.log(`/details/${deckPk.textContent}/quiz/cards/`)

fetch(`/details/${deckPk.textContent}/quiz/cards/`)
    .then((response) => response.json())
    .then(response => {
      console.log('JsonResponse recieved')
      console.log(response)
    })
    .catch((error) => {
      console.error('JSON response ERROR')
    })