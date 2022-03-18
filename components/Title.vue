<template lang="html">
  <div class="flex flex-row" :class="{'text-white': knockout}">
    <div class="flex-initial">
      <h3 class="whitespace-nowrap mb-10 font-header uppercase text-30 leading-09 font-bold">
        <slot>{{value}}</slot>
      </h3>
      <div class="flex flex-row">
        <div class="bg-pink h-7px w-1/2" />
        <div class="bg-green h-7px w-1/2" />
      </div>
    </div>
    <div class="flex-auto self-end h-7px w-full" :class="{'bg-white': knockout, 'bg-black': !knockout}"/>
  </div>
</template>

<script>
import config from '@/tailwind.config.js'
export default {
  props:{
    value:String,
    knockout: Boolean
  }
}
</script>
