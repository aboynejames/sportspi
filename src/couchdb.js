var http = require('http');

/**
* Self Engine
*
*  couchdb operations
* @class couchdbSettings
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var coudchdbSettings = function(couchin) {
  this.account = {};
	this.couchdbname =  couchin.account['couchdbname'];
	this.couch =  couchin.account['couchuser'];
	this.couchpwd = couchin.account['couchpwd'];
	this.opts = {};
	this.datasourcesii = [];

};

/**
* couch api options settings
* @method setoptions
*/
coudchdbSettings.prototype.setoptions = function() {

	this.opts = {
				host: 'localhost',
				port: 5984,
				path: '/' + this.couchdbname ,
				auth: this.couch + ':' + this.couchpwd
	};

};

/**
* get a UUID from couchdb
* @method getUIDfromcouch
*/
coudchdbSettings.prototype.getUIDfromcouch = function(callbackin) {

	reudata = '';
		
	var opts = {
	host: 'localhost',
	port: 5984,
	path: '/_uuids',
	auth: this.couch + ':' + this.couchpwd
	};

	var requu = http.get(opts, function(resuu) {
// console.log(res);
		//return testreturn;	
	resuu.setEncoding('utf8');
	resuu.on('data', function(data) {

		var  uuidnew = data;	
		jsonuud =  JSON.parse(uuidnew);

			jsonuud["uuids"].forEach(function(udata){
			
			reudata = udata;	
			});						

		resuu.on('end', function() {
//console.log(' after end function what I am trying to return');			
//console.log(reudata);
			
			callbackin(reudata);
		});
	
	});
});

};  // getuuid close


/**
* logic to produce list of swimmers
* @method buildswimmers
*
*/
coudchdbSettings.prototype.buildswimmers = function(firstpath, response, request, couchin, origin) {
//console.log("build the swimmer for this lane");
//console.log('at hander filelllllllleelle' + util.inspect(couchin));

	
// query couch to get existing saved swimmers ids(could be in groups e.g. lane swimmers)	
		getSwimmerscouchdb ();

	
		function getSwimmerscouchdb () {
			
			formstartingswimmers = {};
			buildpathurl = '';
			
			// convert pathurl in couchdb path url string
			//http://localhost:5984/traintimer/_design/swimmerid/_view/by_swimmerid
			
			buildpathurl = '/' + couchin.account['couchdbname'] + '/_design/swimmerid/_view/by_swimmerid';
console.log(buildpathurl);			
			var opts = {
				host: 'localhost',
				port: 5984,
				path: buildpathurl,
				auth: couchin.account['couchuser'] + ':' + couchin.account['couchpwd']
			};

		var requu = http.get(opts, function(resw) {
		var swlivenew = '';
					//return testreturn;	
				resw.setEncoding('utf8');
				resw.on('data', function(data) {
					swlivenew += data;	
//console.log(swlivenew);								
				});
					resw.on('end', function() {
//console.log(' after end function what I am trying to return');			
//console.log(swlivenew);					
					resultjs = JSON.parse(swlivenew);
//console.log(resultjs);
/*						
		
						resultjs["rows"].forEach(function(rowswimrs){
//console.log(rowswimrs['key']);	
						formstartingswimmers = formswimmers("swimmer", rowswimrs['key']);
console.log(formstartingswimmers);							
							
						});
*/						
						response.setHeader("access-control-allow-origin", origin);
						response.writeHead(200, {"Content-Type": "application/json"});
						response.end();				
       					});
				
	
			});
			
			}  // getSwimmer view from couchdb close
	 				
		function formswimmers(swname, swid) {
				
			var swimstarters = '<li class="liveswimmers"  id="' + swid + '"><a href="" id="testtrain" data-networkidentity="networkidentity">' + 'swimmer' + '</a></li>';
				
			return swimstarters;
		}

}

/**
* chain together a serial of function before a final collection of data
* @method serialflowController
*
*/
coudchdbSettings.prototype.serialflowController = function(item) {
console.log('start of serial flow controlller');

	function controldataflow (dataid, callback) {  
		this.getSwimDatacouchdb(dataid, callback);
	} 	
	
	if(item) {
//console.log(util.inspect(result));
		
		controldataflow (item, function(resultback) { 
			dataholder.push(resultback);
//console.log(util.inspect(results));
			return this.serialflowController(datasources.shift());
		});
	    
		}
		else {
			return this.finalf();
		}
	
	series(datasources.shift());
	
};	

