'use client';

import type {
    ChangeEvent,
} from 'react';

import SectionCard from '@/features/profile/components/section-card/section-card';

import styles from './operating-hours.module.sass';


const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];


export interface DayHours {
    open: string;
    close: string;
    closed: boolean;
}


export type HoursMap =
    Record<string, DayHours>;


interface OperatingHoursProps {
    hours: HoursMap;
    onChange: (
        hours: HoursMap,
    ) => void;
}


export default function OperatingHours({
    hours,
    onChange,
}: OperatingHoursProps) {

    const updateDay = (
        day: string,
        patch: Partial<DayHours>,
    ) => {
        onChange({
            ...hours,
            [day]: {
                ...hours[day],
                ...patch,
            },
        });
    };


    const handleTimeChange = (
        day: string,
        field: 'open' | 'close',
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        updateDay(
            day,
            {
                [field]: event.target.value,
            },
        );
    };


    return (
        <SectionCard
            title="Operating Hours"
        >

            <p
                className={
                    styles.description
                }
            >
                These hours are shown to
                customers on Feasto. Use the
                Open/Closed toggle in the sidebar
                to temporarily pause orders
                without changing your schedule.
            </p>


            <div
                className={
                    styles.days
                }
            >

                {DAYS.map((day) => {

                    const dayHours =
                        hours[day];


                    return (
                        <div
                            key={day}
                            className={
                                styles.dayRow
                            }
                        >

                            {/* Day */}

                            <span
                                className={
                                    styles.day
                                }
                            >
                                {day.slice(0, 3)}
                            </span>


                            {/* Open / Closed toggle */}

                            <button
                                type="button"
                                className={[
                                    styles.toggle,
                                    dayHours.closed
                                        ? styles.toggleClosed
                                        : styles.toggleOpen,
                                ].join(' ')}
                                onClick={() =>
                                    updateDay(
                                        day,
                                        {
                                            closed:
                                                !dayHours.closed,
                                        },
                                    )
                                }
                                aria-label={
                                    dayHours.closed
                                        ? `Open ${day}`
                                        : `Close ${day}`
                                }
                                aria-pressed={
                                    !dayHours.closed
                                }
                            >
                                <span
                                    className={[
                                        styles.toggleThumb,
                                        dayHours.closed
                                            ? styles.toggleThumbClosed
                                            : styles.toggleThumbOpen,
                                    ].join(' ')}
                                />
                            </button>


                            {/* Status */}

                            <span
                                className={[
                                    styles.status,
                                    dayHours.closed
                                        ? styles.statusClosed
                                        : styles.statusOpen,
                                ].join(' ')}
                            >
                                {dayHours.closed
                                    ? 'Closed'
                                    : 'Open'}
                            </span>


                            {/* Time */}

                            {!dayHours.closed ? (
                                <div
                                    className={
                                        styles.timeRange
                                    }
                                >

                                    <input
                                        type="time"
                                        value={
                                            dayHours.open
                                        }
                                        onChange={(
                                            event,
                                        ) =>
                                            handleTimeChange(
                                                day,
                                                'open',
                                                event,
                                            )
                                        }
                                        className={
                                            styles.timeInput
                                        }
                                        aria-label={
                                            `${day} opening time`
                                        }
                                    />

                                    <span
                                        className={
                                            styles.to
                                        }
                                    >
                                        to
                                    </span>

                                    <input
                                        type="time"
                                        value={
                                            dayHours.close
                                        }
                                        onChange={(
                                            event,
                                        ) =>
                                            handleTimeChange(
                                                day,
                                                'close',
                                                event,
                                            )
                                        }
                                        className={
                                            styles.timeInput
                                        }
                                        aria-label={
                                            `${day} closing time`
                                        }
                                    />

                                </div>
                            ) : (
                                <span
                                    className={
                                        styles.closedMessage
                                    }
                                >
                                    Not open today
                                </span>
                            )}

                        </div>
                    );
                })}

            </div>

        </SectionCard>
    );
}