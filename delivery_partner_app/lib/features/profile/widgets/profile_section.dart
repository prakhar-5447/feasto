import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

class ProfileSection extends StatelessWidget {
  const ProfileSection({
    super.key,
    required this.title,
    required this.icon,
    required this.children,
  });

  final String title;
  final IconData icon;
  final List<Widget> children;

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
          Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.lg,
              vertical: AppSpacing.md,
            ),
            child: Row(
              children: [
                Icon(icon, size: 18, color: AppColors.primary),

                const SizedBox(width: AppSpacing.sm),

                Text(
                  title,
                  style: AppTypography.titleMedium.copyWith(
                    color: AppColors.foreground,
                  ),
                ),
              ],
            ),
          ),

          const Divider(height: 1, color: AppColors.border),

          Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Column(children: _withSpacing(children)),
          ),
        ],
      ),
    );
  }

  List<Widget> _withSpacing(List<Widget> widgets) {
    final result = <Widget>[];

    for (var i = 0; i < widgets.length; i++) {
      result.add(widgets[i]);

      if (i < widgets.length - 1) {
        result.add(const SizedBox(height: AppSpacing.lg));
      }
    }

    return result;
  }
}
