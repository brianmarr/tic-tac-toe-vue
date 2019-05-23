
<template>
  <v-app class="grey lighten-5">
    <app-menubar @startNewGame="startNewGame($event)"></app-menubar>
    <v-content>
      <app-game :gameParams="gameParams" v-if="this.gameStarted"></app-game>
    </v-content>
  </v-app>
</template>



<script>
import MenuBar from "./components/MenuBar";
import Game from "./components/Game";

export default {
  name: "App",
  components: {
    "app-menubar": MenuBar,
    "app-game": Game
  },
  data() {
    return {
      gameParams: null,
      /*
      versusPlayer: null,
      opponentType: null,
      */
      gameStarted: false
    };
  },
  methods: {
    // Receive event emit from child (MenuBar)
    startNewGame(gameParams) {
      this.gameParams = gameParams;
      /*
      this.versusPlayer = emitParams.versusPlayer;
      this.playerName = emitParams.playerName;
      this.oppName = emitParams.oppName;
      */
      // 5ms timer exists to time for page to read 'this.gameStarted = false', so that game can properly reset
      this.gameStarted = false;
      setTimeout(() => {
        this.gameStarted = true;
      }, 5);
    }
  }
};
</script>
