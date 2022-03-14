<template lang="html">
  <div class="flex flex-row">
    <div class="flex-initial">
      <h3 class="whitespace-nowrap mb-10 font-header uppercase text-30 leading-09 font-bold">
        <slot>{{value}}</slot>
      </h3>
      <div class="flex flex-row">
        <div class="bg-pink h-7px w-1/2" :style="{background: color1}"/>
        <div class="bg-green h-7px w-1/2" :style="{background: color2}"/>
      </div>
    </div>
    <div class="flex-auto self-end h-7px w-full" :style="{background: color3}"/>
  </div>
</template>

<script>
import config from '@/tailwind.config.js'
export default {
  props:{
    value:String,
    color1:{type:String,default: config.theme.colors.pink},
    color2:{type:String,default: config.theme.colors.green},
    color3:{type:String,default: config.theme.colors.black}
  }
}
</script>
