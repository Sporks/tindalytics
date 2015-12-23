var tinder = require('tinderjs');
var client = new tinder.TinderClient();
var fs = require('fs');
var url = require('url');
//WILL BE SENT TO SERVER FROM INDEX (login) page

module.exports = {
	login: function(request, response) {
		var fb_creds;
		var fb_ut = "";
		var fb_uid = "";
		// var output, i;

		// // console.log(request);
		request.on('data', function(data){		//get fb_ut and uid and put into an object to parse later
			console.log("HELLO");
			fb_creds += JSON.parse(data)
			// return fb_creds;
		});
		
		request.on('end', function(){	
			console.log("WOW")
			fb_ut = fb_creds.ut;
			fb_uid = fb_creds.uid;

			//authorize tinder client with fb user token and id
			client.authorize(fb_ut, fb_uid, function () {
			    client.getHistory(function (error, data) {
			        if (error) {
			            // throw error;
			            // console.log("error")
			            response.writeHead(404, { 	//Write head and send text of bad login
			            	"Content-Type": "text/html"
			            });
			            return response.end("Incorrect login");
			        } else {
			            //start of: client.getHistory - no error - callback. parsing data variable;
			            var matches = data.matches;

			    		matches = JSON.stringify(matches);
			            return fs.readFile(__dirname + '/../client/dashboard.html', 'uft8', function(err, data){
			            	//'append' json of matches to the end of the dashboard.html file
			            	var retData = data.slice(0, data.length-8) + "<script>" + matches + "</script>\n</html>"
			            	response.writeHead(200, {
			            		"Content-Type": "text/html"
			            	});
			            	response.end(retData);
			            });

			          
			        }
				});
			}); //end of client authorize
		});	//End of response.end
	}	

}
