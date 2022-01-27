<template lang="html">
  <div class="c-widget">
    <div class="c-widget--wrapper">
      <div class="c-widget-header" v-if="$slots.header">
        <slot name="header"/>
      </div>
      <div class="c-widget-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .c-widget{
    .c-widget--wrapper{
      border-radius: 8px;
      background: white;
      box-shadow: 0px 2px 5px rgba($blue, 0.2);
      position: relative;
      z-index: 1;
      overflow: hidden;
    }
    .c-widget-header{
      padding: 4vw 3vw;
    }
    .o-widget-space{
      padding:3vw;
    }
    .o-widget-gap{
      margin-right: 3vw;
    }

    @media screen and (min-width: $medium){
      .c-widget-header{
        padding: 1.5rem 1.25rem;
      }
      .o-widget-space{
        padding:1.25rem;
      }
      .o-widget-gap{
        margin-right: 1.25rem;
      }
    }
  }
</style>
