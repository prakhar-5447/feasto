import {
    Pencil,
    Trash2,
    Clock,
} from '@/shared/icons';
import type { MenuItem } from '@/features/menu/menu.types';
import styles from './item-row.module.sass';

interface ItemRowProps {
    item: MenuItem;
    onEdit: () => void;
    onDelete: () => void;
    onToggleAvailability: () => void;
}

const SPICE_EMOJI: Record<
    NonNullable<MenuItem['spiceLevel']>,
    string
> = {
    mild: '🌶',
    medium: '🌶🌶',
    hot: '🌶🌶🌶',
};

const FOOD_TYPE_CONFIG = {
    veg: {
        dot: 'veg',
        label: 'Veg',
    },
    nonveg: {
        dot: 'nonveg',
        label: 'Non-Veg',
    },
    halal: {
        dot: 'halal',
        label: 'Halal',
    },
    egg: {
        dot: 'egg',
        label: 'Egg',
    },
    vegan: {
        dot: 'vegan',
        label: 'Vegan',
    },
} as const;

export default function ItemRow({
    item,
    onEdit,
    onDelete,
    onToggleAvailability,
}: ItemRowProps) {
    const foodType =
        FOOD_TYPE_CONFIG[item.foodType] ??
        FOOD_TYPE_CONFIG.nonveg;

    return (
        <div
            className={`${styles.row} ${item.available
                    ? ''
                    : styles.unavailable
                } `}
        >
            {/* Food Type Indicator */}
            <div
                className={`${styles.foodType} ${styles[foodType.dot]
                    } `}
                title={foodType.label}
                aria-label={foodType.label}
            >
                <div className={styles.foodTypeDot} />
            </div>

            {/* Main Info */}
            <div className={styles.info}>
                <div className={styles.titleRow}>
                    <span className={styles.name}>
                        {item.name}
                    </span>

                    {item.bestseller && (
                        <span
                            className={
                                styles.bestseller
                            }
                        >
                            Bestseller
                        </span>
                    )}

                    {item.spiceLevel && (
                        <span
                            className={styles.spice}
                            aria-label={`Spice level: ${item.spiceLevel} `}
                        >
                            {
                                SPICE_EMOJI[
                                item.spiceLevel
                                ]
                            }
                        </span>
                    )}
                </div>

                <p className={styles.description}>
                    {item.description}
                </p>

                {item.preparationTime && (
                    <div
                        className={
                            styles.preparationTime
                        }
                    >
                        <Clock size={10} />
                        <span>
                            {item.preparationTime} min
                        </span>
                    </div>
                )}
            </div>

            {/* Price */}
            <div className={styles.price}>
                ₹{item.price}
            </div>

            {/* Availability */}
            <button
                type="button"
                className={styles.toggleButton}
                title={
                    item.available
                        ? 'Mark unavailable'
                        : 'Mark available'
                }
                aria-label={
                    item.available
                        ? 'Mark unavailable'
                        : 'Mark available'
                }
                aria-pressed={item.available}
                onClick={onToggleAvailability}
            >
                <span
                    className={`${styles.toggle} ${item.available
                            ? styles.toggleOn
                            : styles.toggleOff
                        } `}
                >
                    <span
                        className={
                            styles.toggleThumb
                        }
                    />
                </span>
            </button>

            {/* Actions */}
            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.actionButton}
                    onClick={onEdit}
                    aria-label={`Edit ${item.name} `}
                >
                    <Pencil size={14} />
                </button>

                <button
                    type="button"
                    className={`${styles.actionButton} ${styles.deleteAction} `}
                    onClick={onDelete}
                    aria-label={`Delete ${item.name} `}
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}
