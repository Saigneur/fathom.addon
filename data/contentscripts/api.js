/*
   Fathom - Browser-based Network Measurement Platform

   Copyright (C) 2011-2015 Inria Paris-Roquencourt 
                           International Computer Science Institute (ICSI)

   See LICENSE for license and terms of usage. 
*/

/**
 * @fileoverfiew The Fathom API content script.
 *
 * @author Anna-Kaisa Pietilainen <anna-kaisa.pietilainen@inria.fr> 
 */

// All methods depend on the contentscripts/main.js. The API
// methods are in this separate file just for readability and so 
// that we can easily compile the API documentation for it.

/** 
 * @description The complete Fathom API.
 * @module fathom
 */
var fathomapi = {};

//--------------------- FATHOM.SYSTEM --------------------------

/** 
 * @description fathom.system.* namespace. Methods for obtaining various 
 * system information and for running system tools such as ping and iperf.
 *
 * @exports fathom/system
 */
var sys = fathomapi.system = {};

/**
 * @description This function returns the client OS name.
 * @return {string} OS name.
 */
sys.getOS = function(callback) {
    makereq(callback, "system", "getOS");
};

/** 
 * @description This function runs a traceroute to the given
 * destination and, upon completion, returns the textual results.
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 * @param {string} host  - The host (name or IP address) to run a
 * traceroute to.
 * @param {object} opt - Optional parameters (count, iface, waittime).
 * @param {boolean} incrementaloutput - Incremental output (optional - default false).
 */
sys.doTraceroute = function(callback, host, opt, incrementaloutput) {
    makereq(callback, "system", "doTraceroute", [host,opt], incrementaloutput);
};

/** 
 * @description This function runs an ICMP ping to the given
 * destination and, upon completion, returns the textual results.
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 *
 * @param {string} host - The host (name or IP address) to ping.
 * @param {object} opt - Optional parameters (count, iface, interval, bcast).
 * @param {boolean} incrementaloutput - Send incremental output (optional - default false).
 */
sys.doPing = function(callback, host, opt, incrementaloutput) {
    makereq(callback, "system","doPing", [host,opt], incrementaloutput);
};

/** 
 * @description This function runs iperf client to the given
 * destination and, upon completion, returns the textual results.
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 * @param {object} opt  Optional parameters (client, proto, bandwidth,
 *                      time, num, port, len, window).
 * @param {boolean} incrementaloutput Send incremental output.
 */
sys.doIperf = function(callback, opt, incrementaloutput) {
    makereq(callback, "system", "doIperf", [opt], inc);
};

/** 
 * @description This function retrieves information about the
 * client's DNS resolver configuration.
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 */
sys.getNameservers = function(callback) {
    makereq(callback, "system", "getNameservers");
};

/** 
 * @description Get hostname
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 */
sys.getHostname = function(callback) {
    makereq(callback, "system", "getHostname");
};

/** 
 * @description call nslookup
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 * @param {string} arg - The name to lookup.
 */
sys.nslookup = function(callback, arg) {
    if (arg)
	makereq(callback, "system", "nslookup", [arg]);
    else
	makereq(callback, "system", "nslookup");
};

/**
 * @description This function retrieves the current status of the
 * clients' network interfaces.
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 */       
sys.getActiveInterfaces = function(callback) {
    makereq(callback, "system", "getActiveInterfaces");
};

/**
 * @description This function retrieves the current status of the
 * clients' wireless network interface (iwconfig and friends).
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 */       
sys.getActiveWifiInterface = function(callback) {
    makereq(callback, "system","getActiveWifiInterface");
};

/*
 * @description This function retrieves the current contents of the ARP 
 * cache.
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 * @param {string} hostname - Get the arp cache info only for the specified
 * host (optional, default is all).
 */       
sys.getArpCache = function(callback, hostname) {
    if (hostname)
	makereq(callback, "system", "getArpCache", [hostname]);
    else
	makereq(callback, "system", "getArpCache");
};

/**
 * @description This function retrieves the client's current routing table.
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 */       
sys.getRoutingTable = function(callback) {
    makereq(callback, "system", "getRoutingTable");
};

/** 
 * @description This function gets the list of nearby wireless 
 * access points.
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 * @param {integer} timeout - The delay between scan start and second call
 * to fetch the results (on most OSs the first scan cmd invocation does 
 * not return the full list of nearby cells or as on android we need 
 * two separate calls in anycase).
 */
sys.getWifiNetworks = function(callback, timeout) {
    makereq(callback, "system", "getWifiNetworks", [timeout]);
};

/**
 * @description This function retrieves interface performance
 * counters (bytes, packets, errors, etc).
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 * @param {string} iface - Name of the interface.
 */       
sys.getIfaceStats = function(callback, iface) {
    makereq(callback, "system", "getIfaceStats", [iface]);
};

/**
 * @description This function retrieves link quality parameters
 * for WiFi interfaces.
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 * @param {string} name - Optional wireless inteface name if the system
 * has multiple wireless interfaces.
 */   
sys.getWifiSignal = function(callback, name) {
    makereq(callback, "system", "getIfaceSignal", [name]);
};

/**
 * @description This function retrieves the client's current system 
 * load via "top".
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 */       
sys.getLoad = function(callback) {
    makereq(callback, "system", "getLoad");
};

/**
 * @description This function retrieves the client's current memory 
 * load via "proc" (non-WIN).
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 */
sys.getMemInfo = function(callback) {
    makereq(callback, "system", "getMemInfo");
};


/**
 * @description This function retrieves system info (WIN only).
 *
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 */
sys.getSysInfo = function(callback) {
    makereq(callback, "system", "getSysInfo");
};

