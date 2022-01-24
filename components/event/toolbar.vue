<template lang="html">
  <section class="c-event-toolbar o-bottom">
    <sticky-header :endTrigger="endTrigger">
      <div class="c-toolbar--wrapper o-margins">
        <btn class="c-toolbar-btn c-left" knockout>Register</btn>
        <btn class="c-toolbar-btn" knockout icon="facebook" />
        <btn class="c-toolbar-btn" knockout icon="instagram" />
      </div>
    </sticky-header>
  </section>
</template>

<script>
export default {
  props:['endTrigger']
}
</script>

<style lang="scss">
.c-event-toolbar{

  .c-toolbar--wrapper{
    padding-top: 3.5vw;
    padding-bottom: 3.5vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    @include tropical-gradient;
  }

  .c-toolbar-btn{
    flex: 0 0 auto;
    margin-right: 3vw;
    opacity: 0;
    transform: scale(.7);
    transform-origin: center center;
    transition-timing-function: $ease;
    transition-property: opacity,transform;
    transition-duration: .5s;

    &:last-child{
      margin-right: 0px;
    }
    &.c-left{
      margin-right: auto;
    }
  }

  @media screen and (min-width: $medium){

    .c-toolbar--wrapper{
      padding-top: .75rem;
      padding-bottom: .75rem;
    }
    .c-toolbar-btn{
      margin-right: .75rem;
      opacity: 1;
      transform: scale(1);
    }
  }
}

.has-scrolled{
  .c-event-toolbar{
    .c-toolbar-btn{
      opacity: 1;
      transform: scale(1);
    }
  }
}


</style>
