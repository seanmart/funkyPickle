<template lang="html">
  <section class="c-intro o-container o-space" ref="container">
    <div class="c-title" v-if="data.primary.title.length > 0" ref="title">
      <template v-for="(line, i) in data.primary.title">
        <div class="c-line--wrapper">
          <h1 ref="line" v-html="line.text" class="c-line t-header" :class="{ ['c-rainbow']: line.spans.length > 0 }" />
        </div>
      </template>
    </div>

    <div ref="text" v-if="data.primary.text.length > 0" class="c-text u-space-top" v-html="$prismic.asHtml(data.primary.text)" />
  </section>
</template>

<script>
import { getStyle } from "@/assets/js/helpers";
export default {
  props: ["data"],
  mounted() {
    // this.$bus.$once("REVEAL", this.handleReveal);
    // setTimeout(this.handleMounted, 500);
  },
  destroyed() {
    if (this.data.primary.title.length > 0) {
      window.removeEventListener("resize", this.calculateHeader);
    }
  },
  methods: {
    handleMounted() {
      this.$refs.line && gsap.set(this.$refs.line, { y: "120%" });
      this.$refs.text && gsap.set(this.$refs.text, { y: "100%", opacity: 0 });
    },
    handleReveal() {
      let tl = gsap.timeline({ scrollTrigger: { trigger: this.$refs.container, start: "top 50%", once: true } });
      this.$refs.line && tl.to(this.$refs.line, 1.5, { y: 0, ease: "power4.out", stagger: 0.25 });
      this.$refs.text && tl.to(this.$refs.text, 1.5, { y: 0, ease: "power4.out", opacity: 1 }, ">-1");
    }
  },
};
</script>

<style lang="scss">
.c-intro {
  position: relative;

  .c-title {
    font-size: 12vw;
    letter-spacing: -2.2px;
    line-height: .8;
  }

  .c-line--wrapper {
    overflow: hidden;
    .c-line {
      display: inline-block;
      line-height: .8;
    }
  }

  .c-rainbow {
    @include rainbow-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
  }

  .c-text {
    font-size: 4.5vw;
    max-width: 35ch;
  }

  @media screen and (min-width: $medium){

    .c-title{
      font-size: calc(7vw + 10px)
    }

    .c-text{
      font-size: 1.4rem;
    }
  }
}
</style>
