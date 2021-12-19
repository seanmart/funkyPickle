<template lang="html">
  <main id="page-404">
    <div class="block block--no-top block--no-bottom">
      <div class="content--wrapper">
        <h1 class="title title--md">out of bounds!</h1>
        <p class="text--bg">The page your looking for doen't exist yet</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
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

    .title{
      margin-bottom: 2rem;
    }

  }
</style>
