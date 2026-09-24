import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/app_settings/models/app_settings.dart';

class MapTypeSelector extends StatelessWidget {
  const MapTypeSelector({
    super.key,
    required this.selected,
    required this.onChanged,
  });

  final MapType selected;
  final ValueChanged<MapType> onChanged;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.lg,
        14,
        AppSpacing.lg,
        AppSpacing.md,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 36,
                height: 36,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: AppColors.secondary,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Text('🗺️', style: TextStyle(fontSize: 16)),
              ),

              const SizedBox(width: AppSpacing.md),

              Text(
                'Map Type',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.foreground,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),

          const SizedBox(height: AppSpacing.md),

          Row(
            children: [
              Expanded(
                child: _MapTypeButton(
                  label: 'Standard',
                  selected: selected == MapType.standard,
                  onTap: () => onChanged(MapType.standard),
                ),
              ),

              const SizedBox(width: AppSpacing.sm),

              Expanded(
                child: _MapTypeButton(
                  label: 'Satellite',
                  selected: selected == MapType.satellite,
                  onTap: () => onChanged(MapType.satellite),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _MapTypeButton extends StatelessWidget {
  const _MapTypeButton({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppRadius.lg),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          padding: const EdgeInsets.symmetric(vertical: 10),
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: selected
                ? AppColors.primary.withValues(alpha: 0.12)
                : AppColors.secondary,
            borderRadius: BorderRadius.circular(AppRadius.lg),
            border: Border.all(
              color: selected
                  ? AppColors.primary.withValues(alpha: 0.35)
                  : AppColors.border,
              width: selected ? 1.5 : 1,
            ),
          ),
          child: Text(
            label,
            style: AppTypography.labelLarge.copyWith(
              color: selected ? AppColors.primary : AppColors.mutedForeground,
            ),
          ),
        ),
      ),
    );
  }
}
