<template lang="html">
  <svg viewbox="0 0 500 500" id="svg-gradients">
    <linearGradient id="lime-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop class="lime" offset="0%" />
      <stop class="green" offset="100%" />
    </linearGradient>
  </svg>
</template>

<style lang="css">
#svg-gradients {
  position: fixed;
  top: 0px;
  right: 100%;
  opacity: 0;
  z-index: -1;
}
#svg-gradients .green{
  stop-color: theme('colors.green');
}
#svg-gradients .lime{
  stop-color: theme('colors.lime');
}
</style>
