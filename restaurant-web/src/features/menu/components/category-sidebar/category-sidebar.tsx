'use client';

import { useState } from 'react';
import { Plus, X } from '@/shared/icons';
import type { MenuItem } from '@/features/menu/menu.types';
import styles from './category-sidebar.module.sass';

interface CategorySidebarProps {
    categories: string[];
    items: MenuItem[];
    active: string;
    onSelect: (category: string) => void;
    onAddCategory: (name: string) => void;
    onDeleteCategory: (name: string) => void;
}

export default function CategorySidebar({
    categories,
    items,
    active,
    onSelect,
    onAddCategory,
    onDeleteCategory,
}: CategorySidebarProps) {
    const [adding, setAdding] = useState(false);
    const [newName, setNewName] = useState('');

    const countInCategory = (category: string) =>
        items.filter(
            (item) => item.category === category
        ).length;

    const availableInCategory = (category: string) =>
        items.filter(
            (item) =>
                item.category === category &&
                item.available
        ).length;

    const submit = () => {
        const name = newName.trim();

        if (
            !name ||
            categories.includes(name)
        ) {
            return;
        }

        onAddCategory(name);
        setNewName('');
        setAdding(false);
    };

    const cancelAdd = () => {
        setAdding(false);
        setNewName('');
    };

    const renderCategory = (
        label: string,
        total: number,
        isActive: boolean,
        onClick: () => void,
        onDelete?: () => void
    ) => {
        const isAllItems = label === 'All Items';

        return (
            <div
                key={label}
                className={styles.categoryWrapper}
            >
                <button
                    type="button"
                    className={`${styles.categoryButton} ${isActive
                            ? styles.categoryButtonActive
                            : ''
                        } `}
                    onClick={onClick}
                >
                    <div className={styles.categoryInfo}>
                        <div
                            className={
                                styles.categoryName
                            }
                        >
                            {label}
                        </div>

                        {!isAllItems && (
                            <div
                                className={
                                    styles.availability
                                }
                            >
                                {availableInCategory(
                                    label
                                )}
                                /
                                {countInCategory(
                                    label
                                )}{' '}
                                available
                            </div>
                        )}
                    </div>

                    <span className={styles.count}>
                        {total}
                    </span>
                </button>

                {onDelete && (
                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={(event) => {
                            event.stopPropagation();
                            onDelete();
                        }}
                        aria-label={`Delete ${label} category`}
                    >
                        <X size={12} />
                    </button>
                )}
            </div>
        );
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    Categories
                </h2>

                <button
                    type="button"
                    className={styles.addButton}
                    onClick={() => setAdding(true)}
                    aria-label="Add category"
                >
                    <Plus size={16} />
                </button>
            </div>

            <div className={styles.categories}>
                {renderCategory(
                    'All Items',
                    items.length,
                    active === 'all',
                    () => onSelect('all')
                )}

                {categories.map((category) =>
                    renderCategory(
                        category,
                        countInCategory(category),
                        active === category,
                        () => onSelect(category),
                        () =>
                            onDeleteCategory(category)
                    )
                )}

                {adding && (
                    <div className={styles.addForm}>
                        <input
                            autoFocus
                            value={newName}
                            onChange={(event) =>
                                setNewName(
                                    event.target.value
                                )
                            }
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    submit();
                                }

                                if (
                                    event.key ===
                                    'Escape'
                                ) {
                                    cancelAdd();
                                }
                            }}
                            placeholder="Category name..."
                            className={styles.input}
                        />

                        <div
                            className={
                                styles.formActions
                            }
                        >
                            <button
                                type="button"
                                className={
                                    styles.confirmButton
                                }
                                onClick={submit}
                            >
                                Add
                            </button>

                            <button
                                type="button"
                                className={
                                    styles.cancelButton
                                }
                                onClick={cancelAdd}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
