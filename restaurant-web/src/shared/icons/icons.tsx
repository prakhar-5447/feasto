import type {
    ReactNode,
    SVGProps,
} from 'react';

interface IconProps
    extends SVGProps<SVGSVGElement> {
    size?: number;
    children?: ReactNode;
}

function Icon({
    size = 16,
    color = 'currentColor',
    children,
    ...props
}: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            {children}
        </svg>
    );
}

export const ShoppingBag = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </Icon>
);

export const BarChart2 = (
    props: IconProps,
) => (
    <Icon {...props}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
    </Icon>
);

export const UtensilsCrossed = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
        <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
        <path d="m2.1 21.8 6.4-6.3" />
        <path d="m19 5-7 7" />
    </Icon>
);

export const Star = (
    props: IconProps,
) => (
    <Icon {...props}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </Icon>
);

export const ImageIcon = (
    props: IconProps,
) => (
    <Icon {...props}>
        <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            ry="2"
        />
        <circle
            cx="8.5"
            cy="8.5"
            r="1.5"
        />
        <polyline points="21 15 16 10 5 21" />
    </Icon>
);

export const User = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle
            cx="12"
            cy="7"
            r="4"
        />
    </Icon>
);

export const ChevronLeft = (
    props: IconProps,
) => (
    <Icon {...props}>
        <polyline points="15 18 9 12 15 6" />
    </Icon>
);

export const ChevronRight = (
    props: IconProps,
) => (
    <Icon {...props}>
        <polyline points="9 18 15 12 9 6" />
    </Icon>
);

export const Power = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line
            x1="12"
            y1="2"
            x2="12"
            y2="12"
        />
    </Icon>
);

export const Search = (
    props: IconProps,
) => (
    <Icon {...props}>
        <circle
            cx="11"
            cy="11"
            r="8"
        />
        <line
            x1="21"
            y1="21"
            x2="16.65"
            y2="16.65"
        />
    </Icon>
);

export const Bell = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </Icon>
);

export const Clock = (
    props: IconProps,
) => (
    <Icon {...props}>
        <circle
            cx="12"
            cy="12"
            r="10"
        />
        <polyline points="12 6 12 12 16 14" />
    </Icon>
);

export const MapPin = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle
            cx="12"
            cy="10"
            r="3"
        />
    </Icon>
);

export const Phone = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.86-.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Icon>
);

export const Bike = (
    props: IconProps,
) => (
    <Icon {...props}>
        <circle
            cx="18.5"
            cy="17.5"
            r="3.5"
        />
        <circle
            cx="5.5"
            cy="17.5"
            r="3.5"
        />
        <circle
            cx="15"
            cy="5"
            r="1"
        />
        <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
    </Icon>
);

export const ChefHat = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
        <line
            x1="6"
            y1="17"
            x2="18"
            y2="17"
        />
    </Icon>
);

export const AlertCircle = (
    props: IconProps,
) => (
    <Icon {...props}>
        <circle
            cx="12"
            cy="12"
            r="10"
        />
        <line
            x1="12"
            y1="8"
            x2="12"
            y2="12"
        />
        <line
            x1="12"
            y1="16"
            x2="12.01"
            y2="16"
        />
    </Icon>
);

export const CheckCircle = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </Icon>
);

export const Package = (
    props: IconProps,
) => (
    <Icon {...props}>
        <line
            x1="16.5"
            y1="9.4"
            x2="7.55"
            y2="4.24"
        />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line
            x1="12"
            y1="22.08"
            x2="12"
            y2="12"
        />
    </Icon>
);

export const Truck = (
    props: IconProps,
) => (
    <Icon {...props}>
        <rect
            x="1"
            y="3"
            width="15"
            height="13"
        />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle
            cx="5.5"
            cy="18.5"
            r="2.5"
        />
        <circle
            cx="18.5"
            cy="18.5"
            r="2.5"
        />
    </Icon>
);

export const CircleX = (
    props: IconProps,
) => (
    <Icon {...props}>
        <circle
            cx="12"
            cy="12"
            r="10"
        />
        <line
            x1="15"
            y1="9"
            x2="9"
            y2="15"
        />
        <line
            x1="9"
            y1="9"
            x2="15"
            y2="15"
        />
    </Icon>
);

export const Receipt = (
    props: IconProps,
) => (
    <Icon {...props}>
        <polyline points="6 2 3 6 3 20 21 20 21 6 18 2 6 2" />
        <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
        />
        <line
            x1="12"
            y1="10"
            x2="12"
            y2="18"
        />
        <line
            x1="8"
            y1="14"
            x2="16"
            y2="14"
        />
    </Icon>
);

export const Plus = (
    props: IconProps,
) => (
    <Icon {...props}>
        <line
            x1="12"
            y1="5"
            x2="12"
            y2="19"
        />
        <line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
        />
    </Icon>
);

export const Pencil = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </Icon>
);

export const Trash2 = (
    props: IconProps,
) => (
    <Icon {...props}>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        <line
            x1="10"
            y1="11"
            x2="10"
            y2="17"
        />
        <line
            x1="14"
            y1="11"
            x2="14"
            y2="17"
        />
    </Icon>
);

export const Check = (
    props: IconProps,
) => (
    <Icon {...props}>
        <polyline points="20 6 9 17 4 12" />
    </Icon>
);

export const X = (
    props: IconProps,
) => (
    <Icon {...props}>
        <line
            x1="18"
            y1="6"
            x2="6"
            y2="18"
        />
        <line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
        />
    </Icon>
);

export const Eye = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle
            cx="12"
            cy="12"
            r="3"
        />
    </Icon>
);

export const EyeOff = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line
            x1="2"
            y1="2"
            x2="22"
            y2="22"
        />
    </Icon>
);

export const Save = (
    props: IconProps,
) => (
    <Icon {...props}>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
    </Icon>
);

export const SearchIcon = Search;
export const Image = ImageIcon;