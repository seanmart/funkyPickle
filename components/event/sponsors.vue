<template lang="html">
  <container-widget v-if="logos" class="flex flex-row flex-wrap">
    sponsors
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
