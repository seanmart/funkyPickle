import Vue from "vue";
import {uid} from '../assets/js/helpers'

Vue.directive("image", {
  bind: function(el, { value, arg }) {
    el.style.backgroundImage = `url("${value}")`;
    if (arg == "cover") {
      el.style.backgroundSize = "cover";
      el.style.backgroundRepeat = 'no-repeat';
    }
  }
});

Vue.directive("reveal", {
  inserted: function(el, { value = {}, arg },{context:{$store}}) {

    if (!value.after) return

    let anim = value.after()
    anim && anim.progress(0).pause()

    value.before && value.before()

    let unwatch = $store.watch((e)=>{
      if(e.reveal){
        anim && anim.play()
        unwatch()
      }
    })

  }
});
