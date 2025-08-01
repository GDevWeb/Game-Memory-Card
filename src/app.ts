class MemoryGame {
  private cards: string[];
  private gameCards: string[];
  private flippedCards: HTMLElement[];
  private matchedPairs: number;
  private attempts: number;
  private isProcessing: boolean;
  private gameBoard: HTMLElement;
  private attemptsDisplay: HTMLElement;
  private pairsDisplay: HTMLElement;

  constructor() {
    this.cards = ["🍎", "🍌", "🍓", "🍇", "🍊", "🥝", "🍑", "🥭"];
    this.gameCards = [...this.cards, ...this.cards];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.attempts = 0;
    this.isProcessing = false;
    this.gameBoard = document.getElementById("gameBoard")!;
    this.attemptsDisplay = document.getElementById("attempts")!;
    this.pairsDisplay = document.getElementById("pairs")!;
    this.init();
  }

  init() {
    this.shuffleCards();
    this.createCards();
    this.updateDisplay();
    this.setCurrentYear();
  }

  shuffleCards() {
    for (let i = this.gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.gameCards[i], this.gameCards[j]] = [
        this.gameCards[j],
        this.gameCards[i],
      ];
    }
  }

  createCards() {
    this.gameBoard.innerHTML = "";

    this.gameCards.forEach((symbol: string, index: number) => {
      const cardElement = document.createElement("div");
      cardElement.className = "memory-card";
      cardElement.dataset.index = String(index);
      cardElement.dataset.symbol = symbol;

      cardElement.innerHTML = `
                        <div class="card-inner">
                            <div class="card-face card-front">
                                <i class="fas fa-question"></i>
                            </div>
                            <div class="card-face card-back">
                                <div class="card-content">${symbol}</div>
                            </div>
                        </div>
                    `;

      cardElement.addEventListener("click", () => this.flipCard(cardElement));
      this.gameBoard.appendChild(cardElement);
    });
  }

  flipCard(cardElement: HTMLElement) {
    if (
      this.isProcessing ||
      cardElement.classList.contains("flipped") ||
      cardElement.classList.contains("matched") ||
      this.flippedCards.length >= 2
    ) {
      return;
    }

    cardElement.classList.add("flipped");
    this.flippedCards.push(cardElement);

    if (this.flippedCards.length === 2) {
      this.attempts++;
      this.updateDisplay();
      this.checkMatch();
    }
  }

  checkMatch() {
    this.isProcessing = true;
    const [card1, card2]: HTMLElement[] = this.flippedCards;
    const symbol1: string | undefined = card1.dataset.symbol;
    const symbol2: string | undefined = card2.dataset.symbol;

    setTimeout(() => {
      if (symbol1 === symbol2) {
        // Match found
        card1.classList.add("matched");
        card2.classList.add("matched");
        this.matchedPairs++;
        this.showToast("Paire trouvée ! 🎉", "success");

        if (this.matchedPairs === this.cards.length) {
          setTimeout(() => {
            this.showToast(
              `Félicitations ! Vous avez gagné en ${this.attempts} tentatives ! 🏆`,
              "success"
            );
          }, 500);
        }
      } else {
        // No match
        card1.classList.add("error");
        card2.classList.add("error");

        setTimeout(() => {
          card1.classList.remove("flipped", "error");
          card2.classList.remove("flipped", "error");
        }, 1000);
      }

      this.flippedCards = [];
      this.isProcessing = false;
      this.updateDisplay();
    }, 600);
  }

  updateDisplay() {
    this.attemptsDisplay.textContent = this.attempts.toString();
    this.pairsDisplay.textContent = `${this.matchedPairs}/${this.cards.length}`;
  }

  showToast(message: string, type: string = "info") {
    // Remove existing toast
    const existingToast: Element | null = document.querySelector(".toast");
    if (existingToast) {
      existingToast.remove();
    }
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    // Remove toast after delay
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 400);
    }, 3000);
  }

  setCurrentYear() {
    document.getElementById("currentYear")!.textContent = String(
      new Date().getFullYear()
    );
  }

  restart() {
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.attempts = 0;
    this.isProcessing = false;
    this.shuffleCards();
    this.createCards();
    this.updateDisplay();
  }
}

// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const game = new MemoryGame();
  // Add restart functionality (optional)
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "r" || e.key === "R") {
      game.restart();
    }
  });
});
