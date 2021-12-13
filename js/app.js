/**
 * Pseudocode
 * 
 * 
 */
const GuessingGame = function(){
  return {
    wins: 0,
    losses: 0,
    selectedWordIndex: 0,
    currWord: null,
    words: ["bumper", "bunk", "storage", "painless", "trigger"],
    getNewWord: function() {
      /* Return a new word from the word list */
      const word = this.words[this.selectedWordIndex];
      this.selectedWordIndex++;
      return word;
    },
    getLetterContainer: function(str, index) {
      let letterEl = document.createElement("div");
      letterEl.id = `l-${index}`;
      letterEl.className = "col letter";
      letterEl.style.border = "1px solid #999";
      console.log('str', str);
      letterEl.textContent = str;
      return letterEl;
    },
    getKeypress: function(evt) {
      const key = evt.key;
      let container = document.getElementById("lettersContainer");
      //container.innerHTML = "";
      [...this.currWord].forEach((letter, index) => {
        if (key !== letter) {
          return;
        }
        console.log(key, letter, index)
        const str = (key == letter) ? letter : "___" ;
        const letterEl = this.getLetterContainer(str, index);
        console.log(letterEl)
        container.append(letterEl);
      });
    },
    showEmptySpaces: function() {
      let container = document.getElementById("lettersContainer");
      [...this.currWord].forEach((element, index) => {
        const letterEl = this.getLetterContainer("___", index);
        container.append(letterEl);
      });
    },
    startNewGame: function() {
      const container = document.getElementById("lettersContainer");
      container.innerHTML = "";
      // Pick a word from the list
      console.log(this, this.getNewWord())
      this.currWord = this.getNewWord();
      this.showEmptySpaces();
    }

  }
};

const GameApp = {
  newGame: GuessingGame(),
  startBtn: document.getElementById("startGameBtn"),
  /* Listen for keypresses */
  initGame: function() {
    this.startBtn.addEventListener("click", function() {
      this.startBtn.style.display = "none";
      this.newGame.startNewGame();
    }.bind(this));
    document.addEventListener("keyup", this.newGame.getKeypress.bind(this.newGame));
  }
};

GameApp.initGame();