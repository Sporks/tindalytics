const tinder = require('tinderjs'),
const client = new tinder.TinderClient(),
//WILL BE SENT TO SERVER FROM INDEX (login) page

module.exports = {
	login: function(request, response){
		var fb_creds;
		var fb_ut = "";
		var fb_uid = "";
		var output, i;

		request.on('data', function(data){			//get fb_ut and uid and put into an object to parse later
			fb_creds = JSON.parse(data)
		});

		fb_ut = fb_creds.ut;
		fb_uid = fb_creds.uid;


		//authorize tinder client with fb user token and id
		client.authorize(fb_ut, fb_uid, function () {
		    client.getHistory(function (error, data) {
		        if (error) {
		            throw error;
		        } else {
		            //start of: client.getHistory - no error - callback. parsing data variable;
		            var matches = data.matches,
		                arrayOfMatchObjs = [];
		            data.matches.forEach(function (match) {
		                if (match.person) {
		                    arrayOfMatchObjs.push(MatchObjFactory(match));
		                }
		            }); //end of: forEach match function
		            //store match array in JSON file
		            var output = JSON.stringify(arrayOfMatchObjs, null, " ");
		            fs.writeFile('testData/matches.json', output,					//prob dont need this
		                function (err, success) {
		                    if (err) {
		                        throw err;
		                    } else {
		                        console.log('matches.json has been created');
		                    }
		                });
		        }
		    }); //end of: client.getHistory callback;
		});
}
