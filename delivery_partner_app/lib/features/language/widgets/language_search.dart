import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

class LanguageSearch extends StatelessWidget {
  const LanguageSearch({super.key, required this.onChanged});

  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return TextField(
      onChanged: onChanged,
      style: AppTypography.bodyMedium.copyWith(color: AppColors.foreground),
      cursorColor: AppColors.primary,
      decoration: InputDecoration(
        hintText: 'Search language...',
        hintStyle: AppTypography.bodyMedium.copyWith(
          color: AppColors.mutedForeground,
        ),
        prefixIcon: const Icon(
          Icons.search,
          size: 20,
          color: AppColors.mutedForeground,
        ),
        filled: true,
        fillColor: AppColors.secondary,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.lg,
          vertical: AppSpacing.md,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.lg),
          borderSide: const BorderSide(color: AppColors.border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.lg),
          borderSide: const BorderSide(color: AppColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.lg),
          borderSide: const BorderSide(color: AppColors.primary),
        ),
      ),
    );
  }
}
