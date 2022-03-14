<template>
  <Container doubleTop doubleBottom outerTop outerBottom class="sponsors-section bg-black text-white" v-if="sponsors.length > 0" :id="slice.id || null">

    <Title v-if="slice.primary.title" :value="slice.primary.title" class="mb-40" color3="#ffffff"/>
    <prismic-rich-text v-if="slice.primary.description" :field="slice.primary.description" class="mb-40"/>

    <div class="flex flex-row flex-wrap items-stretch -mx-5px">
      <template v-for="sponsor in sponsors">
        <div class="sponsor-wrapper p-5px flex flex-row items-stretch">
          <div class="sponsor rounded-lg h-full w-full p-20 flex justify-center items-center">
            <img class="w-full opacity-60 image" :src="sponsor.logo.url"/>
          </div>
        </div>
      </template>
    </div>

  </Container>
</template>

<script>

export default {
  name: "Sponsors",
  props: ['slice'],
  computed:{
    sponsors(){
      return this.slice.items
    }
  }
}
</script>

<style lang="css">
.sponsor{
  background: rgba(255,255,255,.07);
}

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
