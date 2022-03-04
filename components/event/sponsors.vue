<template lang="html">
  <widget v-if="data.sponsors.length > 0" class="flex flex-row flex-wrap">
    sponsors
  </widget>
</template>

<script>
export default {
  props:['data']
}
</script>
