import styles from './category-filter.module.sass';

const CATEGORIES = [
    'All',
    'Ambiance',
    'Food',
    'Staff',
    'Menu',
] as const;

type Category = (
    typeof CATEGORIES
)[number];

interface CategoryFilterProps {
    active: Category;
    onSelect: (
        category: Category,
    ) => void;
    images: {
        category: string;
    }[];
}

export default function CategoryFilter({
    active,
    onSelect,
    images,
}: CategoryFilterProps) {

    return (
        <div
            className={
                styles.categoryFilter
            }
        >

            {CATEGORIES.map(
                (category) => {

                    const count =
                        category === 'All'
                            ? images.length
                            : images.filter(
                                (image) =>
                                    image.category ===
                                    category,
                            ).length;

                    const isActive =
                        active === category;


                    return (
                        <button
                            key={category}
                            type="button"
                            className={[
                                styles.filterButton,
                                isActive
                                    ? styles.active
                                    : '',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            onClick={() =>
                                onSelect(
                                    category,
                                )
                            }
                        >
                            {category}

                            {count > 0 && (
                                <span
                                    className={
                                        styles.count
                                    }
                                >
                                    ({count})
                                </span>
                            )}
                        </button>
                    );
                },
            )}

        </div>
    );
}

export type {
    Category,
};