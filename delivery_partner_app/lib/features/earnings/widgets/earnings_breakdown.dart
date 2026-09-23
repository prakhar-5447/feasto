import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

class EarningsBreakdown extends StatelessWidget {
  const EarningsBreakdown({super.key});

  @override
  Widget build(BuildContext context) {
    const rows = [
      ('Delivery Earnings', '₹692', null),
      ('Bonuses', '₹80', AppColors.success),
      ('Incentives', '₹50', AppColors.accent),
      ('Tips', '₹20', AppColors.warning),
      ('Adjustments', '₹0', AppColors.mutedForeground),
    ];

    return Container(
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(AppRadius.xl),
        border: Border.all(color: AppColors.border),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.lg,
              vertical: AppSpacing.md,
            ),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Earnings Breakdown',
                style: AppTypography.titleMedium.copyWith(
                  color: AppColors.foreground,
                ),
              ),
            ),
          ),

          const Divider(height: 1, color: AppColors.border),

          ...rows.asMap().entries.map((entry) {
            final row = entry.value;

            return Container(
              padding: const EdgeInsets.symmetric(
                horizontal: AppSpacing.lg,
                vertical: AppSpacing.md,
              ),
              decoration: BoxDecoration(
                border: entry.key == 0
                    ? null
                    : const Border(top: BorderSide(color: AppColors.border)),
              ),
              child: Row(
                children: [
                  Text(
                    row.$1,
                    style: AppTypography.bodySmall.copyWith(
                      color: AppColors.mutedForeground,
                    ),
                  ),
                  const Spacer(),
                  Text(
                    row.$2,
                    style: AppTypography.bodySmall.copyWith(
                      color: row.$3 ?? AppColors.foreground,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            );
          }),

          Container(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.lg,
              vertical: AppSpacing.md,
            ),
            color: AppColors.secondary,
            child: Row(
              children: [
                Text(
                  'Total',
                  style: AppTypography.bodyMedium.copyWith(
                    color: AppColors.foreground,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const Spacer(),
                Text(
                  '₹842',
                  style: AppTypography.titleMedium.copyWith(
                    color: AppColors.primary,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
