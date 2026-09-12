'use client';

import {
    useState,
    type FormEvent,
} from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/shared/components/button/button';
import Input from '@/shared/components/input/input';

import {
    Eye,
    EyeOff,
} from '@/shared/icons';

import { authService } from '../../auth.service';

import styles from './login-form.module.sass';


export default function LoginForm() {

    const router = useRouter();


    const [partnerId, setPartnerId] =
        useState('');

    const [password, setPassword] =
        useState('');

    const [showPassword, setShowPassword] =
        useState(false);

    const [error, setError] =
        useState('');

    const [loading, setLoading] =
        useState(false);


    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {

        event.preventDefault();
        setError('');


        const trimmedPartnerId =
            partnerId.trim();


        if (
            !trimmedPartnerId ||
            !password
        ) {
            setError(
                'Please enter your Partner ID and password.',
            );

            return;
        }


        try {

            setLoading(true);


            const response =
                await authService.login({
                    partnerId:
                        trimmedPartnerId,

                    password,
                });


            if (!response.success) {

                setError(
                    response.message ||
                    'Unable to sign in.',
                );

                return;
            }


            router.push('/dashboard');

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : 'Unable to sign in.',
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >

            {/* Partner ID */}

            <Input
                id="partner-id"
                name="partnerId"
                label="Partner ID"
                value={partnerId}
                onChange={setPartnerId}
                placeholder="e.g. FEA-MH-00142"
                autoComplete="username"
                autoCapitalize="characters"
                spellCheck={false}
                disabled={loading}
                hint="Your Partner ID was emailed to you when your account was created."
            />


            {/* Password */}

            <div className={styles.passwordField}>

                <div
                    className={
                        styles.passwordHeader
                    }
                >

                    <label
                        className={styles.label}
                        htmlFor="password"
                    >
                        Password
                    </label>


                    <button
                        className={
                            styles.forgotPassword
                        }
                        type="button"
                        onClick={() => {
                            // Add forgot-password flow later
                        }}
                        disabled={loading}
                    >
                        Forgot password?
                    </button>

                </div>


                <div
                    className={
                        styles.passwordWrapper
                    }
                >

                    <Input
                        id="password"
                        name="password"
                        type={
                            showPassword
                                ? 'text'
                                : 'password'
                        }
                        value={password}
                        onChange={setPassword}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        disabled={loading}
                    />


                    <button
                        className={
                            styles.passwordToggle
                        }
                        type="button"
                        onClick={() =>
                            setShowPassword(
                                (value) => !value,
                            )
                        }
                        aria-label={
                            showPassword
                                ? 'Hide password'
                                : 'Show password'
                        }
                        disabled={loading}
                    >

                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}

                    </button>

                </div>

            </div>

            {/* Error */}

            {error && (
                <div
                    className={styles.error}
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </div>
            )}

            {/* Submit */}

            <Button
                type="submit"
                size="lg"
                fullWidth
                loading={loading}
            >
                Sign In
            </Button>


            {/* Demo credentials */}

            <div className={styles.demo}>

                <p className={styles.demoTitle}>
                    Demo credentials
                </p>


                <p
                    className={
                        styles.demoCredentials
                    }
                >
                    ID: FEA-MH-00142

                    <span>·</span>

                    Password: partner@123
                </p>

            </div>

        </form>
    );
}