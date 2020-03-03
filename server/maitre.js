const axios = require('axios');
const cheerio = require('cheerio');
var querystring = require('querystring');


const parsePage = data => {
  const $ = cheerio.load(data);
  var dict = [];
  $('div.single_libel').each((i, element) => {
		const name = $(element).text();
		var temp = name;
		temp = temp.substring(24);
		temp_index= temp.indexOf(' (');
		temp = temp.substring(0,temp_index);
		if(temp != ""){
			dict.push({
				name: temp
			});
		}
	})
	
  return dict;
};

module.exports.scrapePage = async page => {
  const payload = {
	  'page': page,
	  'request_id': 'f6907c06d24eeddec2bf7b7f3d343a24'
  };
  
  const options = {
	  'url': 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult',
	  'method': 'POST',
	  'headers': {'content-type': 'application/x-www-form-urlencoded'},
	  'data': querystring.stringify(payload)
  };
  
  const response = await axios(options);
  const {data, status} = response;
  
  if (status >= 200 && status < 300) {
	  return parsePage(data);
  }
  
  console.error(status);
  
  return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
  return [];
};