<template>
  <section class="section" :id="slice.id || null">
    <PrismicRichText :field="slice.primary.title" class="title" />
    <PrismicRichText :field="slice.primary.description" />
  </section>
</template>

<script>

export default {
  name: "Table",
  props: ['slice'],
}
</script>
