'use client';

import {
    useState,
} from 'react';

import {
    Check,
    MapPin,
    Save,
} from '@/shared/icons';

import Input from '@/shared/components/input/input';

import FormField
    from '@/features/profile/components/form-field/form-field';

import SectionCard
    from '@/features/profile/components/section-card/section-card';

import OperatingHours, {
    type HoursMap,
} from '@/features/profile/components/operating-hours/operating-hours';

import styles from './profile.module.sass';
import { Category, RESTAURANT_CATEGORIES } from '../categories.types';


const DEFAULT_HOURS: HoursMap = {
    Monday: {
        open: '10:00',
        close: '23:00',
        closed: false,
    },
    Tuesday: {
        open: '10:00',
        close: '23:00',
        closed: false,
    },
    Wednesday: {
        open: '10:00',
        close: '23:00',
        closed: false,
    },
    Thursday: {
        open: '10:00',
        close: '23:30',
        closed: false,
    },
    Friday: {
        open: '10:00',
        close: '00:00',
        closed: false,
    },
    Saturday: {
        open: '09:00',
        close: '00:30',
        closed: false,
    },
    Sunday: {
        open: '10:00',
        close: '22:00',
        closed: false,
    },
};


interface ProfileData {
    name: string;
    tagline: string;
    description: string;
    email: string;
    phone: string;
    altPhone: string;
    website: string;
    instagram: string;
    facebook: string;
    address: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    minOrder: string;
    avgCookTime: string;
    cuisines: string[];
    fssai: string;
    gstin: string;
}


const DEFAULT_PROFILE: ProfileData = {
    name: 'The Biryani Co.',
    tagline: 'Authentic Dum Biryani since 1985',
    description:
        'The Biryani Co. has been serving authentic Dum Biryani for over three decades. Our recipes are passed down through generations, using hand-ground masalas and the finest Basmati rice slow-cooked in traditional handi vessels.',
    email: 'thebiryani.pune@gmail.com',
    phone: '+91 22 2654 3210',
    altPhone: '+91 98201 00234',
    website: 'www.thebiryanico.in',
    instagram: '@thebiryanico_pune',
    facebook: 'TheBiryaniCoPune',
    address: '14, Narayan Peth, Near Laxmi Road',
    landmark: 'Opposite Bank of Maharashtra',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411030',
    minOrder: '149',
    avgCookTime: '30',
    cuisines: [
        'North Indian',
        'Biryani',
        'Mughlai',
    ],
    fssai: '10020022001234',
    gstin: '27AADCA1234B1ZP',
};

const cuisines =
    RESTAURANT_CATEGORIES.filter(
        (category: Category) =>
            category.type === 'cuisine',
    );

