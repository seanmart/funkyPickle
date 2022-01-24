<template lang="html">
  <section class="c-event-landing">
    <fancy-image class="c-image" :scale="1.3" :start="0" :key="image.url" :image="image.url" />
    <div class="c-logo--wrapper">
      <div class="c-logo" v-image:cover="logo.url" />
    </div>
  </section>
</template>

<script>
export default {
  props:['logo','image']
}
</script>

<style lang="scss">
.c-event-landing {
  @include dark-gradient(0);
  height: 110vw;
  max-height: 420px;
  position: relative;

  .c-logo--wrapper {
    position: absolute;
    z-index: 1;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 0px;
    transform: translateZ(0);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .c-logo {
    width: 23vw;
    height: 23vw;
    border-radius: 50%;
    background-position: center center;
    box-shadow: 0px 2px 5px rgba($blue, 0.2);
  }

  @media screen and (min-width: $medium){
    height: 15rem;

    .c-logo{
      width: 8rem;
      height: 8rem;
    }
  }


}
</style>