/**
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 * @param {string} url - The URL for which the function looks up the
 * applicable proxy configuration.
 *
 * @return {dictionary} The result describes the proxy.  For
 * explanation of the dictionary keys, see
 * <a href='https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsIProxyInfo'>MDN</a>.
 */
sys.getProxyInfo = function(callback, url) {
    makereq(callback, "system", "getProxyInfo",[url]);
};

/**
 * @param {function} callback - The callback Fathom invokes once the
 * call completes. On error contains "error" member.
 */
sys.getBrowserMemoryUsage = function(callback) {
    makereq(callback, "system", "getBrowserMemoryUsage");
};

//--------------------- FATHOM.SOCKET --------------------------

/** 
 * @description fathom.socket.* namespace. Low level TCP/UDP sockets.
 *
 * @exports fathom/socket
 */
var s = fathomapi.socket = {};

/**
 * @description This function closes a socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @socketid {integer} socketid  The socket handle previously
 * obtained from one of the opening functions.
 */
s.close = function (callback, socketid) {
    makereq(callback, "socket", "close", [socketid]);
};

/**
 * @description Get the local address of this socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @socketid {integer} socketid  The socket handle previously
 * obtained from one of the opening functions.
 */
s.getHostIP = function (callback, socketid) {
    makereq(callback, "socket", "getHostIP", [socketid]);
};

/**
 * @description Get the peer address of this socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @socketid {integer} socketid  The socket handle previously
 * obtained from one of the opening functions.
 */
s.getPeerIP = function (callback, socketid) {
    makereq(callback, "socket", "getPeerIP", [socketid]);
};

/**
 * @description This component provides functions for sending and
 * receiving broadcast messages using UDP over IPv4.
 *
 * @exports fathom/socket/broadcast
 */
var broadcast = s.broadcast = {};

/**
 * @description This function opens a socket suitable for
 * transmitting broadcast messages.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, its only argument is
 * a numerical socket ID.  On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 */	
broadcast.openSendSocket = function (callback) {
    makereq(callback, "socket.broadcast", "broadcastOpenSendSocket", []);
};

/**
 * @description This function opens a broadcast socket and binds
 * it to the given port.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, its only argument is
 * a numerical socket ID.  On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @param {integer} port The local port on which the socket will
 * listen for broadcast messages.
 */	
broadcast.openReceiveSocket = function (callback, port) {
    makereq(callback, "socket.broadcast", "broadcastOpenReceiveSocket", [port]);
};

/**
 * @description This function closes a broadcast socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @socketid {integer} socketid The socket handle previously
 * obtained from one of the opening functions.
 */
broadcast.close = function (callback, socketid) {
    makereq(callback, "socket.broadcast", "close", [socketid]);
};

/**
 * @description This function transmits data on a broadcast socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 * @param {integer} socketid  The socket handle previously
 * obtained from one of the opening functions.
 * @param {string} msg  The message to transmit.
 * @param {string} ip The broadcast IPv4 address to send to.
 * @param {integer} port  The (UDP) port to send to.
 */
broadcast.sendTo = function(callback, socketid, msg, ip, port) {
    makereq(callback, "socket.broadcast", "udpSendTo", 
	    [socketid, msg, ip, port]);
};

/**
 * @description On a socket created via openReceiveSocket(),
 * this function receives data.
 *
 * @param {function} callback - The callback Fathom invokes once
 * the operation completes.  If successful, its only argument is
 * a string containing the received message.  On error, its only
 * argument is a dictionary whose member "error" describes the
 * problem that occurred.
 * @param {integer} socketid - The socket handle previously
 * obtained from one of the opening functions.
 * @param {boolean} asstring - Return the bytes as string (default false).
 * @param {integer} timeout - Time to wait for the data (in ms), < 0 waits
 * forever, 0 no wait (default).
 * @param {integer} size - Number of bytes to read (or 0 to ignore - default).
 */
broadcast.recvFrom = function (callback, socketid, asstring, timeout, size) {
    makereq(callback, "socket.broadcast", "udpRecvFrom", 
	    [socketid,asstring,timeout,size]);
};
	
/**
 * @description This component provides functions for sending and
 * receiving multicast messages using UDP over IPv4.
 *
 * @exports fathom/socket/multicast
 */
var multicast = s.multicast = {};

/**
 * @description This function opens a multicast socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @param {integer} ttl The multicast TTL, i.e., the number of
 * hops the datagram can traverse, doubling as the multicast
 * "threshold" of host/network/site/etc.
 *
 * @param {boolean} loopback If True, this host will receive its own messages.
 */
multicast.open = function (callback, ttl, loopback) {
    makereq(callback, "socket.multicast", "multicastOpenSocket", [ttl,loopback]);
};

/**
 * @description Join the given multicast group
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, its only argument is
 * a numerical socket ID.  On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @socketid {integer} socketid  The socket handle previously
 * obtained from one of the opening functions.
 *
 * @param {string} ip  The IPv4 address of the multicast group to join.
 */	
multicast.join = function (callback, socketid, ip, port, reuse) {
    makereq(callback, "socket.multicast", "multicastJoin", 
	    [socketid, ip, port, reuse]);
};

/**
 * @description This function closes a multicast socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @socketid {integer} socketid  The socket handle previously
 * obtained from one of the opening functions.
 */
multicast.close = function (callback, socketid) {
    makereq(callback, "socket.multicast", "close", [socketid]);
};

/** 
 * @description This function sends data over a UDP socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {string} data  Data to send.
 */ 
multicast.send = function(callback, socketid, data) {
    makereq(callback, "socket.multicast", "send", [socketid, data]);
};

/** 
 * @description This function receives data on a UDP socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, the function
 * receives a dictionary with two members: "data" for the data
 * actually read, and "length" for the full length of the data
 * chunk received.  On error, its only argument is a dictionary
 * whose member "error" describes the problem that occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {boolean} asstring - Return the bytes as string (default false).
 * @param {integer} timeout - Time to wait for the data (in ms), < 0 waits
 * forever, 0 no wait (default).
 * @param {integer} size - Number of bytes to read (or 0 to ignore - default).
 */ 
