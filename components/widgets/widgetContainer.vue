<template lang="html">
  <div class="c-widget-container" :class="classes">
    <div class="c-widget-container--wrapper u-shadow-y">
      <div class="c-widget__header u-p-md" v-if="$slots.header">
        <slot name="header"/>
      </div>
      <div class="c-widget__icon u-p-md" v-if="$slots.icon">
        <slot name="icon"/>
      </div>
      <div class="c-widget__content is-row u-p-md" v-if="$slots.contentRow">
        <slot name="contentRow"/>
      </div>
      <div class="c-widget__content" v-if="$slots.contentWide">
        <slot name="contentWide"/>
      </div>
      <div class="c-widget__content is-col u-p-md" v-if="$slots.content">
        <slot name="content"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    shrink: Boolean,
    headerPink: Boolean,
    headerBlack: Boolean,
    headerLime: Boolean,
    iconPink: Boolean,
    iconBlack: Boolean,
    iconLime: Boolean,
    contentPink: Boolean,
    contentBlack: Boolean,
    contentLime: Boolean,
    wideLeft: Boolean,
    wideRight: Boolean
  },
  computed:{
    classes(){
      return{
        'should-shrink':this.shrink,
        'has-icon': this.$slots.icon,
        'has-header-pink': this.headerPink,
        'has-header-black': this.headerBlack,
        'has-header-lime': this.headerLime,
        'has-icon-pink': this.iconPink,
        'has-icon-black': this.iconBlack,
        'has-icon-lime': this.iconLime,
        'has-content-pink': this.contentPink,
        'has-content-black': this.contentBlack,
        'has-content-lime': this.contentLime,
        'is-wide-left': this.wideLeft,
        'is-wide-right': this.wideRight
      }
    }
  }
}
</script>

<style lang="scss">
.c-widget-container{
  padding: .75rem;
  fill: $pink;
  color:$black;

  .c-widget-container--wrapper{
    display: flex;
    flex-direction: column;
    background: white;
    overflow: hidden;
    border-radius: 8px;
    outline: 1px solid rgba($blue,.07);
    outline-offset: -1px;
  }

  .c-widget__header{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .c-widget__icon{
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
      flex: 0 0 auto;
      width: 4rem;
    }
  }

  .c-widget__content{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    &.is-row{
      flex-direction: row;
    }
    &.is-col{
      flex-direction: column;
    }
  }

  &.has-icon{
    .c-widget-container--wrapper{
      flex-direction:row
    }
  }
  &.should-shrink{
    text-align: center;
    pding:0px;
    .c-widget-container--wrapper{
      display: inline-flex;
      text-align: left;
    }
  }
  &.is-wide-left{
    .c-widget__content{
      pding-left: 0px;
    }
  }
  &.is-wide-right{
    .c-widget__content{
      pding-right: 0px;
    }
  }

  &.has-header-pink .c-widget__header,
  &.has-icon-pink .c-widget__icon,
  &.has-content-pink .c-widget__content{
    background:$pink;
    color: white;
    fill:white;
  }
  &.has-header-black .c-widget__header,
  &.has-icon-black .c-widget__icon,
  &.has-content-black .c-widget__content{
    background:$black;
    color: white;
    fill:white;
  }
  &.has-header-lime .c-widget__header,
  &.has-icon-lime .c-widget__icon,
  &.has-content-lime .c-widget__content{
    background:$lime
  }
}
</style>
