{
mviewer.customLayers.sites_etude_rep_amp = {};
mviewer.customLayers.sites_etude_rep_amp.layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: "http://ws.carmencarto.fr/WFS/119/fxx_inpn?service=WFS&request=GetFeature&typeNames=ms:Znieff2_mer&srsName=EPSG:3857",
            format: new ol.format.GeoJSON()
        }),
        style: function(feature, resolution) {
            return [new ol.style.Style({
                fill: new ol.style.Fill({color: 'olive'}),
                stroke: new ol.style.Stroke({color: 'black', width: 1})
              })];
        }
});
mviewer.customLayers.sites_etude_rep_amp.handle = false;
}
