const searchRepository = require("../repositories/search.repository");

exports.searchRestaurants = async (query) => {

    return await searchRepository.searchRestaurants(query);

};