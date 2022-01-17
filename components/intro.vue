<template lang="html">
  <section class="c-intro o-container o-top o-bottom" ref="container">
    <div class="c-title" v-if="data.primary.title.length > 0" ref="title">
      <template v-for="(line, i) in data.primary.title">
        <div class="c-line--wrapper">
          <h1 ref="titleLine" v-html="line.text" class="c-line t-header" :class="{ ['c-rainbow']: line.spans.length > 0 }" />
        </div>
      </template>
    </div>

    <div ref="text" v-if="data.primary.text.length > 0" class="c-text t-body-xl u-gap-top-rg u-text-gap-rg" v-html="$prismic.asHtml(data.primary.text)" />
  </section>
</template>

<script>
import { getStyle } from "@/assets/js/helpers";
export default {
  props: ["data"],
  mounted() {
    if (this.data.primary.title.length > 0) {
      window.addEventListener("resize", this.calculateHeader);
      this.calculateHeaderInit();
    }
    this.$bus.$once("REVEAL", this.handleReveal);
    setTimeout(this.handleMounted, 500);
  },
  destroyed() {
    if (this.data.primary.title.length > 0) {
      window.removeEventListener("resize", this.calculateHeader);
    }
  },
  methods: {
    handleMounted() {
      this.$refs.titleLine && gsap.set(this.$refs.titleLine, { y: "120%" });
      this.$refs.text && gsap.set(this.$refs.text, { y: "100%", opacity: 0 });
    },
    handleReveal() {
      let tl = gsap.timeline({ scrollTrigger: { trigger: this.$refs.container, start: "top 50%", once: true } });
      this.$refs.titleLine && tl.to(this.$refs.titleLine, 1.5, { y: 0, ease: "power4.out", stagger: 0.25 });
      this.$refs.text && tl.to(this.$refs.text, 1.5, { y: 0, ease: "power4.out", opacity: 1 }, ">-1");
    },
    calculateHeaderInit() {
      let fontWidth = 0;
      for (let i = 0; i < this.$refs.titleLine.length; i++) {
        let w = this.$refs.titleLine[i].offsetWidth;
        if (w > fontWidth) fontWidth = w;
      }
      let fontHeight = this.$refs.titleLine[0].offsetHeight;
      let fontSize = getStyle(this.$refs.titleLine[0], "font-size");
      let letterSpacing = getStyle(this.$refs.titleLine[0], "letter-spacing");
      this.fontMultiplier = (fontHeight / fontSize) * 0.88;
      this.fontSizeRatio = fontHeight / fontWidth;
      this.letterSpacingRatio = letterSpacing / fontSize;
      this.calculateHeader();
    },
    calculateHeader() {
      let width = this.$refs.title.offsetWidth;
      let newFontSize = width * this.fontSizeRatio * this.fontMultiplier;
      let newLetterSpacing = newFontSize * this.letterSpacingRatio;

      this.$refs.title.style.fontSize = `${newFontSize}px`;
      this.$refs.title.style.letterSpacing = `${newLetterSpacing}px`;
    },
  },
};
</script>

<style lang="scss">
.c-intro {
  position: relative;

  .c-title {
    font-size: 50px;
    letter-spacing: -2.2px;
  }

  .c-line--wrapper {
    overflow: hidden;
    margin-bottom: -5%;
    .c-line {
      display: inline-block;
    }
  }

  .c-rainbow {
    @include rainbow-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
  }

  .c-text {
    max-width: 35ch;
  }
}
</style>
