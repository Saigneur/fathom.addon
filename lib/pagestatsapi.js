/*
Fathom - Browser-based Network Measurement Platform

Copyright (C) 2011-2016 Inria Paris-Roquencourt
International Computer Science Institute (ICSI)

See LICENSE for license and terms of usage.
*/

/**
* @fileoverfiew The implementation of fathom.pagestats API.
*
* This module collects measurements about each webpage and their environment
*
* @author Quentin Rouy <rouy.quentin@gmail.com>
*/
const {Cc, Ci, Cu} = require("chrome");

// for accessing the database
const db = require('./db');

// for retrieving the addon list
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/AddonManager.jsm");

// for information about cookies
const cookieManager2 = Cc["@mozilla.org/cookiemanager;1"].getService(Ci.nsICookieManager2);

// db handler
var dbi = db.getInstance();

// Addon's source code found here : https://github.com/0c0w3/troubleshooter
var troubleshoot = {
  /**
  * Captures a snapshot of data that may help troubleshooters troubleshoot
  * trouble.
  *
  * @param done A function that will be called when the
  *             snapshot completes.  It will be passed the snapshot object.
  */
  snapshot: function snapshot(done) { // done is this function's callback
  let snapshot = {};
  let numPending = Object.keys(dataProviders).length;
  function providerDone(providerName, providerData) { // name came from a binding, data came from extensions
    snapshot[providerName] = providerData; // fills the snapshot array in the function snapshot scope
    if (--numPending == 0)
    // Ensure that done is always and truly called asynchronously.
    Services.tm.mainThread.dispatch(done.bind(null, snapshot),
                                    Ci.nsIThread.DISPATCH_NORMAL); // once every dataProvider has provided his data, the provided function will get his favorite snapshot
  }
  for (let name in dataProviders) {
    try {
      dataProviders[name](providerDone.bind(null, name)); // extensions is called and its parameter will get the data, name will be passed before the other arguments provided to the callback
    }
    catch (err) {
      let msg = "Troubleshoot data provider failed: " + name + "\n" + err;
      Cu.reportError(msg);
      providerDone(name, msg);
    }
  }
},
};

if(dataProviders !== 'undefined'){
  // Each data provider is a name => function mapping.  When a snapshot is
  // captured, each provider's function is called, and it's the function's job to
  // generate the provider's data.  The function is passed a "done" callback, and
  // when done, it must pass its data to the callback.  The resulting snapshot
  // object will contain a name => data entry for each provider.
  var dataProviders = { // can be executed only once to avoid redeclaration in global scope.
    extensions: function extensions(done) {
      // https://developer.mozilla.org/en-US/Add-ons/Add-on_Manager/AddonManager
      AddonManager.getAddonsByTypes(["extension"], function (extensions) { // callback that gets the array of addons
        extensions.sort(function (a, b) {
          if (a.isActive != b.isActive)
          return b.isActive ? 1 : -1;
          let lc = a.name.localeCompare(b.name);
          if (lc != 0)
          return lc;
          if (a.version != b.version)
          return a.version > b.version ? 1 : -1;
          return 0;
        });
        let props = ["name", "version", "isActive", "id"];
        done(extensions.map(function (ext) { // done is the function passed to extensions that will get the correclty formatted array of object
          return props.reduce(function (extData, prop) {
            extData[prop] = ext[prop];
            return extData;
          }, {});
        }));
      });
    },
  }
}

/*
 * In this function, we already got the data from the content-side
 * we are gathering data from the addon-side
 * like cookies, addons, CPU load and RAM
 */
var locallySavePerf = exports.locallySavePerf = function(performance_from_page){
  let p = performance_from_page;
  /* retrieving data about cookies */
  let hostArray = p.performance.resourcetiming.map(function(entry){
    let splittedName = entry.name.split('/');
    return splittedName.length >= 3 ? splittedName[2] : splittedName[0];
  });
  hostArray.push(p.location.host);
  let hostSet = new Set(hostArray);
  let numCookiesPerHost = [];
  hostSet.forEach(function(host) {
    // https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsICookieManager2#countCookiesFromHost()
    let cookie = {host:host,number:cookieManager2.countCookiesFromHost(host)};
    numCookiesPerHost.push(cookie);
  });
  p.numCookiesPerHost = numCookiesPerHost;
  /* retrieving data about addons */
  troubleshoot.snapshot(function(snapshot){
    p.extensions=snapshot.extensions;
    /* retrieving data about CPU,RAM and saving it into the database */
    dbi.getBaselineByTimestamp(p);
  });
};
