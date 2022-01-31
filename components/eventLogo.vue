<template lang="html">
  <div class="c-event-logo u-shadow-y">
    <div v-if="isLive" class="c-event-logo__live t-header" v-html="'now'"/>
    <div class="c-event-logo__image" v-image:cover="image"/>
  </div>
</template>

<script>
export default {
  props:{
    image: String,
    start: String,
    end: String,
  },
  computed:{
    isLive(){
      if (!this.start || !this.end) return false
      let now = Date.now()
      let start = new Date(this.start).getTime()
      let end = new Date(this.end).getTime()
      return now > start && now < end
    }
  }
}
</script>

<style lang="scss">
.c-event-logo{
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  overflow: hidden;

  .c-event-logo__image{
    height: 100%;
    width: 100%;
    background-position: center center;
  }

  .c-event-logo__live{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    padding: .27rem 0px .13rem;
    background: $pink;
    color: white;
    z-index: 1;
    text-align: center;
    font-size: 1.2rem;
  }

  @media(min-width: $screen-lg){
    height: 8rem;
    width: 8rem;
  }
}
</style>
