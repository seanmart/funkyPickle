import Vue from "vue";

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

Vue.directive("scroll", {
  bind: function(el, { value, arg }) {
    if (!value.el) value.el = el;
    let id = scroll.add(value);
    el.setAttribute("data-scroll-id", id);
  },
  unbind: function(el) {
    let id = el.getAttribute("data-scroll-id");
    scroll.remove(id);
  }
});
