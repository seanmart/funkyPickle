<template lang="html">
  <div>
    <template v-for="slice in slices">
      <component :is="components[slice.slice_type]" :slice="slice" :useContainer="!inline"/>
    </template>
  </div>
</template>

<script>
import {components} from '@/slices'
export default {
  props:{
    slices:Array,
    inline:Boolean
  },
  data:()=>({components})
}
</script>
