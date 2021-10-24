// tile layer 
var maptile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// create map, add tile
var map = L.map("map-id", {
    center: [40, -100],
    zoom: 4,
  });

maptile.addTo(map);

var quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson"
var colours = ['#4AA2BC','#6291B6','#7581AA','#827099','#8A6185','#8B536F','#864759','#7D3E45','#703733'];

// obtain data from json
d3.json(quakeUrl).then(function(earthquakes) {

  var quakeFeatures = earthquakes.features;

  // checks for duplicate before adding popup
  function popupFromFeature(feature, layer) {
    if (feature.properties && feature.properties.place && feature.properties.time) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><p>${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}`);
    }
}

// condition ? true : false
function getColor(magnitude) {
  // set colours in scale
    return magnitude > 100  ? colours[0] :
           magnitude > 75  ? colours[1] :
           magnitude > 50  ? colours[2] :
           magnitude > 35  ? colours[3] :
           magnitude > 20  ? colours[4] :
           magnitude > 10  ? colours[5] :
           magnitude > 5  ? colours[6] :
           magnitude > 0  ? colours[7] :
                            colours[8] ;
        }

  L.geoJSON(quakeFeatures, {
      pointToLayer: function(feature, latlng) {
        var quakeDepth = feature.geometry.coordinates[2];
        
        // get magnitude from json
        var mag = feature.properties.mag;
        // 
        var circles = {
            radius: (10**(mag/5)),
            color: getColor(quakeDepth),
            fillcolor: getColor(quakeDepth),
            fillOpacity: 0.8
        }  

        return L.circleMarker(latlng, circles)
      }
  ,onEachFeature: popupFromFeature}).addTo(map);


// create legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
// returns an element given its DOM id,
// or returns the element itself if it was passed directly.
  var div = L.DomUtil.create("div", "info legend");
  var limits = [100, 75, 50, 35, 20, 10, 5, 0, -10];
  // change colours to colors for html
  var colors = colours;
  var colthing = [];
  var labels = []

  var sLegend = "<h1>Depth of Earthquake</h1>" + 
  "<div class=\"labels\">" 
    + "<div class=\"min\">" 
      + limits[0] + "</div>" 
    + "<div class=\"max\">" 
    + limits[limits.length - 1] 
    + "</div>" 
    + "</div>";
    div.innerHTML = sLegend;

    // itterate through list 
    // push adds elements to end of an array
    limits.forEach(function(limit, index) {
      colthing.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      labels.push("<li>" + limits[index] + "</li")
    });

    div.innerHTML += "<ul>" + colthing.join("") + "</ul>";
    // returns relevant info into div
    return div;
  };

  legend.addTo(map);

});

//jl