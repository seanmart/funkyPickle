<template lang="html">
  <p class="label text-11px font-semibold opacity-40 uppercase tracking-widest mb-02" v-html="value" :class="{'mt-10':!first}" />
</template>

<script>
export default {
  props:{
    value:String,
    first:Boolean
  }
}
</script>
