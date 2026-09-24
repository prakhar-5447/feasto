import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/demand_map/models/demand_level.dart';
import 'package:delivery_partner_app/features/demand_map/models/demand_zone.dart';

class DemandZoneTile extends StatelessWidget {
  const DemandZoneTile({super.key, required this.zone});

  final DemandZone zone;

  Color get _color {
    switch (zone.demand) {
      case DemandLevel.high:
        return AppColors.danger;

      case DemandLevel.medium:
        return AppColors.warning;

      case DemandLevel.low:
        return const Color(0xFF60A5FA);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: 10,
      ),
      decoration: BoxDecoration(
        color: AppColors.secondary,
        borderRadius: BorderRadius.circular(AppRadius.md),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: [
          Text(zone.demand.icon, style: const TextStyle(fontSize: 16)),

          const SizedBox(width: AppSpacing.sm),

          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  zone.label,
                  style: AppTypography.titleMedium.copyWith(
                    color: AppColors.foreground,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  '~${zone.orders} orders/hour',
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.secondaryForeground,
                  ),
                ),
              ],
            ),
          ),

          Container(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.sm,
              vertical: 4,
            ),
            decoration: BoxDecoration(
              color: _color.withValues(alpha: 0.10),
              borderRadius: BorderRadius.circular(AppRadius.pill),
            ),
            child: Text(
              zone.demand.label,
              style: AppTypography.labelSmall.copyWith(
                color: _color,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
