import {
    redirect,
} from 'next/navigation';

import {
    getAuthenticatedUser,
} from '@/server/utils/auth.utils';


export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const user =
        await getAuthenticatedUser();


    if (
        !user ||
        user.role !==
        'restaurant_partner'
    ) {

        redirect('/login');
    }


    return children;
}