export default function Profile() {

    const [
        saved,
        setSaved,
    ] = useState(false);

    const [
        hours,
        setHours,
    ] = useState<HoursMap>(
        DEFAULT_HOURS,
    );

    const [
        profile,
        setProfile,
    ] = useState<ProfileData>(
        DEFAULT_PROFILE,
    );


    const setProfileValue = (
        key: keyof ProfileData,
        value: string,
    ) => {
        setProfile(
            (previous) => ({
                ...previous,
                [key]: value,
            }),
        );
    };


    const toggleCuisine = (
        cuisineId: string,
    ) => {
        setProfile(
            (previous) => ({
                ...previous,
                cuisines:
                    previous.cuisines.includes(
                        cuisineId,
                    )
                        ? previous.cuisines.filter(
                            (id) =>
                                id !== cuisineId,
                        )
                        : [
                            ...previous.cuisines,
                            cuisineId,
                        ],
            }),
        );
    };


    const handleSave = () => {
        setSaved(true);

        window.setTimeout(
            () => {
                setSaved(false);
            },
            2500,
        );
    };


    return (
        <section
            className={
                styles.profile
            }
        >

            {/* Header */}

            <header
                className={
                    styles.header
                }
            >

                <div>
                    <h1>
                        Restaurant Profile
                    </h1>

                    <p>
                        Your public details
                        on Feasto
                    </p>
                </div>


                <button
                    type="button"
                    className={[
                        styles.saveButton,
                        saved
                            ? styles.saveButtonSaved
                            : '',
                    ].join(' ')}
                    onClick={
                        handleSave
                    }
                >

                    {saved ? (
                        <>
                            <Check
                                size={16}
                            />

                            Saved!
                        </>
                    ) : (
                        <>
                            <Save
                                size={16}
                            />

                            Save Changes
                        </>
                    )}

                </button>

            </header>


            {/* Basic Information */}

            <SectionCard
                title="Basic Information"
            >

                <div
                    className={
                        styles.formGrid
                    }
                >

                    <div
                        className={
                            styles.fullWidth
                        }
                    >
                        <FormField
                            label="Restaurant Name"
                        >
                            <Input
                                id="restaurant-name"
                                name="restaurantName"
                                value={
                                    profile.name
                                }
                                onChange={(
                                    value,
                                ) =>
                                    setProfileValue(
                                        'name',
                                        value,
                                    )
                                }
                            />
                        </FormField>
                    </div>


                    <div
                        className={
                            styles.fullWidth
                        }
                    >
                        <FormField
                            label="Tagline"
                            hint="Shown under your restaurant name in search results"
                        >
                            <Input
                                id="restaurant-tagline"
                                name="restaurantTagline"
                                value={
                                    profile.tagline
                                }
                                onChange={(
                                    value,
                                ) =>
                                    setProfileValue(
                                        'tagline',
                                        value,
                                    )
                                }
                                placeholder="e.g. Authentic Dum Biryani since 1985"
                            />
                        </FormField>
                    </div>


                    <div
                        className={
                            styles.fullWidth
                        }
                    >
                        <FormField
                            label="About"
                        >
                            <textarea
                                id="restaurant-description"
                                name="restaurantDescription"
                                className={
                                    styles.textArea
                                }
                                value={
                                    profile.description
                                }
                                onChange={(
                                    event,
                                ) =>
                                    setProfileValue(
                                        'description',
                                        event
                                            .target
                                            .value,
                                    )
                                }
                                rows={4}
                            />
                        </FormField>
                    </div>


                    <FormField
                        label="Min Order (₹)"
                    >
                        <Input
                            id="min-order"
                            name="minOrder"
                            type="number"
                            value={
                                profile.minOrder
                            }
                            onChange={(
                                value,
                            ) =>
                                setProfileValue(
                                    'minOrder',
                                    value,
                                )
                            }
                        />
                    </FormField>


                    <FormField
                        label="Avg Cook Time (min)"
                    >
                        <Input
                            id="avg-cook-time"
                            name="avgCookTime"
                            type="number"
                            value={
                                profile.avgCookTime
                            }
                            onChange={(
                                value,
                            ) =>
                                setProfileValue(
                                    'avgCookTime',
                                    value,
                                )
                            }
                        />
                    </FormField>


                    <div
                        className={
                            styles.fullWidth
                        }
                    >

                        <FormField
                            label="Cuisines"
                        >

                            <div
                                className={
                                    styles.cuisines
                                }
                            >

                                {cuisines.map((cuisine) => {

                                    const selected =
                                        profile.cuisines.includes(
                                            cuisine.id,
                                        );

                                    return (
                                        <button
                                            key={cuisine.id}
                                            type="button"
                                            className={[
                                                styles.cuisine,
                                                selected
                                                    ? styles.cuisineSelected
                                                    : '',
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                            onClick={() =>
                                                toggleCuisine(
                                                    cuisine.id,
                                                )
                                            }
                                        >
                                            {cuisine.name}
                                        </button>
                                    );
                                })}

                            </div>

                        </FormField>

                    </div>

                </div>

            </SectionCard>


            {/* Contact Details */}

            <SectionCard
                title="Contact Details"
            >

                <div
                    className={
                        styles.formGrid
                    }
                >

                    <FormField
                        label="Primary Phone"
                    >
                        <Input
                            id="primary-phone"
                            name="primaryPhone"
                            type="tel"
                            value={
                                profile.phone
                            }
                            onChange={(
                                value,
                            ) =>
                                setProfileValue(
                                    'phone',
                                    value,
                                )
                            }
                        />
                    </FormField>


                    <FormField
                        label="Alternate Phone"
                    >
                        <Input
                            id="alternate-phone"
                            name="alternatePhone"
                            type="tel"
                            value={
                                profile.altPhone
                            }
                            onChange={(
                                value,
                            ) =>
                                setProfileValue(
                                    'altPhone',
                                    value,
                                )
                            }
                        />
                    </FormField>


                    <FormField
                        label="Email"
                    >
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={
                                profile.email
                            }
                            onChange={(
                                value,
                            ) =>
                                setProfileValue(
                                    'email',
                                    value,
                                )
                            }
                        />
                    </FormField>


                    <FormField
                        label="Website"
                    >
                        <Input
                            id="website"
                            name="website"
                            value={
                                profile.website
                            }
                            onChange={(
                                value,
                            ) =>
                                setProfileValue(
                                    'website',
                                    value,
                                )
                            }
                        />
                    </FormField>


                    <FormField
                        label="Instagram"
                    >
                        <Input
                            id="instagram"
                            name="instagram"
                            value={
                                profile.instagram
                            }
                            onChange={(
                                value,
                            ) =>
                                setProfileValue(
                                    'instagram',
                                    value,
                                )
                            }
                            placeholder="@handle"
                        />
                    </FormField>


                    <FormField
                        label="Facebook"
                    >
                        <Input
                            id="facebook"
                            name="facebook"
                            value={
                                profile.facebook
                            }
                            onChange={(
                                value,
                            ) =>
                                setProfileValue(
                                    'facebook',
                                    value,
                                )
                            }
                        />
                    </FormField>

                </div>

            </SectionCard>


            {/* Location */}

            <SectionCard
                title="Location"
            >

                <div
                    className={
                        styles.lockedNotice
                    }
                >

                    <div
                        className={
                            styles.lockedIcon
                        }
                    >
                        <MapPin
                            size={16}
                        />
                    </div>


                    <div>

                        <p
                            className={
                                styles.lockedTitle
                            }
                        >
                            Location is locked
                        </p>

                        <p
                            className={
                                styles.lockedDescription
                            }
                        >
                            Restaurant location
                            cannot be changed
                            without platform
                            verification to
                            ensure the physical
                            existence of the
                            outlet. To request a
                            location update,
                            please{' '}
                            <a
                                href="#"
                                onClick={(event) =>
                                    event.preventDefault()
                                }
                            >
                                apply for location
                                verification
                            </a>
                            . Our team will
                            contact you within
                            3–5 business days.
                        </p>

                    </div>

                </div>


                <div
                    className={
                        styles.locationFields
                    }
                    aria-disabled="true"
                >

                    <div
                        className={
                            styles.fullWidth
                        }
                    >
                        <FormField
                            label="Street Address"
                        >
                            <Input
                                id="address"
                                name="address"
                                value={
                                    profile.address
                                }
                                onChange={() => { }}
                                disabled
                            />
                        </FormField>
                    </div>


                    <FormField
                        label="Landmark"
                    >
                        <Input
                            id="landmark"
                            name="landmark"
                            value={
                                profile.landmark
                            }
                            onChange={() => { }}
                            disabled
                        />
                    </FormField>


                    <FormField
                        label="City"
                    >
                        <Input
                            id="city"
                            name="city"
                            value={
                                profile.city
                            }
                            onChange={() => { }}
                            disabled
                        />
                    </FormField>


                    <FormField
                        label="State"
                    >
                        <Input
                            id="state"
                            name="state"
                            value={
                                profile.state
                            }
                            onChange={() => { }}
                            disabled
                        />
                    </FormField>


                    <FormField
                        label="Pincode"
                    >
                        <Input
                            id="pincode"
                            name="pincode"
                            value={
                                profile.pincode
                            }
                            onChange={() => { }}
                            disabled
                        />
                    </FormField>

                </div>

            </SectionCard>


            {/* Operating Hours */}

            <OperatingHours
                hours={hours}
                onChange={setHours}
            />


            {/* Legal */}

            <SectionCard
                title="Legal & Compliance"
            >

                <div
                    className={
                        styles.formGrid
                    }
                >

                    <FormField
                        label="FSSAI License"
                        hint="14-digit license number"
                    >
                        <Input
                            id="fssai"
                            name="fssai"
                            value={
                                profile.fssai
                            }
                            onChange={(
                                value,
                            ) =>
                                setProfileValue(
                                    'fssai',
                                    value,
                                )
                            }
                            digitsOnly
                            maxLength={14}
                        />
                    </FormField>


                    <FormField
                        label="GSTIN"
                        hint="15-character GST identification number"
                    >
                        <Input
                            id="gstin"
                            name="gstin"
                            value={
                                profile.gstin
                            }
                            onChange={(
                                value,
                            ) =>
                                setProfileValue(
                                    'gstin',
                                    value,
                                )
                            }
                            maxLength={15}
                            autoCapitalize="characters"
                        />
                    </FormField>

                </div>

            </SectionCard>

        </section>
    );
}