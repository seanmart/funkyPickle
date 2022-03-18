<template>
  <component
    v-if="sponsors.length > 0"
    :is="useContainer ? 'Container' : 'div'"
    doubleTop doubleBottom outerTop outerBottom
    class="sponsors-section"
    :class="{'bg-black text-white':useContainer}"
    :id="slice.id || null"
  >

    <Title v-if="title" :value="title" class="mb-40" :knockout="useContainer"/>
    <prismic-rich-text v-if="description" :field="description" class="mb-40"/>

    <div class="flex flex-row flex-wrap items-stretch justify-center" :class="{'bg-black p-10 rounded-lg':!useContainer}">
      <template v-for="sponsor in sponsors">
          <div class="sponsor p-10 w-1/2 lg:w-1/3">
            <img class="image" :src="sponsor.logo.url"/>
          </div>
      </template>
    </div>

  </component>
</template>

<script>

export default {
  name: "SponsorsSlice",
  props: ['slice','useContainer'],
  computed:{
    title(){
      return this.slice.primary.title || null
    },
    description(){
      return this.slice.primary.description.length > 0
           ? this.slice.primary.description : null
    },
    sponsors(){
      return this.slice.items
    }
  }
}
</script>

<style lang="css">


.sponsor-wrapper{
  flex: 0 0 50%;
  align-self: stretch;
}

@media screen and (min-width:theme('screens.lg')){
  .sponsor-wrapper{
    flex: 0 0 33.333%;
  }
}
</style>
