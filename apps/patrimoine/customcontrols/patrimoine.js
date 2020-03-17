mviewer.customControls.patrimoine = (function() {
    /*
        * Private
        */
       var _idlayer = 'patrimoine';

       var _zoomlevel = false;

       var _collection = false;

       var sliderJquery;
       var checkedBox;

       var _mapChanged = function (e) {
           var newZoomlevel = mviewer.getMap().getView().getZoom();
           if ( _zoomlevel && (newZoomlevel > _zoomlevel)) {
           }
           _zoomlevel = newZoomlevel;
       };

       var _initSlider = e => {
         sliderJquery = $("#sliderTemp");

      // first init
        $("#sliderTemp").slider({
            id: 'sliderTemporel',
            value: [0, 2000],
            ticks: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000],
            lock_to_ticks: true,
            tooltip_split: true,
            formatter: function(value) {
                return 'An ' + value;
            }
        });
        if($("#sliderTemp").slider()){
          $("#sliderTemp").slider().on('slideStop', (e) => {
              var years = sliderJquery.slider('getValue');
              var checkedVal = [];
              $('#myCheckList input[type=checkbox]').each(function(i){
                //console.log(this);
                if (this.checked == true) {
                  checkedVal.push(this.defaultValue);
                }
              });
              mviewer.customLayers.patrimoine.changeDate(years, checkedVal);
          });
        }

    };

      var _initCheckbox = e => {
        //checkedBox = $("#myCheckList");
        $('#myCheckList input[type=checkbox]').change(function() {
          var checkedVal = [];
          $(':checkbox:checked').each(function(i){
            checkedVal[i] = $(this).val();
          });
          var years = sliderJquery.slider('getValue');
          mviewer.customLayers.patrimoine.changeDate(years, checkedVal);
        });
      }



       return {
           /*
            * Public
            */

           init: function() {
               _initSlider();
               _initCheckbox();
               // mandatory - code executed when panel is opened
           },

           destroy: function() {
               // mandatory - code executed when panel is closed
               mviewer.getMap().un('moveend', _mapChanged);

           }
       };

   }());
