<template lang="html">
  <div class="fancy-image" v-if="image" :style="{paddingBottom:height}" ref="container">
    <div class="image" v-image:cover="image" :style="{top:`${-distance}px`}" ref="image"/>
  </div>
</template>

<script>
import {uid} from '../assets/js/helpers'
export default {
  props:{
    image: {type: String, default: null},
    height: {type: String,default: null},
    distance: {type: Number, default:0},
    scale:{type: Number, defualt: 0},
    start:{type:String,default:'top bottom'}
  },
  data:()=>({
    id:null
  }),
  mounted(){
    this.id = uid()
    let props = {ease:'none'}
    if (this.scale) props.scale = this.scale
    if (this.distance) props.y = this.distance

    props.scrollTrigger = {
      id: this.id,
      trigger:this.$refs.container,
      start: this.start,
      scrub: true
    }

    this.$nextTick(()=> gsap.to(this.$refs.image,1,props))
  },
  destroyed(){
    ScrollTrigger.getById(this.id).kill()
  }
}
</script>

<style lang="scss">
  .fancy-image{
    position: relative;
    overflow: hidden;

    .image{
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
    }
  }
</style>
