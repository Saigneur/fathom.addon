/*
Fathom - Browser-based Network Measurement Platform

Copyright (C) 2011-2016 Inria Paris-Roquencourt
International Computer Science Institute (ICSI)

See LICENSE for license and terms of usage.
*/

/**
* @fileoverfiew A simple content script to fetch the performance
* object of the page for pagestatsapi.
*
* @author Quentin Rouy <rouy.quentin@gmail.com>
*/
(function() {
	if (typeof self !== "undefined") {
		/*
		 * FIXME : require("sdk/preferences/service") can't be used here,
		 * I don't know if there is a way to access it here. (maybe with a template system)
		 * if we can detect that the 'beforeunload' event is disabled, we don't try to listen to it.
		 * instead we can try to listen to the unload event (doesn't work everytime)
		 * or record periodically the state of the page
		 */
		//if(typeof service === "undefined" || (service.has("dom.disable_beforeunload") && service.get("dom.disable_beforeunload") === false)){
		console.debug('adding a listener to the beforeunload event');
		/*
		 * FIXME : the event is called when the browser is closing but it doesn't write to the DB on time.
		 * Fathom also need to load for this to work,
		 * meaning if firefox open directly on a specific URL,
		 * it's not going to inject this script and listen to this window
		 */
		window.addEventListener("beforeunload",function(event){
			console.debug('the function listening the beforeunload event has been called');
			var ts = new Date();
			/*
 			 * TODO : get the size of the initial request using a firefox interface
			 * see getOriginalResponseHeader()
			 * https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIHttpChannel
			 */
			// approximate size of the original request, we replace it with the result of an xhr if it succeeds
			var size = document.documentElement.innerHTML.length;
			var obj = {
				ts : ts.getTime(),
				timezoneoffset : ts.getTimezoneOffset(),
        size : size,
				performance: { /* see https://www.w3.org/TR/navigation-timing/ */
					navigation : window.performance.navigation,
					timing : window.performance.timing,
					resourcetiming : window.performance.getEntriesByType("resource"),
				},
				protocol : window.location.protocol.replace(':',''),
				location: {
					host : window.location.host,
					origin : window.location.origin,
					name : window.location.pathname
				}
			}
			// http://stackoverflow.com/questions/4401003/read-size-of-current-document-from-javascript
			// we have to do this request after getting the resourcetiming entries so it doesn't appear in it
			var xhr= new XMLHttpRequest();
			xhr.onreadystatechange= function() {
			    if (this.readyState!==4) return;
          /*
           * FIXME : this.responseText.length returns 0 when navigating to another page but it works when closing the tab
           */
					// this result is in octet, what is displayed in the network monitor is in ko (size_in_octet/1024)
          if(this.responseText.length !== 0){
            obj.size = this.responseText.length;
          }
			};
			xhr.open('GET', location.href, true);
			xhr.send();
			self.port.emit('locallySavePerf', obj);
		},false,true/*https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener*/);
	}
}());
