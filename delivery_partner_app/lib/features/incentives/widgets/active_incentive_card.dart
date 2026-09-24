import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/incentives/models/incentive.dart';

class ActiveIncentiveCard extends StatelessWidget {
  const ActiveIncentiveCard({super.key, required this.incentive});

  final Incentive incentive;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: incentive.backgroundColor,
        borderRadius: BorderRadius.circular(AppRadius.xl),
        border: Border.all(color: incentive.color.withValues(alpha: 0.20)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Text(
                  incentive.name,
                  style: AppTypography.titleMedium.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),

              const SizedBox(width: AppSpacing.sm),

              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 6,
                ),
                decoration: BoxDecoration(
                  color: incentive.color.withValues(alpha: 0.10),
                  borderRadius: BorderRadius.circular(AppRadius.md),
                ),
                child: Text(
                  incentive.bonus,
                  style: AppTypography.labelSmall.copyWith(
                    color: incentive.color,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: AppSpacing.xs),

          Text(
            incentive.description,
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.mutedForeground,
            ),
          ),

          const SizedBox(height: AppSpacing.md),

          if (incentive.hasProgress) _buildProgress() else _buildActiveNow(),
        ],
      ),
    );
  }

  Widget _buildProgress() {
    final remaining = incentive.total! - incentive.progress!;

    return Column(
      children: [
        Row(
          children: [
            Text(
              '${incentive.progress}/${incentive.total} completed',
              style: AppTypography.labelSmall.copyWith(
                color: incentive.color,
                fontWeight: FontWeight.w600,
              ),
            ),

            const Spacer(),

            Text(
              '$remaining more to go',
              style: AppTypography.labelSmall.copyWith(
                color: AppColors.mutedForeground,
              ),
            ),
          ],
        ),

        const SizedBox(height: AppSpacing.sm),

        ClipRRect(
          borderRadius: BorderRadius.circular(AppRadius.pill),
          child: LinearProgressIndicator(
            value: incentive.progressPercentage,
            minHeight: 8,
            backgroundColor: AppColors.muted,
            valueColor: AlwaysStoppedAnimation<Color>(incentive.color),
          ),
        ),

        const SizedBox(height: AppSpacing.sm),

        Align(
          alignment: Alignment.centerLeft,
          child: Text(
            incentive.deadline,
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.mutedForeground,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildActiveNow() {
    return Align(
      alignment: Alignment.centerLeft,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: incentive.color.withValues(alpha: 0.10),
          borderRadius: BorderRadius.circular(AppRadius.pill),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 6,
              height: 6,
              decoration: BoxDecoration(
                color: incentive.color,
                shape: BoxShape.circle,
              ),
            ),

            const SizedBox(width: AppSpacing.sm),

            Text(
              incentive.deadline,
              style: AppTypography.labelSmall.copyWith(
                color: incentive.color,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