multicast.recv = function(callback, socketid, asstring, timeout, size) {
    makereq(callback, "socket.multicast", "recv", 
	    [socketid,asstring,timeout,size]);
};

/** 
 * @description This function sends data on a UDP socket and
 * reads subsequently returned responses.  This function is an
 * optimization, saving one message-passing roundtrip into the
 * Fathom core to read the response after having sent data.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, the function
 * receives a dictionary with two members: "data" for the data
 * actually read, and "length" for the full length of the data
 * chunk received.  On error, its only argument is a dictionary
 * whose member "error" describes the problem that occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 *
 * @param {string} data  Data to send.
 * @param {boolean} asstring - Return the bytes as string (default false).
 * @param {integer} timeout - Time to wait for the data (in ms), < 0 waits
 * forever, 0 no wait (default).
 * @param {integer} size - Number of bytes to read (or 0 to ignore - default).
 */ 
multicast.sendrecv = function(callback, socketid, data, asstring, timeout, size) {
    makereq(callback, "socket.multicast", "udpSendRecv", 
	    [socketid,data,asstring,timeout,size]);
};

/**
 * @description This function establishes a callback to get
 * invoked automatically whenever data arrive on a given UDP
 * socket.  To stop receiving, call recvstop().
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, the function
 * receives a dictionary with two members: "data" for the data
 * actually read, and "length" for the full length of the data
 * chunk received.  On error, its only argument is a dictionary
 * whose member "error" describes the problem that occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {boolean} asstring - Return the bytes as string (default false).
 * @param {integer} size - Number of bytes to read (or 0 to ignore - default).
 */     
multicast.recvstart = function(callback, socketid, asstring, size) {
    if (asstring === undefined) {
    	asstring = false;
    }
    makereq(callback, "socket.udp", "udpRecvStart", 
	    [socketid, asstring, size], true);
};

/**
 * @description This function cancels the callbacks previously
 * installed via recvstart().
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 */     
multicast.recvstop = function(callback, socketid) {
    makereq(callback, "socket.udp", "udpRecvStop", [socketid]);
};

/** 
 * @description This function sends data over a UDP socket, to a
 * specific destination.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {string} data  Data to send.
 * @param {string} ip  IP address to send to.
 * @param {integer} port  Port to send to.

 */ 
multicast.sendto = function(callback, socketid, data, ip, port) {
    makereq(callback, "socket.udp", "udpSendTo", 
	    [socketid, data, ip, port]);
};

/** 
 * @description This function receives data on a UDP socket,
 * from a specific sender.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, the function
 * receives a dictionary with two members: "data" for the data
 * actually read, and "length" for the full length of the data
 * chunk received.  On error, its only argument is a dictionary
 * whose member "error" describes the problem that occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {boolean} asstring - Return the bytes as string (default false).
 * @param {integer} timeout - Time to wait for the data (in ms), < 0 waits
 * forever, 0 no wait (default).
 * @param {integer} size - Number of bytes to read (or 0 to ignore - default).
 */ 
multicast.recvfrom = function(callback, socketid, asstring, timeout, size) {
    makereq(callback, "socket.udp", "udpRecvFrom", 
	    [socketid,asstring,timeout,size]);
};

/**
 * @description This function establishes a callback to get
 * invoked automatically whenever data arrive on a given UDP
 * socket, from a specific sender.  To stop receiving, call
 * recvfromstop().
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, the function
 * receives a dictionary with two members: "data" for the data
 * actually read, and "length" for the full length of the data
 * chunk received.  On error, its only argument is a dictionary
 * whose member "error" describes the problem that occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {boolean} asstring - Return the bytes as string (default false).
 * @param {integer} size - Number of bytes to read (or 0 to ignore - default).
 */     
multicast.recvfromstart = function(callback, socketid, asstring, size) {
    if (asstring == undefined) {
    	asstring = false;
    }
    makereq(callback, "socket.udp", "udpRecvFromStart", 
	    [socketid, asstring, size], true);
};

/**
 * @description This function cancels the callbacks previously
 * installed via recvfromstart().
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 */     
multicast.recvfromstop = function(callback, socketid) {
    makereq(callback, "socket.udp", "udpRecvStop", [socketid]);
};

/**
 * @description This component provides APIs for communication over
 * TCP.
 *
 * @exports fathom/socket/tcp
 */
var tcp = s.tcp = {};

/** 
 * @description This function creates a TCP socket and connects
 * it to the given destination.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  When successful, its only argument
 * is a socket descriptor.  On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @param {string} destip  IP address to connect to.
 * @param {integer} destport  Port to connect to.
 */ 
tcp.openSendSocket = function (callback, destip, destport) {
    makereq(callback, "socket.tcp", "tcpOpenSendSocket", 
	    [destip, dstport]);
};

/** 
 * @description This function creates a TCP socket, binds it
 * locally to the given port, and listens for connections.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  When successful, its only argument
 * is a socket descriptor.  On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @param {integer} port - Port to listen on.
 * @param {boolean} reuse - Reuse the port.
 */ 
tcp.openReceiveSocket = function (callback, port, reuse) {
    makereq(callback, "socket.tcp", "tcpOpenReceiveSocket", 
	    [port, reuse]);
};

/**
 * @description This function closes a TCP socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @socketid {integer} socketid  The socket handle previously
 * obtained from one of the opening functions.
 */
tcp.close = function (callback, socketid) {
    makereq(callback, "socket.tcp", "close", [socketid]);
};

