<template lang="html">
  <container-widget v-if="logos" class="flex flex-row flex-wrap">
    <div class="-mx-05">
      <template v-for="logo in logos">
        <div class="flex-grow-0 flex-shrink-0 p-05">
          <img :src="logo" class="h-30"/>
        </div>
      </template>
    </div>
  </container-widget>
</template>

<script>
export default {
  props:['data'],
  computed:{
    logos(){
      let logos = []
      this.data.sponsors.forEach(s =>{
        if(s.image.url) logos.push(s.image.url)
      })
      return logos.length > 0 ? logos : null
    }
  }
}
</script>
