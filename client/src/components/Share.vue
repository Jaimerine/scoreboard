<template>
  <div>
    <h3>Share Game Code:</h3>
    <div class="flex flex-row">
      <input readonly aria-label="room code" type="text" name="share" id="share" :value=shareRoom>
      <button @click="copy">Copy</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Share",
  props: ["roomId"],
  computed: {
    shareRoom() {
      // const baseUrl = window.location.origin;
      // const shareRoom = baseUrl + '/' + this.roomId;
      const shareRoom = this.roomId;
      return shareRoom;
    },
  },
  methods: {
    copy() {
      const shareRoom = document.getElementById("share");
      shareRoom.select();
      shareRoom.setSelectionRange(0, 99999); //for mobile devices
      navigator.clipboard.writeText(shareRoom.value);
      alert("Copied to clipboard");
    }
  },
};
</script>

<style scoped>
  input {
    width: 100%;
  }
</style>
