<template lang="html">
  <container inner class="sponsors bg-black">
    <section-title :value="data.primary.title" knockout/>
    <div class="flex flex-row flex-wrap items-stretch -mx-5px">
      <template v-for="item in data.items">
        <div class="sponsors__sponsor--wrapper p-5px flex flex-row items-stretch">
          <div class="sponsors__sponsor rounded-lg h-full w-full p-20 flex justify-center items-center">
            <img class="w-full opacity-60 image" :src="item.logo.url"/>
          </div>
        </div>
      </template>
    </div>
  </container>
</template>

<script>
export default {
  props:{
    data:{type:Object,default:null},
  },
}
</script>

<style lang="css">
.sponsors__sponsor{
  background: rgba(255,255,255,.07);
}

.sponsors__sponsor--wrapper{
  flex: 0 0 50%;
  align-self: stretch;
}

@media screen and (min-width:theme('screens.lg')){
  .sponsors__sponsor--wrapper{
    flex: 0 0 33.333%;
  }
}
</style>
