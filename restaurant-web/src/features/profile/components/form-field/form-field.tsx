import type {
    ReactNode,
} from 'react';

import styles from './form-field.module.sass';

interface FormFieldProps {
    label: string;
    children: ReactNode;
    hint?: string;
}

export default function FormField({
    label,
    children,
    hint,
}: FormFieldProps) {
    return (
        <div
            className={
                styles.formField
            }
        >
            <label
                className={
                    styles.label
                }
            >
                {label}
            </label>

            {children}

            {hint && (
                <p
                    className={
                        styles.hint
                    }
                >
                    {hint}
                </p>
            )}
        </div>
    );
}