<template lang="html">
  <section class="big-quote block" ref="container">
    <div class="big-quote--wrapper" ref="quote" :class="{hide}">
      <split-text :text="data.primary.text[0].text">
        <template #default="{word,line}">
          <div class="line--wrapper" :key="line">
            <h1 class="title title--ft" v-html="word"/>
          </div>
        </template>
      </split-text>
    </div>
  </section>
</template>

<script>
export default {
  props:{data:Object},
  data:()=>({
    fontSize:10,
    hide: true
  }),
  mounted(){
    this.fit()
  },
  methods:{
    fit(){
        this.$refs.quote.style.fontSize = `${this.fontSize}vw`
        let containerWidth = this.$refs.container.offsetWidth
        let quoteWidth = this.$refs.quote.offsetWidth

        if (quoteWidth > containerWidth){
          this.fontSize -= .5
          setTimeout(this.fit,60)
        } else {
          this.hide = false
          scrollBuddy.update()
        }
    }
  }
}
</script>

<style lang="scss">
.big-quote{

  .big-quote--wrapper{
    display: inline-block;
    font-size: 10vw;
    &.hide{
      opacity: 0
    }
  }

  .title{
    line-height: 1;
    font-weight: 600;
    text-transform: uppercase;
    font-variation-settings: "wdth" 56,"wght" 600;
    color: $pink;
    white-space: nowrap;
  }
}
</style>
