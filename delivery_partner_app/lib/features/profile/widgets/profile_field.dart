import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

class ProfileField extends StatelessWidget {
  const ProfileField({
    super.key,
    required this.label,
    required this.value,
    required this.editing,
    required this.onChanged,
    this.keyboardType,
    this.readOnly = false,
  });

  final String label;
  final String value;
  final bool editing;
  final ValueChanged<String> onChanged;
  final TextInputType? keyboardType;
  final bool readOnly;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label.toUpperCase(),
          style: AppTypography.labelSmall.copyWith(
            color: AppColors.mutedForeground,
            letterSpacing: 0.8,
          ),
        ),

        const SizedBox(height: AppSpacing.xs),

        if (editing && !readOnly)
          TextFormField(
            initialValue: value,
            keyboardType: keyboardType,
            onChanged: onChanged,
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.foreground,
            ),
            decoration: InputDecoration(
              filled: true,
              fillColor: AppColors.secondary,
              contentPadding: const EdgeInsets.symmetric(
                horizontal: AppSpacing.lg,
                vertical: AppSpacing.md,
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(AppRadius.lg),
                borderSide: const BorderSide(color: AppColors.primary),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(AppRadius.lg),
                borderSide: const BorderSide(color: AppColors.primary),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(AppRadius.lg),
                borderSide: const BorderSide(
                  color: AppColors.primary,
                  width: 1.5,
                ),
              ),
            ),
          )
        else
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.lg,
              vertical: AppSpacing.md,
            ),
            decoration: BoxDecoration(
              color: AppColors.secondary,
              borderRadius: BorderRadius.circular(AppRadius.lg),
              border: Border.all(color: AppColors.border),
            ),
            child: Text(
              value.isEmpty ? '—' : value,
              style: AppTypography.bodyMedium.copyWith(
                color: readOnly
                    ? AppColors.mutedForeground
                    : AppColors.foreground,
              ),
            ),
          ),
      ],
    );
  }
}
