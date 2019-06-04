<template>
  <div>
    <br>
    <gmap-map
      @load="init()"
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
      :clickable="true"
      @click="setPlace($event)"
    >
    <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="toggleInfoWindow(m,index)"
    />
    <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
    </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: -34.594400, lng: -58.394322},
      markers: [{
          position: { lat: -34.594400, lng: -58.394322},
          title: "como en casa",
          description: "buen lugar",
          category: "Cafeteria",
          icon: "fa fa-coffee",
          img_provided: true,
          image: "https://media-cdn.tripadvisor.com/media/photo-s/03/d9/3b/0e/getlstd-property-photo.jpg",
      }],
      places: [],
      currentPlace: null,
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      
    };
  },

  mounted() {
    this.geolocate();

  },

  methods: {
    // receives a place object via the autocomplete component
    init(center, markers, places, currentPlace){
        this.center = center;
        this.markers = markers;
        this.places = places;
        this.currentPlace = currentPlace;
    },
    setPlace(event) {
      this.currentPlace = event.latLng;
      this.$emit('setCoordinates', this.currentPlace);
    },
    addMarker(aMarkerObject) {
      this.markers.push(aMarkerObject);
      this.places.push(this.currentPlace);
      this.center = aMarkerObject.position;
      this.currentPlace = null;
    },
    getMarkerPopUpText(aMarkerObject){
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
      };
      return html;
    },
    toggleInfoWindow: function (aMarkerObject, idx) {
      this.infoWindowPos = aMarkerObject.position;
      this.infoContent = this.getMarkerPopUpText(aMarkerObject);
      

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>