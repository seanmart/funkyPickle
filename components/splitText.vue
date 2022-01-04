<template lang="html">
  <div class="c-split-text">
    <template v-for="(word,line) in split(text)">
        <slot v-bind="{word,line}"/>
    </template>
  </div>
</template>

<script>
export default {
  props:{text:String},
  methods:{
    split(val){
      if(!val) return []
      return val.split('\n').map(v => `${v} `)
    }
  }
}
</script>

<style lang="css">
</style>
