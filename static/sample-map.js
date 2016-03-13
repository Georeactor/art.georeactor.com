$(function() {
  mapboxgl.accessToken = "pk.eyJ1IjoibWFwbWVsZCIsImEiOiI0a1NzYW53In0.2gQTd6k9Ghw8UBK4DsciLA";
  var map = new mapboxgl.Map({
    container: 'map',
    center: [-73.26, 42.786],
    zoom: 6,
    style: {
      "version": 8,
      "sprite": spriteID,
      "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
      "sources": {
        "mapbox": {
          "type": "vector",
          "url": "mapbox://mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v6"
        }
      },
      "layers": [
        {
          "id": "background",
          "paint": {
            "background-color": "#444"
          },
          "layout": {
            "visibility": "visible"
          },
          "type": "background"
        }, {
          "id": "landcover_snow",
          "source": "mapbox",
          "source-layer": "landcover",
          "filter": ["==", "class", "snow" ],
          "paint": { "fill-pattern": "snow", "fill-opacity": 1 },
          "type": "fill"
        },
        {
          "id": "landcover_crop",
          "source": "mapbox",
          "source-layer": "landcover",
          "filter": ["==", "class", "crop" ],
          "paint": { "fill-pattern": "farm", "fill-opacity": 1 },
          "type": "fill"
        }, {
          "id": "landcover_grass",
          "source": "mapbox",
          "source-layer": "landcover",
          "filter": ["==", "class", "grass" ],
          "paint": { "fill-pattern": "grass", "fill-opacity": 1 },
          "type": "fill"
        }, {
          "id": "landcover_wood",
          "source": "mapbox",
          "source-layer": "landcover",
          "filter": ["==", "class", "wood" ],
          "paint": { "fill-pattern": "wood", "fill-opacity": 1 },
          "type": "fill"
        }, {
          "id": "landuse_wood",
          "source": "mapbox",
          "source-layer": "landuse",
          "filter": ["==", "class", "wood" ],
          "paint": { "fill-pattern": "wood", "fill-opacity": 1 },
          "type": "fill"
        }, {
          "id": "water",
          "source": "mapbox",
          "source-layer": "water",
          "paint": {
            "fill-pattern": "water",
            "fill-outline-color": "#a2bdc0"
          },
          "type": "fill"
        },
        {
          "id": "landuse_park",
          "source": "mapbox",
          "source-layer": "landuse",
          "filter": ["==", "class", "park" ],
          "paint": { "fill-pattern": "grass", "fill-opacity": 1 },
          "type": "fill"
        },
        {
          "id": "landuse_industrial",
          "source": "mapbox",
          "source-layer": "landuse",
          "filter": ["==", "class", "industrial" ],
          "paint": { "fill-pattern": "urban" },
          "type": "fill"
        },
        {
          "id": "residential",
          "source": "mapbox",
          "source-layer": "landuse",
          "filter": ["==", "class", "residential" ],
          "paint": { "fill-pattern": "urban" },
          "type": "fill"
        },
        {
          "id": "building",
          "source": "mapbox",
          "source-layer": "building",
          "paint": { "fill-pattern": "urban" },
          "type": "fill"
        },
        {
          "id": "commercial",
          "source": "mapbox",
          "source-layer": "landuse",
          "filter": ["==", "class", "commercial" ],
          "paint": { "fill-pattern": "urban" },
          "type": "fill"
        },
        {
          "id": "landuse_grass",
          "source": "mapbox",
          "source-layer": "landuse",
          "filter": ["==", "class", "grass" ],
          "paint": { "fill-pattern": "grass" },
          "type": "fill"
        },
        {
          "id": "landuse_sand",
          "source": "mapbox",
          "source-layer": "landuse",
          "filter": ["==", "class", "sand" ],
          "paint": { "fill-pattern": "sand" },
          "type": "fill"
        },
        {
          "id": "landuse_crop",
          "source": "mapbox",
          "source-layer": "landuse",
          "filter": ["==", "class", "crop" ],
          "paint": { "fill-pattern": "farm" },
          "type": "fill"
        },
        {
          "id": "landuse_rock",
          "source": "mapbox",
          "source-layer": "landuse",
          "filter": ["==", "class", "rock" ],
          "paint": { "fill-pattern": "rock" },
          "type": "fill"
        },
        {
          "id": "landuse_snow",
          "source": "mapbox",
          "source-layer": "landuse",
          "filter": ["==", "class", "snow" ],
          "paint": { "fill-pattern": "snow" },
          "type": "fill"
        }
      ]
    },
    hash: true
  });
});
