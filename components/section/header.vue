<template lang="html">
  <container noBottom v-if="data.primary.text">
    <prismic-rich-text :field="data.primary.text" :htmlSerializer="htmlSerializer" class="font-header font-bold uppercase leading-09 text-60"/>
  </container>
</template>

<script>
export default {
  props:['data'],
  methods:{
    htmlSerializer(type, element, content, children){
      if(content && content.indexOf('-') > 0){
        let words = content.split(" ").map(c => c.indexOf('-') > 0 ? `<span class="whitespace-nowrap">${c}</span>`: c)
        content = words.join(" ")
      }
      switch(type){
        case 'em':
        return `<span class="text-green">${content}</span>`
        case 'strong':
        return `<span class="text-pink">${content}</span>`
        default:
        return content
      }
    }
  }
}
</script>
