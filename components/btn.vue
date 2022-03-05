<template lang="html">
  <nuxt-link v-if="to" :to="to" :class="classes" :style="styles" ref="b">
    <span>
      <icon v-if="iconBefore" :icon="iconName"/>
      <slot>{{value}}</slot>
      <icon v-if="iconAfter" :icon="iconName"/>
    </span>
  </nuxt-link>

  <a v-else-if="href" :href="href" :class="classes" :style="styles" target="_blank" @click="handleClick" ref="b">
    <span>
      <icon v-if="iconBefore" :icon="iconName"/>
      <slot>{{value}}</slot>
      <icon v-if="iconAfter" :icon="iconName"/>
    </span>
  </a>

  <button v-else :class="classes" :style="styles" @click="handleClick" ref="b">
    <span>
      <icon v-if="iconBefore" :icon="iconName"/>
      <slot>{{value}}</slot>
      <icon v-if="iconAfter" :icon="iconName"/>
    </span>
  </button>

</template>

<script>
import config from '@/tailwind.config.js'
import {LightenDarkenColor} from '@/assets/helpers'
export default {
  props:{
    href:String,
    to: String,
    value: String,
    icon: Object,
    prevent: Boolean,
    big:Boolean,
    small:Boolean,
    wide:Boolean,
    bg:String,
    hoverBg:String,
    activeBg:String,
    color: String,
    hoverColor: String,
    activeColor: String,
    active:Boolean
  },
  mounted(){
    this.el = this.$refs.b.$el || this.$refs.b
    this.addListeners()
    this.active && this.isActive()
  },
  destroyed(){
    this.removeListeners()
  },
  watch:{
    active(a){
      a ? this.isActive() : this.isNormal()
    }
  },
  methods:{
    getColor(c){
      let val = this.getValues(c)
      let color = config.theme.colors[val[0]] || val[0]
      return val[1] ? LightenDarkenColor(color,val[1]) : color
    },
    getValues(c){
      return c.indexOf('+') > 0 ? c.split('+').map((v,i) => i == 0 ? v : parseInt(v))
             : c.indexOf('-') > 0 ? c.split('-').map((v,i) => i == 0 ? v : 0 - parseInt(v))
             : [c,0]
    },
    handleClick(e){
      if(this.prevent) e.preventDefault()
      this.$emit('clicked')
    },
    addListeners(){
      this.el.addEventListener('mouseenter',this.isHover)
      this.el.addEventListener('mouseleave',this.isNotHover)
      this.el.addEventListener('mousedown',this.isActive)
      this.el.addEventListener('mouseup',this.isNotActive)
    },
    removeListeners(){
      this.el.removeEventListener('mouseenter',this.isHover)
      this.el.removeEventListener('mouseleave',this.isNotHover)
      this.el.removeEventListener('mousedown',this.isActive)
      this.el.removeEventListener('mouseup',this.isNotActive)
    },
    isHover(){
      if(this.active) return
      this.hovered = true
      this.el.style.background = this.colors.hoverBg
      this.el.style.color = this.colors.hoverColor
    },
    isNotHover(){
      this.hovered = false
      this.isNormal()
    },
    isNormal(){
      if(this.active || this.hovered) return
      this.el.style.background = this.colors.bg
      this.el.style.color = this.colors.color
    },
    isActive(){
      this.el.style.background = this.colors.activeBg
      this.el.style.color = this.colors.activeColor
    },
    isNotActive(){
      this.hovered ? this.isHover() : this.isNormal()
    }
  },
  computed:{
    colors(){
      return{
        bg: this.getColor(this.bg || 'black'),
        color: this.getColor(this.color || 'white'),
        hoverBg: this.getColor(this.hoverBg || `${this.bg || 'black'}+20`),
        hoverColor:this.getColor(this.hoverColor || this.color || 'white'),
        activeBg: this.getColor(this.activeBg || `${this.bg || 'black'}-20`),
        activeColor: this.getColor(this.activeColor || this.color || 'white')
      }
    },
    iconBefore(){
      return this.icon && this.icon.before
    },
    iconAfter(){
      return this.icon && this.icon.after
    },
    iconName(){
      return this.icon ? this.icon.icon : null
    },
    classes(){
      let standard = 'button inline-flex items-center justify-center rounded-md bg-gray font-medium cursor-pointer'
      let custom = {
        'h-35 md:h-25': this.small,
        'h-55 md:h-45': this.big,
        'h-45 md:h-35':!this.big && !this.small,
        'px-20':this.small && !this.wide,
        'px-30': (this.small && this.wide) || (!this.small && !this.big && !this.wide),
        'px-40': (this.big && !this.wide) || (!this.small && !this.big && this.wide),
        'px-50': this.big && this.wide
      }
      return[standard,custom]
    },
    styles(){
      return {
        background: this.colors.bg,
        color: this.colors.color
      }
    }
  }
}
</script>

<style media="screen">
.button{
  transition: transform .25s;
  transform: scale(1.001);
}

.button:active{
  transform: scale(.95)
}
</style>
