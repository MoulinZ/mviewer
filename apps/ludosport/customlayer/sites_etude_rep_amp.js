{
mviewer.customLayers.sites_etude_rep_amp = {};
var sites_etude_rep_amp = mviewer.customLayers.sites_etude_rep_amp;

// Définition de la couleur
var hexColor = '#6495ED';
var color = ol.color.asArray(hexColor);
color = color.slice();
color[3] = 0.6;

// Génération de la liste des légendes
sites_etude_rep_amp.legend = {items: [{
        geometry: "Polygon",
        label: "Zones d'étude",
        styles: [new ol.style.Style({
          fill: new ol.style.Fill({color: color}),
          stroke: new ol.style.Stroke({color: '#191970', width: 1})
        })]
    }]
};

// Appel de la source de donnée (attention à la projection) et affichage du style sur la carte
mviewer.customLayers.sites_etude_rep_amp.layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: "http://193.48.28.84:8080/geoserver/applications/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=applications%3Asites_etude_rep_amp&outputFormat=application%2Fjson",
            //url: "apps/ludosport/customlayer/Sites_etude_rep_amp2.geojson",
            format: new ol.format.GeoJSON()
        }),
        style: function(feature, resolution) {
            return sites_etude_rep_amp.legend.items[0].styles;
        }
});
mviewer.customLayers.sites_etude_rep_amp.handle = false;
}
