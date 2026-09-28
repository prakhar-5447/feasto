"use client";

import { useMemo, useState } from "react";

import {
    Plus,
    Search,
    SlidersHorizontal,
} from "@/shared/icons";

import CategorySidebar from "@/features/menu/components/category-sidebar/category-sidebar";
import ItemRow from "@/features/menu/components/item-row/item-row";
import ItemForm from "@/features/menu/components/item-form/item-form";

import type {
    MenuItem,
    MenuItemFormData,
} from "@/features/menu/menu.types";

import {
    useAddFoodMutation,
    useDeleteFoodMutation,
    useGetMyMenuQuery,
    useUpdateAvailabilityMutation,
    useUpdateFoodMutation,
} from "@/features/menu/menu.api";

import styles from "./menu-management.module.sass";

const INITIAL_CATEGORIES = [
    "Biryani",
    "Starters",
    "Main Course",
    "Breads",
    "Desserts",
    "Beverages",
];

const EMPTY_ITEM: MenuItemFormData = {
    name: "",
    category: "Biryani",
    price: 0,
    description: "",
    image: "",
    available: true,
    foodType: "veg",
    vegan: false,
    halal: false,
    bestseller: false,
    spiceLevel: "mild",
    preparationTime: 15,
};

export default function MenuManagement() {
    /* ---------------------------------- */
    /* API                                */
    /* ---------------------------------- */

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetMyMenuQuery();


    const [addFood, { isLoading: isAdding }] =
        useAddFoodMutation();

    const [updateFood, { isLoading: isUpdating }] =
        useUpdateFoodMutation();

    const [deleteFood, { isLoading: isDeleting }] =
        useDeleteFoodMutation();

    const [updateAvailability] =
        useUpdateAvailabilityMutation();

    /* ---------------------------------- */
    /* DATA                               */
    /* ---------------------------------- */

    const items: MenuItem[] = data?.data ?? [];

    /* ---------------------------------- */
    /* STATE                              */
    /* ---------------------------------- */

    const [categories, setCategories] =
        useState<string[]>(INITIAL_CATEGORIES);

    const [activeCategory, setActiveCategory] =
        useState("all");

    const [search, setSearch] = useState("");

    const [showUnavailable, setShowUnavailable] =
        useState(true);

    const [editingId, setEditingId] =
        useState<string | null>(null);

    const [editForm, setEditForm] =
        useState<MenuItemFormData | null>(null);

    const [showAddForm, setShowAddForm] =
        useState(false);

    const [addForm, setAddForm] =
        useState<MenuItemFormData>({
            ...EMPTY_ITEM,
        });

    /* ---------------------------------- */
    /* FILTERED ITEMS                     */
    /* ---------------------------------- */

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const matchesCategory =
                activeCategory === "all" ||
                item.category === activeCategory;

            const matchesSearch =
                !search ||
                item.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesAvailability =
                showUnavailable || item.available;

            return (
                matchesCategory &&
                matchesSearch &&
                matchesAvailability
            );
        });
    }, [
        items,
        activeCategory,
        search,
        showUnavailable,
    ]);

    /* ---------------------------------- */
    /* COUNTS                             */
    /* ---------------------------------- */

    const availableCount = items.filter(
        (item) => item.available
    ).length;

    /* ---------------------------------- */
    /* EDIT                               */
    /* ---------------------------------- */

    const handleEdit = (item: MenuItem) => {
        setEditingId(item.id);

        setEditForm({
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price,
            description: item.description,
            image: item.image,
            available: item.available,
            foodType: item.foodType,
            vegan: item.vegan,
            halal: item.halal,
            bestseller: item.bestseller,
            spiceLevel: item.spiceLevel,
            preparationTime: item.preparationTime,
        });

        setShowAddForm(false);
    };

    const saveEdit = async () => {
        if (
            !editForm ||
            !editForm.id
        ) {
            return;
        }

        try {
            await updateFood({
                foodId: editForm.id,
                body: {
                    name: editForm.name,
                    category: editForm.category,
                    price: editForm.price,
                    description: editForm.description,
                    foodType: editForm.foodType,
                    vegan: editForm.vegan,
                    halal: editForm.halal,
                    bestseller: editForm.bestseller,
                    available: editForm.available,
                    spiceLevel: editForm.spiceLevel,
                    preparationTime:
                        editForm.preparationTime,
                },
            }).unwrap();

            setEditingId(null);
            setEditForm(null);
        } catch (error) {
            console.error(
                "Failed to update food:",
                error
            );
        }
    };

    /* ---------------------------------- */
    /* ADD                                */
    /* ---------------------------------- */

    const handleShowAddForm = () => {
        setShowAddForm(true);
        setEditingId(null);
        setEditForm(null);

        setAddForm({
            ...EMPTY_ITEM,
            category:
                activeCategory !== "all"
                    ? activeCategory
                    : "Biryani",
        });
    };

    const addItem = async () => {
        if (
            !addForm.name.trim() ||
            !addForm.price
        ) {
            return;
        }

        try {
            const formData = new FormData();

            formData.append(
                "name",
                addForm.name
            );

            formData.append(
                "category",
                addForm.category
            );

            formData.append(
                "price",
                String(addForm.price)
            );

            formData.append(
                "description",
                addForm.description
            );

            formData.append(
                "foodType",
                addForm.foodType
            );

            formData.append(
                "vegan",
                String(addForm.vegan)
            );

            formData.append(
                "halal",
                String(addForm.halal)
            );

            formData.append(
                "bestseller",
                String(addForm.bestseller)
            );

            formData.append(
                "available",
                String(addForm.available)
            );

            formData.append(
                "spiceLevel",
                addForm.spiceLevel
            );

            formData.append(
                "preparationTime",
                String(
                    addForm.preparationTime
                )
            );

            /*
             * IMPORTANT:
             * This assumes ItemForm stores image
             * as a File when a new image is selected.
             */
            if (addForm.image) {
                formData.append(
                    "image",
                    addForm.image
                );
            }

            await addFood(formData).unwrap();

            setAddForm({
                ...EMPTY_ITEM,
                category:
                    activeCategory !== "all"
                        ? activeCategory
                        : "Biryani",
            });

            setShowAddForm(false);
        } catch (error) {
            console.error(
                "Failed to add food:",
                error
            );
        }
    };

    /* ---------------------------------- */
    /* DELETE                             */
    /* ---------------------------------- */

    const deleteItem = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteFood(id).unwrap();

            if (editingId === id) {
                setEditingId(null);
                setEditForm(null);
            }
        } catch (error) {
            console.error(
                "Failed to delete food:",
                error
            );
        }
    };

    /* ---------------------------------- */
    /* AVAILABILITY                       */
    /* ---------------------------------- */

    const toggleAvailability = async (
        item: MenuItem
    ) => {
        try {
            await updateAvailability({
                foodId: item.id,
                isAvailable:
                    !item.available,
            }).unwrap();
        } catch (error) {
            console.error(
                "Failed to update availability:",
                error
            );
        }
    };

    /* ---------------------------------- */
    /* CATEGORY                           */
    /* ---------------------------------- */

    const addCategory = (name: string) => {
        const category = name.trim();

        if (!category) {
            return;
        }

        const exists = categories.some(
            (item) =>
                item.toLowerCase() ===
                category.toLowerCase()
        );

        if (exists) {
            return;
        }

        setCategories((previous) => [
            ...previous,
            category,
        ]);
    };

    const deleteCategory = (
        name: string
    ) => {
        if (
            items.some(
                (item) =>
                    item.category === name
            )
        ) {
            window.alert(
                `Cannot delete "${name}" — items exist in this category. Reassign them first.`
            );

            return;
        }

        setCategories((previous) =>
            previous.filter(
                (category) =>
                    category !== name
            )
        );

        if (activeCategory === name) {
            setActiveCategory("all");
        }
    };

    /* ---------------------------------- */
    /* LOADING                            */
    /* ---------------------------------- */

    if (isLoading) {
        return (
            <div className={styles.page}>
                <main className={styles.content}>
                    <div className={styles.emptyState}>
                        <p
                            className={
                                styles.emptyTitle
                            }
                        >
                            Loading menu...
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    /* ---------------------------------- */
    /* ERROR                              */
    /* ---------------------------------- */

    if (isError) {
        return (
            <div className={styles.page}>
                <main className={styles.content}>
                    <div className={styles.emptyState}>
                        <p
                            className={
                                styles.emptyTitle
                            }
                        >
                            Failed to load menu
                        </p>

                        <p
                            className={
                                styles.emptyText
                            }
                        >
                            Something went wrong
                            while loading your
                            menu.
                        </p>

                        <button
                            type="button"
                            className={
                                styles.addButton
                            }
                            onClick={() =>
                                refetch()
                            }
                        >
                            Retry
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    /* ---------------------------------- */
    /* UI                                 */
    /* ---------------------------------- */

    return (
        <div className={styles.page}>
            {/* Category Sidebar */}

            <aside
                className={
                    styles.categorySidebar
                }
            >
                <CategorySidebar
                    categories={categories}
                    items={items}
                    active={activeCategory}
                    onSelect={
                        setActiveCategory
                    }
                    onAddCategory={
                        addCategory
                    }
                    onDeleteCategory={
                        deleteCategory
                    }
                />
            </aside>

            {/* Main Content */}

            <main className={styles.content}>
                {/* Header */}

                <header className={styles.header}>
                    <div>
                        <h1
                            className={
                                styles.title
                            }
                        >
                            {activeCategory ===
                                "all"
                                ? "All Items"
                                : activeCategory}
                        </h1>

                        <p
                            className={
                                styles.subtitle
                            }
                        >
                            {filteredItems.length}{" "}
                            shown ·{" "}
                            {availableCount}/
                            {items.length}{" "}
                            available
                        </p>
                    </div>

                    <button
                        type="button"
                        className={
                            styles.addButton
                        }
                        onClick={
                            handleShowAddForm
                        }
                        disabled={isAdding}
                    >
                        <Plus size={16} />

                        <span>
                            {isAdding
                                ? "Adding..."
                                : "Add Item"}
                        </span>
                    </button>
                </header>

                {/* Add Form */}

                {showAddForm && (
                    <ItemForm
                        data={addForm}
                        categories={categories}
                        onChange={
                            setAddForm
                        }
                        onSave={addItem}
                        onCancel={() =>
                            setShowAddForm(
                                false
                            )
                        }
                        isNew
                    />
                )}

                {/* Search + Filter */}

                <div className={styles.toolbar}>
                    <div
                        className={
                            styles.searchWrapper
                        }
                    >
                        <Search
                            size={16}
                            className={
                                styles.searchIcon
                            }
                        />

                        <input
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target
                                        .value
                                )
                            }
                            placeholder="Search items..."
                            className={
                                styles.searchInput
                            }
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setShowUnavailable(
                                (previous) =>
                                    !previous
                            )
                        }
                        className={`${styles.filterButton} ${!showUnavailable
                            ? styles.filterButtonActive
                            : ""
                            }`}
                    >
                        <SlidersHorizontal
                            size={16}
                        />

                        <span>
                            {showUnavailable
                                ? "All Items"
                                : "Available Only"}
                        </span>
                    </button>

                    {isFetching && (
                        <span>
                            Updating...
                        </span>
                    )}
                </div>

                {/* Items */}

                {filteredItems.length === 0 ? (
                    <div
                        className={
                            styles.emptyState
                        }
                    >
                        <span
                            className={
                                styles.emptyIcon
                            }
                            aria-hidden="true"
                        >
                            🍽️
                        </span>

                        <p
                            className={
                                styles.emptyTitle
                            }
                        >
                            No items found
                        </p>

                        <p
                            className={
                                styles.emptyText
                            }
                        >
                            Try a different
                            category or add a
                            new item
                        </p>
                    </div>
                ) : (
                    <div
                        className={styles.items}
                    >
                        {filteredItems.map(
                            (item) => (
                                <div
                                    key={
                                        item.id
                                    }
                                    className={
                                        styles.itemWrapper
                                    }
                                >
                                    <ItemRow
                                        item={
                                            item
                                        }
                                        onEdit={
                                            handleEdit
                                        }
                                        onDelete={
                                            deleteItem
                                        }
                                        onToggleAvailability={
                                            toggleAvailability
                                        }
                                        isDeleting={
                                            isDeleting
                                        }
                                    />

                                    {editingId ===
                                        item.id &&
                                        editForm && (
                                            <div
                                                className={
                                                    styles.editForm
                                                }
                                            >
                                                <ItemForm
                                                    data={
                                                        editForm
                                                    }
                                                    categories={
                                                        categories
                                                    }
                                                    onChange={
                                                        setEditForm
                                                    }
                                                    onSave={
                                                        saveEdit
                                                    }
                                                    onCancel={() => {
                                                        setEditingId(
                                                            null
                                                        );
                                                        setEditForm(
                                                            null
                                                        );
                                                    }}
                                                />

                                                {isUpdating && (
                                                    <span>
                                                        Saving...
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                </div>
                            )
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}