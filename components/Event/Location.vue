<template lang="html">
  <EventWidget class="flex flex-row flex-wrap items-center">
    <div class="flex-initial xl:pr-20px">
      <div class="flex flex-row items-center" v-if="venue">
        <Icon wayfinder  class="pr-10 h-20"/>
        <h3 v-html="venue" class="mb-05 text-20 font-bold"></h3>
      </div>
      <div class="font-normal">
        <p v-if="address" v-html="address"/>
        <p v-if="cityState" v-html="cityState"/>
      </div>
    </div>
    <div v-if="map" class="location-map flex-grow flex-shrink-0 min-w-1/2 mt-20px xl:ml-20px xl:mt-0 rounded-md overflow-hidden">
      <div id="map" class="w-full h-400px md:h-300px"/>
    </div>
  </EventWidget>
</template>

<script>
export default {
  props:['map','address','venue','city','state'],
  head() {
    return {
      link: [{ rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css" }],
      script: [
        { type: "text/javascript", src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet-src.min.js" },
        { type: "text/javascript", src: "https://stamen-maps.a.ssl.fastly.net/js/tile.stamen.js" },
      ],
    };
  },
  mounted(){
    if(this.map) setTimeout(this.initMap, 1000);
  },
  computed:{
    cityState(){
      let cityState = []
      if(this.city) cityState.push(this.city)
      if(this.state) cityState.push(this.state)
      return cityState.length > 0 ? cityState.join(', ') : null
    }
  },
  methods:{
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
    }
  }
}
</script>
