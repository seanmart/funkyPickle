<template lang="html">
  <component noBottom :is="noContainer ? 'div' : 'Container'" class="font-header font-bold uppercase text-50 md:text-60 leading-09">
    <prismic-rich-text :field="value"/>
  </component>
</template>

<script>
export default {
  props:{
    value: {type: Array, defualt:()=>([])},
    noContainer: {type: Boolean, default: false}
  }
}
</script>

<style lang="css">
</style>
