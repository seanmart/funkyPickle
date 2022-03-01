<template lang="html">
  <div v-if="icon" class="flex justify-center items-center" :class="classes">
    <icon :icon="icon" class="max-w-full max-h-full"/>
  </div>
</template>

<script>
export default {
  props:{
    icon: String,
    small: Boolean,
    large: Boolean,
    black: Boolean,
    lime: Boolean,
    white: Boolean,
    circle: Boolean
  },
  computed:{
    classes(){
      return{
        'min-w-50px h-50px w-50px p-10px': !this.small && !this.large,
        'min-w-25px h-25px w-25px p-5px': this.small,
        'min-w-80px h-80px w-80px p-15px': this.large,
        'rounded-lg': !this.circle && !this.small,
        'rounded-md': !this.circle && this.small,
        'rounded-full': this.circle,
        'bg-pink fill-white': !this.black && !this.white && !this.lime,
        'bg-black fill-white': this.black,
        'bg-white fill-pink': this.white,
        'bg-lime': this.lime,
      }
    }
  }
}
</script>
