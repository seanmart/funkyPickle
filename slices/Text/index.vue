<template>
<Container class="text-section" :id="slice.id || null">
  <Title v-if="slice.primary.title" :value="slice.primary.title" class="mb-40"/>
  <div class="shadow-b-blue rounded-lg overflow-hidden" :class="classes">
    <prismic-image v-if="slice.primary.image.url" :field="slice.primary.image"/>
    <div class="px-20 py-50 md:px-50 text-content max-w-800px mx-auto">
      <prismic-rich-text :field="slice.primary.text" :htmlSerializer="serializer"/>
    </div>
  </div>
</Container>
</template>

<script>

export default {
  name: "TextBlock",
  props: ["slice"],
  computed:{
    classes(){
      let bg = this.slice.primary.background
      return{
        'bg-white': bg == 'white' || bg == null,
        'bg-black text-white': bg == 'black',
        'bg-pink text-white': bg == 'pink',
        'bg-green text-white': bg == 'green',
        'bg-lime': bg == 'lime'
      }
    }
  },
  methods:{
    serializer(type, element, content, children,item){
      switch(type){
        case 'heading1':
        return `<h1 class="text-35 md:text-40 mb-35 font-bold font-header uppercase leading-09">${children}</h1>`
        case 'heading2':
        return `<h2 class="text-25 md:text-30 mb-35 font-bold font-header uppercase leading-10">${children.join('')}</h2>`
        case 'heading3':
        return `<h3 class="text-20 md:text-25 mb-30 font-bold font-header uppercase leading-10">${children.join('')}</h3>`
        case 'heading4':
        return `<h4 class="text-15 md:text-16 mb-20 font-semibold">${children.join('')}</h4>`
        case 'heading5':
        return `<h5 class="text-14 md:text-15 mb-20 font-semibold">${children.join('')}</h5>`
        case 'heading6':
        return `<h6 class="text-13 md:text-14 mt-20 font-semibold">${children.join('')}</h6>`
        case 'paragraph':
        return `<p class="mb-15">${children.join('')}</p>`
        case 'span':
        return content
        case 'list-item':
        return `<li class="list-disc ml-10 pl-05 marker:text-${this.slice.primary.callout || 'pink'} font-medium">${children.join('')}</li>`
        case "group-list-item":
        return `<ul class="my-20">${children.join('')}</ul>`
        case "strong":
        return `<span class="text-${this.slice.primary.callout || 'pink'} font-bold">${content}</span>`
      }
      return null
    }
  }
}
</script>

<style lang="css">
  .text-content *:last-child{
    margin-bottom:0px;
  }
  .text-section + .text-section{
    padding-top: 20px;
  }
  .text-section + .form-section{
    padding-top: 0px;
  }
</style>
