<template lang="html">
  <div class="c-widget" v-if="!hide">
    <div class="c-widget--wrapper">
      <div class="c-widget-header" v-if="$slots.header">
        <slot name="header"/>
      </div>
      <div class="c-widget-content" v-if="$slots.content">
        <slot name="content"/>
      </div>
      <div class="c-widget-content is-wide" v-if="$slots.contentWide">
        <slot name="contentWide"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{hide:Boolean,default:false}
}
</script>

<style lang="scss">
  .c-widget{
    .c-widget--wrapper{
      border-radius: 8px;
      background: white;
      box-shadow: 0px 2px 5px rgba($blue, 0.2);
      overflow: hidden;
    }
    .c-widget-header{
      padding: 4vw 3vw;
    }
    .c-widget-content{
      padding:3vw;
      &.is-wide{
        padding: 0px;
      }
    }

    @media screen and (min-width: $medium){
      .c-widget-header{
        padding: 1.5rem 1.25rem;
      }
      .c-widget-content{
        padding:1.25rem;
      }
    }
  }
</style>
