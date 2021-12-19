<template lang="html">
  <main v-if="data" class="page--margin">
    <div class="page--content">
      <template v-for="(item,a) in data">
        <component :is="item.slice_type.replace(/_/g, '-')" :data="item" />
      </template>
    </div>
    <signup/>
  </main>
  <page-404 v-else />
</template>

<script>
export default {
  fetch({ store,route }) {
    let key = route.path.replace('/','')
    if (key == "") key = "home"
    return store.dispatch("getPage",key);
  },
  mounted(){
    !isMobile && scrollBuddy.reset()
  },
  computed:{
    data(){
      let state = this.$store.state
      let key = this.$route.path.replace('/','')
      if (key == "") key = "home"
      return state.pages[key]
      ? state.pages[key].data.body
      : null
    }
  }
}
</script>
