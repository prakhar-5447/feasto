'use client';

import {
    useState,
    type FormEvent,
} from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/shared/components/button/button';
import Input from '@/shared/components/input/input';

import { authService } from '../../auth.service';

import styles from './login-form.module.sass';


type LoginStep =
    | 'phone'
    | 'otp';


export default function LoginForm() {

    const router = useRouter();


    const [step, setStep] =
        useState<LoginStep>('phone');


    const [phone, setPhone] =
        useState('');


    const [otp, setOtp] =
        useState('');


    const [error, setError] =
        useState('');


    const [loading, setLoading] =
        useState(false);


    const handleSendOtp = async (
        event: FormEvent<HTMLFormElement>,
    ) => {

        event.preventDefault();

        setError('');


        const trimmedPhone =
            phone.trim();


        if (
            !trimmedPhone ||
            !/^\d{10}$/.test(trimmedPhone)
        ) {

            setError(
                'Please enter a valid 10-digit phone number.',
            );

            return;
        }


        try {

            setLoading(true);


            const response =
                await authService.sendOtp({
                    phone: trimmedPhone,
                });


            if (!response.success) {

                setError(
                    response.message ||
                    'Unable to send OTP.',
                );

                return;
            }


            /*
             * Development only.
             *
             * Backend currently returns
             * the OTP in the response.
             *
             * Remove this when real SMS
             * integration is added.
             */

            if (response.data?.otp) {

                setOtp(
                    response.data.otp,
                );
            }


            setStep('otp');

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : 'Unable to send OTP.',
            );

        } finally {

            setLoading(false);
        }
    };


    const handleVerifyOtp = async (
        event: FormEvent<HTMLFormElement>,
    ) => {

        event.preventDefault();

        setError('');


        const trimmedPhone =
            phone.trim();

        const trimmedOtp =
            otp.trim();


        if (
            !/^\d{10}$/.test(trimmedPhone)
        ) {

            setError(
                'Invalid phone number.',
            );

            return;
        }


        if (
            !/^\d{6}$/.test(trimmedOtp)
        ) {

            setError(
                'Please enter the 6-digit OTP.',
            );

            return;
        }


        try {

            setLoading(true);


            const response =
                await authService.verifyOtp({
                    phone: trimmedPhone,
                    otp: trimmedOtp,
                });


            if (!response.success) {

                setError(
                    response.message ||
                    'Invalid OTP.',
                );

                return;
            }


            /*
             * Backend sets:
             *
             * accessToken
             * refreshToken
             *
             * as HTTP-only cookies.
             *
             * We don't store tokens
             * in localStorage.
             */


            if (
                response.data?.isNewUser
            ) {

                router.push(
                    `/complete-profile?phone=${encodeURIComponent(
                        trimmedPhone,
                    )}`,
                );

                return;
            }


            router.push(
                '/dashboard',
            );

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : 'Unable to verify OTP.',
            );

        } finally {

            setLoading(false);
        }
    };


    const handleChangePhone = () => {

        setStep('phone');

        setOtp('');

        setError('');
    };


    return (
        <form
            className={styles.form}
            onSubmit={
                step === 'phone'
                    ? handleSendOtp
                    : handleVerifyOtp
            }
        >

            {step === 'phone' && (

                <>
                    <Input
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        value={phone}
                        onChange={setPhone}
                        placeholder="Enter your 10-digit phone number"
                        autoComplete="tel"
                        inputMode="numeric"
                        maxLength={10}
                        disabled={loading}
                        hint="Use the phone number registered with your restaurant partner account."
                    />


                    {error && (
                        <div
                            className={
                                styles.error
                            }
                            role="alert"
                            aria-live="polite"
                        >
                            {error}
                        </div>
                    )}


                    <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        loading={loading}
                    >
                        Send OTP
                    </Button>
                </>

            )}


            {step === 'otp' && (

                <>
                    <Input
                        id="otp"
                        name="otp"
                        label="OTP"
                        value={otp}
                        onChange={setOtp}
                        placeholder="Enter 6-digit OTP"
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        maxLength={6}
                        disabled={loading}
                        hint={`OTP sent to ${phone}`}
                    />


                    {error && (
                        <div
                            className={
                                styles.error
                            }
                            role="alert"
                            aria-live="polite"
                        >
                            {error}
                        </div>
                    )}


                    <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        loading={loading}
                    >
                        Verify OTP
                    </Button>


                    <button
                        type="button"
                        className={
                            styles.changePhone
                        }
                        onClick={
                            handleChangePhone
                        }
                        disabled={loading}
                    >
                        Change phone number
                    </button>
                </>

            )}

        </form>
    );
}