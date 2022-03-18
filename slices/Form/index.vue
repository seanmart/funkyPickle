<template lang="html">
  <component :is="useContainer ? 'Container' : 'div'" :id="slice.id || null" class="form-section">
    <div :class="classes.wrapper">

      <div v-if="title" class="pl-20 md:pl-50 p-10" :class="classes.header">
        <h3 v-html="title" class="font-header uppercase text-25"/>
      </div>

      <div :class="classes.content">
        <prismic-rich-text v-if="description" :field="description" class="mb-30 font-bold text-15"/>
        <ElementForm :fields="slice.items" :action="this.slice.primary.action" :multiColumn="!this.slice.primary.inline"/>
      </div>

    </div>
  </component>
</template>

<script>
export default {
  name:"FormSlice",
  props:['slice','useContainer'],
  computed:{
    title(){
      return this.slice.primary.title || null
    },
    description(){
      return this.slice.primary.description.length > 0
           ? this.slice.primary.description : null
    },
    classes(){
      let inline = this.slice.primary.inline
      let bg = this.slice.primary.background

      return{
        wrapper:{
          'rounded-lg overflow-hidden shadow-b-blue': !inline
        },
        header:{
          'bg-black text-white': bg == 'white' || bg == 'lime' || bg == null,
          'bg-lime': bg == 'black' || bg == 'pink' || bg == 'green'
        },
        content:{
          'bg-white': bg == 'white' || (bg == null && !inline),
          'bg-black text-white': bg == 'black',
          'bg-pink text-white': bg == 'pink',
          'bg-green text-white': bg == 'green',
          'bg-lime': bg == 'lime',
          'p-20 md:px-50 md:py-40': !inline,
        }
      }
    }
  }
}
</script>
