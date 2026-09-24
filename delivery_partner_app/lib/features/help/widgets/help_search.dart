import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

class HelpSearch extends StatelessWidget {
  const HelpSearch({super.key, required this.value, required this.onChanged});

  final String value;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return TextField(
      onChanged: onChanged,
      style: AppTypography.bodyMedium.copyWith(color: AppColors.foreground),
      decoration: InputDecoration(
        hintText: 'Search for help...',
        hintStyle: AppTypography.bodyMedium.copyWith(
          color: AppColors.mutedForeground,
        ),
        prefixIcon: const Icon(
          Icons.search_rounded,
          color: AppColors.mutedForeground,
        ),
        filled: true,
        fillColor: AppColors.secondary,
        contentPadding: const EdgeInsets.symmetric(
          vertical: 14,
          horizontal: 16,
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
