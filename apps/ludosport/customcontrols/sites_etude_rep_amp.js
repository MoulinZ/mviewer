mviewer.customControls.sites_etude_rep_amp = (function() {

  return {

    init: function() {
        // mandatory - code executed when panel is opened
        //mviewer.getMap().on('moveend', _mapChanged);

        maLayer = mviewer.getLayer('sites_etude_rep_amp').layer;
          $("#selectPNM").change(function() {
            var val = $(this).val();
            if (val === "gen") {
              mviewer.zoomToInitialExtent();
            } else if (val === "bonifacio") {
              features = maLayer.getSource().getFeatures();
              monPnmCible = [];
              features.forEach(e => {
                var props = e.getProperties();
                if (props.nom == "Bouches de Bonifacio"){
                  monPnmCible.push(e);
                }
              });
              var src = new ol.source.Vector({
                features: monPnmCible
              });
              mviewer.getMap().getView().fit(src.getExtent(), {duration: 2000});

            } else if (val === "scandola") {
              features = maLayer.getSource().getFeatures();
              monPnmCible = [];
              features.forEach(e => {
                var props = e.getProperties();
                if (props.nom == "Scandola"){
                  monPnmCible.push(e);
                }
              });
              var src = new ol.source.Vector({
                features: monPnmCible
              });
              mviewer.getMap().getView().fit(src.getExtent(), {duration: 2000});

            } else if (val === "agriate") {
              features = maLayer.getSource().getFeatures();
              monPnmCible = [];
              features.forEach(e => {
                var props = e.getProperties();
                if (props.nom == "cap Corse et Agriate"){
                  monPnmCible.push(e);
                }
              });
              var src = new ol.source.Vector({
                features: monPnmCible
              });
              mviewer.getMap().getView().fit(src.getExtent(), {duration: 2000});

            } else if (val === "iroise") {
              features = maLayer.getSource().getFeatures();
              monPnmCible = [];
              features.forEach(e => {
                var props = e.getProperties();
                if (props.nom == "Iroise"){
                  monPnmCible.push(e);
                }
              });
              var src = new ol.source.Vector({
                features: monPnmCible
              });
              mviewer.getMap().getView().fit(src.getExtent(), {duration: 2000});

            } else if (val === "arcachon") {
              features = maLayer.getSource().getFeatures();
              monPnmCible = [];
              features.forEach(e => {
                var props = e.getProperties();
                if (props.nom == "Bassin d'Arcachon"){
                  monPnmCible.push(e);
                }
              });
              var src = new ol.source.Vector({
                features: monPnmCible
              });
              mviewer.getMap().getView().fit(src.getExtent(), {duration: 2000});

            } else if (val === "opale") {
              features = maLayer.getSource().getFeatures();
              monPnmCible = [];
              features.forEach(e => {
                var props = e.getProperties();
                if (props.nom == "Estuaires picards et mer d'Opale"){
                  monPnmCible.push(e);
                }
              });
              var src = new ol.source.Vector({
                features: monPnmCible
              });
              mviewer.getMap().getView().fit(src.getExtent(), {duration: 2000});

            } else if (val === "lion") {
              features = maLayer.getSource().getFeatures();
              monPnmCible = [];
              features.forEach(e => {
                var props = e.getProperties();
                if (props.nom == "Golfe du Lion"){
                  monPnmCible.push(e);
                }
              });
              var src = new ol.source.Vector({
                features: monPnmCible
              });
              mviewer.getMap().getView().fit(src.getExtent(), {duration: 2000});

            } else if (val === "cenitz") {
              features = maLayer.getSource().getFeatures();
              monPnmCible = [];
              features.forEach(e => {
                var props = e.getProperties();
                if (props.nom == "Baie de Cenitz"){
                  monPnmCible.push(e);
                }
              });
              var src = new ol.source.Vector({
                features: monPnmCible
              });
              mviewer.getMap().getView().fit(src.getExtent(), {duration: 2000});

            } else if (val === "normand") {
              features = maLayer.getSource().getFeatures();
              monPnmCible = [];
              features.forEach(e => {
                var props = e.getProperties();
                if (props.nom == "Golfe normand-breton"){
                  monPnmCible.push(e);
                }
              });
              var src = new ol.source.Vector({
                features: monPnmCible
              });
              mviewer.getMap().getView().fit(src.getExtent(), {duration: 2000});

            }
            });

    },

    destroy: function() {
        // mandatory - code executed when panel is closed

    }
  };

}());
