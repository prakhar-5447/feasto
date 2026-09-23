import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/earnings/models/earning_summary.dart';

class EarningsHero extends StatelessWidget {
  const EarningsHero({super.key, required this.filter, required this.summary});

  final EarningsFilter filter;
  final EarningSummary summary;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.xl),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(AppRadius.xl),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [AppColors.primary, AppColors.primaryDark],
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            _title,
            style: AppTypography.bodySmall.copyWith(
              color: Colors.white.withValues(alpha: 0.7),
            ),
          ),

          const SizedBox(height: AppSpacing.xs),

          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                '₹${summary.total.toStringAsFixed(0)}',
                style: AppTypography.headingLarge.copyWith(
                  color: Colors.white,
                  fontSize: 36,
                  fontWeight: FontWeight.w800,
                ),
              ),

              const SizedBox(width: AppSpacing.sm),

              Container(
                margin: const EdgeInsets.only(bottom: 6),
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.sm,
                  vertical: AppSpacing.xs,
                ),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.18),
                  borderRadius: BorderRadius.circular(AppRadius.pill),
                ),
                child: Text(
                  '${summary.percentageUp ? '↑' : '↓'} '
                  '${summary.percentage}%',
                  style: AppTypography.labelSmall.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: AppSpacing.lg),

          Row(
            children: [
              _Stat(value: '${summary.orders}', label: 'Deliveries'),
              _Stat(
                value: '₹${summary.averageOrder.toStringAsFixed(0)}',
                label: 'Avg/order',
              ),
              _Stat(value: summary.onlineHours, label: 'Online'),
              _Stat(
                value: '₹${summary.averageHour.toStringAsFixed(0)}',
                label: 'Avg/hour',
              ),
            ],
          ),
        ],
      ),
    );
  }

  String get _title {
    switch (filter) {
      case EarningsFilter.today:
        return "Today's Earnings";
      case EarningsFilter.thisWeek:
        return 'This Week';
      case EarningsFilter.thisMonth:
        return 'This Month';
    }
  }
}

class _Stat extends StatelessWidget {
  const _Stat({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            value,
            style: AppTypography.titleMedium.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w700,
            ),
          ),
          Text(
            label,
            style: AppTypography.labelSmall.copyWith(
              color: Colors.white.withValues(alpha: 0.6),
            ),
          ),
        ],
      ),
    );
  }
}
