import {
    Check,
    X,
} from '@/shared/icons';
import type {
    FoodType,
    MenuItemFormData,
    SpiceLevel,
} from '@/features/menu/menu.types';
import Button from '@/shared/components/button/button';
import styles from './item-form.module.sass';

const FOOD_TYPES: {
    value: FoodType;
    label: string;
    className: string;
}[] = [
        {
            value: 'veg',
            label: 'Veg',
            className: 'veg',
        },
        {
            value: 'nonveg',
            label: 'Non-Veg',
            className: 'nonveg',
        },
        {
            value: 'halal',
            label: 'Halal',
            className: 'halal',
        },
        {
            value: 'egg',
            label: 'Egg',
            className: 'egg',
        },
        {
            value: 'vegan',
            label: 'Vegan',
            className: 'vegan',
        },
    ];

const SPICE_LEVELS: {
    value: SpiceLevel;
    label: string;
}[] = [
        {
            value: 'mild',
            label: '🌶 Mild',
        },
        {
            value: 'medium',
            label: '🌶🌶 Medium',
        },
        {
            value: 'hot',
            label: '🌶🌶🌶 Hot',
        },
    ];


type EditableField =
    | 'name'
    | 'category'
    | 'price'
    | 'description'
    | 'available'
    | 'foodType'
    | 'bestseller'
    | 'spiceLevel'
    | 'preparationTime';

interface ItemFormProps {
    data: MenuItemFormData;
    categories: string[];
    onChange: (data: MenuItemFormData) => void;
    onSave: () => void;
    onCancel: () => void;
    isNew?: boolean;
}

