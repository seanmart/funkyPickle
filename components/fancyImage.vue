<template lang="html">
  <div class="c-fancy-image" v-if="image" ref="container">
    <div class="c-fancy-image-media" v-image="image" :style="{top:`${-distance}px`}" ref="image"/>
  </div>
</template>

<script>
import {uid} from '../assets/js/helpers'
export default {
  props:{
    image: {type: String, default: null},
    distance: {type: Number, default:0},
    scale:{type: Number, defualt: 0},
    start:{type:String,default:'top bottom'},
    trigger: {type: [Object,String], default: null}
  },
  data:()=>({
    id:null
  }),
  mounted(){
    if(!this.image) return

    this.id = uid()
    let props = {ease:'none'}
    if (this.scale) props.scale = this.scale
    if (this.distance) props.y = this.distance

    props.scrollTrigger = {
      id: this.id,
      trigger:this.trigger || this.$refs.container,
      start: this.start,
      scrub: true
    }

    this.$nextTick(()=> gsap.to(this.$refs.image,1,props))
  },
  destroyed(){
    this.image && ScrollTrigger.getById(this.id).kill()
  }
}
</script>

<style lang="scss">
  .c-fancy-image{
    position: relative;
    overflow: hidden;
    height: 100%;

    .c-fancy-image-media{
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      will-change: transform;
    }
  }
</style>
