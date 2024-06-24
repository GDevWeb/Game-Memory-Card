// ##Memory Cards App :
// import :
import deckCards from "./deckCards.js";
// Variables Globales :
const cover = "./ressources/question.svg";
// Clonage du deck concaténation du deckCards * 2:
const clonedDeckCards = [...deckCards, ...deckCards];
console.log(clonedDeckCards);
let cardOne; //création de la variable pour stocker la première card sélectionnée
let cardTwo; //création de la variable pour stocker la seconde card sélectionnée
// let isPair = any[]; //création d"un tableau qui va stocker le choix des pairs de cards
//Nombre de tentatives :
const attemptsInfoText = document.querySelector("span#attempts");
let count = 0;
// Nombre de cards remportées :
let rewardCards = 0;
//Mélanger les cards :
//Function pour mélanger le deck de cards :
function shuffleCard(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
//Mélange des cards :
let newDeck = shuffleCard(clonedDeckCards);
//Création des cards dans le DOM :
function createCards() {
    newDeck.forEach((card) => {
        // Création d'une nouvelle card par elt :
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        // Création d'un nouvel cardInner par card :
        const newCardInner = document.createElement("div");
        newCardInner.classList.add("cardInner");
        // Création d'un nouvel cardFront par card :
        const newCardFront = document.createElement("div");
        newCardFront.classList.add("cardFront");
        // Création d'une nouvelle img par cardFront :
        const newCardImgFront = document.createElement("img");
        newCardImgFront.src = cover;
        newCardInner.appendChild(newCardImgFront);
        newCardFront.appendChild(newCardImgFront);
        newCardInner.appendChild(newCardFront);
        // Création d'un nouvel cardFront par card :
        const newCardBack = document.createElement("div");
        newCardBack.classList.add("cardBack");
        // Création d'une nouvelle img par cardBack :
        const newCardImgBack = document.createElement("img");
        newCardImgBack.src = card.src;
        newCardBack.appendChild(newCardImgBack);
        newCardInner.appendChild(newCardBack);
        newCard.appendChild(newCardInner);
        // Création d'une nouvelle card dans le DOM:
        const cardsPlayground = document.querySelector("#cardsPlayground");
        cardsPlayground.appendChild(newCard);
    });
}
createCards();
// 3. Rendre les cards cliquables :
const allCards = document.querySelectorAll(".card");
function flippedCard() {
    allCards.forEach((card) => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
            // Création de la variable cardImage pour identifier par le src de img :
            cardImage = card.querySelector(".cardBack img");
            // Appel de la function qui attribue les cards sélectionnées à 2 variables cardOne et cardTwo:
            setCardToVariable();
            // 2.Function handlePair() :
            function handlePair() {
                if (cardOne.src == cardTwo.src) {
                    // Désactive l'events click sur les cards :
                    disabledClicks();
                    rewardCards += 2;
                    // Appel de la function handleCounterAttempt qui incrémenté le nombre de coup de +1:
                    handleCounterAttempt("🎊Bravo, c'est une bonne paire !🎊");
                    // Colorisation syntaxique de la carte en cas de réussite :
                    cardOne.classList.toggle("isPair");
                    cardTwo.classList.toggle("isPair");
                    //Ajout de la classe flipped :
                    setTimeout(() => {
                        cardOne.classList.toggle("flipped");
                        cardTwo.classList.toggle("flipped");
                    }, 1500);
                    //Push de la bonne paire de card dans le tableau isPair :
                    setTimeout(() => {
                        isPair.push(cardOne);
                        isPair.push(cardTwo);
                        console.log(isPair);
                    }, 1600);
                    // Retrait de la paire de card du DOM :
                    setTimeout(() => {
                        cardOne.closest(".card").remove();
                        cardTwo.closest(".card").remove();
                    }, 1800);
                    //Nettoyage des variables :
                    setTimeout(() => {
                        cardOne = null;
                        cardTwo = null;
                        console.log(`Bravo, Nettoyage des variables cardOne et cardTwo`);
                    }, 2000);
                    // Appel de la fonction countCard() qui décompte le nombre de card restantes :
                    countCard();
                    // Appel à la fonction enabledClicks pour réactiver les clicks sur cards :
                    setTimeout(() => {
                        enabledClicks();
                    }, 2500);
                }
                else {
                    // Désactive l'events click sur les cards :
                    disabledClicks();
                    // Appel de la function handleCounterAttempt qui incrémenté le nombre de coup de +1:
                    handleCounterAttempt("💢Oups, ce n'est pas une bonne paire !💢");
                    // Colorisation de la carte en cas d'échec :
                    cardOne.classList.toggle("unPair");
                    cardTwo.classList.toggle("unPair");
                    //Ajout de la classe flipped :
                    setTimeout(() => {
                        cardOne.classList.toggle("flipped");
                        cardTwo.classList.toggle("flipped");
                    }, 1500);
                    // Retrait de l'effet flipped :
                    setTimeout(() => {
                        allCards.forEach((card) => {
                            if (cardOne.classList.contains("flipped")) {
                                card.classList.remove("flipped");
                            }
                            else {
                                cardOne.classList.add("flipped");
                            }
                            if (cardTwo.classList.contains("flipped")) {
                                card.classList.remove("flipped");
                            }
                            else {
                                cardTwo.classList.add("flipped");
                            }
                        });
                    }, 1600);
                    // Retrait de la colorisation de la carte en cas d'échec :
                    setTimeout(() => {
                        if (cardOne.classList.contains("unPair")) {
                            cardOne.classList.remove("unPair");
                        }
                        if (cardTwo.classList.contains("unPair")) {
                            cardTwo.classList.remove("unPair");
                        }
                    }, 1800);
                    //Nettoyage des variables :
                    setTimeout(() => {
                        cardOne = null;
                        cardTwo = null;
                        console.log(`Dommage, Nettoyage des variables cardOne et cardTwo`);
                    }, 2000);
                    // Appel de la fonction countCard() qui décompte le nombre de card restantes :
                    countCard();
                    // Appel à la fonction enabledClicks pour réactiver les clicks sur cards :
                    setTimeout(() => {
                        enabledClicks();
                    }, 2500);
                }
            }
            handlePair();
        });
    });
}
flippedCard();
// Function qui attribue les cards sélectionnées à des variables :
function setCardToVariable() {
    // Attribution de la 1ere card cliqué à la variable cardOne :
    if (!cardOne) {
        cardOne = cardImage;
        console.log(cardOne);
        // Attribution de la 2nd card cliqué à la variable cardTwo :
    }
    else if (!cardTwo) {
        cardTwo = cardImage;
        console.log(cardTwo);
    }
    console.log(cardOne);
    console.log(cardTwo);
    console.log(isPair);
}
// Gestion des clicks à chaque manche :
// Fonction pour désactiver le click sur les cards après sélection :
function disabledClicks() {
    console.log("Click désactivé !");
    allCards.forEach((card) => {
        card.classList.add("disabled");
    });
}
// Fonction pour activer le click sur les cards au début de chaque nouvelle manche :
function enabledClicks() {
    console.log("Click réactivé !");
    allCards.forEach((card) => {
        card.classList.remove("disabled");
    });
}
// 2.Vérifier le score :
function handleCounterAttempt(message) {
    count++;
    attemptsInfoText.textContent = count;
    showToast(message);
    return count;
}
// Décompte du nombre de card restant en jeux :
function countCard() {
    // rewardCards += 2;
    // Si égal au nombre de card total / 2 :
    if (rewardCards == clonedDeckCards.length) {
        showToast(`🎊Bravo tu as terminé le jeux ${count} coups !🎊`);
        // Appel de la fonction newGame qui lancera une nouvelle partie au bout de x secondes :
        newGame();
    }
}
//Fonction qui lance une nouvelle partie dans 10 secondes :
function newGame() {
    //Décompte de 10 secondes avant une nouvelle partie :
    let discountNewGame = 10;
    // Lance une nouvelle partie dans 10 secondes :
    setInterval(() => {
        discountNewGame--;
        showToast(`Nouvelle partie dans ${discountNewGame} secondes`);
        if (discountNewGame == 0) {
            location.reload();
        }
    }, 1000);
}
// Events :
allCards.forEach((card) => {
    card.addEventListener("click", () => {
        disabledClicks();
    });
});
allCards.forEach((card) => {
    card.addEventListener("click", () => {
        enabledClicks();
    });
});
//Extras UI:
// Affiche un "toast" à l'appel de la function.
function showToast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    // Ajout du toast au DOM :
    document.body.appendChild(toast);
    // Ajout de la class show pour déclencher l'effet d'apparition :
    setTimeout(function () {
        toast.classList.add("show");
    }, 10);
    // Supprime le toast après quelques secondes (3 secondes).
    setTimeout(function () {
        toast.remove();
    }, 3000);
}
// Date dynamique du footer :
const currentYearElement = document.getElementById("currentYear");
const currentYear = new Date().getFullYear();
currentYearElement.textContent = currentYear;
