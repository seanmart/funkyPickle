<template lang="html">
  <svg viewbox="0 0 500 500" id="svg-gradients">
    <linearGradient id="rainbow-move" x1="-100%" y1="0" x2="200%" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" :stop-color="blue"><animate attributeName="offset" values="0;.25;0;0;0" dur="5s" repeatCount="indefinite" /></stop>
      <stop offset=".5" :stop-color="purple"><animate attributeName="offset" values=".5;.75;.5;.25;.5" dur="5s" repeatCount="indefinite" /></stop>
      <stop offset="1" :stop-color="pink"><animate attributeName="offset" values="1;1;1;.75;1" dur="5s" repeatCount="indefinite" /></stop>
    </linearGradient>

    <linearGradient id="rainbow-vertical" x1="0" y1="0" x2="0" y2="100%" gradientUnits="userSpaceOnUse">
      <stop offset="0" :stop-color="pink"></stop>
      <stop offset=".5" :stop-color="purple"></stop>
      <stop offset="1" :stop-color="blue"></stop>
    </linearGradient>

    <linearGradient id="lime-vertical" x1="0" y1="0" x2="0" y2="100%" gradientUnits="userSpaceOnUse">
      <stop offset="0" :stop-color="lime"></stop>
      <stop offset="1" :stop-color="lime2"></stop>
    </linearGradient>
  </svg>
</template>

<script>
export default {
  data: () => ({
    pink:'#ff0093',
    purple:'#5600f7',
    blue:'#00aeef',
    lime:'#e4fe57',
    lime2:'#c2fa45',
    dur: "5s",
  }),
};
</script>
<style lang="scss">
#svg-gradients {
  position: fixed;
  top: 0px;
  right: 100%;
  opacity: 0;
  z-index: -1;
}
</style>
