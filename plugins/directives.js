import Vue from "vue";
import {uid} from '../assets/js/helpers'

Vue.directive("image", {
  bind: function(el, { value, arg }) {
    el.style.backgroundImage = `url("${value}")`;
    if (arg == "cover") {
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center center";
      el.style.backgroundRepeat = 'no-repeat';
    }
  }
});

Vue.directive("distance", {
  inserted: function(el, { value, arg }) {
    let id = uid()
    let elem = el
    let dist = value || 200

    arg == 'child' && (elem == el.childNodes)
    el.setAttribute('data-speed-id',id)
    gsap.to(elem,1,{y: dist,ease:'none',scrollTrigger:{
      id,
      trigger: el,
      start:'top bottom',
      scrub: true
    }})
  },
  unbind: function(el){
    let id = el.getAttribute('data-speed-id')
    let st = ScrollTrigger.getById(id)
    st && st.kill()
  }
});

Vue.directive('fragments', {
  inserted: function(el) {
    const children = Array.from(el.children)
    const parent = el.parentElement
    children.forEach((item) => { parent.appendChild(item) })
    parent.removeChild(el)
  }
});
