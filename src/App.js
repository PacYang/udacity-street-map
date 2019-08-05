import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchField from './SearchField';
import MenuBar from './MenuBar';

class App extends Component {

  state = {
    venues: [],
    query: '',
    markers: []
  }

  componentDidMount(){
    this.getVenues();
  }
  //init the google map
  loadMap = () =>{
    loadScript ("https://maps.googleapis.com/maps/api/js?key=AIzaSyCjq3oYPs9trgLUlzSNaAL6Ek3N7Lo8oZQ&v=3&callback=initMap")
    window.initMap = this.initMap;
  }
  // get venues from foursquare,ll is my home address
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "JWWFF4QXQZVJN2XJLIMR4RKDVRMIANWVMWG3DQMQE4NU0XQD",
      client_secret: "XQ41LIDQYSQFQDMFPETIUUDSIV5BWQLSDV33HNCFAE23SNPB",
      query: "home",
      ll: "22.5694160120,113.9609241486",
      v: "20190803",
      limit: 6
    }
    // use Ajax of axios get longitude and latitude from foursquare,and then display in map by google map api
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items,
        displayVenues: response.data.response.groups[0].items
      }, this.loadMap())
    })
    .catch(error => 
      alert('fetch data from foursquare fail')
    )
  }
  // function of init google map
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 22.5694160120, lng: 113.9609241486},
      zoom: 13
    });
    // define InfoWindow
    var infowindow = new window.google.maps.InfoWindow();
    // eslint-disable-next-line
    this.state.venues.map(selectedVenue => {
      var contentString = `<strong>${selectedVenue.venue.name}</strong> <br>
                        <em>${selectedVenue.venue.location.address}</em>`                       
      var marker = new window.google.maps.Marker({
        position: {lat: selectedVenue.venue.location.lat, lng: selectedVenue.venue.location.lng},
        map: map,
        title: selectedVenue.venue.name
      })    

      this.state.markers.push(marker)

      function animation(){
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(function(){ 
          marker.setAnimation(4) 
        })
      }          

      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        animation()
        infowindow.open(map,marker)
        })  
    })
}

onQuery = query => {
  this.setState({ query })
  this.state.markers.map(marker => marker.setVisible(true))
  var locationFilter
  var unselectedLocations

  if (query) {
    locationFilter = this.state.venues.filter(selectedVenue =>
      selectedVenue.venue.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    this.setState({ venues: locationFilter })
    unselectedLocations = this.state.markers.filter(marker =>
      locationFilter.every(selectedVenue => selectedVenue.venue.name !== marker.title)    
    )
 
   unselectedLocations.forEach(marker => marker.setVisible(false))

    this.setState({ unselectedLocations })
  }
  else {
    this.setState({ venues: this.state.displayVenues })
    this.state.markers.forEach(marker => marker.setVisible(true))
  }
}

  render(){
    return(
      <main>
        <div id="header" aria-label="Header" tabIndex='0'>
          <h3>My Home Map</h3>
        </div>

        <div id="SearchField" aria-label="Search Field">
          <SearchField
            venues={ this.state.displayVenues } 
            markers={ this.state.markers } 
            locationFilter = {this.locationFilter}
            query={this.state.query}
            onQuery={q => this.onQuery(q)}
          />
        </div>          
        
        <div id="container" aria-label="Menu Container">
          <MenuBar 
            venues={ this.state.venues }
            markers={ this.state.markers }
          />
        </div>

       <div id="map" aria-label="Map" role="application"></div>

      </main>
    );
  }
}

// use loadScript function to get the url and insert Before to put the script to the top of the list
function loadScript(url) {
    var index  = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
    script.onerror = function() {
    alert("Load Google Map Error, Please Check URL or Network");
  };
}

export default App;
