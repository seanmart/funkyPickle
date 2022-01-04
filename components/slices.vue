<template lang="html">
  <div class="slices">
    <template v-for="(item,a) in data">
      <component v-if="item.hasComponent" :is="item.component" :data="item" />
    </template>
  </div>
</template>

<script>
export default {
  props:{data:Array}
}
</script>
