import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

import 'package:delivery_partner_app/features/language/models/app_language.dart';

class CurrentLanguageCard extends StatelessWidget {
  const CurrentLanguageCard({super.key, required this.language});

  final AppLanguage language;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: AppColors.primary.withValues(alpha: 0.07),
        borderRadius: BorderRadius.circular(AppRadius.xl),
        border: Border.all(
          color: AppColors.primary.withValues(alpha: 0.3),
          width: 1.5,
        ),
      ),
      child: Row(
        children: [
          _LanguageIcon(language: language, active: true),

          const SizedBox(width: AppSpacing.md),

          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  language.label,
                  style: AppTypography.titleMedium.copyWith(
                    color: AppColors.foreground,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  '${language.native} · ${language.region}',
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.mutedForeground,
                  ),
                ),
              ],
            ),
          ),

          const _SelectedIndicator(),
        ],
      ),
    );
  }
}

class LanguageIcon extends StatelessWidget {
  const LanguageIcon({super.key, required this.language, required this.active});

  final AppLanguage language;
  final bool active;

  @override
  Widget build(BuildContext context) {
    return _LanguageIcon(language: language, active: active);
  }
}

class _LanguageIcon extends StatelessWidget {
  const _LanguageIcon({required this.language, required this.active});

  final AppLanguage language;
  final bool active;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 40,
      height: 40,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: active
            ? AppColors.primary.withValues(alpha: 0.12)
            : AppColors.secondary,
        borderRadius: BorderRadius.circular(AppRadius.md),
      ),
      child: Text(
        language.native.characters.first,
        style: AppTypography.titleLarge.copyWith(
          color: active ? AppColors.primary : AppColors.mutedForeground,
        ),
      ),
    );
  }
}

class _SelectedIndicator extends StatelessWidget {
  const _SelectedIndicator();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 20,
      height: 20,
      decoration: const BoxDecoration(
        color: AppColors.primary,
        shape: BoxShape.circle,
      ),
      child: const Icon(
        Icons.check,
        size: 12,
        color: AppColors.primaryForeground,
      ),
    );
  }
}
