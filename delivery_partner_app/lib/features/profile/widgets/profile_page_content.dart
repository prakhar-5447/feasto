import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/core/utils/string_utils.dart';
import 'package:delivery_partner_app/features/profile/controllers/profile_controller.dart';
import 'package:delivery_partner_app/features/profile/models/profile.dart';
import 'package:delivery_partner_app/features/profile/widgets/document_card.dart';
import 'package:delivery_partner_app/features/profile/widgets/profile_field.dart';
import 'package:delivery_partner_app/features/profile/widgets/profile_section.dart';

class ProfilePageContent extends StatelessWidget {
  const ProfilePageContent({
    super.key,
    required this.controller,
    required this.profile,
    required this.editing,
  });

  final ProfileController controller;
  final Profile profile;
  final bool editing;

  @override
  Widget build(BuildContext context) {
    final draft = controller.draft.value ?? profile;

    return ListView(
      padding: const EdgeInsets.fromLTRB(AppSpacing.lg, 0, AppSpacing.lg, 100),
      children: [
        _ProfileIdentityCard(profile: profile, editing: editing),

        const SizedBox(height: AppSpacing.lg),

        ProfileSection(
          title: 'Personal Information',
          icon: Icons.person_outline,
          children: [
            ProfileField(
              label: 'Full Name',
              value: draft.name,
              editing: editing,
              onChanged: controller.updateName,
            ),

            ProfileField(
              label: 'Email Address',
              value: draft.email,
              editing: editing,
              keyboardType: TextInputType.emailAddress,
              onChanged: controller.updateEmail,
            ),

            ProfileField(
              label: 'Mobile Number',
              value: profile.phone,
              editing: editing,
              readOnly: true,
              onChanged: (_) {},
            ),

            ProfileField(
              label: 'Date of Birth',
              value: draft.dateOfBirth,
              editing: editing,
              keyboardType: TextInputType.datetime,
              onChanged: controller.updateDateOfBirth,
            ),

            ProfileField(
              label: 'City',
              value: draft.city,
              editing: editing,
              onChanged: controller.updateCity,
            ),
          ],
        ),

        const SizedBox(height: AppSpacing.lg),

        ProfileSection(
          title: 'Vehicle Information',
          icon: Icons.two_wheeler_outlined,
          children: [
            ProfileField(
              label: 'Vehicle Type',
              value: draft.vehicleType,
              editing: editing,
              onChanged: controller.updateVehicleType,
            ),

            ProfileField(
              label: 'Vehicle Number',
              value: draft.vehicleNumber,
              editing: editing,
              onChanged: controller.updateVehicleNumber,
            ),
          ],
        ),

        const SizedBox(height: AppSpacing.lg),

        ProfileSection(
          title: 'Documents',
          icon: Icons.description_outlined,
          children: [
            ProfileField(
              label: 'Driving Licence No.',
              value: draft.licenceNumber,
              editing: editing,
              onChanged: controller.updateLicenceNumber,
            ),

            ...profile.documents.map(
              (document) => DocumentCard(
                document: document,
                onUpdate: () {
                  debugPrint('Update document: ${document.name}');
                },
              ),
            ),
          ],
        ),

        const SizedBox(height: AppSpacing.lg),

        ProfileSection(
          title: 'Payment Details',
          icon: Icons.account_balance_outlined,
          children: [
            ProfileField(
              label: 'Bank Account',
              value: draft.bankAccount,
              editing: editing,
              onChanged: controller.updateBankAccount,
            ),

            ProfileField(
              label: 'UPI ID',
              value: draft.upiId,
              editing: editing,
              onChanged: controller.updateUpiId,
            ),

            _BankVerifiedCard(),
          ],
        ),
      ],
    );
  }
}

class _ProfileIdentityCard extends StatelessWidget {
  const _ProfileIdentityCard({required this.profile, required this.editing});

  final Profile profile;
  final bool editing;

  @override
  Widget build(BuildContext context) {
    final initials = StringUtils.getInitials(profile.name);

    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(AppRadius.xl),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: [
          Stack(
            clipBehavior: Clip.none,
            children: [
              Container(
                width: 72,
                height: 72,
                alignment: Alignment.center,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [AppColors.primary, AppColors.primaryDark],
                  ),
                ),
                child: Text(
                  initials,
                  style: AppTypography.headingMedium.copyWith(
                    color: AppColors.primaryForeground,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),

              if (editing)
                Positioned(
                  right: -2,
                  bottom: -2,
                  child: Container(
                    width: 26,
                    height: 26,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: AppColors.primary,
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.background, width: 2),
                    ),
                    child: const Icon(
                      Icons.edit,
                      size: 12,
                      color: AppColors.primaryForeground,
                    ),
                  ),
                ),
            ],
          ),

          const SizedBox(width: AppSpacing.lg),

          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  profile.name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: AppTypography.headingSmall.copyWith(
                    color: AppColors.foreground,
                    fontWeight: FontWeight.w700,
                  ),
                ),

                const SizedBox(height: AppSpacing.xs),

                Text(
                  profile.phone,
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.mutedForeground,
                  ),
                ),

                const SizedBox(height: AppSpacing.sm),

                Row(
                  children: [
                    _Badge(text: '✓ Verified', color: AppColors.success),

                    const SizedBox(width: AppSpacing.sm),

                    _Badge(
                      text: '★ ${profile.rating.toStringAsFixed(1)}',
                      color: AppColors.accent,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Badge extends StatelessWidget {
  const _Badge({required this.text, required this.color});

  final String text;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(AppRadius.pill),
        border: Border.all(color: color.withValues(alpha: 0.2)),
      ),
      child: Text(
        text,
        style: AppTypography.labelSmall.copyWith(
          color: color,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}

class _BankVerifiedCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      decoration: BoxDecoration(
        color: AppColors.success.withValues(alpha: 0.07),
        borderRadius: BorderRadius.circular(AppRadius.lg),
        border: Border.all(color: AppColors.success.withValues(alpha: 0.18)),
      ),
      child: Row(
        children: [
          const Icon(
            Icons.check_circle_outline,
            size: 16,
            color: AppColors.success,
          ),

          const SizedBox(width: AppSpacing.sm),

          Text(
            'Bank account verified',
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.success,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
