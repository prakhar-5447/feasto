import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

class PreferencesInfoBanner extends StatelessWidget {
  const PreferencesInfoBanner({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      decoration: BoxDecoration(
        color: AppColors.primary.withValues(alpha: 0.07),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.primary.withValues(alpha: 0.18)),
      ),
      child: RichText(
        text: TextSpan(
          style: AppTypography.bodySmall.copyWith(
            color: AppColors.foreground,
            height: 1.5,
          ),
          children: const [
            TextSpan(
              text: 'ℹ️ Note: ',
              style: TextStyle(
                color: AppColors.primary,
                fontWeight: FontWeight.w600,
              ),
            ),
            TextSpan(
              text:
                  "You'll still receive orders from other areas. "
                  'Preferences improve your match score but don\'t '
                  'restrict delivery zones.',
            ),
          ],
        ),
      ),
    );
  }
}
