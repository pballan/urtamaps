<template>
  <div id="map">
    {{map}}
  </div>
</template>

<script>
//import {LMap, LTileLayer, LMarker} from 'vue2-leaflet'

export default {
  name: 'app',
  el: '#app',

  data: {
    map: null,
    tileLayer: null,
    layers: [],
    markerTitle: null,
    markerCategory: null,
    markerDescription: null,
    markerIcon: null,
    markerImageProvided: false,
    markerImage: null,
    markerLatitude: null,
    markerLongitude: null, 
  },

  mounted() {
    this.initMap();
    this.initLayers();
  },

  methods: {
    initMap(){
      this.map = L.map('map').locate({
        setView: true,
      });
      this.map.on('click', this.getMouseClickGeoLocation );
      this.map.on('dblclick', this.setMarker );

    },
    initLayers() {
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      );

      this.tileLayer.addTo(this.map);
    },
    getMouseClickGeoLocation(event) {
      this.markerLatitude = event.latlng.lat;
      this.markerLongitude = event.latlng.lng;
      L.popup()
        .setLatLng(event.latlng)
        .setContent('lat: ' + this.markerLatitude + '\nlng: ' + this.markerLongitude )
        .openOn(this.map);
    },
    setMarker(event){
// info default para probar
      this.markerLatitude = event.latlng.lat;
      this.markerLongitude = event.latlng.lng;
      this.markerTitle = "Como en Casa";
      this.markerCategory = "Cafeteria";
      this.markerDescription = "Buen Lugar";
      this.markerIcon = "fa fa-coffee";
      this.markerImageProvided = true;
      this.markerImage = "https://media-cdn.tripadvisor.com/media/photo-s/03/d9/3b/0e/getlstd-property-photo.jpg";
      
      this.drawMarker({
        lat: this.markerLatitude,
        lng: this.markerLongitude,
        title: this.markerTitle,
        category: this.markerCategory,
        description: this.markerDescription,
        icon: this.markerIcon,
        img_provided: this.markerImageProvided,
        image: this.markerImage,
      } );
    },

    drawMarker(aMarkerObject){
      let info = {
        clickable: true,
        riseOnHover: true,
        title: aMarkerObject.title,
        alt: aMarkerObject.category,
      };
      let marker = L.marker([aMarkerObject.lat, aMarkerObject.lng], info).addTo(this.map);
      let html = ` 
        <head>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
        </head>
        <h2>${aMarkerObject.title}</h2>
        <h3> ${aMarkerObject.category} <i class="${aMarkerObject.icon}"></i></h3>  
        <p>Description: ${aMarkerObject.description}</p>
        `;
      if (aMarkerObject.img_provided) {
        html = html + `<img src="${aMarkerObject.image}" style="width: 100px" style="height: 45px" "/>`
      }  
      marker.bindPopup(html).openPopup();
    },
  },
}
</script>

<style>
#map { height: 600px; }
</style>
