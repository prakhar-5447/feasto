import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/earnings/models/earning_summary.dart';

class EarningsHeader extends StatelessWidget {
  const EarningsHeader({
    super.key,
    required this.selectedFilter,
    required this.onFilterChanged,
  });

  final EarningsFilter selectedFilter;
  final ValueChanged<EarningsFilter> onFilterChanged;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.lg,
        AppSpacing.xxl,
        AppSpacing.lg,
        AppSpacing.lg,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Earnings',
            style: AppTypography.headingMedium.copyWith(
              color: AppColors.foreground,
              fontWeight: FontWeight.w700,
            ),
          ),

          const SizedBox(height: AppSpacing.lg),

          Container(
            padding: const EdgeInsets.all(AppSpacing.xs),
            decoration: BoxDecoration(
              color: AppColors.secondary,
              borderRadius: BorderRadius.circular(AppRadius.lg),
            ),
            child: Row(
              children: [
                _FilterButton(
                  label: 'Today',
                  selected: selectedFilter == EarningsFilter.today,
                  onTap: () => onFilterChanged(EarningsFilter.today),
                ),
                _FilterButton(
                  label: 'This Week',
                  selected: selectedFilter == EarningsFilter.thisWeek,
                  onTap: () => onFilterChanged(EarningsFilter.thisWeek),
                ),
                _FilterButton(
                  label: 'This Month',
                  selected: selectedFilter == EarningsFilter.thisMonth,
                  onTap: () => onFilterChanged(EarningsFilter.thisMonth),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _FilterButton extends StatelessWidget {
  const _FilterButton({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          padding: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
          decoration: BoxDecoration(
            color: selected ? AppColors.card : Colors.transparent,
            borderRadius: BorderRadius.circular(AppRadius.md),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: AppTypography.labelMedium.copyWith(
              color: selected
                  ? AppColors.foreground
                  : AppColors.mutedForeground,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
      ),
    );
  }
}
