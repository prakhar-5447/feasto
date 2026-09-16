'use client';

import { useState } from 'react';
import {
    Plus,
    Search,
    SlidersHorizontal,
} from '@/shared/icons';
import CategorySidebar from '@/features/menu/components/category-sidebar/category-sidebar';
import ItemRow from '@/features/menu/components/item-row/item-row';
import ItemForm from '@/features/menu/components/item-form/item-form';
import type { MenuItem, MenuItemFormData } from '@/features/menu/menu.types';
import {
    INITIAL_CATEGORIES,
    INITIAL_ITEMS,
} from '@/features/menu/menu.mock';
import styles from './menu-management.module.sass';

const EMPTY_ITEM: Omit<MenuItem, 'id'> = {
    name: '',
    category: 'Biryani',
    price: 0,
    description: '',
    available: true,
    foodType: 'veg',
    bestseller: false,
    spiceLevel: 'mild',
    preparationTime: 15,
};

export default function MenuManagement() {
    const [categories, setCategories] = useState(
        INITIAL_CATEGORIES
    );

    const [items, setItems] =
        useState<MenuItem[]>(INITIAL_ITEMS);

    const [activeCategory, setActiveCategory] =
        useState('all');

    const [search, setSearch] = useState('');

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [editForm, setEditForm] =
        useState<MenuItemFormData | null>(null);

    const [showAddForm, setShowAddForm] =
        useState(false);

    const [addForm, setAddForm] =
        useState<MenuItemFormData>({
            ...EMPTY_ITEM,
        });

    const [showUnavailable, setShowUnavailable] =
        useState(true);

    const filteredItems = items.filter((item) => {
        const matchesCategory =
            activeCategory === 'all' ||
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

    const availableCount = items.filter(
        (item) => item.available
    ).length;

    const handleEdit = (item: MenuItem) => {
        setEditingId(item.id);
        setEditForm({ ...item });
        setShowAddForm(false);
    };

    const saveEdit = () => {
        if (
            !editForm ||
            editForm.id === undefined
        ) {
            return;
        }

        setItems((previous) =>
            previous.map((item) =>
                item.id === editForm.id
                    ? {
                        ...editForm,
                        id: editForm.id,
                    }
                    : item
            )
        );

        setEditingId(null);
        setEditForm(null);
    };

    const handleShowAddForm = () => {
        setShowAddForm(true);
        setEditingId(null);

        setAddForm({
            ...EMPTY_ITEM,
            category:
                activeCategory !== 'all'
                    ? activeCategory
                    : 'Biryani',
        });
    };

    const addItem = () => {
        if (
            !addForm.name.trim() ||
            !addForm.price
        ) {
            return;
        }

        setItems((previous) => [
            ...previous,
            {
                ...addForm,
                id: Date.now(),
            },
        ]);

        setAddForm({
            ...EMPTY_ITEM,
            category:
                activeCategory !== 'all'
                    ? activeCategory
                    : 'Biryani',
        });

        setShowAddForm(false);
    };

    const deleteItem = (id: number) => {
        setItems((previous) =>
            previous.filter(
                (item) => item.id !== id
            )
        );
    };

    const toggleAvailability = (id: number) => {
        setItems((previous) =>
            previous.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        available:
                            !item.available,
                    }
                    : item
            )
        );
    };

    const addCategory = (name: string) => {
        setCategories((previous) => [
            ...previous,
            name,
        ]);
    };

    const deleteCategory = (name: string) => {
        if (
            items.some(
                (item) => item.category === name
            )
        ) {
            window.alert(
                `Cannot delete "${name}" — items exist in this category.Reassign them first.`
            );

            return;
        }

        setCategories((previous) =>
            previous.filter(
                (category) => category !== name
            )
        );

        if (activeCategory === name) {
            setActiveCategory('all');
        }
    };

    return (
        <div className={styles.page}>
            {/* Category Sidebar */}
            <aside className={styles.categorySidebar}>
                <CategorySidebar
                    categories={categories}
                    items={items}
                    active={activeCategory}
                    onSelect={setActiveCategory}
                    onAddCategory={addCategory}
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
                        <h1 className={styles.title}>
                            {activeCategory === 'all'
                                ? 'All Items'
                                : activeCategory}
                        </h1>

                        <p
                            className={
                                styles.subtitle
                            }
                        >
                            {filteredItems.length} shown ·{' '}
                            {availableCount}/{items.length}{' '}
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
                    >
                        <Plus size={16} />
                        <span>Add Item</span>
                    </button>
                </header>

                {/* Add Form */}
                {showAddForm && (
                    <ItemForm
                        data={addForm}
                        categories={categories}
                        onChange={setAddForm}
                        onSave={addItem}
                        onCancel={() =>
                            setShowAddForm(false)
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
                            className={styles.searchIcon}
                        />

                        <input
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
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
                            : ''
                            } `}
                    >
                        <SlidersHorizontal
                            size={16}
                        />

                        <span>
                            {showUnavailable
                                ? 'All Items'
                                : 'Available Only'}
                        </span>
                    </button>
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
                            Try a different category
                            or add a new item
                        </p>
                    </div>
                ) : (
                    <div className={styles.items}>
                        {filteredItems.map(
                            (item) => (
                                <div
                                    key={item.id}
                                    className={
                                        styles.itemWrapper
                                    }
                                >
                                    <ItemRow
                                        item={item}
                                        onEdit={() =>
                                            handleEdit(
                                                item
                                            )
                                        }
                                        onDelete={() =>
                                            deleteItem(
                                                item.id
                                            )
                                        }
                                        onToggleAvailability={() =>
                                            toggleAvailability(
                                                item.id
                                            )
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