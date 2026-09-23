import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/earnings/models/daily_earning.dart';

class DailyBreakdown extends StatelessWidget {
  const DailyBreakdown({super.key, required this.data});

  final List<DailyEarning> data;

  @override
  Widget build(BuildContext context) {
    if (data.isEmpty) {
      return const SizedBox.shrink();
    }

    final maxEarned = data
        .map((item) => item.earned)
        .reduce((a, b) => a > b ? a : b);

    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(AppRadius.xl),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Text(
                'Daily Breakdown',
                style: AppTypography.titleMedium.copyWith(
                  color: AppColors.foreground,
                ),
              ),
              const Spacer(),
              Text(
                'Aug 26 – Sep 1',
                style: AppTypography.labelSmall.copyWith(
                  color: AppColors.mutedForeground,
                ),
              ),
            ],
          ),

          const SizedBox(height: AppSpacing.lg),

          SizedBox(
            height: 100,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: data.map((day) {
                final isToday = day == data.last;

                final height = maxEarned == 0
                    ? 8.0
                    : (day.earned / maxEarned) * 80;

                return Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 3),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Container(
                          height: height.clamp(8.0, 80.0),
                          decoration: BoxDecoration(
                            color: isToday
                                ? AppColors.primary
                                : AppColors.muted,
                            borderRadius: BorderRadius.circular(AppRadius.sm),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          day.shortDay,
                          style: AppTypography.labelSmall.copyWith(
                            color: isToday
                                ? AppColors.primary
                                : AppColors.mutedForeground,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }).toList(),
            ),
          ),

          const SizedBox(height: AppSpacing.sm),

          ...data.reversed.map((day) => _DailyRow(day: day)),
        ],
      ),
    );
  }
}

class _DailyRow extends StatelessWidget {
  const _DailyRow({required this.day});

  final DailyEarning day;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
      decoration: const BoxDecoration(
        border: Border(top: BorderSide(color: AppColors.border)),
      ),
      child: Row(
        children: [
          SizedBox(
            width: 40,
            child: Text(
              day.day,
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.foreground,
              ),
            ),
          ),
          Expanded(
            child: Center(
              child: Text(
                '${day.orders} orders',
                style: AppTypography.labelSmall.copyWith(
                  color: AppColors.mutedForeground,
                ),
              ),
            ),
          ),
          Text(
            '₹${day.earned.toStringAsFixed(0)}',
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.success,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}
