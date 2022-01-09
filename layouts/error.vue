<template lang="html">
  <main id="page-404">
      <div class="content--wrapper">
        <h1 class="t-header u-gap-bottom-sm">out of bounds!</h1>
        <p class="">The page your looking for doen't exist</p>
      </div>
  </main>
</template>

<script>
export default {
  layout:'empty'
}
</script>

<style lang="scss">
  #page-404{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $lime;

    .content--wrapper{
      text-align: center;
      color: $pink;
    }

    .t-header{
      font-size: 15vw;
    }

  }
</style>
