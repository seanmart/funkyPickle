<template lang="html">
  <div class="rounded-lg bg-white shadow-b-blue" :class="{'p-10':!full}">
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
