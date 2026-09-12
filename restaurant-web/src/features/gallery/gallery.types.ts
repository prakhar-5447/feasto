export type GalleryCategory =
    | 'Ambiance'
    | 'Food'
    | 'Staff'
    | 'Menu';

export interface GalleryImage {
    id: number;
    url: string;
    alt: string;
    category: GalleryCategory;
    featured: boolean;
    uploadedAt: string;
}