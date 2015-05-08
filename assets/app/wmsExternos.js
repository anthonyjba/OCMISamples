function get_wms_url(bounds) {
			var format = 'image/png';
			var es = "&";

			var bb = bounds.clone();
			bb.transform(Ocmi.projPseudoMercator, Ocmi.projWGS84);

			var url = this.url;
			url += "REQUEST=GetMap";
			url += es + "SERVICE=WMS";
			url += es + "VERSION=1.1.1";
			url += es + "LAYERS=" + this.layers;
			url += es + "FORMAT=" + this.format;
			url += es + "TRANSPARENT=TRUE";
			url += es + "SRS=" + "EPSG:4326";
			url += es + "BBOX=" + bb.toBBOX();
			url += es + "WIDTH=" + this.tileSize.w;
			url += es + "HEIGHT=" + this.tileSize.h;

			return url;
		}

function getLayerOpenStreetMap() {
    var url = [
            "http://a.tile.openstreetmap.org/${z}/${x}/${y}.png",
            "http://b.tile.openstreetmap.org/${z}/${x}/${y}.png",
            "http://c.tile.openstreetmap.org/${z}/${x}/${y}.png"
            ];
    /*var cloneSR = Ocmi.resolutions.slice(0);
    var removed = cloneSR.splice(15, 2);
    156543.03390625, 78271.516953125, 39135.7584765625,
                      19567.87923828125, 9783.939619140625, 4891.9698095703125,
                      2445.9849047851562, 1222.9924523925781, 611.4962261962891,
                      305.74811309814453, 152.87405654907226, 76.43702827453613,
                      38.218514137268066, 19.109257068634033, 9.554628534317017,
                      4.777314267158508, 2.388657133579254, 1.194328566789627,
                      0.5971642833948135, 0.25, 0.1, 0.05
    serverResolutions: cloneSR, */
    return new OpenLayers.Layer.OSM("Cartografía", url,
        { numZoomLevels: 19, isBaseLayer: true, displayInLayerSwitcher: true, zoomOffset: 5, resolutions: Ocmi.resolutions,
            serverResolutions: [156543.03390625, 78271.516953125, 39135.7584765625,
                            19567.87923828125, 9783.939619140625,
                            4891.9698095703125, 2445.9849047851562,
                            1222.9924523925781, 611.4962261962891,
                            305.74811309814453, 152.87405654907226,
                            76.43702827453613, 38.218514137268066,
                            19.109257068634033, 9.554628534317017,
                            4.777314267158508, 2.388657133579254,
                            1.194328566789627, 0.5971642833948135],
            attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
            buffer: 0, transitionEffect: "resize"
        },{
            metadata: {
                href: "http://www.openstreetmap.org/"
                }
        });
}

function getLayerGoogleSatelite() {
    return new OpenLayers.Layer.Google("Google SATELITE",
        { type: google.maps.MapTypeId.SATELLITE, 'sphericalMercator': true,
            displayInLayerSwitcher: true, visibility: false, minZoomLevel: 1, numZoomLevels: 22
        });
}

function getLayerCATASTRO() {
    var urlCatastro = "http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx";

    var capa = new OpenLayers.Layer.WMS(
                'Catastro',
                urlCatastro,
                { layers: 'CATASTRO',
                    srs: 'EPSG:3785',
                    version: '1.1.1',
                    format: 'image/png',
                    transparent: true
                },
                { 
                    metadata: {
                        href: "http://www.sedecatastro.gob.es/"
                        },
                    isBaseLayer: false,
                    transparent: true,
                    visibility: false,
                    buffer: 0,
                    singleTile: true,
                    ratio: 1.5
                });

    return capa;
}

function getLayerMapaBaseIGN_WMS() {
    var urlWMS = "http://www.ign.es/wms-inspire/ign-base?";

    var capa = new OpenLayers.Layer.WMS(
                'IGN',
                urlWMS,
                { layers: 'IGNBaseTodo',
                    crs: 'EPSG:3857',
                    version: '1.3.0',
                    format: 'image/png',
                    transparent: true
                },
                {   title: 'Mapa Base IGN (WMS)',
                    isBaseLayer: true,
                    metadata: { href: "http://www.ign.es/" },
                    transparent: true,
                    visibility: false,
                    buffer: 0,
                    singleTile: true,
                    ratio: 1.5
                });

    return capa;
}

function getLayerPNOA() {
    var urlWMS = "http://www.ign.es/wms-inspire/pnoa-ma?";

    return new OpenLayers.Layer.WMS(
                'PNOA',
                urlWMS,
                { layers: 'OI.OrthoimageCoverage',
                    crs: 'EPSG:3857',
                    version: '1.3.0',
                    format: 'image/png',
                    transparent: true
                },
                {   isBaseLayer: false,
                    metadata: {
                                href: "http://www.ign.es/PNOA/"
                            },
                    transparent: true,
                    visibility: false,
                    buffer: 0,
                    singleTile: true,
                    ratio: 1.5
                });
}

function getLayerFincasReg() {
		    var urlWMS = "http://idecan.grafcan.com/ServicioWMS/FincasRegEsp?";

		    return new OpenLayers.Layer.WMS(
		                'FincasReg',
		                urlWMS,
                        { transparent: true},
		                {
							title: 'Fincas Registrales',
                            layers: 'FR_CM,FR_CA,FR_ME',
							isBaseLayer : false,
                            visibility : false,
                            queryable : false,
							getURL : get_wms_url,
                            metadata: {
                                href: "http://www.idecan.grafcan.es/"
                            },
                            legend: {
                                href: "http://idecan.grafcan.com/ServicioWMS/FincasRegEsp?version=1.1.1&service=WMS&request=GetLegendGraphic&layer=FR_ME&format=image/png"
                            },
							format : "image/png"
						});
		}
