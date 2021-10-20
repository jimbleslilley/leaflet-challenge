// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
var myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 13
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);




let quakesUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

console.log(d3.json(quakesUrl))
// Access json.
d3.json(quakesUrl).then(function(response) {
    for (i in response.features) {

        let longitude = response.features[i].geometry.coordinates[0]
        let latitude = response.features[i].geometry.coordinates[1]

        let magnitude = response.features[i].properties.mag
        let depth = response.features[i].geometry.coordinates[2]

        }
});



  
  