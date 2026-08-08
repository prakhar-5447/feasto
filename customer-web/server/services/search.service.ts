import * as searchRepo
from "../repositories/search.repository";

export const searchItems = (
    keyword: string
) => {
    return searchRepo.searchItems(keyword);
};