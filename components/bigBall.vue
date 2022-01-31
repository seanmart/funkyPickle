<template lang="html">
  <section class="c-big-ball">
    <div class="c-big-ball__ball"/>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.c-big-ball{
  position: relative;
  .c-big-ball__ball {
    position: absolute;
    left: 60%;
    top: $base-space;
    @include lime-gradient(45);
    width: 700px;
    height: 700px;
    border-radius: 50%;
  }

  @media(min-width: $screen-sm){
    .c-big-ball__ball {
      top: $screen-sm-space;
    }
  }

  @media(min-width: $screen-md){
    .c-big-ball__ball {
      width: 70vw;
      height: 70vw;
    }
  }
}
</style>
