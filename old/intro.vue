<template lang="html">
  <container class="intro" ref="container">
      <template v-for="line in theTitle">
        <div class="overflow-hidden">
          <h1
            v-html="line.text"
            class="intro__title inline-block font-header uppercase text-80 sm:text-90 font-bold tracking-tight leading-08"
            :class="{'text-pink':line.spans.length > 0}"
          />
        </div>
      </template>

      <template v-if="theText.length > 0">
        <div class="max-w-35ch mt-40 text-18 leading-md" v-html="$prismic.asHtml(theText)"/>
      </template>
  </container>
</template>

<script>
export default {
  props:{
    data:{type:Object,default:null},
    title:{type:Array,default:null},
    text:{type:Array,default:null}
  },
  computed:{
    theTitle(){
      if(this.data) return this.data.primary.title
      if(this.title) return this.title
      return []
    },
    theText(){
      if(this.data) return this.data.primary.text
      if(this.text) return this.text
      return []
    }
  }
}
</script>
