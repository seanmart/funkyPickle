<template lang="html">
  <div class="rounded-lg bg-white graphic-box" :class="{'p-10':!full}">
    <slot/>
  </div>
</template>

<script>
export default {
  props:{
    full:Boolean
  }
}
</script>
