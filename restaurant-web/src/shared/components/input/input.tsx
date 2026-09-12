'use client';

import {
    type ChangeEvent,
    type FormEvent,
    type InputHTMLAttributes,
} from 'react';

import styles from './input.module.sass';

interface InputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'value' | 'onChange' | 'prefix'
    > {
    id: string;
    name: string;

    label?: string;
    value?: string;
    onChange?: (value: string) => void;

    prefix?: string;
    suffix?: string;

    error?: string;
    hint?: string;

    digitsOnly?: boolean;
    sanitizePattern?: RegExp | null;
}

export default function Input({
    id,
    name,
    label = '',
    type = 'text',
    placeholder = '',
    value = '',

    autoComplete = '',
    inputMode,
    spellCheck = false,

    digitsOnly = false,
    sanitizePattern = null,

    pattern = '',
    minLength,
    maxLength,

    required = false,
    disabled = false,

    prefix = '',
    suffix = '',

    error = '',
    hint = '',

    onChange,

    className = '',
    ...props
}: InputProps) {

    const sanitizeValue = (
        inputValue: string,
    ): string => {
        let sanitizedValue = inputValue;

        if (digitsOnly) {
            sanitizedValue =
                sanitizedValue.replace(/\D/g, '');
        }

        if (sanitizePattern) {
            sanitizedValue = [
                ...sanitizedValue,
            ]
                .filter((char) => {
                    sanitizePattern.lastIndex = 0;

                    return sanitizePattern.test(char);
                })
                .join('');
        }

        if (
            maxLength !== undefined
        ) {
            sanitizedValue =
                sanitizedValue.slice(
                    0,
                    maxLength,
                );
        }

        return sanitizedValue;
    };

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
    ): void => {
        const sanitizedValue =
            sanitizeValue(event.target.value);

        event.target.value =
            sanitizedValue;

        onChange?.(sanitizedValue);
    };

    const handleBeforeInput = (
        event: FormEvent<HTMLInputElement>,
    ): void => {
        if (
            !digitsOnly &&
            !sanitizePattern
        ) {
            return;
        }

        const nativeEvent =
            event.nativeEvent as InputEvent;

        if (
            nativeEvent.inputType !==
            'insertText' ||
            !nativeEvent.data
        ) {
            return;
        }

        if (
            digitsOnly &&
            /\D/.test(nativeEvent.data)
        ) {
            event.preventDefault();
            return;
        }

        if (sanitizePattern) {
            sanitizePattern.lastIndex = 0;

            const containsInvalidCharacter =
                [...nativeEvent.data].some(
                    (char) => {
                        sanitizePattern.lastIndex = 0;

                        return !sanitizePattern.test(
                            char,
                        );
                    },
                );

            if (
                containsInvalidCharacter
            ) {
                event.preventDefault();
            }
        }
    };

    const wrapperClassName = [
        styles.inputWrapper,
        prefix
            ? styles.hasPrefix
            : '',
        suffix
            ? styles.hasSuffix
            : '',
        error
            ? styles.hasError
            : '',
        disabled
            ? styles.isDisabled
            : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            className={`${styles.inputField} ${className}`}
        >
            {label && (
                <label htmlFor={id}>
                    {label}
                </label>
            )}

            <div className={wrapperClassName}>
                {prefix && (
                    <span
                        className={
                            styles.inputPrefix
                        }
                    >
                        {prefix}
                    </span>
                )}

                <input
                    {...props}
                    id={id}
                    name={name}
                    type={type}
                    inputMode={inputMode}
                    autoComplete={autoComplete}
                    spellCheck={spellCheck}
                    placeholder={placeholder}
                    minLength={minLength}
                    maxLength={maxLength}
                    pattern={pattern || undefined}
                    required={required}
                    disabled={disabled}
                    value={value}
                    aria-invalid={
                        error
                            ? 'true'
                            : undefined
                    }
                    aria-describedby={
                        error
                            ? `error-${id}`
                            : hint
                                ? `hint-${id}`
                                : undefined
                    }
                    onBeforeInput={
                        handleBeforeInput
                    }
                    onChange={
                        handleChange
                    }
                />

                {suffix && (
                    <span
                        className={
                            styles.inputSuffix
                        }
                        aria-hidden="true"
                    >
                        {suffix}
                    </span>
                )}
            </div>

            {error && (
                <span
                    className={
                        styles.errorMessage
                    }
                    id={`error-${id}`}
                    role="alert"
                >
                    {error}
                </span>
            )}

            {hint && !error && (
                <span
                    className={
                        styles.hintMessage
                    }
                    id={`hint-${id}`}
                >
                    {hint}
                </span>
            )}
        </div>
    );
}