import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/performance/models/performance_metric.dart';

class PerformanceMetricCard extends StatelessWidget {
  const PerformanceMetricCard({super.key, required this.metric});

  final PerformanceMetric metric;

  Color get metricColor {
    switch (metric.color) {
      case PerformanceMetricColor.accent:
        return AppColors.accent;
      case PerformanceMetricColor.success:
        return AppColors.success;
      case PerformanceMetricColor.primary:
        return AppColors.primary;
      case PerformanceMetricColor.foreground:
        return AppColors.foreground;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(AppRadius.xl),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                metric.value,
                style: AppTypography.headingMedium.copyWith(
                  fontSize: 30,
                  fontWeight: FontWeight.w700,
                  color: metricColor,
                  height: 1,
                ),
              ),

              if (metric.unit.isNotEmpty) ...[
                const SizedBox(width: 4),
                Padding(
                  padding: const EdgeInsets.only(bottom: 2),
                  child: Text(
                    metric.unit,
                    style: AppTypography.titleMedium.copyWith(
                      color: metricColor,
                    ),
                  ),
                ),
              ],
            ],
          ),

          const SizedBox(height: 6),

          Text(
            metric.label,
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.foreground,
              fontWeight: FontWeight.w600,
            ),
          ),

          Text(
            metric.description,
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.mutedForeground,
            ),
          ),
        ],
      ),
    );
  }
}
