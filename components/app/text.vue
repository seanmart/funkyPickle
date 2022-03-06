<template lang="html">
  <div class="text-block" :class="{'text-white':knockout}">
    <prismic-rich-text :field="data" :htmlSerializer="htmlSerializer" />
  </div>
</template>

<script>
export default {
  props:['data','knockout'],
  methods:{
    htmlSerializer(type, element, content, children){
      switch(type){
        case 'heading1':
        return `<h1 class="text-center text-40 mb-35 font-bold font-header uppercase leading-09">${children}</h1>`
        case 'heading2':
        return `<h2 class="text-24 mb-20 font-bold">${children.join('')}</h2>`
        case 'heading3':
        return `<h3 class="text-20 mb-20 font-semibold">${children.join('')}</h3>`
        case 'heading4':
        return `<h4 class="text-18 mt-20 mb-05 font-semibold">${children.join('')}</h4>`
        case 'heading5':
        return `<h5 class="text-17 mb-18 font-semibold">${children.join('')}</h5>`
        case 'heading6':
        return `<h6 class="text-16 mb-15 font-semibold">${children.join('')}</h6>`
        case 'paragraph':
        return `<p class="mb-15">${children.join('')}</p>`
        case 'span':
        return content
        case 'list-item':
        return `<div class="bg-gray py-05 px-10 rounded-md mb-02 font-semibold inline-block">${children.join('')}</div>`
        case "group-list-item":
        return `<div class="my-20">${children.join('<br>')}</div>`
        case "strong":
        return `<span class="${this.knockout ? 'text-lime' : 'text-pink'} font-bold">${content}</span>`
      }
      return null
    }
  }
}
</script>

<style lang="css">
.text-block h1:last-child,
.text-block h2:last-child,
.text-block h3:last-child,
.text-block h4:last-child,
.text-block h5:last-child,
.text-block h6:last-child,
.text-block p:last-child{
  margin-bottom: 0px;
}
</style>
