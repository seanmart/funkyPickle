<template lang="html">
  <div class="p-05">
    <div class="widget shadow-bottom rounded-lg overflow-hidden" :class="bg">
      <div class="p-15" v-if="$slots.header">
        <slot name="header"/>
      </div>
      <div class="p-15" v-if="!$slots.full">
        <slot/>
      </div>
      <div class="" v-if="$slots.full">
        <slot name="full"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    bg:{type: String, default: 'bg-white'}
  }

}
</script>

<style lang="css">
  .widget{
    border: 1px solid rgba(theme('colors.bluergb'),.08);
  }
</style>
