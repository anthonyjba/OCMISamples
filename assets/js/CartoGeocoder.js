/**
 * CartoGeocoder.js
 * Instituto Geográfico Nacional 
 * http://www.ign.es/ign/es/IGN/home.jsp
 */
function CartoGeocoder(params)
{
	// -*- mode: Javascript -*-

	// jsonp
	// ===========
	// Copyright 2012 Jeremy Bornstein
	// Licensed under the BSD 3-clause license
	//
	// USAGE: include this in your client-side javascript
	// It takes a dictionary as a single argument, which should contain:
	//	    url: the url to call
	//	    data: a dictionary of parameters
	//	    callback: a javascript function to call with the returned data
	//
	// This doesn't do any error handling or timeouts, both of which are possible
	// but cumbersome enough that I haven't put them in here for this writing.
	// Same goes for paranoia about conflicting function names and specifying the
	// JSONP callback parameter name to the remote server (this assumes that it's
	// called "callback", as seems standard).

	this.jsonp = function jsonp (config) 
	{
        var callback = config.callback;
        if (!(callback instanceof Function)) {
            alert ("JSONP doesn't make sense without a callback.");
            return;
        }

        if (!('jjb_jsonpCounter' in window)) window.jjb_jsonpCounter = 0;
        var functionName = 'jjb_jsonp_' + jjb_jsonpCounter;
        var scriptID = 'jjb_jsonp_script_' + jjb_jsonpCounter++;

        var url = config.url;
        var data = config.data || {};
        data.callback = functionName;
        var encoded = [];
        for (var key in config.data)
            encoded.push (encodeURIComponent (key) + '=' +
						  encodeURIComponent (config.data[key]));
        if (encoded.length > 0)
            url += '?' + encoded.join ('&');

        var scriptElement = document.createElement ('script');
        scriptElement.setAttribute ('id', scriptID);
        scriptElement.setAttribute ('src', url);

        function outerCallback (result) {
            callback (result);
            delete window[functionName];
            document.body.removeChild (scriptElement);
        }
        window[functionName] = outerCallback;

        document.body.appendChild (scriptElement);
	};
	
    this.getURLfromElement = function getURLfromElement(element)
    {
        var scripts = element.getElementsByTagName("script");
        for (var i=0;i<scripts.length;i++) 
        {
            var src = scripts[i].getAttribute("src");
            if (src)
                if ((src.indexOf("CartoGeocoder.js") != -1))
                    return src.replace("CartoGeocoder.js","");
        }
        return "";
    };
	
    this.getURL = function getURL()
    {
        var head = document.getElementsByTagName("head")[0];
        var url = this.getURLfromElement(head);
        if (url == "")
            url = this.getURLfromElement(document.body);
        return url;
    };
	
    this.baseURL = this.getURL();
    
   this.geocodeAddress = function geocode(opts) 
    {
        if( typeof opts === "undefined" || !(opts instanceof Object))
        {
            alert("CartoGeocoder:\nIncorrect parameter");
            return;
        }
        	
        if ((typeof opts.callback === "undefined") || !(opts.callback instanceof Function))
        {
            alert ("CartoGeocoder:\n geocodeAddress function needs a callback function parameter.");
            return;
        }
                
        if ((typeof opts.province === "undefined") || (typeof opts.province !== "string")) 
        {
            alert ("CartoGeocoder:\n geocodeAddress function needs a province string parameter.");
            return;
        }
        
        if ((typeof opts.municipality === "undefined") || (typeof opts.municipality !== "string")) 
        {
            alert ("CartoGeocoder:\n geocodeAddress function needs a municipality string parameter.");
            return;
        }
 
        if ((typeof opts.city !== "undefined") && (typeof opts.city !== "string"))
        {
            alert("CartoGeocoder:\nIncorrect parameter 'city'");
            return;
        }
        
        if ((typeof opts.road_type !== "undefined") && (typeof opts.road_type !== "string"))
        {
            alert("CartoGeocoder:\nIncorrect parameter 'road_type'");
            return;
        }
        
        if ((typeof opts.road_name !== "undefined") && (typeof opts.road_name !== "string"))
        {
            alert("CartoGeocoder:\nIncorrect parameter 'road_name'");
            return;
        }
        
        if ((typeof opts.road_number !== "undefined") && (typeof opts.road_number !== "string"))
        {
            alert("CartoGeocoder:\nIncorrect parameter 'road_number'");
            return;
        }
               
        if(typeof opts.max_results === "undefined")
        {
            opts.max_results = 10;
        }  
        else if(typeof opts.max_results !== "number")
        {
            alert("CartoGeocoder:\nIncorrect parameter 'max_results'");
            return;
        }
        
        var callbackfunction = opts.callback;

        this.jsonp(
        {
                'url':this.baseURL + 'GeocodeAddress',
               'callback':function(data)
        	{
                    callbackfunction(data);
        	},
                'data':opts
        });
    };
    
    this.parseAddress = function parseAddress(opts) 
    {
        if( typeof opts === "undefined" || !(opts instanceof Object))
        {
            alert("CartoGeocoder:\nIncorrect parameter");
            return;
        }
		
        if ((typeof opts.callback === "undefined") || !(opts.callback instanceof Function))
        {
            alert ("CartoGeocoder:\n parseAddress function needs a callback function parameter.");
            return;
        }
        
        if ((typeof opts.address === "undefined") || (typeof opts.address != "string")) 
        {
            alert ("CartoGeocoder:\n parseAddress function needs a address string parameter.");
            return;
        }
        
        if(typeof opts.max_results === "undefined")
        {
        	opts.max_results = 10;
        }  
        
        else if(typeof opts.max_results !== "number")
        {
            alert("CartoGeocoder:\nIncorrect parameter 'max_results'");
            return;
        }
        
        var callbackfunction = opts.callback;

        this.jsonp(
        {
        	'url':this.baseURL + 'ParseAddress',
        	'callback':function(data)
        	{
                    callbackfunction(data);
        	},
        	'data':opts
        });
    }
    
    this.geocode = function geocode(opts) 
    {
        if( typeof opts === "undefined" || !(opts instanceof Object))
        {
            alert("CartoGeocoder:\nIncorrect parameter");
            return;
        }
		
        if ((typeof opts.callback === "undefined") || !(opts.callback instanceof Function))
        {
            alert ("CartoGeocoder:\n geocode function needs a callback function parameter.");
            return;
        }
        
        if ((typeof opts.address === "undefined") || (typeof opts.address != "string")) 
        {
            alert ("CartoGeocoder:\n geocode function needs a address string parameter.");
            return;
        }
        
        if(typeof opts.max_results === "undefined")
        {
        	opts.max_results = 10;
        }  
        
        else if(typeof opts.max_results !== "number")
        {
            alert("CartoGeocoder:\nIncorrect parameter 'max_results'");
            return;
        }
        
        var callbackfunction = opts.callback;

        this.jsonp(
        {
        	'url':this.baseURL + 'Geocode',
        	'callback':function(data)
        	{
                    callbackfunction(data);
        	},
        	'data':opts
        });
    };
}