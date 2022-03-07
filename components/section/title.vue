<template lang="html">
  <container noBottom>
    <app-title :value="data.primary.title"/>
  </container>
</template>

<script>
export default {
  props:['data']
}
</script>
