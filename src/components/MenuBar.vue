
<template>
  <v-toolbar app class="yellow lighten-3">
    <!-- Title -->
    <v-toolbar-title class="headline text-uppercase font-weight-black">
      <span class="green--text text--darken-3">Tic</span>
      <span class="red--text text--darken-3">Tac</span>
      <span class="blue--text text--darken-3">Toe</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!---->
    <!---->
    <!-- Game Parameter Selection Components -->
    <!-- Opponent type selection -->
    <div v-if="menuStatus===0 && !gameStarted" class="ml-5">
      <span class="subheading font-weight-bold text-uppercase mr-3">Select your opponent:</span>
      <v-btn-toggle mandatory class="mr-5">
        <v-btn
          v-on:click="setOpponentToPlayer"
          class="px-4 blue darken-3 white--text font-weight-bold"
        >Player</v-btn>
        <v-btn
          v-on:click="setOpponentToAI"
          class="px-5 red darken-3 white--text font-weight-bold"
        >AI</v-btn>
      </v-btn-toggle>
    </div>
    <!-- Self name selection -->
    <v-text-field
      v-if="menuStatus===1 && !gameStarted"
      label="Your name"
      v-model="playerName"
      solo
      class="mr-5"
    ></v-text-field>
    <!-- opponent name selection (if versing player) -->
    <v-text-field
      v-if="menuStatus===2 && versusPlayer && !gameStarted"
      label="Opponent name"
      v-model="oppName"
      solo
      class="mr-5"
    ></v-text-field>
    <!---->
    <!---->
    <!-- Green Button -->
    <!-- next input field section button -->
    <v-btn v-if="!readyToStart" @click="updateMenuStatus" class="green white--text">
      <span class="font-weight-bold">Next</span>
      <v-icon right>arrow_right</v-icon>
    </v-btn>
    <!-- start (or restart) game button -->
    <v-btn v-else @click="startNewGame" class="green white--text">
      <span class="font-weight-bold">{{ startButtonMessage }}</span>
      <v-icon right>arrow_right</v-icon>
    </v-btn>
    <!---->
    <!---->
  </v-toolbar>
</template>




<script>
export default {
  data() {
    return {
      versusPlayer: true,
      startButtonMessage: "Start",
      menuStatus: 0,
      gameStarted: false,
      playerName: null,
      oppName: null
    };
  },
  methods: {
    // Define opponent based on user choice
    setOpponentToPlayer() {
      this.versusPlayer = true;
    },
    setOpponentToAI() {
      this.versusPlayer = false;
    },
    updateMenuStatus() {
      this.menuStatus++;
    },
    // Start game. Emits opponent choice up to parent (app)
    startNewGame() {
      this.gameStarted = true;
      this.startButtonMessage = "Restart";
      this.$emit("startNewGame", {
        versusPlayer: this.versusPlayer,
        playerName: this.playerName,
        oppName: this.oppName
      });
    }
  },
  computed: {
    readyToStart() {
      if (
        this.menuStatus === 2 ||
        (this.menuStatus === 1 && !this.versusPlayer)
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style>
.test-class {
  width: 1000px;
}
</style>