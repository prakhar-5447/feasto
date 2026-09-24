import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/incentives/models/completed_incentive.dart';

class CompletedIncentives extends StatelessWidget {
  const CompletedIncentives({super.key, required this.incentives});

  final List<CompletedIncentive> incentives;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'PAST INCENTIVES',
          style: AppTypography.labelMedium.copyWith(
            color: AppColors.mutedForeground,
            fontWeight: FontWeight.w700,
            letterSpacing: 1.2,
          ),
        ),

        const SizedBox(height: AppSpacing.md),

        Container(
          decoration: BoxDecoration(
            color: AppColors.card,
            borderRadius: BorderRadius.circular(AppRadius.xl),
            border: Border.all(color: AppColors.border),
          ),
          child: Column(
            children: [
              for (int i = 0; i < incentives.length; i++)
                _CompletedTile(incentive: incentives[i], showTopBorder: i != 0),
            ],
          ),
        ),
      ],
    );
  }
}

class _CompletedTile extends StatelessWidget {
  const _CompletedTile({required this.incentive, required this.showTopBorder});

  final CompletedIncentive incentive;
  final bool showTopBorder;

  @override
  Widget build(BuildContext context) {
    final color = incentive.earned
        ? AppColors.success
        : AppColors.mutedForeground;

    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      decoration: BoxDecoration(
        border: showTopBorder
            ? const Border(top: BorderSide(color: AppColors.border))
            : null,
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  incentive.name,
                  style: AppTypography.bodyMedium.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),

                const SizedBox(height: 2),

                Text(
                  incentive.date,
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.mutedForeground,
                  ),
                ),
              ],
            ),
          ),

          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                incentive.earned ? incentive.bonus : 'Missed',
                style: AppTypography.titleMedium.copyWith(
                  color: color,
                  fontWeight: FontWeight.w700,
                ),
              ),

              Text(
                incentive.earned ? 'Earned ✓' : 'Not completed',
                style: AppTypography.labelSmall.copyWith(color: color),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
