<template lang="html">
  <div class="widget icon-widget bg-white shadow-bottom rounded-lg overflow-hidden">

    <div v-if="icon" class="flex flex-row items-stretch" :class="contentClass">
      <div class="bg-pink flex-initial flex justify-center items-center p-10px">
        <icon :icon="icon" class="fill-white w-40px"/>
      </div>
      <div class="flex-auto p-25px">
        <slot/>
      </div>
    </div>

    <div v-if="full" :class="contentClass">
      <slot/>
    </div>

    <div v-if="!icon && !full" class="py-15px px-25px" :class="contentClass">
      <slot/>
    </div>

  </div>
</template>

<script>
export default {
  props:{
    icon: {type: String, default: null},
    full: {type: Boolean, default: null},
    contentClass:{type:String,default:null}
  }

}
</script>

<style lang="css">
  .widget{
    border: 1px solid rgba(theme('colors.bluergb'),.1);
  }
</style>
