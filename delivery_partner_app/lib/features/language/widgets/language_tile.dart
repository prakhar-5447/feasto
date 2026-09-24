import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/language/models/app_language.dart';

class LanguageTile extends StatelessWidget {
  const LanguageTile({
    super.key,
    required this.language,
    required this.selected,
    required this.onTap,
    required this.showDivider,
  });

  final AppLanguage language;
  final bool selected;
  final VoidCallback onTap;
  final bool showDivider;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (showDivider)
          const Divider(height: 1, thickness: 1, color: AppColors.border),
        Material(
          color: selected
              ? AppColors.primary.withValues(alpha: 0.04)
              : Colors.transparent,
          child: InkWell(
            onTap: onTap,
            child: Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: AppSpacing.lg,
                vertical: 14,
              ),
              child: Row(
                children: [
                  _LanguageIcon(language: language, selected: selected),

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

                  _SelectionIndicator(selected: selected),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _LanguageIcon extends StatelessWidget {
  const _LanguageIcon({required this.language, required this.selected});

  final AppLanguage language;
  final bool selected;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 40,
      height: 40,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: selected
            ? AppColors.primary.withValues(alpha: 0.12)
            : AppColors.secondary,
        borderRadius: BorderRadius.circular(AppRadius.md),
      ),
      child: Text(
        language.native.characters.first,
        style: AppTypography.titleLarge.copyWith(
          color: selected ? AppColors.primary : AppColors.mutedForeground,
        ),
      ),
    );
  }
}

class _SelectionIndicator extends StatelessWidget {
  const _SelectionIndicator({required this.selected});

  final bool selected;

  @override
  Widget build(BuildContext context) {
    if (selected) {
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

    return Container(
      width: 20,
      height: 20,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: AppColors.border, width: 2),
      ),
    );
  }
}
