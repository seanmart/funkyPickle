<template lang="html">
  <div class="label inline-flex flex-row items-center">
    <icon :icon="icon" class="h-20px mr-10px"/>
    <p v-html="value"/>
  </div>
</template>

<script>
export default {
  props:['icon','value']
}
</script>
