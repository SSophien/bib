const axios = require('axios');
const cheerio = require('cheerio');

const parse = data => {
  const $ = cheerio.load(data);
  const name = $('h2.restaurant-details__heading--title').first().text();
  const address = $('.restaurant-details__heading--list > li:not([class])').first().text();

  return {name, address};
};

const parsePage = data => {
	const $ = cheerio.load(data);
	const links = [];
	
	$('div.js-restaurant__list_item > a').each((i, element) => {
		const link = $(element).attr('href');
		links.push("https://guide.michelin.com" + link);
	})
	
	return links;
};

module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parsePage(data);
  }

  console.error(status);

  return null;
};

module.exports.scrapeInfoRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
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
