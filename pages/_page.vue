<template lang="html">
  <main class="page--margin">
    {{$store.state.pages}}
    <div class="page--content">
      <template v-for="(item,a) in data">
        <component v-if="item.primary.publish" :is="item.slice_type.replace(/_/g, '-')" :data="item" />
      </template>
    </div>
    <signup/>
  </main>
</template>

<script>
export default {
  fetch({ store,route }) {
    let key = route.path.replace('/','')
    if (key == "") key = "home"
    return store.dispatch("getPage",key);
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
