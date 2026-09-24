import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

class EmergencyCard extends StatelessWidget {
  const EmergencyCard({super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(AppRadius.xl),
      onTap: () {
        // TODO: connect emergency assistance flow.
      },
      child: Container(
        padding: const EdgeInsets.all(AppSpacing.lg),
        decoration: BoxDecoration(
          color: AppColors.danger.withValues(alpha: 0.08),
          borderRadius: BorderRadius.circular(AppRadius.xl),
          border: Border.all(
            color: AppColors.danger.withValues(alpha: 0.25),
            width: 1.5,
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                color: AppColors.danger.withValues(alpha: 0.12),
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.emergency_rounded,
                color: AppColors.danger,
              ),
            ),

            const SizedBox(width: AppSpacing.md),

            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Emergency Assistance',
                    style: AppTypography.titleMedium.copyWith(
                      color: AppColors.danger,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    'Tap for immediate help in an emergency',
                    style: AppTypography.bodySmall.copyWith(
                      color: AppColors.mutedForeground,
                    ),
                  ),
                ],
              ),
            ),

            const Icon(Icons.chevron_right_rounded, color: AppColors.danger),
          ],
        ),
      ),
    );
  }
}
