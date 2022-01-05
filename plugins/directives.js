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
