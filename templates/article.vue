<template lang="html">
  <main>
    <div class="o-container">
      {{$route.params.article}}
    </div>
  </main>
</template>

<script>
export default {
  mounted() {
    this.$bus.$emit("LOADED");
  },
};
</script>

<style lang="scss"></style>