/** 
 * @description This function sends data over the TCP connection
 * identified by the given socket ID.
 *
 * @param {function} callback The callback Fathom invokes once
 * the send call returns.
 *
 * @param {integer} socketid  The socket handle previously
 * obtained from one of the opening functions.
 *
 * @param {string} data  The data chunk to transmit.
 */ 
tcp.send = function (callback, socketid, msg) {
    makereq(callback, "socket.tcp", "send", [socketid, msg]);
};

/** 
 * @description This function receives data on a TCP connection.
 *
 * @param {function} callback The callback Fathom invokes either
 * when an error has occurred or when data has arrived.  When
 * successful, its only argument is the received data chunk.  On
 * error, its only argument is a dictionary whose member "error"
 * describes the problem that occurred.
 *
 * @param {integer} socketid  The socket handle previously
 * obtained from one of the opening functions.
 * @param {boolean} asstring - Return the bytes as string (default false).
 * @param {integer} timeout - Time to wait for the data (in ms), < 0 waits
 * forever, 0 no wait (default).
 * @param {integer} size - Number of bytes to read (or 0 to ignore - default).
 */ 
tcp.recv = function (callback, socketid, asstring, timeout, size) {
    if (asstring == undefined) {
    	asstring = false;
    }
    makereq(callback, "socket.tcp", "recv", 
	    [socketid,asstring,timeout,size]);
};

/** 
 * @description This function returns the IP address of the
 * local endpoint of a given TCP connection.
 *
 * @param {function} callback The callback Fathom invokes either
 * when an error has occurred or when data has arrived.  When
 * successful, its only argument is the local IP address.  On
 * error, its only argument is a dictionary whose member "error"
 * describes the problem that occurred.
 *
 * @param {integer} socketid  The socket handle previously
 * obtained from one of the opening functions.
 */ 
tcp.getHostIP = function (callback, socketid) {
    makereq(callback, "socket.tcp", "getHostIP", [socketid]);
};

/** 
 * @description This function returns the IP address of the
 * remote endpoint of a given TCP connection.
 *
 * @param {function} callback The callback Fathom invokes either
 * when an error has occurred or when data has arrived.  When
 * successful, its only argument is the remote IP address.  On
 * error, its only argument is a dictionary whose member "error"
 * describes the problem that occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained from one of the opening functions.
 */ 
tcp.getPeerIP = function (callback, socketid) {
    makereq(callback, "socket.tcp", "getPeerIP", [socketid]);
};

/**
 * @description This component provides APIs for unicast
 * communication over UDP.  For multicast and broadcast options,
 * see the respective namespaces.
 *
 * @exports fathom/socket/udp
 */
var udp = s.udp = {};

/** 
 * @description This function creates a UDP socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  When successful, its only argument
 * is a socket descriptor ID.  On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 */ 
udp.open = function(callback) {
    makereq(callback, "socket.udp", "udpOpen", []);
};

/**
 * @description This function closes a UDP socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @socketid {integer} socketid  The socket handle previously
 * obtained for this UDP flow.
 */
udp.close = function (callback, socketid) {
    makereq(callback, "socket.udp", "close", [socketid]);
};

/** 
 * @description This function binds a UDP socket to a local IP
 * address and port.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {string} addr - local IP address to bind to.
 * @param {integer} port - Port to listen on.
 * @param {boolean} reuse - Reuse the port.
 */ 
udp.bind = function(callback, socketid, addr, port, reuse) {
    makereq(callback, "socket.udp", "udpBind", 
	    [socketid, addr, port, reuse]);
};

/** 
 * @description This function connects a UDP socket to a remote
 * IP address and port.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {string} addr  IP address to connect to.
 * @param {integer} port  Port to connect to.
 */ 
udp.connect = function(callback, socketid, addr, port) {
    makereq(callback, "socket.udp", "udpConnect", [socketid, addr, port]);
};

/** 
 * @description This function sends data over a UDP socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {string} data  Data to send.
 */ 
udp.send = function(callback, socketid, data) {
    makereq(callback, "socket.udp", "send", [socketid, data]);
};

/** 
 * @description This function receives data on a UDP socket.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, the function
 * receives a dictionary with two members: "data" for the data
 * actually read, and "length" for the full length of the data
 * chunk received.  On error, its only argument is a dictionary
 * whose member "error" describes the problem that occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 *
 * @param {boolean} asstring - Return the bytes as string (default false).
 * @param {integer} timeout - Time to wait for the data (in ms), < 0 waits
 * forever, 0 no wait (default).
 * @param {integer} size - Number of bytes to read (or 0 to ignore - default).
 */ 
udp.recv = function (callback, socketid, asstring, timeout, size) {
    if (asstring === undefined) {
    	asstring = false;
    }
    makereq(callback, "socket.udp", "recv", 
	    [socketid,asstring,timeout,size]);
};

/** 
 * @description This function sends data on a UDP socket and
 * reads subsequently returned responses.  This function is an
 * optimization, saving one message-passing roundtrip into the
 * Fathom core to read the response after having sent data.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, the function
 * receives a dictionary with two members: "data" for the data
 * actually read, and "length" for the full length of the data
 * chunk received.  On error, its only argument is a dictionary
 * whose member "error" describes the problem that occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 *
 * @param {string} data  Data to send.
 * @param {boolean} asstring - Return the bytes as string (default false).
 * @param {integer} timeout - Time to wait for the data (in ms), < 0 waits
 * forever, 0 no wait (default).
 * @param {integer} size - Number of bytes to read (or 0 to ignore - default).
 */ 
udp.sendrecv = function(callback, socketid, data, asstring, timeout, size) {
    makereq(callback, "socket.udp", "udpSendRecv", 
	    [socketid,data,asstring,timeout,size]);
};