/**
* final function call once all data is collected
* @method finalf
*
*/
coudchdbSettings.prototype.finalf = function(item) {
	
console.log('Done all data back from couchdb DATA');
//console.log(dataholder);		
		// prepare the order and html
		senddataback(dataholder);
};

/**
* call back function for series controller
* @method controldataflow 
*
*/
coudchdbSettings.prototype.controldataflow  = function(dataid, dsi, controldataflow, callback) {

		this.getSwimDatacouchdb (dataid, callback);
};


/**
* builds a couchdb query for swim training data
* @method getSwimDatacouchdb 
*
*/
coudchdbSettings.prototype.getSwimDatacouchdb  = function(singleid, fullpath, couchin, callbackin) {
console.log('callback into couch query');		
	//var dataholder = {};
	formstartingswimmers = {};
	buildpathurl = '';
		
	buildpathurl = '/' + couchin.account['couchdbname'] + '/_design/sessiondata/_view/by_sessiondata?key="' + singleid + '"';
console.log(buildpathurl);			
	var opts = {
		host: 'localhost',
		port: 5984,
		path: buildpathurl,
		auth: couchin.account['couchuser'] + ':' + couchin.account['couchpwd']
	};

	var requu = http.get(opts, function(resw) {
		var swlivenew = '';
			//return testreturn;	
			resw.setEncoding('utf8');
			resw.on('data', function(data) {
			swlivenew += data;	
//console.log(swlivenew);								
		});
		
		resw.on('end', function() {
//console.log(' after end function what I am trying to return');							
			resultjs = JSON.parse(swlivenew);
//console.log(resultjs['rows']);				
			callbackin(resultjs['rows']);
//console.log('how many times back?');
		
		});				
	});

};

/**
* return swim training data to client
* @method senddataback 
*
*/
coudchdbSettings.prototype.senddataback  = function(alldata, couchin, fullpath, response, origin, couchlive) {
console.log('send data back');
//console.log(alldata);	
		// join all data into one array
		var alldatalist = alldata[0].concat(alldata[1]);
//console.log(alldatalist);		
		// sort in time order, earliest first
		formstartingswimmers['attentionflow'] = '<ol id="previousattention" data-start-id="' + '121' + '" data-end-id="' + '122' + '" ></ol>';
		var sessiondataindex = {};
		// re arrange object for time with session ie time
		alldatalist.forEach(function(rowswimrs){		
			if(rowswimrs['value'])
			{
				sessiondataindex[rowswimrs['value'].sessionid] = rowswimrs['value'];
			}	
		});

	pertimedata = Object.keys(sessiondataindex);
	pertimedata = pertimedata.sort(function(a,b){return b-a});
	
	pertimedata.forEach(function(sessionorder){
			formstartingswimmers[sessionorder] = couchlive.formswimmers(couchin.sensorid[fullpath[2]], fullpath[2], sessiondataindex[sessionorder], response, origin, couchlive);
		
	});
	
	response.setHeader("access-control-allow-origin", origin);
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(formstartingswimmers));
	
			
};

/**
*  prepare HTML for starting activity attention fix
* @method formswimmers
*
*/
coudchdbSettings.prototype.formswimmers  = function(swid, swimmername, swimdatain, response, origin, couchlive) {
	
	var markanddata = {};
	var displaytime = couchlive.timeformat(swimdatain.splittimes.slice(-1));
	var swimdataelement = '';
	
	swimdataelement += '<li class="attentionhistory" id="historyfix" data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '">';
	swimdataelement += '<div id="activity" data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '" >';
	swimdataelement += '<div class="socialdata"  id="' + swid + '" data-networkidentity="networkidentity" >' + swimmername + '</div>';

	swimdataelement += '<div class="activitydetail" >';	
	swimdataelement += '<div class="focuselement-h"  id="' + swimdatain.sessionid + '" >Training</div>';

	// first extra object key
	var swimcategories = Object.keys(swimdatain.swiminfo);
	swimcategories.forEach(function(swimcat) {
		if(swimcat != 'swimdate' ) {	
			swimdataelement += '<div id="' + swimdatain.sessionid + '"  class="focuselement-h" data-knowledgeword="' + swimdatain.swiminfo[swimcat] + '">' + swimdatain.swiminfo[swimcat] + '</div> ';
			
		}
		else 
		{
		}
	});	
	

	//swimdataelement += '<a id="analysis"  href=""  data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '">Analysis</a>';
	swimdataelement += '<div id="datetime" >';
	swimdataelement += '<a id="' + swimdatain.sessionid + '"  href="" class="focuselement-date" data-knowledgeword="' + swimdatain.swiminfo['swimdate'] + '">' + swimdatain.swiminfo['swimdate'] + '</a>';
	swimdataelement += '</div>';
	swimdataelement += '</div>';
	swimdataelement += '<div class="timefocus-fix"><div id="endtime" class="timefocus" data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '">' + displaytime + '</div>';
	swimdataelement += '</div>';
	
	swimdataelement += '<div id="feedback-" class="feedback-fix" >Faster/slower</div>';
	swimdataelement += '<div id="action-" class="action-fix" >Action:</div>';
	//swimdataelement += '<div id="clear"></div>';
	swimdataelement += '</div>';

	swimdataelement += '<div class="visualisation-flow" id="anlaysisid-'+ swimdatain.sessionid + '" data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '">';

	swimdataelement += '</div>';
	swimdataelement += '</li>';
	
	markanddata['attentionmarkup'] = swimdataelement;
	markanddata['knowledgechain'] = swimdatain.swiminfo;
	markanddata['splitdata'] = swimdatain.splittimes;

	return markanddata;
			
};

