<template>
  <div>
    <h3>Players</h3>
      <ul>
        <li v-for="(player, index) in players" :key="index">
          {{ player.name }}</li>
      </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Players",
  computed: {
    ...mapState(["players"]),
  }
};
</script>

<style scoped>
  input {
    width: 100%;
  }
</style>