/**
 * @description This function establishes a callback to get
 * invoked automatically whenever data arrive on a given UDP
 * socket.  To stop receiving, call recvstop().
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, the function
 * receives a dictionary with two members: "data" for the data
 * actually read, and "length" for the full length of the data
 * chunk received.  On error, its only argument is a dictionary
 * whose member "error" describes the problem that occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {boolean} asstring - Return the bytes as string (default false).
 * @param {integer} size - Number of bytes to read (or 0 to ignore - default).
 */     
udp.recvstart = function(callback, socketid, asstring, size) {
    if (asstring == undefined) {
    	asstring = false;
    }
    makereq(callback, "socket.udp", "udpRecvStart", 
	    [socketid,data,asstring,size], true);
};

/**
 * @description This function cancels the callbacks previously
 * installed via recvstart().
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 */     
udp.recvstop = function(callback, socketid) {
    makereq(callback, "socket.udp", "udpRecvStop", [socketid]);
};

/** 
 * @description This function sends data over a UDP socket, to a
 * specific destination.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes. On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {string} data  Data to send.
 * @param {string} ip  IP address to send to.
 * @param {integer} port  Port to send to.
 */ 
udp.sendto = function(callback, socketid, data, ip, port) {
    makereq(callback, "socket.udp", "udpSendTo", 
	    [socketid, data, ip, port]);
};

/** 
 * @description This function receives data on a UDP socket,
 * from a specific sender.
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, the function
 * receives a dictionary with two members: "data" for the data
 * actually read, and "length" for the full length of the data
 * chunk received.  On error, its only argument is a dictionary
 * whose member "error" describes the problem that occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {boolean} asstring - Return the bytes as string (default false).
 * @param {integer} timeout - Time to wait for the data (in ms), < 0 waits
 * forever, 0 no wait (default).
 * @param {integer} size - Number of bytes to read (or 0 to ignore - default).
 */ 
udp.recvfrom = function(callback, socketid, asstring, timeout, size) {
    makereq(callback, "socket.udp", "udpRecvFrom", 
	    [socketid,asstring,timeout,size]);
};

/**
 * @description This function establishes a callback to get
 * invoked automatically whenever data arrive on a given UDP
 * socket, from a specific sender.  To stop receiving, call
 * recvfromstop().
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  If successful, the function
 * receives a dictionary with two members: "data" for the data
 * actually read, and "length" for the full length of the data
 * chunk received.  On error, its only argument is a dictionary
 * whose member "error" describes the problem that occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 * @param {boolean} asstring - Return the bytes as string (default false).
 * @param {integer} size - Number of bytes to read (or 0 to ignore - default).
 */     
udp.recvfromstart = function(callback, socketid, asstring, size) {
    if (asstring == undefined) {
    	asstring = false;
    }
    makereq(callback, "socket.udp", "udpRecvFromStart", 
	    [socketid,asstring,size], true);
};

/**
 * @description This function cancels the callbacks previously
 * installed via recvfromstart().
 *
 * @param {function} callback The callback Fathom invokes once
 * the operation completes.  On error, its only argument is a
 * dictionary whose member "error" describes the problem that
 * occurred.
 *
 * @param {integer} socketid The socket handle previously
 * obtained for this UDP flow.
 */     
udp.recvfromstop = function(callback, socketid) {
    makereq(callback, "socket.udp", "udpRecvStop", [socketid]);
};

/** 
 * @description This function returns the IP address of the
 * local endpoint of a given UDP flow.
 *
 * @param {function} callback The callback Fathom invokes either
 * when an error has occurred or when data has arrived.  When
 * successful, its only argument is the local IP address.  On
 * error, its only argument is a dictionary whose member "error"
 * describes the problem that occurred.
 *
 * @param {integer} socketid  The socket handle identifying the
 * UDP flow.
 */ 
udp.getHostIP = function (callback, socketid) {
    makereq(callback, "socket.udp", "getHostIP", [socketid]);
};

/** 
 * @description This function returns the IP address of the
 * remote endpoint of a given UDP flow.
 *
 * @param {function} callback The callback Fathom invokes either
 * when an error has occurred or when data has arrived.  When
 * successful, its only argument is the remote IP address.  On
 * error, its only argument is a dictionary whose member "error"
 * describes the problem that occurred.
 *
 * @param {integer} socketid  The socket handle identifying the
 * UDP flow.
 */ 
udp.getPeerIP = function (callback, socketid) {
    makereq(callback, "socket.udp", "getPeerIP", [socketid]);
};

//--------------------- FATHOM.PROTO --------------------------

/** 
 * @description fathom.proto.* namespace. 
 *
 * @exports fathom/proto
 */
var proto = fathomapi.proto = {};

/**
 * @description HTTP protocol implementation using fathom sockets.
 * 
 * NOTE use browser xmlhttprequest API if you can, this implementation 
 * provides a really basic support for HTTP for testing/measurement 
 * purposes only.
 * 
 * @exports fathom/proto/http
 */
var http = proto.http = {};
	    
/**
 * @description  This function creates an HTTP protocol object
 *               and connects to the given server.
 *
 * @param {function} callback The return callback. Returns the protocol 
 * object id or an object with error field in case of failure.
 * @param {string} ip  The server IP.
 * @param {integer} port The server port (default 80).
 */
http.create = function(callback, ip, port) {
    makereq(callback, "proto.http", "create", [ip, port]);
};

/**
 * @description  Send HTTP request.
 *
 * @param {function} callback The return callback. Returns an object with 
 * error field in case of failure. 
 * @param {integer} id  The HTTP object id returned from the 'create' API.
 * @param {string} method  This is the HTTP method to be used -- GET, POST, etc.
 * @param {string} path   The resource name to fetch.
 * @param {object} headers    This represents the HTTP headers associated 
 * with the request.
 * @param {string} data    This is the query string for the request. 
 * It can null in case of GET.
 */
