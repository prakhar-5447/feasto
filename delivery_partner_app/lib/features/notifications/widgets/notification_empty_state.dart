import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

class NotificationEmptyState extends StatelessWidget {
  const NotificationEmptyState({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.xxl,
        vertical: 64,
      ),
      child: Column(
        children: [
          const Text('🔔', style: TextStyle(fontSize: 40)),

          const SizedBox(height: AppSpacing.md),

          Text(
            'No notifications',
            style: AppTypography.titleLarge.copyWith(
              color: AppColors.foreground,
            ),
          ),

          const SizedBox(height: AppSpacing.xs),

          Text(
            'Notifications for this category will appear here.',
            textAlign: TextAlign.center,
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.mutedForeground,
            ),
          ),
        ],
      ),
    );
  }
}
