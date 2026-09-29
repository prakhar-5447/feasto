import * as searchRepo from "../repositories/search.repository";

export const searchItems = (keyword: string) => {
    return searchRepo.searchItems(keyword);
};

export const searchRestaurants = (query: any) => {
    return searchRepo.searchRestaurants(query);
};