http.send = function(callback, httpid, method, path, headers, data) {
    makereq(callback, "proto.http", "send", [httpid, method, path, headers, data]);
};
	    
/**
 * @description  Receive HTTP response.
 *
 * @param {function} callback The return callback. Returns the response or 
 * an object with error field in case of failure. 
 * @param {integer} id  The HTTP object id returned from the 'create' API.
 */     	
http.receive = function(callback, httpid) {
    makereq(callback, "proto.http", "receive", [httpid]);
};

/**
 * @description  This function closes the HTTP connection.
 *
 * @param {function} callback The return callback. Returns an object with 
 * error field in case of failure. 
 * @param {integer} id  The HTTP object id returned from the 'create' API.
 */   
http.close = function(callback, httpid) {
    makereq(callback, "proto.http", "close", [httpid]);
};

/**
 * @description DNS protocol implementation using fathom sockets.
 *
 * @exports fathom/proto/dns
 */
var dns = proto.dns = {};
 
/**
 * @description  This function creates a DNS object.
 *
 * @param {function} callback The return callback. Returns the object id or 
 * an object with error field in case of failure.  
 * @param {string} server  This is the IP for the DNS resolver.
 * @param {string} proto  Indicates the protocol to be used for 
 * communication with the resolver, i.e., either 'udp' or 'tcp' (optional).
 * @param {integer} port  This the port to be used on the resolver (optional).
 */
dns.create = function(callback, server, proto, port) {
    makereq(callback, "proto.dns", "create", [server, proto, port]);
};

/**
 * @description  Lookup the given dns name using Fathom DNS implementation..
 *
 * @param {function} callback Fathom invokes this callback upon
 * arrival of the DNS response.  If successful, the callback
 * receives a dictionary whose members convey the DNS response.
 * @param {integer} id  The DNS object id returned from the 'create' API.
 * @param {string} host  The hostname.
 * @param {integer} timeout The time to wait for a response (seconds).
 */
dns.lookup = function(callback, dnsid, host, timeout) {
    makereq(callback, "proto.dns", "lookup", [dnsid, host, timeout]);
};

/** 
 * Cleanup and close any pending lookups.
 *
 * @param {function} callback The return callback. Returns an object with 
 * error field in case of failure.  
 * @param {integer} id  The DNS object id returned from the 'create' API.
 */
dns.close = function(callback, dnsid) {
    makereq(callback, "proto.dns", "close", [dnsid]);
};

/**
 * @description mDNS protocol implementation using fathom sockets.
 * @exports fathom/proto/mdns
 */
var mdns = proto.mdns = {};

/**
 * @description  This function creates and returns a mDNS object.
 * @param {function} callback The return callback. Returns the object id or 
 * an object with error field in case of failure.  
 */
mdns.create = function(callback) {
    makereq(callback, "proto.mdns", "create", []);
};

/** 
 * @description Perform mDNS service search.
 * @param {function} callback The return callback. Returns the responses or 
 * an object with error field in case of failure.  
 * @param {integer} id  The mDNS object id returned from the 'create' API.
 * @param {integer} timeout The time to wait for responses (seconds).
 */
mdns.discovery = function(callback, mdnsid, timeout) {
    makereq(callback, "proto.mdns", "discovery", [mdnsid, timeout]);
};

/** 
 * Cleanup and close any pending lookups.
 *
 * @param {function} callback The return callback. Returns an object with 
 * error field in case of failure.  
 * @param {integer} id  The mDNS object id returned from the 'create' API.
 */
mdns.close = function(callback, mdnsid) {
    makereq(callback, "proto.mdns", "close", [mdnsid]);
};

/**
 * @description UPnP protocol implementation using fathom sockets.
 * @exports fathom/proto/upnp
 */
var upnp = proto.upnp = {};

/**
 * @description  This function creates and returns a mDNS object.
 * @param {function} callback The return callback. Returns the object id or 
 * an object with error field in case of failure.  
 */
upnp.create = function(callback) {
    makereq(callback, "proto.upnp", "create", []);
};

/** 
 * @description Perform UPnP service search.
 * @param {function} callback The return callback. Returns the responses or 
 * an object with error field in case of failure.  
 * @param {integer} id  The UPnP object id returned from the 'create' API.
 * @param {integer} timeout The time to wait for responses (seconds).
 */
upnp.discovery = function(callback, upnpid, timeout) {
    makereq(callback, "proto.upnp", "discovery", [upnpid, timeout]);
};

/** 
 * Cleanup and close any pending lookups.
 *
 * @param {function} callback The return callback. Returns an object with 
 * error field in case of failure.  
 * @param {integer} id  The UPnP object id returned from the 'create' API.
 */
upnp.close = function(callback, upnpid) {
    makereq(callback, "proto.upnp", "close", [upnpid]);
};

/**
 * @description JSONRPC protocol implementation with Fathom sockets (tcp/udp)
 *              or using HTTP (XMLHttpRequest). Client side can use all
 *              three protocols, local server only supports UDP for now.
 * @exports fathom/proto/jsonrpc
 */
var jsonrpc = proto.jsonrpc = {};

/**
 * @description  This function creates and returns a JSONRPC object.
 *
 * @param {function} callback The return callback. Returns the object id or 
 *                            an object with error field in case of failure.  
 * @param {string} dst The destination IP if client else acts as server.
 * @param {int} port The destination port (or listen port for server).
 * @param {boolean} server Server mode ? (default false).
 * @param {string} proto One of 'udp' (default), 'multicast', 'tcp' (cli only)
 *                       or 'http' (cli only).
 * @param {string} path Url base path (http only - default /).
 */
jsonrpc.create = function(callback, dst, port, server, proto, path) {
    makereq(callback, "proto.jsonrpc", "create", [dst, port, server, proto, path]);
};

