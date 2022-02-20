<template lang="html">
  <svg viewbox="0 0 500 500" id="svg-gradients">
    <linearGradient id="rainbow-move" x1="0%" x2="60%" y1="0" y2="0" gradientUnits="userSpaceOnUse">
      <template v-for="(color,i) in rainbow">
        <stop :offset="i/(rainbow.length - 1)" :stop-color="color">
        </stop>
      </template>
    </linearGradient>

    <linearGradient id="rainbow-vertical" x1="0" y1="0" x2="0" y2="100%" gradientUnits="userSpaceOnUse">
      <template v-for="(color,i) in rainbow">
        <stop :offset="i/(rainbow.length - 1)" :stop-color="color"></stop>
      </template>
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
    orange: '#ff903b',
    darkPurple:'#652e6e',
    black:'#0a0a0e',
    dur: "5s"
  }),
  computed:{
    rainbow(){
      return [this.lime,this.orange,this.pink,this.darkPurple,this.black]
    }
  }
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
