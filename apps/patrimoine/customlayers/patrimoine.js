mviewer.customLayers.patrimoine = (function () {

    _filter = false;
    _ready = false;

    _legend = {
      items:[]
    };
    var _uniqueStyle = [
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 10,
                fill: new ol.style.Fill({
                    color: 'rgba(231, 76, 60, 0.7)'
                })
            })
        }),
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 8,
                fill: new ol.style.Fill({
                    color: 'rgba(236, 240, 241,7.0)'
                })
            })
        })
    ];
    _legend.items.push({styles:_uniqueStyle, label: "Site", geometry: "Point"});

    var _manyStyle = function (radius, radius2, size) {
        return [
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius,
                    fill: new ol.style.Fill({
                        color: 'rgba(236, 240, 241,0.7)'
                    })
                }),
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 3
              }),
              fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.1)'
              })
            }),
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius2,
                    fill: new ol.style.Fill({
                        color: 'rgba(231, 76, 60, 0.7)'
                    })
                }),
                text: new ol.style.Text({
                    font: '12px roboto_regular, Arial, Sans-serif',
                    text: size.toString(),
                    fill: new ol.style.Fill({
                        color: '#fff'
                    })
                })
            })
        ];
    };
    _legend.items.push({styles:_manyStyle(10,10,7), label: "Groupe de sites", geometry: "Point"});

    var _patrimoineStyle = function(feature) {
        var size = feature.get('features').length;
        var max_radius = 40;
        var max_value = 500;
        var radius = 10 + Math.sqrt(size)*(max_radius / Math.sqrt(max_value));
        var radius2 = radius *80 /100 ;
        if (size == 1) {
            return _uniqueStyle;
        } else {
            return _manyStyle(radius, radius2, size);
        }
    };



    var cqlFilter = 'date_debut BETWEEN 1000 AND 2000 OR date_fin BETWEEN 1000 AND 2000';
    var urlTemplate = 'http://193.48.28.84:8080/geoserver/applications/wfs?service=WFS&' +
    'version=1.0.0&request=GetFeature&' +
    'typeNames=applications:patrimoine&' +
    'maxFeatures=150&' +
    'CQL_FILTER=' + cqlFilter +
    '&outputFormat=application/json&' +
    'srsName=EPSG:4326';
    var geoJSONFormat = new ol.format.GeoJSON();
    var _vectorSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: function() {return urlTemplate;}
    });

    function changeDate(years, checkedVal) {
      var dateMin = years[0];
      var dateMax = years[1];
      var listeItem = '(';
      checkedVal.forEach(function(i, idx, array){
        if (idx === array.length - 1){
          listeItem = listeItem + '\'' + i +'\')' ;
        } else {
          listeItem = listeItem + '\'' + i +'\',';
        }
      });
      var cqlCat = '(categorie1 IN ' + listeItem + ' OR categorie2 IN ' + listeItem + ')';
      var cqlNewFilter = '(date_debut BETWEEN '+ dateMin + ' AND ' + dateMax + ' OR date_fin BETWEEN ' + dateMin + ' AND ' + dateMax + ') AND ' + cqlCat;
      urlTemplate = 'http://193.48.28.84:8080/geoserver/applications/wfs?service=WFS&' +
      'version=1.0.0&request=GetFeature&' +
      'typeNames=applications:patrimoine&' +
      'maxFeatures=150&' +
      'CQL_FILTER=' + cqlNewFilter +
      '&outputFormat=application/json&' +
      'srsName=EPSG:4326';
      _vectorSource.clear(true);
      _vectorSource.refresh();
    };

    //_vectorSource.format_ = undefined;
    function a() {
      _vectorSource.format_ = undefined;
      return _vectorSource;
    }
    //url: "https://gis.jdev.fr/geoserver/mviewer/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mviewer%3Apatrimoine&maxFeatures=150&outputFormat=application%2Fjson",
    //format: new ol.format.GeoJSON()
    var _cluster = new ol.source.Cluster({
        distance: 50,
        source: _vectorSource
    });
    var _layer = new ol.layer.Vector({
      source: _cluster,
      style: _patrimoineStyle
    });
    //console.log(_layer.getSource());

    var _handle = function(patrimoines, views) {
        if (patrimoines.length > 0 && patrimoines[0].properties.features) {
            var features = patrimoines[0].properties.features;
            var elements = [];
            var l = mviewer.getLayer("patrimoine");
            features.forEach(function(feature, i) {
                elements.push({
                    properties: feature.getProperties()
                });
            });
            var html;
            if (l.template) {
                html = info.templateHTMLContent(elements, l);
            } else {
                html = info.formatHTMLContent(elements, l);
            }
            var view = views["right-panel"];
            view.layers.push({
                "id": view.layers.length + 1,
                "firstlayer": true,
                "manyfeatures": (features.length > 1),
                "nbfeatures": features.length,
                "name": l.name,
                "layerid": "patrimoine",
                "theme_icon": l.icon,
                "html": html
            });
        }

    };

    return {
      layer: _layer,
      handle: _handle,
      legend: _legend,
      changeDate: changeDate,
      setFilter: function (val) { _filter = val; _ready = true; },
      getFilter: function () {return _filter; }
    };
}());
