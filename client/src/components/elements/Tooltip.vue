<!--<template>-->
<!--  <transition name="fade">-->
<!--    <div v-show="visible" class="bmg-tooltip" :class="customClass">-->
<!--      <div v-html="text"></div>-->
<!--      <div class="bmg-tooltip-arrow" x-arrow></div>-->
<!--    </div>-->
<!--  </transition>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      text: null,-->
<!--      visible: false,-->
<!--      customStyle: ""-->
<!--    };-->
<!--  },-->

<!--  computed: {-->
<!--    customClass() {-->
<!--      return this.customStyle && `bmg-tooltip-${this.customStyle}`;-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped lang="less">-->
<!--.fade-enter-active,-->
<!--.fade-leave-active {-->
<!--  transition: opacity 0.3s;-->
<!--}-->
<!--.fade-enter,-->
<!--.fade-leave-to {-->
<!--  opacity: 0;-->
<!--}-->

<!--.bmg-tooltip {-->
<!--  // all: initial; // 实战bug1: 被父元素继承伤害-->
<!--  &#45;&#45;bg: #000;-->
<!--  &#45;&#45;border: #000;-->
<!--  &#45;&#45;text: #fff;-->

<!--  max-width: 200px;-->
<!--  // 实战bug2: 你永远不知道你宿主会改变什么-->
<!--  // width: intrinsic; /* Safari/WebKit uses a non-standard name */-->
<!--  // width: -moz-max-content; /* Firefox/Gecko */-->
<!--  // width: -webkit-max-content; /* Chrome */-->

<!--  padding: 3px 8px;-->
<!--  border-radius: 4px;-->
<!--  border: 1px solid var(&#45;&#45;border);-->

<!--  background-color: var(&#45;&#45;bg);-->
<!--  color: var(&#45;&#45;text);-->
<!--  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.1);-->
<!--  z-index: 10;-->

<!--  &-arrow {-->
<!--    position: absolute;-->
<!--    content: "";-->
<!--    width: 0;-->
<!--    height: 0;-->
<!--    border: 5px solid transparent;-->

<!--    &::after {-->
<!--      content: "";-->
<!--      display: block;-->
<!--      position: absolute;-->
<!--      border: 5px solid transparent;-->
<!--    }-->
<!--  }-->

<!--  &[x-placement^="top"] {-->
<!--    margin-bottom: 5px;-->

<!--    .bmg-tooltip-arrow {-->
<!--      border-bottom-width: 0;-->
<!--      border-top-color: var(&#45;&#45;border);-->
<!--      bottom: -5px;-->
<!--      left: 0;-->

<!--      &::after {-->
<!--        border-bottom-width: 0;-->
<!--        border-top-color: var(&#45;&#45;bg);-->
<!--        bottom: 1px;-->
<!--        left: -5px;-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  &[x-placement^="bottom"] {-->
<!--    margin-top: 5px;-->

<!--    .bmg-tooltip-arrow {-->
<!--      border-top-width: 0;-->
<!--      border-bottom-color: var(&#45;&#45;border);-->
<!--      top: -5px;-->
<!--      // left: 50%;-->
<!--      // 实战bug3： x-arrow自动会计算-->
<!--      // transform: translateX(-50%);-->
<!--      left: 0;-->

<!--      &::after {-->
<!--        border-top-width: 0;-->
<!--        border-bottom-color: var(&#45;&#45;bg);-->
<!--        top: 1px;-->
<!--        left: -5px;-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  &[x-placement^="right"] {-->
<!--    margin-left: 5px;-->

<!--    .bmg-tooltip-arrow {-->
<!--      border-left-width: 0;-->
<!--      border-right-color: var(&#45;&#45;border);-->
<!--      top: 0;-->
<!--      left: -5px;-->

<!--      &::after {-->
<!--        border-left-width: 0;-->
<!--        border-right-color: var(&#45;&#45;bg);-->
<!--        top: -5px;-->
<!--        left: 1px;-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  &[x-placement^="left"] {-->
<!--    margin-right: 5px;-->

<!--    .bmg-tooltip-arrow {-->
<!--      border-right-width: 0;-->
<!--      border-left-color: var(&#45;&#45;border);-->
<!--      top: 0;-->
<!--      right: -5px;-->

<!--      &::after {-->
<!--        border-right-width: 0;-->
<!--        border-left-color: var(&#45;&#45;bg);-->
<!--        top: -5px;-->
<!--        right: 1px;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.bmg-tooltip-light {-->
<!--  &#45;&#45;bg: #fff;-->
<!--  &#45;&#45;border: #000;-->
<!--  &#45;&#45;text: #000;-->
<!--}-->
<!--</style>-->
