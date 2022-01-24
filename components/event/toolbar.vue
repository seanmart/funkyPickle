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
    padding-top: 3vw;
    padding-bottom: 3vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    @include tropical-gradient;
  }

  .c-toolbar-btn{
    flex: 0 0 auto;
    margin-right: 3vw;
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
    }
  }
}
</style>
