<template lang="html">
  <button type="button" name="button" :class="`btn btn--${type} btn--${size} fnt--header`">

    <template v-if="link">
      <nuxt-link :to="link">
        <slot/>
      </nuxt-link>
    </template>

    <template v-else>
      <slot/>
    </template>

    <div class="bg"/>
  </button>
</template>

<script>
export default {
  props:{
    link:{type:String,default:null},
    type:{type:String,default:'pink'},
    size:{type:String,default:'md'}
  }
}
</script>

<style lang="scss">
  .btn{
    text-transform: uppercase;
    font-size: 1.75rem;
    border: none;

    &.btn--md{padding: 10px 20px}

    &.btn--pink{background:$pink;color:white}
    &.btn--lime{background:$lime;color:$black}
  }
</style>
