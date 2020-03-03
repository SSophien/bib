const maitre = require('./maitre');
const restaurants = [];

var fs = require('fs');

async function sandbox(searchLink = 'https://www.maitresrestaurateurs.fr/annuaire/recherche') {
	var pageCount = 1;
	while(true){
	  try {
		console.log(`Browsing page ${pageCount}`);

		const restaurant = await maitre.scrapePage(pageCount);
		var length = restaurant.length;
		if(length == 0)
			break;
		
		for(j = 0; j < length; j++){
			restaurants.push(restaurant.pop());
		}
		
		console.log('done');
		pageCount++;
	  } catch (e) {
		console.error(e);
		process.exit(1);
	  }
	}
	
	var maitreJson = JSON.stringify(restaurants);
	fs.writeFileSync("maitre.json", maitreJson, function(err) {
    if (err) {
        console.log(err);
    }
});
	
	process.exit(0);
}
const [,, searchLink] = process.argv;

sandbox(searchLink);