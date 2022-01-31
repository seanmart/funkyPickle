<template lang="html">
  <main id="c-type">
    <div class="o-container o-space">
      <h3 class="t-header-xxxl">xxxl <br> header</h3>
      <h3 class="t-header-xxl">xxl <br> header</h3>
      <h3 class="t-header-xl">xl <br> header</h3>
      <h3 class="t-header-lg">lg <br> header</h3>
      <h3 class="t-header-md">md <br> header</h3>
      <h3 class="t-header-rg">rg <br> header</h3>
      <h3 class="t-header-sm">sm <br> header</h3>
      <h3 class="t-header-xs">xs <br> header</h3>
    </div>
    <div class="o-container o-space">
      <h5 class="t-xxxl">
        t-xxxl
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
      </h5>
      <h5 class="t-xxl">
        t-xxl
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
      </h5>
      <h5 class="t-xl">
        t-xl
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
      </h5>
      <h5 class="t-lg">
        t-lg
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
      </h5>
      <h5 class="t-md">
        t-md
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
      </h5>
      <h5 class="t-rg">
        t-rg
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
      </h5>
      <h5 class="t-sm">
        t-sm
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
      </h5>
      <h5 class="t-xs">
        t-xs
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
      </h5>
    </div>
  </main>
</template>

<script>
export default {
  mounted(){
    this.$bus.$emit('LOADED')
  }
}
</script>

<style lang="scss">
#c-type{
  h5{
    margin-bottom: 3rem;
  }
}
</style>
