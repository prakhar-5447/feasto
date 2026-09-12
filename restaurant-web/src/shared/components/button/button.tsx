'use client';

import {
    type ButtonHTMLAttributes,
    type ReactNode,
} from 'react';

import styles from './button.module.sass';
import Loader from '../loader/loader';

type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'text'
    | 'danger'
    | 'icon';

type ButtonSize =
    | 'sm'
    | 'md'
    | 'lg';

type ButtonWeight =
    | 'regular'
    | 'medium'
    | 'semibold'
    | 'bold';

type ButtonTone =
    | 'default'
    | 'muted';

type ButtonIconPosition =
    | 'left'
    | 'right';

interface ButtonProps
    extends Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        'type'
    > {

    variant?: ButtonVariant;

    size?: ButtonSize;

    weight?: ButtonWeight;

    tone?: ButtonTone;

    type?: 'button' | 'submit' | 'reset';

    icon?: ReactNode;

    iconPosition?: ButtonIconPosition;

    loading?: boolean;

    fullWidth?: boolean;

    disableHover?: boolean;

    ariaLabel?: string;

    children?: ReactNode;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    weight = 'semibold',
    tone = 'default',
    type = 'button',
    icon,
    iconPosition = 'left',
    disabled = false,
    loading = false,
    fullWidth = false,
    disableHover = false,
    ariaLabel,
    children,
    className = '',
    onClick,
    ...props
}: ButtonProps) {

    const buttonClasses = [
        styles.button,

        styles[`button-${variant}`],

        styles[`button-${size}`],

        styles[`button-weight-${weight}`],

        styles[`button-tone-${tone}`],

        fullWidth
            ? styles.buttonFullWidth
            : '',

        disableHover
            ? styles.buttonNoHover
            : '',

        loading
            ? styles.buttonLoading
            : '',

        className,

    ]
        .filter(Boolean)
        .join(' ');

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {

        if (disabled || loading) {
            event.preventDefault();
            return;
        }

        onClick?.(event);
    };

    return (
        <button
            {...props}
            type={type}
            disabled={disabled || loading}
            className={buttonClasses}
            aria-label={ariaLabel}
            aria-busy={loading}
            onClick={handleClick}
        >
            {loading ? (
                <Loader
                    size={18}
                    borderSize={2}
                />
            ) : variant === 'icon' ? (
                icon && (
                    <span aria-hidden="true">
                        {icon}
                    </span>
                )
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <span aria-hidden="true">
                            {icon}
                        </span>
                    )}

                    <span className={styles.buttonContent}>
                        {children}
                    </span>

                    {icon && iconPosition === 'right' && (
                        <span aria-hidden="true">
                            {icon}
                        </span>
                    )}
                </>
            )}
        </button>
    );
}