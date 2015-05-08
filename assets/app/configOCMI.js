/** Fichero de Configuración global del Objeto OCMI para Mapas con OpenLayers 3.5 **/
if (typeof Ocmi == "undefined" || !Ocmi) {
    var Ocmi = {};
}

/* URL local de Mapas OCMI */
Ocmi.URL_WMS = "http://localhost:49363/wms.ashx";
Ocmi.URL_JSON = "http://localhost:49363/Json.ashx";
Ocmi.URL_JSON_WS = "http://localhost:2990/JSONServicio.svc/";

// World Geodetic System 1984 projection
Ocmi.projWGS84 = new OpenLayers.Projection("EPSG:4326");
// ETRS89 OCMI projection            
Ocmi.projOcmiETRS89 = new OpenLayers.Projection("EPSG:4258");
//WGS84 Mercator PNOA
Ocmi.projPseudoMercator = new OpenLayers.Projection("EPSG:3857");
//Bounds Spain Map 
Ocmi.bounds = new OpenLayers.Bounds(-1500000, 3950000, 520000, 5600000);
//Resolutions Zoom
Ocmi.resolutions = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(5, 22);
//Maxima Resolution
Ocmi.maxResolution = 4891.9698095703125;
//Actual BBOX
Ocmi.currentMBR = null;



