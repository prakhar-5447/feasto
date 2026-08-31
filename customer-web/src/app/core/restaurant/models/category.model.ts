export type CategoryType = 'cuisine' | 'food';

export interface Category {
    id: string;
    name: string;
    icon: string;
    type: CategoryType;
}