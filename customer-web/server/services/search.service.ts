import * as searchRepository from "../repositories/search.repository";

export const searchRestaurants = async (query: any) => {

    return await searchRepository.searchRestaurants(query);

};