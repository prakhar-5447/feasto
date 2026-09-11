import localFont from 'next/font/local';

export const poppins = localFont({
    src: [
        {
            path: '../assets/fonts/poppins/Poppins-Light.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../assets/fonts/poppins/Poppins-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/poppins/Poppins-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../assets/fonts/poppins/Poppins-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../assets/fonts/poppins/Poppins-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
});