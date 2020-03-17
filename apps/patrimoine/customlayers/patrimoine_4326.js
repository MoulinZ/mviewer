{
mviewer.customLayers.patrimoine_4326 = {};
var patrimoine_4326 = mviewer.customLayers.patrimoine_4326;

// Génération de la liste des légendes
patrimoine_4326.legend = {items: [{
        geometry: "Point",
        label: "Auto Ecole",
        styles: [new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: "#ff2a00"
                }),
                stroke: new ol.style.Stroke({
                    color: "#ff2a00",
                    width: 4
                }),
                radius: 4
            })
        })]
    }]
};

// Appel de la source de donnée (attention à la projection) et affichage du style sur la carte
mviewer.customLayers.patrimoine_4326.layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: "apps/patrimoine/customlayers/patrimoine_4326.geojson",
            format: new ol.format.GeoJSON()
        }),
        style: function(feature, resolution) {
            return patrimoine_4326.legend.items[0].styles;
        }
});

mviewer.customLayers.patrimoine_4326.handle = false;
}
