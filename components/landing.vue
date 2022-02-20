<template lang="html">
  <container noX noTop class="landing h-600 md:h-400" :class="{'has-video': theVideo}">
      <div class="relative overflow-hidden h-full">

        <div
          ref="image"
          v-if="theImage"
          class="landing__image absolute inset-0 bg-cover bg-no-repeat"
          :class="{'bg-center-top': !center, 'bg-center': center}"
          :style="{backgroundImage:`url(${theImage})`}"
        />

        <video class="landing__video w-full h-full" autoplay loop muted>
          <source :src="theVideo" type="video/mp4">
        </video>

      </div>
  </container>
</template>

<script>
export default {
  props:{
    data:{type:Object,default:null},
    image:{type:String,default:null},
    video:{type:String,default:null},
    center:{type:Boolean,default:null}
  },
  mounted(){
    if (this.$refs.image){
      this.anim = gsap.fromTo(this.$refs.image,1,{scale:1.01},{scale:1.5,ease:'none',scrollTrigger:{
        scrub:true,
        start:0,
        end:'bottom top'
      }})
    }
  },
  destroyed(){
    this.anim && this.anim.kill()
  },
  computed:{
    theVideo(){
      return this.data ? 'placeholderVideo.mp4' : null
    },
    theImage(){
      if (this.data && this.data.primary.image.url) return this.data.primary.image.url
      if (this.image) return this.image
      return null
    }
  }
}
</script>

<style lang="css">
  .landing__video{
    o-object-fit: cover;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .is-mobile .landing.has-video video{
    display: none;
  }

  .is-desktop .landing.has-video .landing__image{
    display: none;
  }

</style>
