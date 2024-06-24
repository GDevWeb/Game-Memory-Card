// ## Memory Cards App :
// Import :
import deckCards from "./deckCards.js";
// Variables Globales :
const cover = "./ressources/question.svg";
// Clonage du deck concaténation du deckCards * 2:
const clonedDeckCards = [...deckCards, ...deckCards];
let cardOne = null;
let cardTwo = null;
let isPair = [];
let cardImage;
// Nombre de tentatives :
const attemptsInfoText = document.querySelector("span#attempts");
let count = 0;
// Nombre de cartes remportées :
let rewardCards = 0;
// Fonction pour mélanger le deck de cartes :
function shuffleCard(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
// Mélange des cartes :
let newDeck = shuffleCard(clonedDeckCards);
// Création des cartes dans le DOM :
function createCards() {
    const cardsPlayground = document.querySelector("#cardsPlayground");
    newDeck.forEach((card) => {
        // Création d'une nouvelle carte par élément :
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        // Création d'un nouvel cardInner par carte :
        const newCardInner = document.createElement("div");
        newCardInner.classList.add("cardInner");
        // Création d'un nouvel cardFront par carte :
        const newCardFront = document.createElement("div");
        newCardFront.classList.add("cardFront");
        // Création d'une nouvelle img par cardFront :
        const newCardImgFront = document.createElement("img");
        newCardImgFront.src = cover;
        newCardFront.appendChild(newCardImgFront);
        newCardInner.appendChild(newCardFront);
        // Création d'un nouvel cardBack par carte :
        const newCardBack = document.createElement("div");
        newCardBack.classList.add("cardBack");
        // Création d'une nouvelle img par cardBack :
        const newCardImgBack = document.createElement("img");
        newCardImgBack.src = card.src;
        newCardBack.appendChild(newCardImgBack);
        newCardInner.appendChild(newCardBack);
        newCard.appendChild(newCardInner);
        // Ajout de la nouvelle carte au DOM :
        cardsPlayground.appendChild(newCard);
    });
}
createCards();
// Fonction pour rendre les cartes cliquables :
function flippedCard() {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => {
        card.addEventListener("click", () => {
            // Ignore le clic si la carte est déjà retournée ou si elle est désactivée
            if (card.classList.contains("flipped") ||
                card.classList.contains("disabled")) {
                return;
            }
            card.classList.add("flipped");
            // Création de la variable cardImage pour identifier par le src de img :
            cardImage = card.querySelector(".cardBack img");
            // Appel de la fonction qui attribue les cartes sélectionnées à 2 variables cardOne et cardTwo:
            setCardToVariable(card);
            // Appel de la fonction handlePair pour gérer la paire de cartes :
            if (cardOne && cardTwo) {
                handlePair();
            }
        });
    });
}
flippedCard();
// Fonction qui attribue les cartes sélectionnées à des variables :
function setCardToVariable(card) {
    // Attribution de la 1ere carte cliquée à la variable cardOne :
    if (!cardOne) {
        cardOne = cardImage;
    }
    else if (!cardTwo) {
        // Attribution de la 2nd carte cliquée à la variable cardTwo :
        cardTwo = cardImage;
    }
}
// Fonction pour gérer la paire de cartes :
function handlePair() {
    if (cardOne && cardTwo) {
        if (cardOne.src === cardTwo.src) {
            // Désactivation des événements de clic sur les cartes :
            disabledClicks();
            rewardCards += 2;
            // Appel de la fonction handleCounterAttempt qui incrémente le nombre de coups de +1:
            handleCounterAttempt("🎊 Bravo, c'est une bonne paire ! 🎊");
            // Colorisation syntaxique de la carte en cas de réussite :
            cardOne.classList.add("isPair");
            cardTwo.classList.add("isPair");
            // Retrait de la paire de cartes du DOM après un délai :
            setTimeout(() => {
                cardOne?.closest(".card")?.remove();
                cardTwo?.closest(".card")?.remove();
                // Réinitialisation des variables :
                cardOne = null;
                cardTwo = null;
                enabledClicks();
            }, 1800);
            // Appel de la fonction countCard qui décompte le nombre de cartes restantes :
            countCard();
        }
        else {
            // Désactivation des événements de clic sur les cartes :
            disabledClicks();
            // Appel de la fonction handleCounterAttempt qui incrémente le nombre de coups de +1:
            handleCounterAttempt("💢 Oups, ce n'est pas une bonne paire ! 💢");
            // Colorisation de la carte en cas d'échec :
            cardOne.classList.add("unPair");
            cardTwo.classList.add("unPair");
            // Retrait de l'effet flipped et de la classe unPair après un délai :
            setTimeout(() => {
                const cardOneElement = cardOne?.closest(".card");
                const cardTwoElement = cardTwo?.closest(".card");
                cardOneElement?.classList.remove("flipped", "unPair");
                cardTwoElement?.classList.remove("flipped", "unPair");
                // Réinitialisation des variables :
                cardOne = null;
                cardTwo = null;
                enabledClicks();
            }, 1500);
        }
    }
}
// Fonction pour désactiver le clic sur les cartes après sélection :
function disabledClicks() {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => {
        card.classList.add("disabled");
    });
}
// Fonction pour activer le clic sur les cartes au début de chaque nouvelle manche :
function enabledClicks() {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => {
        card.classList.remove("disabled");
    });
}
// Fonction pour gérer le compteur de tentatives :
function handleCounterAttempt(message) {
    count++;
    attemptsInfoText.textContent = count.toString();
    showToast(message);
    return count;
}
// Décompte du nombre de cartes restantes en jeu :
function countCard() {
    if (rewardCards === clonedDeckCards.length) {
        showToast(`🎊 Bravo tu as terminé le jeu en ${count} coups ! 🎊`);
        // Appel de la fonction newGame qui lancera une nouvelle partie après quelques secondes :
        newGame();
    }
}
// Fonction qui lance une nouvelle partie dans 10 secondes :
function newGame() {
    let discountNewGame = 10;
    const interval = setInterval(() => {
        discountNewGame--;
        showToast(`Nouvelle partie dans ${discountNewGame} secondes`);
        if (discountNewGame === 0) {
            clearInterval(interval);
            location.reload();
        }
    }, 1000);
}
// Extras UI :
// Affiche un "toast" à l'appel de la fonction.
function showToast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    // Ajout du toast au DOM :
    document.body.appendChild(toast);
    // Ajout de la classe show pour déclencher l'effet d'apparition :
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);
    // Suppression du toast après quelques secondes (3 secondes).
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
// Date dynamique du footer :
const currentYearElement = document.getElementById("currentYear");
const currentYear = new Date().getFullYear().toString();
if (currentYearElement) {
    currentYearElement.textContent = currentYear;
}
