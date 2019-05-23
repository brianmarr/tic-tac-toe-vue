
<template>
  <v-container class="game-container">
    <v-card round class="grey lighten-1 game-card" id="game-card">
      <!-- nine tic tac toe squares -->
      <v-btn
        v-for="(square, index) in squares"
        round
        color="white"
        class="tile"
        :class="{'green': square.highlighted, 'blue--text': (activeOwner == 1 && index == activeIndex), 'red--text': (activeOwner==2 && index==activeIndex)}"
        :key="index"
        @click="squareClicked(index)"
        ref="squareForAI"
      >{{ square.status }}</v-btn>
      <!-- game over overlay -->
      <v-card v-if="gameOver" flat round class="white game-card overlay"></v-card>
      <!-- game over msgs -->
      <div v-if="gameOver" class="game-over-msg-container">
        <h1 v-if="!winner" class="green--text game-over-msg">Tie game</h1>
        <h1
          v-else-if="playerOneTurn && gameParams.versusPlayer"
          class="blue--text game-over-msg"
        >{{ gameParams.playerName }} wins</h1>
        <h1
          v-else-if="playerOneTurn && !gameParams.versusPlayer"
          class="blue--text game-over-msg"
        >You win</h1>
        <h1
          v-else-if="!playerOneTurn && gameParams.versusPlayer"
          class="red--text game-over-msg"
        >{{ gameParams.oppName }} wins</h1>
        <h1 v-else class="red--text game-over-msg ai-msg">You lost to {{ oppName }} the AI</h1>
      </div>
    </v-card>

    <!-- player turn indicators -->
    <v-layout row class="pt-3 pb-4 p-card-container" justify-space-around>
      <v-card flat class="blue white--text p-card" :class="{'lighten-4': !playerOneTurn}">
        <v-flex xs12 class="text-xs-center">
          <h1 class="mt-2">{{ gameParams.playerName }}</h1>
        </v-flex>
      </v-card>
      <v-card flat class="red white--text p-card" :class="{'lighten-4': playerOneTurn}">
        <v-flex xs12 class="text-xs-center">
          <h1 class="mt-2">{{ oppName }}</h1>
        </v-flex>
      </v-card>
    </v-layout>
  </v-container>
</template>




<script>
import * as oppAI from "../assets/ai.js";
import * as names from "../assets/names.js";
import * as squareData from "../assets/squareData.js";

export default {
  props: {
    gameParams: {
      type: Object
    }
  },
  data() {
    return {
      playerOneTurn: true,
      activeIndex: null,
      activeOwner: null,
      squares: [
        { status: null, owner: null, highlighted: false },
        { status: null, owner: null, highlighted: false },
        { status: null, owner: null, highlighted: false },
        { status: null, owner: null, highlighted: false },
        { status: null, owner: null, highlighted: false },
        { status: null, owner: null, highlighted: false },
        { status: null, owner: null, highlighted: false },
        { status: null, owner: null, highlighted: false },
        { status: null, owner: null, highlighted: false }
      ],
      gameOver: false,
      gameOverStatus: null,
      winner: false,

      // emptySquares is passed into the AI api to help compute a valid random tile to place turn
      emptySquares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      ai: new oppAI.ai(names.bank)
    };
  },
  methods: {
    // Process when a square is clicked
    squareClicked(index) {
      // click is only valid if game is still in progress, the square clicked on is empty, and it's a human's turn.
      if (!this.gameOver && this.squares[index].status == null) {
        this.fillSquare(index);
        // Check for a winner. If no winner then check for full board.
        this.checkForWinner();
        if (!this.gameOver) {
          this.checkForFullBoard();
        }
        // Changes turns for next turn
        if (!this.gameOver) {
          this.playerOneTurn = !this.playerOneTurn;
        }

        if (!this.gameOver && !this.humanTurn) {
          this.AITakesTurn();
        }
      }
    },

    // Populates square with X or O
    fillSquare(index) {
      if (this.playerOneTurn) {
        this.squares[index].status = "X";
        this.squares[index].owner = 1;
      } else {
        this.squares[index].status = "O";
        this.squares[index].owner = 2;
      }
      this.activeIndex = index;
      this.activeOwner = this.squares[index].owner;
      // Remove filled square from emptySquares array
      this.emptySquares = this.emptySquares.filter(
        squareNum => squareNum != index
      );
    },

    // Check if a winning combination is present on the board
    checkForWinner() {
      squareData.winningCombos.forEach(set => {
        if (this.squares[set[0]].status != null) {
          if (
            this.squares[set[0]].status == this.squares[set[1]].status &&
            this.squares[set[1]].status == this.squares[set[2]].status &&
            this.squares[set[0]].status == this.squares[set[2]].status
          ) {
            this.gameOver = true;

            set.forEach(index => {
              this.squares[index].highlighted = true;
            });

            this.winner = true;
          }
        }
      });
    },

    // Check if board is filled (if filled, tie game)
    checkForFullBoard() {
      this.gameOver = true;
      this.squares.forEach(square => {
        if (square.status == null) {
          this.gameOver = false;
        }
      });
      if (this.gameOver) {
        this.gameOverStatus = "Tie game";
      }
    },

    // AI Takes their turn
    AITakesTurn() {
      let randomSq = this.ai.computeTurn(this.emptySquares);
      setTimeout(this.$refs.squareForAI[randomSq].$el.click(), 1000);
    }
  },
  computed: {
    humanTurn() {
      if (this.gameParams.versusPlayer || this.playerOneTurn) {
        return true;
      } else {
        return false;
      }
    },
    oppName() {
      if (this.gameParams.oppName === null) {
        return this.ai.name;
      }
      return this.gameParams.oppName;
    }
  }
};
</script>


<style>
.game-container {
  max-width: 450px;
}
.game-card {
  width: 402px;
  height: 402px;
  border-radius: 30px;
}
.overlay {
  position: absolute;
  top: 0px;
  opacity: 0.9;
}
.tile {
  margin: 2px;
  width: 130px;
  height: 130px;
  font-size: 80px;
}
.p-card-container {
  min-height: 100px;
  min-width: 400px;
}
.p-card {
  min-width: 140px;
  border-radius: 20px;
}
.game-over-msg-container {
  position: absolute;
  top: 130px;
  width: 100%;
}
.game-over-msg {
  font-size: 80px;
  font-weight: bold;
  text-align: center;
}
.ai-msg {
  font-size: 40px;
}
</style>