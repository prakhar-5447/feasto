import User from '@/server/models/user.model';

export async function findPartnerById(
    partnerId: string,
) {
    return User.findOne({
        partnerId: partnerId.toUpperCase(),
        role: 'restaurant_partner',
    }).select(
        '+password',
    );
}