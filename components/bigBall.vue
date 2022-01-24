<template lang="html">
  <section class="c-big-ball">
    <div class="c-ball--wrapper" ref="ballWrapper">
      <div class="c-ball" ref="ball" />
    </div>
  </section>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="scss">
.c-big-ball {
  position: relative;

  .c-ball--wrapper {
    position: absolute;
    top: $s-space;
    left: 60%;
    z-index: -1;
  }

  .c-ball {
    @include lime-gradient(45);
    width: 140vw;
    height: 140vw;
    border-radius: 50%;
  }

  @media screen and (min-width: $medium) {
    .c-ball {
      width: 70vw;
      height: 70vw;
    }
    .c-ball--wrapper{
      top: $m-space;
    }
  }
}
</style>
