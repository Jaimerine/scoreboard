<template>
  <div class="position-relative">
    <div class="spinner-container">
      <div :class="{'loading': !loaded}">
        <slot />
      </div>
      <div class="spinner" v-if="!loaded">
        <h2 class="sr-only">Loading...</h2>
        <font-awesome-icon icon="fas fa-spinner" pulse aria-hidden="true" />
      </div>
    </div>

  </div>
</template>

<script>

export default ({
  name: "StatusLoading",
  props: ["loaded"],
})
</script>

<style scoped lang="scss">
.loading {
  opacity: 0.1;
}

.spinner-container {
  position: relative;
  min-width: 3rem;
  min-height: 3rem;
}

.spinner {
  color: var(--primary-colour);
  position: absolute;
  z-index: 100;
  top: calc(50% - 1.5rem);
  left: calc(50% - 1.5rem);
  font-size: 3rem;
}

</style>