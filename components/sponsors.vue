<template lang="html">
  <container inner class="sponsors bg-black">
    <section-title :value="data.primary.title" knockout/>
    <div class="flex flex-row flex-wrap items-stretch -mx-5px">
      <template v-for="item in data.items">
        <div class="flex-auto w-1/2 lg:w-1/3 p-5px">
          <div class="sponsors__sponsor rounded-lg h-full w-full p-20 flex justify-center items-center">
            <img class="w-full opacity-60" :src="item.logo.url"/>
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
</style>
