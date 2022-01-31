<template lang="html">
  <tr class="c-widget-row" :class="classes">
    <td class="c-widge-row__label t-bold" v-html="`${label}:`"/>
    <td class="c-widge-row__value t-bold-xl" v-html="value"/>
  </tr>
</template>

<script>
export default {
  props:{
    label:String,
    value:[String,Number],
    tight: Boolean,
    big: Boolean
  },
  computed:{
    classes(){
      return{
        'is-tight': this.tight,
        'has-big-value':this.big
      }
    }
  }
}
</script>

<style lang="scss">
.c-widget-row{
  width: 100%;
  &:first-child{td{padding-top:0px}}
  &:last-child{td{padding-bottom:0px}}
  td{
    padding-top: .5rem;
    padding-bottom: .5rem;
  }
  .c-widge-row__label{
    text-align: right;
    text-transform: uppercase;
    opacity: .4;
    letter-spacing: .1rem;
    line-height: 1;
    font-size: .9rem;
    padding-right: 1rem;
  }
  .c-widge-row__value{
    line-height: 1;
    font-size: 1.2rem;
  }
  &.is-tight{
    td{
      padding-top: .25rem;
      padding-bottom: .25rem;
    }
  }
  &.has-big-value{
    .c-widge-row__value{
      line-height: 1;
      font-size: 1.4rem;
    }
  }
}
</style>
