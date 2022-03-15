<template lang="html">
  <button
    id="nav__button"
    class="md:hidden fixed bottom-30 right-20 z-100 h-70px w-70px rounded-full bg-black p-15px flex flex-col justify-center items-center"
    ref="btn"
    @click="$bus.$emit('TOGGLE_MOBILE_NAV')"
  >
    <div v-for="i in 3" class="h-2px w-full bg-white my-3px" ref="bar"/>
  </button>
</template>

<script>
export default {
  mounted(){
    
  }
}
</script>
