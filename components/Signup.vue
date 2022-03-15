<template lang="html">
  <Container class="bg-lime relative overflow-hidden">

    <div class="relative z-20 flex flex-col xl:flex-row items-center">
      <div class="flex-auto text-center xl:text-left mb-20 xl:mb-0 xl:mr-20">
        <prismic-rich-text :field="data.title" class="font-header font-bold uppercase leading-09 text-40 md:text-50"/>
      </div>
      <div class="flex-initial">
        <sliceZone :slices="data.form" :resolver="resolver"/>
      </div>
    </div>

    <div class="absolute -inset-10 z-10">
      <div class="h-full bg-cover bg-center" :style="{backgroundImage:`url(/fp_giraffe.svg)`}" />
    </div>

  </Container>
</template>

<script>
import {mapState} from 'vuex'
import {resolver} from '@/assets/helpers'
export default {
  data:()=>({
    resolver
  }),
  computed: mapState({
    data: state => state.settings.signup
  })
}
</script>
