<template lang="html">
  <svg v-if="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.45 371.43">
    <path id="Path_43" data-name="Path 43" class="cls-1" d="M43.83,0V37.77H307L0,344.73l26.71,26.7,307-307V327.6h37.77V0Z"/>
  </svg>

  <svg v-else-if="arrows" class="arrows" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84.5 603.57">
    <polygon class="cls-1" points="42.25 603.57 84.5 531.14 0 531.14 42.25 603.57"/>
    <polygon class="cls-1" points="42.25 470.79 84.5 398.36 0 398.36 42.25 470.79"/>
    <polygon class="cls-1" points="42.25 338 84.5 265.57 0 265.57 42.25 338"/>
    <polygon class="cls-1" points="42.25 205.21 84.5 132.79 0 132.79 42.25 205.21"/>
    <polygon class="cls-1" points="84.5 0 0 0 42.25 72.43 84.5 0"/>
  </svg>
</template>

<script>
export default {
  props:{
    arrow:Boolean,
    arrows:Boolean
  }
}
</script>
