<template lang="html">
  <div class="slice-content">
    <template v-for="(slice,i) in slices">
      <component :is="slice.component" :data="slice" :class="{'is-first':i == 0, 'is-last': i == slices.length - 1}"/>
    </template>
  </div>
</template>

<script>
import {camelize} from '@/assets/helpers'
export default {
  name: 'Slices',
  props:{
    data:{type:Array,default:()=>([])}
  },
  computed:{
    slices(){
      let slices = []
      this.data.forEach(i => i.primary.publish && slices.push({...i,component:camelize(i.slice_type)}))
      return slices
    }
  }
}
</script>
