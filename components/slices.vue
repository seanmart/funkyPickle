<template lang="html">
  <div class="page-content">
    <template v-for="(item,a) in data">
      <component v-if="item.hasComponent && item.primary.publish" :is="item.component" :data="item" />
    </template>
  </div>
</template>

<script>
export default {
  props:['data']
}
</script>
