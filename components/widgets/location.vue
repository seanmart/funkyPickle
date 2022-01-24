<template lang="html">
  <widget class="c-location-widget">
    <template #header>
      <div class="c-header">
        <icon class="c-icon" wayfinder />
        <div class="c-location">
          <h2 class="c-title t-header" v-html="data.place" />
          <span class="c-address" v-html="cityAndState" />
        </div>
      </div>
    </template>
    <template #contentWide>
      <div id="map"></div>
    </template>
  </widget>
</template>

<script>
import widget from "./widget";
export default {
  name: "LocationWidget",
  components: { widget },
  props: ["data"],
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
      if (this.data.address) str = this.data.address;
      if (this.data.city) str += str ? `, ${this.data.city}` : this.data.city;
      if (this.data.state) str += str ? `, ${this.data.state}` : this.data.state;
      return str;
    },
  },
  methods: {
    initMap() {
      let lat = this.data.map.latitude;
      let lon = this.data.map.longitude;
      let attribution = "";

      attribution += `Map tiles by <a href="http://stamen.com/">Stamen Design</a>`;
      attribution += `under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0.</a>`;
      attribution += `Data by <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>,`;
      attribution += `under <a href="http://www.openstreetmap.org/copyright">ODbL.</a>`;

      let map = new L.Map("map", {
        attribution,
        center: new L.LatLng(lat, lon),
        zoom: 13,
        zoomControl: false,
      });

      let marker = L.marker([lat, lon]).addTo(map);

      let Stamen_Toner = L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}", {
        attribution,
        subdomains: "abcd",
        minZoom: 12,
        maxZoom: 15,
        ext: "png",
      });
      map.addLayer(Stamen_Toner);

      setTimeout(map.invalidateSize, 1500);
    },
  },
};
</script>

<style lang="scss">
.c-location-widget {
  .c-header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .c-icon {
    display: block;
    font-size: 0;
    flex: 0 0 auto;
    padding-right: 2vw;
    height: 8vw;
    fill: $pink;
  }
  .c-location {
    flex: 1 1 auto;
  }
  .c-title {
    font-size: 6vw;
    margin-bottom: 2vw;
    line-height: .7;
  }
  .c-address {
    opacity: 0.6;
    display: block;
    line-height: .7
  }

  #map {
    background: rgba($black,.3);
    height: 80vw;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
  .leaflet-control-attribution {
    font-size: 2vw;
  }

  @media screen and (min-width: $medium){

    .c-icon {
      padding-right: 1rem;
      height: 2.5rem;
    }
    .c-title {
      font-size: 2rem;
      margin-bottom: .5rem;
    }
    .c-address {
      line-height: .7
    }
    #map {
      height: 20rem;
    }
    .leaflet-control-attribution {
      font-size: .5rem;
    }
  }
}
</style>
