// TO DO: 
// 1.FIX CONTROL!!
// 2. Figure out how to put in timeline


var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson'

d3.json(url, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  // console.log(data)
  createMap(data.features);
});



// function createFeatures(earthquakeData) {
// 	console.log(earthquakeData)

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   // function onEachFeature(feature, layer) {
//   //   layer.bindPopup("<h3>" + feature.properties.place +
//   //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//   // }

//   // Create a GeoJSON layer containing the features array on the earthquakeData object
//   // Run the onEachFeature function once for each piece of data in the array
//   // var earthquakes = L.geoJSON(earthquakeData, {
//   //   // onEachFeature: onEachFeature
//   // });

  

//   for (var i = 0; i < earthquakeData.length; i++) {
// 	  var coordinates = (earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[1])
// 	  var earthquakes = L.circle(coordinates, {
// 	    fillOpacity: 0.75,
// 	    color: "white",
// 	    fillColor: "purple",
// 	    // Setting our circle's radius equal to the output of our markerSize function
// 	    // This will make our marker's size proportionate to its population
// 	    radius: markerSize(earthquakeData[i].properties.mag)
// 	  })
// 	}

// 	// bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);

//   // Sending our earthquakes layer to the createMap function
//   createMap(earthquakes);
// }

function markerSize(magnitude) {
	// console.log(magnitude * 100)
  return magnitude * 3;
}

function getColor(magnitude) {
    return magnitude > 7 ? '#800026' :
           magnitude > 6  ? '#E31A1C' :
           magnitude > 5   ? '#FD8D3C' :
           magnitude > 4   ? '#FEB24C' :
                      '#FFEDA0';
}