/**
* format a digital number string to time format presentation
* @method timeformat
*/
coudchdbSettings.prototype.timeformat  = function(ms) {

	function leading0(number){ return number < 10 ? "0" : "";}


	var hundredths = ms;
	mins = parseInt((hundredths / 1000) / 60);
	secs = parseInt((hundredths / 1000) % 60);
	huns = parseInt(hundredths % 1000);
	
	output = leading0(mins) + mins + ":" + leading0(secs) + secs + "." + leading0(huns) + huns;
	
	return output;
};

/**
* logic to produce swimdata for individual swimmer
* @method buildswimdata
*
*/
coudchdbSettings.prototype.setID = function(masterid, idlist) {

	var idlistlive = [];
	this.idlistlive = idlist;
console.log('setting of idnetowrks ids');	
console.log(this.idlistlive);

};

/**
* find out all the ID number for the signin
* @method aggregateID
*
*/
coudchdbSettings.prototype.aggregateID = function(masterid) {
	// hardwired for now	
	this.aggregateIDin = {}; 
	this.aggregateIDin['testopensport'] = ["734081--2124474577","5613079--2124474577"];
	this.aggregateIDin['testopensport2'] = ["499168--1413255847","4245186--1342236502","1830331-225205658"];

	return this.aggregateIDin[masterid];
};


/**
* logic to produce swimdata for individual swimmer
* @method buildswimdata
*
*/
coudchdbSettings.prototype.buildswimdata = function(fullpath, response, request, couchin, couchlive, origin) {
console.log("couchdb SWIM DATA");

	// how many id souces of data coming in?
	function keeplocal (userID) {
		this.datasourcesii = couchlive.aggregateID(userID);

		return this.datasourcesii;
	}
	keeplocal();
		
	var dataholder = [];	
	var datasources = keeplocal(fullpath[2]);
 
	function controldataflow (dataid, callback) {  
		couchlive.getSwimDatacouchdb (dataid, fullpath, couchin, callback);
	} 
	
	function finalf() { 
console.log('Done all data back from couchdb DATA');
//console.log(dataholder);		
		// prepare the order and html
		couchlive.senddataback(dataholder, couchin, fullpath, response, origin, couchlive);
	}
	
	
	function series(item) {
//console.log(util.inspect(item));
		if(item) {
//console.log(util.inspect(result));
		
		controldataflow (item, function(resultback) { 
			dataholder.push(resultback);
//console.log(util.inspect(results));
			return series( datasources.shift());
		});
	    
		}
		else {
			return finalf();
		}
	}
	
	series( datasources.shift());
	
}


