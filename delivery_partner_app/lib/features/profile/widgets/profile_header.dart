import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/profile/models/profile.dart';

class ProfileHeader extends StatelessWidget {
  const ProfileHeader({
    super.key,
    required this.profile,
    required this.editing,
    required this.onEdit,
    required this.onCancel,
    required this.onSave,
    required this.isSaving,
  });

  final Profile profile;
  final bool editing;
  final VoidCallback onEdit;
  final VoidCallback onCancel;
  final VoidCallback onSave;
  final bool isSaving;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.lg,
        AppSpacing.xxl,
        AppSpacing.lg,
        AppSpacing.lg,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            'Profile',
            style: AppTypography.headingMedium.copyWith(
              color: AppColors.foreground,
              fontWeight: FontWeight.w700,
            ),
          ),

          const Spacer(),

          if (!editing)
            _EditButton(onTap: onEdit)
          else
            Row(
              children: [
                TextButton(
                  onPressed: isSaving ? null : onCancel,
                  child: Text(
                    'Cancel',
                    style: AppTypography.labelLarge.copyWith(
                      color: AppColors.mutedForeground,
                    ),
                  ),
                ),

                const SizedBox(width: AppSpacing.sm),

                FilledButton(
                  onPressed: isSaving ? null : onSave,
                  style: FilledButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: AppColors.primaryForeground,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(AppRadius.lg),
                    ),
                  ),
                  child: isSaving
                      ? const SizedBox(
                          width: 16,
                          height: 16,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            color: AppColors.primaryForeground,
                          ),
                        )
                      : const Text('Save'),
                ),
              ],
            ),
        ],
      ),
    );
  }
}

class _EditButton extends StatelessWidget {
  const _EditButton({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onTap,
      style: TextButton.styleFrom(
        foregroundColor: AppColors.primary,
        backgroundColor: AppColors.primary.withValues(alpha: 0.1),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.lg),
          side: BorderSide(color: AppColors.primary.withValues(alpha: 0.2)),
        ),
      ),
      child: const Text('Edit'),
    );
  }
}
