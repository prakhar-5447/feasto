import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/demand_map/models/demand_level.dart';

class DemandLegend extends StatelessWidget {
  const DemandLegend({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: DemandLevel.values.map((level) {
        final color = _colorFor(level);

        return Padding(
          padding: const EdgeInsets.only(right: AppSpacing.lg),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(level.icon, style: const TextStyle(fontSize: 14)),
              const SizedBox(width: 6),
              Text(
                '${level.label} Demand',
                style: AppTypography.bodySmall.copyWith(
                  color: AppColors.secondaryForeground,
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }

  Color _colorFor(DemandLevel level) {
    switch (level) {
      case DemandLevel.high:
        return AppColors.danger;

      case DemandLevel.medium:
        return AppColors.warning;

      case DemandLevel.low:
        return const Color(0xFF60A5FA);
    }
  }
}
