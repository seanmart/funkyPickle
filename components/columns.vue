<template lang="html">
  <div id="columns">
    <template v-for="i in 6">
      <div class="column--wrapper">
        <div class="column"/>
      </div>
    </template>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#columns{
  position: fixed;
  top:0px;
  left:0px;
  right:0px;
  height: 100vh;
  display: flex;
  flex-direction: row;
  z-index: -2;

  .column--wrapper{
    flex: 0 0 auto;
    width: 16.6666vw;
    position: relative;
    overflow: hidden;

    .column{
      position: absolute;
      top:0px;
      bottom:0px;
      right:0px;
      left:0px;
      background: $lime;
      transform: translateX(-101%);
    }
  }
}
</style>
