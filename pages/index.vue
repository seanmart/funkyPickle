<template>
  <main id="home">
    <landing :data="home.landing"/>
    <navigation :data="nav"/>
    <template v-for="(item,a) in home.slices">
      <component :class="{'block--first':a == 0}" :is="item.slice_type.replace(/_/g, '-')" :data="item" />
    </template>
    <signup/>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: mapGetters(["home","nav"]),
  fetch({ store }) {
    return store.dispatch("getHome");
  },
  mounted(){
    !isMobile && scrollBuddy.reset()
  }
};
</script>

<style lang="css">
  #home{
    padding-left: 16.666vw;
  }

</style>