/** 
 * @description Listen for incoming requests (server only).
 * @param {function} callback The return callback. Returns an object with 
 *                            error field in case of failure.  
 * @param {integer} id  The JSONRPC object id returned from the 'create' API.
 */
jsonrpc.listen = function(callback, id) {
    makereq(callback, "proto.jsonrpc", "listen", [id]);
};

/** 
 * @description Send response to incoming requests (server only).
 * @param {function} callback The return callback. Returns an object with 
 *                            error field in case of failure.  
 * @param {integer} id    The JSONRPC object id returned from the 'create' API.
 * @param {object} res    The req object with added result field (empty if error)
 * @param {string} error  Error code in case of failure (else undefined).
 */
jsonrpc.sendres = function(callback, id, res, error) {
    makereq(callback, "proto.jsonrpc", "sendres", [id, res, error]);
};

/** 
 * @description Make a RPC request (client only).
 * @param {function} callback The return callback. Returns an object with 
 *                            error field in case of failure.  
 * @param {integer} id        The JSONRPC object id returned from the 'create' API.
 * @param {string} method     The JSONRPC method to call.
 * @param {Array} params      The parameters for the RPC call.
 * @param {string} module     The URL module path (http request only, optional).
 * @param {string} urlparams  The URL params (http request only, optional).
 */
jsonrpc.makereq = function(callback, id, method, params, module, urlparams) {
    makereq(callback, "proto.jsonrpc", "makereq", [id, method, params, module, params]);
};

/** 
 * @description Close server/client.
 * @param {function} callback The return callback. Returns an object with 
 *                            error field in case of failure.  
 * @param {integer} id  The JSONRPC object id returned from the 'create' API.
 */
jsonrpc.close = function(callback, id) {
    makereq(callback, "proto.jsonrpc", "close", [id]);
};

//--------------------- FATHOM.TOOLS --------------------------

/** 
 * @description fathom.tools.* namespace. Includes measurement tools
 * and other misc utility functions.
 *
 * @exports fathom/tools
 */
var tools = fathomapi.tools = {};

/**
 * @description ping (udp/tcp/http) client/server implementation in
 * using nspr API directly
 * @exports fathom/tools/ping
 */
var ping = tools.ping = {};

/**
 * @description Start ping.
 *
 * @param {function} func The callback function to invoke when
 * results are available.
 * @param {object} args command line arguments, these match more or less
 * the arguments (naming and values) that you can give to commandline
 * ping. At minimum { client : <ip> } else runs as server.
 */
tools.ping.start = function(callback, args) {
    makereq(callback, "tools", "ping.start", [args], true);
};

/**
 * @description stop running ping server.
 * @param {number} id The id returned by the start call.
 */
tools.ping.stop = function(callback, id) {
    makereq(callback, "tools", "ping.stop", [id]);
};

/**
 * @description iperf (client/server) implementation using nspr API
 * directly.
 * @exports fathom/tools/iperf
 */
var iperf = tools.iperf = {};

/**
 * @description Start iperf.
 *
 * @param {function} func The callback function to invoke when
 * results are available.
 * @param {object} args command line arguments, these match more or less
 * the arguments (naming and values) that you can give to commandline
 * iperf.
 */
tools.iperf.start = function(callback, args) {
    makereq(callback, "tools", "iperf.start", [args], true);
};

/**
 * @description stop running iperf server.
 * @param {number} id The id returned by the start call.
 */
tools.iperf.stop = function(callback, id) {
    makereq(callback, "tools", "iperf.stop", [id]);
};

/**
 * @description  This function uses Firefox's DNS service to resolve
 * url host's IP address.
 *
 * @param {function} callback Fathom invokes this callback upon
 * arrival of the DNS response.  If successful, the callback
 * receives a dictionary whose members convey the DNS response.
 * @param {string} url  URL containing the name to look up.
 */
tools.lookupUrl = function(callback, url) {
    makereq(callback, "tools", "lookupUrl", [url]);
};

/**
 * @description  This function uses Firefox's DNS service to resolve
 * host's IP address.
 *
 * @param {function} callback Fathom invokes this callback upon
 * arrival of the DNS response.  If successful, the callback
 * receives a dictionary whose members convey the DNS response.
 * @param {string} url  URL containing the name to look up.
 */
tools.lookupHostname = function(callback, hostname) {
    makereq(callback, "tools", "lookupHostname", [hostname]);
};
	    
/**
 * @description  This function gets a certificate chain information for 
 * the specified uri.
 *
 * @param {function} callback The return callback. Returns the response or 
 * an object with error field in case of failure. 
 * @param {string} uri The complete uri for which the certificate should be
 * resolved.
 */ 	
tools.getCertificateChain = function(callback, uri) {
    makereq(callback, "tools", "getCertChain", [uri]);
};

/**
 * @description device manufacturer lookup based on the MAC address. 
 * @param {string} mac The mac addres.
 */
tools.lookupMAC = function(callback, mac) {
    makereq(callback, "tools", "lookupMAC", [mac]);
};

/**
 * @description get my current public IP.
 */
tools.lookupIP = function(callback) {
    makereq(callback, "tools", "lookupIP", []);
};

/**
 * @description Get this node description (as send out in response to
 *              Fathom discovery queries). Static node info + current
                active interfaces + network env.
 */
tools.getDesc = function(callback) {
    makereq(callback, "tools", "getDesc", []);
};

/**
 * @description Get this node current network environment.
 */
tools.getNetworkEnv = function(callback) {
    makereq(callback, "tools", "getNetworkEnv", []);
};

/**
 * @description Do full network neighbour search (uses any available
 *              means to discover devices in the local network).
 * @param {number} timeout Time to wait devices (in seconds).
 */
