// ## Memory Cards App :
// Import :
import deckCards from "./deckCards.js";

// Variables Globales :
const cover = "./ressources/question.svg";

// Clonage du deck concaténation du deckCards * 2:
interface Card {
  name: string;
  src: string;
}

const clonedDeckCards: Card[] = [...deckCards, ...deckCards];

let cardOne: HTMLImageElement | null = null;
let cardTwo: HTMLImageElement | null = null;
let isPair: HTMLImageElement[] = [];
let cardImage: HTMLImageElement;

// Nombre de tentatives :
const attemptsInfoText = document.querySelector("span#attempts") as HTMLElement;
let count: number = 0;

// Nombre de cartes remportées :
let rewardCards: number = 0;

// Fonction pour mélanger le deck de cartes :
function shuffleCard(deck: any[]): any[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Mélange des cartes :
let newDeck: HTMLImageElement[] = shuffleCard(clonedDeckCards);

// Création des cartes dans le DOM :
function createCards() {
  const cardsPlayground = document.querySelector(
    "#cardsPlayground"
  ) as HTMLElement;
  newDeck.forEach((card: HTMLImageElement | null) => {
    // Création d'une nouvelle carte par élément :
    const newCard = document.createElement("div") as HTMLElement;
    newCard.classList.add("card");

    // Création d'un nouvel cardInner par carte :
    const newCardInner = document.createElement("div") as HTMLElement;
    newCardInner.classList.add("cardInner");

    // Création d'un nouvel cardFront par carte :
    const newCardFront = document.createElement("div") as HTMLElement;
    newCardFront.classList.add("cardFront");

    // Création d'une nouvelle img par cardFront :
    const newCardImgFront = document.createElement("img") as HTMLImageElement;
    newCardImgFront.src = cover;

    newCardFront.appendChild(newCardImgFront);
    newCardInner.appendChild(newCardFront);

    // Création d'un nouvel cardBack par carte :
    const newCardBack = document.createElement("div") as HTMLElement;
    newCardBack.classList.add("cardBack");

    // Création d'une nouvelle img par cardBack :
    const newCardImgBack = document.createElement("img") as HTMLImageElement;

    if (card) {
      newCardImgBack.src = card.src;
    }

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
      if (
        card.classList.contains("flipped") ||
        card.classList.contains("disabled")
      ) {
        return;
      }

      card.classList.add("flipped");

      // Maintenant, card est considéré comme un élément HTMLElement par TypeScript.
      const cardImage = card.querySelector(".cardBack img") as HTMLImageElement;

      setCardToVariable(cardImage);

      if (cardOne && cardTwo) {
        handlePair();
      }
    });
  });
}
flippedCard();

// Fonction qui attribue les cartes sélectionnées à des variables :
function setCardToVariable(card: HTMLImageElement) {
  if (!cardOne) {
    cardOne = card;
  } else if (!cardTwo) {
    cardTwo = card;
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
    } else {
      // Désactivation des événements de clic sur les cartes :
      disabledClicks();

      // Appel de la fonction handleCounterAttempt qui incrémente le nombre de coups de +1:
      handleCounterAttempt("💢 Oups, ce n'est pas une bonne paire ! 💢");

      // Colorisation de la carte en cas d'échec :
      cardOne.classList.add("unPair");
      cardTwo.classList.add("unPair");

      // Retrait de l'effet flipped et de la classe unPair après un délai :
      setTimeout(() => {
        const cardOneElement = cardOne?.closest(".card") as HTMLElement;
        const cardTwoElement = cardTwo?.closest(".card") as HTMLElement;

        cardOne?.classList.remove("unPair");
        cardTwo?.classList.remove("unPair");

        cardOneElement.classList.remove("flipped");
        cardTwoElement.classList.remove("flipped");

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
function handleCounterAttempt(message: string) {
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
  let discountNewGame: number = 10;
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
function showToast(message: string) {
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
const currentYearElement: HTMLElement = document.getElementById(
  "currentYear"
) as HTMLElement;
const currentYear: string = new Date().getFullYear().toString();
if (currentYearElement) {
  currentYearElement.textContent = currentYear;
}
