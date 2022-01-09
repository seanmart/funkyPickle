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

    value.before && value.before()
    if (!value.after) return

    let unwatch = null
    unwatch = $store.watch((e)=>{
      if(e.reveal){
        value.after()
        unwatch && unwatch()
      }
    })

  }
});

Vue.directive("wordsplit", {
  inserted: function(el, { value, arg }) {
    let html = ""
    el.innerText.split(' ').forEach(w => html += `<div class="word--wrapper" style="display:inline-block;overflow:hidden"><div class="word">${w}&nbsp</div></div>`)
    el.innerHTML = html

  }
});
