<template lang="html">
  <widget-container class="c-location-widget">
    <template #header>
      header
    </template>
    <template #contentWide>
      <div class="c-location-widget__map u-cover-container">
        <div id="map" class="u-cover"/>
      </div>
    </template>
  </widget-container>
</template>

<script>
export default {
  props:{
    address:String,
    city:String,
    state:String,
    map:Object
  },
  head() {
    return {
      link: [{ rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css" }],
      script: [
        { type: "text/javascript", src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet-src.min.js" },
        { type: "text/javascript", src: "https://stamen-maps.a.ssl.fastly.net/js/tile.stamen.js" },
      ],
    };
  },
  mounted() {
    setTimeout(this.initMap, 1000);
  },
  computed: {
    cityAndState() {
      let str = "";
      if (this.address) str = this.address;
      if (this.city) str += str ? `, ${this.city}` : this.city;
      if (this.state) str += str ? `, ${this.state}` : this.state;
      return str;
    },
  },
  methods: {
    initMap() {
      let lat = this.map.latitude;
      let lon = this.map.longitude;
      let attribution = "";

      attribution += `Map tiles by <a href="http://stamen.com/">Stamen Design</a>`;
      attribution += `under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0.</a>`;
      attribution += `Data by <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>,`;
      attribution += `under <a href="http://www.openstreetmap.org/copyright">ODbL.</a>`;

      let map = new L.Map("map", {
        center: new L.LatLng(lat, lon),
        zoom: 13,
        touchZoom: false,
        scrollWheelZoom: false
      });

      let marker = L.marker([lat, lon]).addTo(map);

      let Stamen_Toner = L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}", {
        attribution,
        subdomains: "abcd",
        minZoom: 12,
        maxZoom: 17,
        ext: "png",
      });
      map.addLayer(Stamen_Toner);

      setTimeout(map.invalidateSize, 1500);
    },
  },
};
</script>

<style lang="scss">
.c-location-widget{
  .c-location-widget__map{
    padding-bottom:56.25%;
    width:100%;
    z-index: 1;
  }
}
</style>
