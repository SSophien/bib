/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const links = [];
const allRestaurants = [];

var fs = require('fs');

async function sandbox () {
	var i = 1;
	while(true){
	  try {
		var link = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/" + i;
		console.log(`Browsing ${link} source`);

		const restaurant = await michelin.scrapeRestaurant(link);
		var length = restaurant.length;
		if(length == 0)
			break;
		for(j = 0; j < length; j++){
			links.push(restaurant.pop());
		}
		console.log('done');
		i++;
	  } catch (e) {
		console.error(e);
		process.exit(1);
	  }
	}
	
	var length = links.length;
	for(k = 0; k < length; k++){
		const infoRestaurant = await michelin.scrapeInfoRestaurant(links.pop());
		console.log(infoRestaurant);
		allRestaurants.push(infoRestaurant);
	}
	
	var michelinJson = JSON.stringify(allRestaurants);
	fs.writeFileSync("michelin.json", michelinJson, function(err) {
		if (err) {
			console.log(err);
		}
	});
	process.exit(0);
}



const [,, link] = process.argv;

sandbox();