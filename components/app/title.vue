<template lang="html">
  <div class="section-title flex flex-row">
    <div class="flex-initial">
      <h3 class="whitespace-nowrap mb-10 text-22 md:text-20 leading-none font-semibold" :class="{'text-white': knockout}"><slot>{{value}}</slot></h3>
      <div class="flex flex-row">
        <div class="bg-pink h-3px w-1/2" :style="{background: color1}"/>
        <div class="bg-green h-3px w-1/2" :style="{background: color2}"/>
      </div>
    </div>
    <div class="flex-auto self-end h-3px w-full" :class="{'bg-black': !knockout, 'bg-lime': knockout}"/>
  </div>
</template>

<script>
export default {
  props:{
    value:String,
    knockout: Boolean,
    color1: String,
    color2:String
  }
}
</script>
