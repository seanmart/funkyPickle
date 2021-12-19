<template lang="html">
  <div id="rails">
    <template v-for="i in 5">
      <div class="rail"/>
    </template>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#rails{
  position: fixed;
  top:0px;
  left:0px;
  right:0px;
  height: 100vh;
  z-index: -1;
  opacity: .1;

  .rail{
    position: absolute;
    top:0px;
    bottom:0px;
    width:1px;
    background: $pink;
    z-index: 2;

    &:nth-child(5n+1){left:16.666%}
    &:nth-child(5n+2){left:33.333%}
    &:nth-child(5n+3){left:50%}
    &:nth-child(5n+4){left:66.666%}
    &:nth-child(5n+5){left:83.333%}
  }

}
</style>
