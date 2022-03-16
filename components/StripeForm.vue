<template lang="html">
  <div class="">

  </div>
</template>

<script>
export default {
  head(){
    return{
      script: [
        { src: "https://js.stripe.com/v3/" }
      ],
    }
  },
  mounted(){
    this.stripe = Stripe(this.$config.stripePublishableKey);
    this.elements = this.stripe.elements();
  }
}
</script>

<style lang="css">
</style>
