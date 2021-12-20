<template lang="html">
  <div id="rails" class="page-margins">
    <div class="rails--wrapper">
    <template v-for="i in 5">
      <div class="rail" :class="`rail--${i}`"/>
    </template>
    </div>
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
  opacity: .05;

  .rails--wrapper{
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .rail{
    width:1px;
    flex: 0 0 auto;
    height: 100%;
    background: $black;
    z-index: 2;
  }


  @media screen and (max-width: $mobile){
    .rail--4{display: none}
    .rail--5{display: none}
  }

}
</style>
