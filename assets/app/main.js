(function (){
    
function getMTNRaster() {
  return new ol.source.TileWMS({
          url: 'http://www.idee.es/wms/MTN-Raster/MTN-Raster',
          params: {
              'LAYERS': 'mtn_rasterizado',
              'TRANSPARENT': 'true'
          }
      });
}
    
function getBingMaps(style){
    return new ol.source.BingMaps({
      key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
      imagerySet: style
      // use maxZoom 19 to see stretched tiles instead of the BingMaps
      // "no photos at this zoom level" tiles
      // maxZoom: 19
    })
}
    
//    url: 'http://www.ign.es/wmts/pnoa-ma', layer: 'OI.OrthoimageCoverage',
//        http://www.ign.es/wmts/pnoa-ma?Layer=OI.OrthoimageCoverage&Style=default&TileMatrixSet=EPSG:3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=4&TileCol=7&TileRow=6
      
      
    var capasBase = [ 
      {id: 'OSM', capa: new ol.source.OSM() },
      {id: 'BingMap', capa: getBingMaps('Road') },             
      {id: 'PNOA', capa : getMTNRaster()}
    ];
    
    window.setBaseLayers = capasBase;

      var layers = [];
      var i, ii;
      for (i = 0, ii = capasBase.length; i < ii; ++i) {
            layers.push(new ol.layer.Tile({
            visible: false,
            preload: Infinity,
            source: capasBase[i].capa
          }));
          
          $("#base-layer-list").append('<li><a href="javascript:void(0)" onclick="setBaseLayer(\''+window.setBaseLayers[i].id+"')\">"+window.setBaseLayers[i].id+"</a></li>");
      }
    

    
    
/*
 [
          new ol.layer.Tile({source: new ol.source.OSM()}),
          new ol.layer.Tile({
              source: getMTNRaster(),
              maxResolution: 500
          })
        ]
*/

      var map = new ol.Map({
        layers: layers,
        loadTilesWhileInteracting: true,
        target: 'map',
        renderer: 'canvas', // Force the renderer to be used
        controls: ol.control.defaults(),
        view: new ol.View({
          center: ol.proj.transform([-3.703790199999957600, 40.416775400000000000], 'EPSG:4326', 'EPSG:3857'),
          zoom: 6
        })
      });
    
    var zoomslider = new ol.control.ZoomSlider();
    map.addControl(zoomslider);
      
    window.setBaseLayer = function(capa) {
        for (var i = 0, ii = layers.length; i < ii; ++i) {
          //alert(capasBase[i].id);
          layers[i].setVisible(capasBase[i].id === capa);
        }
      }
    
     setBaseLayer('OSM');

      var view = map.getView();
            view.on('change:resolution', function(evt) {
                console.log("resolution", view.getResolution());
            });
    
})();