// ## Memory Cards App :
// Variables Globales :
const cover = "./ressources/question.svg";

const deckCards = [
    { name: "apple", src: "./ressources/apple.svg" },
    { name: "banana", src: "./ressources/banana.svg" },
    { name: "brocoli", src: "./ressources/brocoli.svg" },
    { name: "cherry", src: "./ressources/cherry.svg" },
    { name: "pepper", src: "./ressources/pepper.svg" },
    { name: "straw", src: "./ressources/straw.svg" },
];

// Clonage du deck concaténation du deckCards * 2:
const clonedDeckCards = [...deckCards, ...deckCards];

// Variables pour stocker les cartes sélectionnées
let cardOne = null;
let cardTwo = null;

// Nombre de tentatives et cartes remportées
let count = 0;
let rewardCards = 0;

// Mélanger les cartes
function shuffleCard(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Mélanger et créer les cartes dans le DOM
const newDeck = shuffleCard(clonedDeckCards);
createCards(newDeck);

function createCards(deck) {
    const cardsPlayground = document.querySelector("#cardsPlayground");
    deck.forEach(card => {
        const newCard = document.createElement("div");
        newCard.classList.add("card");

        const newCardInner = document.createElement("div");
        newCardInner.classList.add("cardInner");

        const newCardFront = document.createElement("div");
        newCardFront.classList.add("cardFront");

        const newCardImgFront = document.createElement("img");
        newCardImgFront.src = cover;

        const newCardBack = document.createElement("div");
        newCardBack.classList.add("cardBack");

        const newCardImgBack = document.createElement("img");
        newCardImgBack.src = card.src;

        newCardFront.appendChild(newCardImgFront);
        newCardBack.appendChild(newCardImgBack);

        newCardInner.appendChild(newCardFront);
        newCardInner.appendChild(newCardBack);
        newCard.appendChild(newCardInner);
        cardsPlayground.appendChild(newCard);
    });
}

// Rendre les cartes cliquables
const allCards = document.querySelectorAll(".card");
allCards.forEach(card => card.addEventListener("click", flipCard));

function flipCard() {
    if (cardOne && cardTwo) return;

    this.classList.add("flipped");

    if (!cardOne) {
        cardOne = this;
    } else {
        cardTwo = this;
        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = cardOne.querySelector(".cardBack img").src === cardTwo.querySelector(".cardBack img").src;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        cardOne.classList.remove("flipped");
        cardTwo.classList.remove("flipped");
        
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [cardOne, cardTwo] = [null, null];
    count++;
    attemptsInfoText.textContent = count;
    checkGameOver();
}

function checkGameOver() {
    rewardCards = document.querySelectorAll(".flipped").length;
    if (rewardCards === clonedDeckCards.length) {
        showToast(`🎊Bravo tu as terminé le jeux ${count} coups !🎊`);
        setTimeout(newGame, 3000);
    }
}

function newGame() {
    location.reload();
}

// Extras UI:
function showToast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => toast.remove(), 3000);
}

// Date dynamique du footer :
const currentYearElement = document.getElementById("currentYear");
const currentYear = new Date().getFullYear();
currentYearElement.textContent = currentYear;
