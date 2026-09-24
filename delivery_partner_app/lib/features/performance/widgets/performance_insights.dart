import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

import 'package:delivery_partner_app/features/performance/models/performance_insight.dart';

class PerformanceInsights extends StatelessWidget {
  const PerformanceInsights({super.key, required this.insights});

  final List<PerformanceInsight> insights;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(AppRadius.xl),
        border: Border.all(color: AppColors.border),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Text(
              'Performance Insights',
              style: TextStyle(
                color: AppColors.foreground,
                fontFamily: 'Poppins',
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),

          const Divider(height: 1, color: AppColors.border),

          ...List.generate(insights.length, (index) {
            final insight = insights[index];

            return Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                border: index > 0
                    ? const Border(top: BorderSide(color: AppColors.border))
                    : null,
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(insight.icon, style: const TextStyle(fontSize: 16)),

                  const SizedBox(width: 12),

                  Expanded(
                    child: Text(
                      insight.text,
                      style: AppTypography.bodyMedium.copyWith(
                        color: insight.positive
                            ? AppColors.foreground
                            : AppColors.mutedForeground,
                        height: 1.4,
                      ),
                    ),
                  ),
                ],
              ),
            );
          }),
        ],
      ),
    );
  }
}