/**
* logic to produce swimdata for individual swimmer
* @method buildracedata
*
*/
coudchdbSettings.prototype.buildracedata = function(fullpath, response, request, couchin, couchlive, origin) {
console.log("build RACE data");
	
	function keeplocal (userID) {
		this.datasourcesii = couchlive.aggregateID(userID);
			
		return this.datasourcesii;
	}
	keeplocal();
	
	// how many id souces of data coming in?
	var dataholderb = [];	
	datasourcesb = keeplocal(fullpath[2]);//couchin.group[fullpath[2]];  //couchin.sensorid[fullpath[2]]; //[ '734081--2124474577', '5613079--2124474577' ];//couchin.sensorid[fullpath[2]];
console.log(datasourcesb);
	function controldataflowb (dataidb, callbackb) {  
		getSwimDatacouchdbb (dataidb, callbackb);
	} 
	
	function finalfb() { 
console.log('Done all data back from couchdb RACE');
		// prepare the order and html
		senddatabackb(dataholderb);
	}
	
	
	function seriesb(itemb) {
//console.log(util.inspect(item));
		if(itemb) {
//console.log(util.inspect(result));
		
		controldataflowb (itemb, function(resultbackb) { 
			dataholderb.push(resultbackb);
//console.log(util.inspect(results));
			return seriesb(datasourcesb.shift());
		});
	    
		}
		else {
			return finalfb();
		}
	}
	
	seriesb(datasourcesb.shift());
	


	function getSwimDatacouchdbb (singleidb, callbackinb) {
		
		formstartingswimmersb = {};
		buildpathurlb = '';
			
		buildpathurlb = '/' + couchin.account['couchdbname'] + '/_design/racesession/_view/by_racesession?key="' + singleidb + '"';
console.log(buildpathurlb);			
		var opts = {
			host: 'localhost',
			port: 5984,
			path: buildpathurlb,
			auth: couchin.account['couchuser'] + ':' + couchin.account['couchpwd']
		};

		var requub = http.get(opts, function(reswb) {
			var swlivenewb = '';
				//return testreturn;	
				reswb.setEncoding('utf8');
				reswb.on('data', function(datab) {
					swlivenewb += datab;	
//console.log('query data back db');
//console.log(swlivenewb);								
			});
			
			reswb.on('end', function() {
//console.log(' after end function what I am trying to return');							
				resultjsb = JSON.parse(swlivenewb);
//console.log(resultjs['rows']);				
				callbackinb(resultjsb['rows']);
//console.log('how many times back?');
			
			});				
		});

	}			
				
	function  senddatabackb (alldatab) {
console.log('send data back');
//console.log(alldatab);
		competitiondataindex = {};
		competitiondata = {};

		alldatab.forEach(function(rowswimrsc){
			if(rowswimrsc[0])
			{			
				competitiondata['compKnowledge'] = rowswimrsc[0]['value'].swiminfo;
				competitiondata ['competitionData'] = rowswimrsc[0]['value'].splittimes;
				competitiondataindex[rowswimrsc[0]['value'].sessionid] = competitiondata;
			}	
		});
					
//console.log(competitiondataindex);		
	response.setHeader("access-control-allow-origin", origin);
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(competitiondataindex));
	
			
	}  // getSwimmer view from couchdb close
	
		
}



/**
* make post  ie save to couchdb
* @method syncsave
*/
coudchdbSettings.prototype.syncsave = function (datatosaveswim, swimpathin) {
	
console.log('start of couch save');		
	// need to ask couchdb for unique doc id.
//console.log(swimpathin);
	swimpathlive = swimpathin;
	// need to call the couchdb function / class  pass on data and PUT				
					var opts = {
					host: 'localhost',
					port: 5984,
					method: 'PUT',
					path: '/' + this.couchdbname + '/' + swimpathlive,
					auth: this.couch + ':' + this.couchpwd,
					headers: {}
					};
	
		// JSON encoding
		opts.headers['Content-Type'] = 'application/json';
//console.log('the data to sync');
//console.log(datatosaveswim);
		data = JSON.stringify(datatosaveswim);
//console.log(data);
		opts.headers['Content-Length'] = data.length;
		rec_data = '';
//console.log(opts);			
		var reqc = http.request(opts, function(responsec) {
//console.log('waiting for couch to responed . . . .');			
			responsec.on('data', function(chunk) {
				rec_data += chunk;
			});
							
			responsec.on('end', function() {
//console.log('any response data from couch??');	
//console.log(rec_data);

			});
		});
					
		reqc.on('error', function(e) {
//console.log("Got error: " + e.message);
		});

			// write the data
		if (opts.method == 'PUT') {
//console.log('post has been sent');	
			reqc.write(data);
//console.log('after put write');
		}
		reqc.end();		

};


/**
* create a new couchdb
* @method createnewcouchdb
*/
coudchdbSettings.prototype.createnewcouchdb = function (newnamecouch) {
	
console.log('start of create new couch');		

	var options = {
  hostname: 'localhost',
  port: 5984,
  path: '/' + newnamecouch,
  method: 'PUT',
	auth: this.couch + ':' + this.couchpwd
};

var req = http.request(options, function(res) {
//console.log('STATUS: ' + res.statusCode);
//console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
//console.log('BODY: ' + chunk);
  });
});

	req.on('error', function(e) {
//console.log('problem with request: ' + e.message);
	});

// write data to request body

	req.end();

};

module.exports = coudchdbSettings;