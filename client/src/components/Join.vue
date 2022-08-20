<template>
  <div class="flex flex-col text-combo">
    <h4>Enter your name below to join the game:</h4>
    <div class="flex flex-row">
      <input type="text" id="name" aria-label="your name">
      <button @click="create">Join Game</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Join",
  methods: {
    create() {
      const name = document.querySelector("#name").value;
      this.$emit('create', name);
    }
  },
};
</script>

<style scoped>
</style>