tools.discovery = function(callback, timeout) {
    makereq(callback, "tools", "discovery", [timeout]);
};

/**
 * @description Fathom remote API implementation. Includes discovery and
 *              API server(s) and client functions. Implemented on top of
 *              the JSONRPC protocol using multicast for discovery, udp for
 *              the API calls. To use these methods you do not have to list 
 *              the underlying APIs or particular destinations in 
 *              the manifest, they are allowed implicitely when requesting
 *              the tools.remoteapi.* functionality.
 *
 * @exports fathom/tools/remoteapi
 */
tools.remoteapi = {};

/**
 * @description Start remote API servers (sets the browser visible to other 
 *              Fathoms and serves incoming RPC calls).
 *
 *              Does nothing if API is already enabled.
 */
tools.remoteapi.start = function(callback) {
    makereq(callback, "tools", "remoteapi.start", []);
};

/**
 * @description Stop remote API servers (unless somebody else is using it).
 */
tools.remoteapi.stop = function(callback) {
    makereq(callback, "tools", "remoteapi.stop", []);
};

/**
 * @description Discover other nodes running Fathom (i.e. nodes that have 
 *              called remoteapi.start).
 *
 * @param {Function} callback Result callback.
 * @param {int} timeout Timeout (seconds).
 */
tools.remoteapi.discovery = function(callback, timeout) {
    makereq(callback, "tools", "remoteapi.discovery", [timeout]);
};

/**
 * @description Make remote API requests to other nodes running Fathom.
 *
 * @param {Function} callback Result callback.
 * @param {Object} node     The target Fathom node as returned by the discovery.
 * @param {string} method   The Fathom API method to call (all API methods
 *                          available subject to the page manifest).
 * @param {Array} params    The parameters for the API call.
 */
tools.remoteapi.makereq = function(callback, node, method, params) {
    makereq(callback, "tools", "remoteapi.makereq", [node,method,params]);
};

//--------------------- FATHOM.BASELINE --------------------------

/** 
 * @description fathom.baseline.* namespace. 
 *
 * @exports fathom/baseline
 */
var base = fathomapi.baseline = {};

/**
 * @description Get historical baseline measurements data. 
 * Returns approximately the last 'range' of values (if available).
 *
 * To fetch a single metric, you can use the helper methods.
 *
 * @param {string} range One of 'day' (default), 'week', 'month', 'year'.
 * @param {Array}  what  List of 'cpu', 'load', 'tasks', 'mem', 'traffic',
 *                       'wifi' and 'rtt'. Undefined or empty list
 *                       defaults to all metrics (execpt 'env' which has
 *                       to be requested separately always -- see getEnv).
 */
base.get = function(callback, range, what) {
    if (!range) range = 'day';
    if (!what || what.length == 0) 
	what = ['cpu','load','tasks','mem','traffic','wifi','rtt'];
    makereq(callback, "baseline", "get", [what,range]);    
};

/**
 * @description Get historical CPU usage data from the baseline measurements. 
 * Returns approximately the last 'range' of values (if available).
 *
 * @param {string} range One of 'day' (default), 'week', 'month', 'year'.
 */
base.getCPU = function(callback, range) {
    if (!range) range = 'day';
    makereq(callback, "baseline", "get", ['cpu',range]);    
};

/**
 * @description Get historical CPU load data from the baseline measurements. 
 * Returns approximately the last 'range' of values (if available).
 *
 * @param {string} range One of 'day' (default), 'week', 'month', 'year'.
 */
base.getLoad = function(callback, range) {
    if (!range) range = 'day';
    makereq(callback, "baseline", "get", ['load',range]);    
};

/**
 * @description Get historical CPU tasks data from the baseline measurements. 
 * Returns approximately the last 'range' of values (if available).
 *
 * @param {string} range One of 'day' (default), 'week', 'month', 'year'.
 */
base.getTasks = function(callback, range) {
    if (!range) range = 'day';
    makereq(callback, "baseline", "get", ['tasks',range]);    
};

/**
 * @description Get historical memory usage data from the baseline measurements.
 * Returns approximately the last 'range' of values (if available).
 *
 * @param {string} range One of 'day' (default), 'week', 'month', 'year'.
 */
base.getMem = function(callback, range) {
    if (!range) range = 'day';
    makereq(callback, "baseline", "get", ['mem',range]);        
};

/**
 * @description Get historical network usage data from the baseline 
 * measurements.
 * Returns approximately the last 'range' of values (if available).
 *
 * @param {string} range One of 'day' (default), 'week', 'month', 'year'.
 */
base.getTraffic = function(callback, range) {
    if (!range) range = 'day';
    makereq(callback, "baseline", "get", ['traffic',range]);        
};

/**
 * @description Get historical wifi performance data from the baseline 
 * measurements.
 * Returns approximately the last 'range' of values (if available).
 *
 * @param {string} range One of 'day' (default), 'week', 'month', 'year'.
 */
base.getWifi = function(callback, range) {
    if (!range) range = 'day';
    makereq(callback, "baseline", "get", ['wifi',range]);    
};

/**
 * @description Get historical network delay performance data from 
 * the baseline measurements.
 * Returns approximately the last 'range' of values (if available).
 *
 * @param {string} range One of 'day' (default), 'week', 'month', 'year'.
 */
base.getRTT = function(callback, range) {
    if (!range) range = 'day';
    makereq(callback, "baseline", "get", ['rtt',range]);        
};

/**
 * @description Get historical network locations from the baseline
 * measurements.
 * Returns approximately the last 'range' of values (if available).
 *
 * @param {string} range One of 'day' (default), 'week', 'month', 'year'.
 */
base.getEnv = function(callback, range) {
    if (!range) range = 'day';
    makereq(callback, "baseline", "get", ['env',range]);        
};