function createMap(earthquakeData) {

	url2 = "tectonic_plates.json"
	d3.json(url2, function(platesData) {
		  // Once we get a response, send the data.features object to the createFeatures function
		  // console.log(platesData)

		  // var plates = L.geoJSON(platesData);

		  

		  var plates = L.geoJSON(platesData);


		  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
		    "access_token=pk.eyJ1IjoibWFkZWxlaW5lYyIsImEiOiJjamd5YXA2MmcwMndmMzNxZWs2bmhlcGlhIn0.tQ_MgVyVOq855BiMrup-QQ");

		  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
		    "access_token=pk.eyJ1IjoibWFkZWxlaW5lYyIsImEiOiJjamd5YXA2MmcwMndmMzNxZWs2bmhlcGlhIn0.tQ_MgVyVOq855BiMrup-QQ");

		  var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?" +
		    "access_token=pk.eyJ1IjoibWFkZWxlaW5lYyIsImEiOiJjamd5YXA2MmcwMndmMzNxZWs2bmhlcGlhIn0.tQ_MgVyVOq855BiMrup-QQ");
		  // Define a baseMaps object to hold our base layers
		  var baseMaps = {
		    "Light Map": lightmap,
		    "Dark Map": darkmap,
		    "Outdoors": outdoors
		  };




	  	function onEachFeature(feature, layer) {
		    var coordinates = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
		  // console.log("coordinates: " + coordinates)
		    layer.bindPopup("<h3>" + feature.properties.place +"</h3><hr><p>" + new Date(feature.properties.time) + "</p><p> Magnitude: " + feature.properties.mag + "</p>");
		  }

		// var geojsonMarkerOptions = {
		// 	fillOpacity: 0.75,
		//     color: getColor(feature.properties.mag),
		//     fillColor: getColor(feature.properties.mag),
		//     // Setting our circle's radius equal to the output of our markerSize function
		//     // This will make our marker's size proportionate to its population
		//     radius: markerSize(feature.properties.mag)
		// }

		  var earthquakes = L.geoJSON(earthquakeData, {
			    pointToLayer: function (feature, latlng) {
        			return L.circleMarker(latlng, {
						fillOpacity: 0.75,
					    color: getColor(feature.properties.mag),
					    fillColor: getColor(feature.properties.mag),
					    // Setting our circle's radius equal to the output of our markerSize function
					    // This will make our marker's size proportionate to its population
					    radius: markerSize(feature.properties.mag)
					    // radius: 1000
					})},
			    onEachFeature: onEachFeature
			  })

				  // Create our map, giving it the lightmap and earthquakes layers to display on load
		  var myMap = L.map("map", {
		    center: [
		      37.09, -95.71
		    ],
		    zoom: 3,
		    layers: [outdoors, plates]
		  });	

	 //  	for (var i = 0; i < earthquakeData.length; i++) {
		//   var coordinates = [earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]]
		//   // console.log("coordinates: " + coordinates)
		//   var earthquakes = L.circle(coordinates, {
		//     fillOpacity: 0.75,
		//     color: getColor(earthquakeData[i].properties.mag),
		//     fillColor: getColor(earthquakeData[i].properties.mag),
		//     // Setting our circle's radius equal to the output of our markerSize function
		//     // This will make our marker's size proportionate to its population
		//     radius: markerSize(earthquakeData[i].properties.mag)
		//   }).bindPopup("<h3>" + earthquakeData[i].properties.place +"</h3><hr><p>" + new Date(earthquakeData[i].properties.time) + "</p><p> Magnitude: " + earthquakeData[i].properties.mag + "</p>").addTo(myMap);
		//   // console.log(earthquakes)
		// }


		 //  var earthquake1 = function(earthquakeData){
		 //  	for (var i = 0; i < earthquakeData.length; i++) {
			//   var coordinates = [earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]]
			//   // console.log("coordinates: " + coordinates)
			//   var earthquakes = L.circle(coordinates, {
			//     fillOpacity: 0.75,
			//     color: getColor(earthquakeData[i].properties.mag),
			//     fillColor: getColor(earthquakeData[i].properties.mag),
			//     // Setting our circle's radius equal to the output of our markerSize function
			//     // This will make our marker's size proportionate to its population
			//     radius: markerSize(earthquakeData[i].properties.mag)
			//   }).bindPopup("<h3>" + earthquakeData[i].properties.place +"</h3><hr><p>" + new Date(earthquakeData[i].properties.time) + "</p><p> Magnitude: " + earthquakeData[i].properties.mag + "</p>").addTo(myMap);
			//   // console.log(earthquakes)
			// }}
		  	
			// Create overlay object to hold our overlay layer
		  var overlayMaps = {
		    Earthquakes: earthquakes,
		    Plates: plates
		  };

		   var legend = L.control({position: 'bottomright'});

		    legend.onAdd = function (map) {

			    var div = L.DomUtil.create('div', 'info legend'),
			        grades = [4, 5, 6, 7],
			        labels = [];

			    div.innerHTML += '<h2>Magnitude</h2>'

			    // loop through our density intervals and generate a label with a colored square for each interval
			    for (var i = 0; i < grades.length; i++) {
			        div.innerHTML +=
			            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
			            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
			    }

			    return div;
			};

		legend.addTo(myMap);

		L.control.layers(baseMaps, overlayMaps, {
		    collapsed: false
		  }).addTo(myMap);

	// var timeline;
 //      var timelineControl;
 //      function onLoadData(data){
 //        timeline = L.timeline(data, {
 //          style: function(data){
 //            return {
 //              stroke: false,
 //              color: getColorFor(data.properties.name),
 //              fillOpacity: 0.5
 //            }
 //          },
 //          waitToUpdateMap: true,
 //          onEachFeature: function(feature, layer) {
 //            layer.bindTooltip(feature.properties.name);
 //          }
 //        });
 //        timelineControl = L.timelineSliderControl({
 //          formatOutput: function(date) {
 //            return new Date(date).toLocaleDateString();
 //          },
 //          enableKeyboardControls: true,
 //        });
 //        timeline.addTo(myMap);
 //        timelineControl.addTo(myMap);
 //        timelineControl.addTimelines(timeline);
 //      }

		});

  // Define map layers

  

  

}