function SpiceButton({
    level,
    active,
    onClick,
}: {
    level: SpiceLevel;
    active: boolean;
    onClick: () => void;
}) {
    const label =
        SPICE_LEVELS.find(
            (item) => item.value === level
        )?.label ?? level;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${styles.spiceButton} ${active
                ? styles.spiceButtonActive
                : ''
                } `}
        >
            {label}
        </button>
    );
}

export default function ItemForm({
    data,
    categories,
    onChange,
    onSave,
    onCancel,
    isNew = false,
}: ItemFormProps) {
    const setField = <K extends EditableField>(
        key: K,
        value: MenuItemFormData[K]
    ) => {
        onChange({
            ...data,
            [key]: value,
        });
    };

    const selectedFoodType =
        FOOD_TYPES.find(
            (foodType) =>
                foodType.value === data.foodType
        ) ?? FOOD_TYPES[0];

    const canSave =
        data.name.trim().length > 0 &&
        data.price > 0;

    return (
        <div className={styles.form}>
            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>
                    {isNew
                        ? 'Add New Item'
                        : 'Edit Item'}
                </h2>

                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={onCancel}
                    aria-label="Close form"
                >
                    <X size={16} />
                </button>
            </div>

            <div className={styles.fields}>
                {/* Name */}
                <div
                    className={`${styles.field} ${styles.fullWidth} `}
                >
                    <label
                        htmlFor="item-name"
                        className={styles.label}
                    >
                        Item Name *
                    </label>

                    <input
                        id="item-name"
                        autoFocus
                        value={data.name}
                        onChange={(event) =>
                            setField(
                                'name',
                                event.target.value
                            )
                        }
                        placeholder="e.g. Chicken Tikka"
                        className={styles.input}
                    />
                </div>

                {/* Category */}
                <div className={styles.field}>
                    <label
                        htmlFor="item-category"
                        className={styles.label}
                    >
                        Category
                    </label>

                    <select
                        id="item-category"
                        value={data.category}
                        onChange={(event) =>
                            setField(
                                'category',
                                event.target.value
                            )
                        }
                        className={styles.input}
                    >
                        {categories.map((category) => (
                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price */}
                <div className={styles.field}>
                    <label
                        htmlFor="item-price"
                        className={styles.label}
                    >
                        Price (₹) *
                    </label>

                    <input
                        id="item-price"
                        type="number"
                        min={0}
                        value={
                            data.price || ''
                        }
                        onChange={(event) =>
                            setField(
                                'price',
                                Number(
                                    event.target.value
                                )
                            )
                        }
                        placeholder="299"
                        className={`${styles.input} ${styles.mono} `}
                    />
                </div>

                {/* Preparation Time */}
                <div className={styles.field}>
                    <label
                        htmlFor="item-preparation-time"
                        className={styles.label}
                    >
                        Prep Time (min)
                    </label>

                    <input
                        id="item-preparation-time"
                        type="number"
                        min={0}
                        value={
                            data.preparationTime || ''
                        }
                        onChange={(event) =>
                            setField(
                                'preparationTime',
                                Number(
                                    event.target.value
                                )
                            )
                        }
                        placeholder="15"
                        className={`${styles.input} ${styles.mono} `}
                    />
                </div>

                {/* Description */}
                <div
                    className={`${styles.field} ${styles.fullWidth} `}
                >
                    <label
                        htmlFor="item-description"
                        className={styles.label}
                    >
                        Description
                    </label>

                    <textarea
                        id="item-description"
                        value={data.description}
                        onChange={(event) =>
                            setField(
                                'description',
                                event.target.value
                            )
                        }
                        rows={2}
                        placeholder="Briefly describe the dish..."
                        className={styles.textarea}
                    />
                </div>

                {/* Spice Level */}
                <div
                    className={`${styles.field} ${styles.fullWidth} `}
                >
                    <label className={styles.label}>
                        Spice Level
                    </label>

                    <div
                        className={
                            styles.spiceOptions
                        }
                    >
                        {SPICE_LEVELS.map(
                            (level) => (
                                <SpiceButton
                                    key={
                                        level.value
                                    }
                                    level={
                                        level.value
                                    }
                                    active={
                                        data.spiceLevel ===
                                        level.value
                                    }
                                    onClick={() =>
                                        setField(
                                            'spiceLevel',
                                            level.value
                                        )
                                    }
                                />
                            )
                        )}
                    </div>
                </div>

                {/* Food Type */}
                <div className={styles.field}>
                    <label
                        htmlFor="item-food-type"
                        className={styles.label}
                    >
                        Food Type
                    </label>

                    <div
                        className={
                            styles.selectWrapper
                        }
                    >
                        <span
                            className={`${styles.foodDot} ${styles[
                                selectedFoodType
                                    .className
                            ]
                                } `}
                        />

                        <select
                            id="item-food-type"
                            value={data.foodType}
                            onChange={(event) =>
                                setField(
                                    'foodType',
                                    event.target
                                        .value as FoodType
                                )
                            }
                            className={`${styles.input} ${styles.foodSelect} `}
                        >
                            {FOOD_TYPES.map(
                                ({
                                    value,
                                    label,
                                }) => (
                                    <option
                                        key={value}
                                        value={value}
                                    >
                                        {label}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </div>

                {/* Flags */}
                <div className={styles.flags}>
                    <ToggleField
                        label="Bestseller"
                        checked={
                            data.bestseller
                        }
                        onChange={() =>
                            setField(
                                'bestseller',
                                !data.bestseller
                            )
                        }
                    />

                    <ToggleField
                        label="Available"
                        checked={
                            data.available
                        }
                        onChange={() =>
                            setField(
                                'available',
                                !data.available
                            )
                        }
                    />
                </div>
            </div>

            {/* Actions */}
            <div className={styles.footer}>
                <Button
                    variant="primary"
                    size="md"
                    icon={<Check size={16} />}
                    disabled={!canSave}
                    onClick={onSave}
                >
                    {isNew
                        ? 'Add Item'
                        : 'Save Changes'}
                </Button>

                <Button
                    variant="ghost"
                    size="md"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}

interface ToggleFieldProps {
    label: string;
    checked: boolean;
    onChange: () => void;
}

function ToggleField({
    label,
    checked,
    onChange,
}: ToggleFieldProps) {
    return (
        <label className={styles.toggleField}>
            <button
                type="button"
                className={`${styles.toggle} ${checked
                    ? styles.toggleActive
                    : ''
                    } `}
                onClick={onChange}
                aria-label={label}
                aria-pressed={checked}
            >
                <span
                    className={
                        styles.toggleThumb
                    }
                />
            </button>

            <span className={styles.toggleLabel}>
                {label}
            </span>
        </label>
    );
}
