<template lang="html">
  <div class="p-10px">
    <div class="widget shadow-bottom rounded-lg overflow-hidden" :class="containerClasses">
      <div class="p-15px font-bold" v-if="$slots.header" :class="headerClasses">
        <slot name="header"/>
      </div>
      <div class="p-15px" :class="contentClasses" v-if="!$slots.full">
        <slot/>
      </div>
      <div :class="contentClasses" v-if="$slots.full">
        <slot name="full"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    contentClasses:{type: String, default: ''},
    containerClasses:{type: String, default: 'bg-white'},
    headerClasses: {type: String, default: 'bg-lime'},
  }

}
</script>

<style lang="css">
  .widget{
    border: 1px solid rgba(theme('colors.bluergb'),.08);
  }
</style>
