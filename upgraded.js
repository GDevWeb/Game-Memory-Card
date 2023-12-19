// ## Memory Cards App :

// Variables Globales :
const cover = "./ressources/question.svg";
const deckCards = [
    { name: "apple", src: "./ressources/apple.svg" },
    { name: "banana", src: "./ressources/banana.svg" },
    { name: "broccoli", src: "./ressources/broccoli.svg" },
    { name: "cherry", src: "./ressources/cherry.svg" },
    { name: "pepper", src: "./ressources/pepper.svg" },
    { name: "straw", src: "./ressources/straw.svg" },
];

let attemptsInfoText = document.querySelector("span#attempts");

// Clonage du deck concaténation du deckCards * 2:
const clonedDeckCards = [...deckCards, ...deckCards];
console.log(clonedDeckCards);

// Objets pour stocker les variables liées aux cartes
const game = {
    cardOne: null,
    cardTwo: null,
    isPair: [],
    count: 0,
    rewardCards: 0,
};

// Méthode pour mélanger les cartes
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
    newDeck.forEach((card) => {
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        const newCardInner = document.createElement("div");
        newCardInner.classList.add("cardInner");
        const newCardFront = document.createElement("div");
        newCardFront.classList.add("cardFront");
        const newCardImgFront = document.createElement("img");
        newCardImgFront.src = cover;
        newCardInner.appendChild(newCardImgFront);
        newCardFront.appendChild(newCardImgFront);
        newCardInner.appendChild(newCardFront);
        const newCardBack = document.createElement("div");
        newCardBack.classList.add("cardBack");
        const newCardImgBack = document.createElement("img");
        newCardImgBack.src = card.src;
        newCardBack.appendChild(newCardImgBack);
        newCardInner.appendChild(newCardBack);
        newCard.appendChild(newCardInner);
        const cardsPlayground = document.querySelector("#cardsPlayground");
        cardsPlayground.appendChild(newCard);
    });
}
createCards();

// Rendre les cartes cliquables :
const allCards = document.querySelectorAll(".card");

function flippedCard() {
    allCards.forEach((card) => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
            const cardImage = card.querySelector(".cardBack img");
            setCardToVariable(cardImage);
            handlePair();
        });
    });
}
flippedCard();

// Fonction qui attribue les cartes sélectionnées à des variables :
function setCardToVariable(cardImage) {
    if (!game.cardOne) {
        game.cardOne = cardImage;
        console.log(game.cardOne);
    } else if (!game.cardTwo) {
        game.cardTwo = cardImage;
        console.log(game.cardTwo);
    }
    console.log(game.cardOne);
    console.log(game.cardTwo);
    console.log(game.isPair);
}

// Gestion des clics à chaque manche :
function disableAndEnableClicks(disable) {
    console.log(disable ? "Click désactivé !" : "Click réactivé !");
    allCards.forEach((card) => {
        card.classList.toggle("disabled", disable);
    });
}

// Vérifier le score :
function handleCounterAttempt(message) {
    game.count++;
    attemptsInfoText.textContent = game.count;
    showToast(message);
    game.rewardCards += 2;
}

// Décompte du nombre de cartes restantes en jeu :
function countCard() {
    if (game.rewardCards === clonedDeckCards.length) {
        showToast(`🎊Bravo tu as terminé le jeu ${game.count} coups !🎊`);
        newGame();
    }
}

// Nouvelle partie :
function newGame() {
    let discountNewGame = 10;
    setInterval(() => {
        discountNewGame--;
        showToast(`Nouvelle partie dans ${discountNewGame} secondes`);
        if (discountNewGame === 0) {
            location.reload();
        }
    }, 1000);
}

// Function qui gère la logique des paires de cartes :
function handlePair() {
    if (game.cardOne && game.cardTwo) {
        disableAndEnableClicks(true);

        if (game.cardOne.src === game.cardTwo.src) {
            handleCounterAttempt("🎊Bravo, c'est une bonne paire !🎊");
            game.cardOne.classList.toggle("isPair");
            game.cardTwo.classList.toggle("isPair");
            setTimeout(() => {
                game.cardOne.classList.toggle("flipped");
                game.cardTwo.classList.toggle("flipped");
            }, 1500);
            setTimeout(() => {
                game.isPair.push(game.cardOne);
                game.isPair.push(game.cardTwo);
                console.log(game.isPair);
            }, 1600);
            setTimeout(() => {
                game.cardOne.closest(".card").remove();
                game.cardTwo.closest(".card").remove();
            }, 1800);
            setTimeout(() => {
                game.cardOne = null;
                game.cardTwo = null;
                console.log("Bravo, Nettoyage des variables cardOne et cardTwo");
            }, 2000);
            setTimeout(() => {
                countCard();
                disableAndEnableClicks(false);
            }, 2500);
        } else {
            handleCounterAttempt("💢Oups, ce n'est pas une bonne paire !💢");
            game.cardOne.classList.toggle("unPair");
            game.cardTwo.classList.toggle("unPair");
            setTimeout(() => {
                game.cardOne.classList.toggle("flipped");
                game.cardTwo.classList.toggle("flipped");
            }, 1500);
            setTimeout(() => {
                allCards.forEach((card) => {
                    if (game.cardOne.classList.contains("flipped")) {
                        card.classList.remove("flipped");
                    } else {
                        game.cardOne.classList.add("flipped");
                    }
                    if (game.cardTwo.classList.contains("flipped")) {
                        card.classList.remove("flipped");
                    } else {
                        game.cardTwo.classList.add("flipped");
                    }
                });
            }, 1600);
            setTimeout(() => {
                if (game.cardOne.classList.contains("unPair")) {
                    game.cardOne.classList.remove("unPair");
                }
                if (game.cardTwo.classList.contains("unPair")) {
                    game.cardTwo.classList.remove("unPair");
                }
            }, 1800);
            setTimeout(() => {
                game.cardOne = null;
                game.cardTwo = null;
                console.log("Dommage, Nettoyage des variables cardOne et cardTwo");
            }, 2000);
            setTimeout(() => {
                countCard();
                disableAndEnableClicks(false);
            }, 2500);
        }
    }
}

// Events :
allCards.forEach((card) => {
    card.addEventListener("click", () => {
        disableAndEnableClicks(true);
    });
});

allCards.forEach((card) => {
    card.addEventListener("click", () => {
        disableAndEnableClicks(false);
    });
});

// Extras UI:
function showToast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Date dynamique du footer :
const currentYearElement = document.getElementById("currentYear");
const currentYear = new Date().getFullYear();
currentYearElement.textContent = currentYear;
