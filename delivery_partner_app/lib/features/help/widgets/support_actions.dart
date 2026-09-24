import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

class SupportActions extends StatelessWidget {
  const SupportActions({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: _SupportAction(
            icon: Icons.chat_bubble_outline_rounded,
            title: 'Chat Support',
            subtitle: 'Avg 2 min response',
            iconColor: AppColors.primary,
            onTap: () {},
          ),
        ),
        const SizedBox(width: AppSpacing.md),
        Expanded(
          child: _SupportAction(
            icon: Icons.phone_outlined,
            title: 'Call Support',
            subtitle: '24/7 available',
            iconColor: AppColors.success,
            onTap: () {},
          ),
        ),
      ],
    );
  }
}

class _SupportAction extends StatelessWidget {
  const _SupportAction({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.iconColor,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final Color iconColor;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(AppRadius.xl),
      child: Container(
        padding: const EdgeInsets.all(AppSpacing.lg),
        decoration: BoxDecoration(
          color: AppColors.card,
          borderRadius: BorderRadius.circular(AppRadius.xl),
          border: Border.all(color: AppColors.border),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: iconColor, size: 26),
            const SizedBox(height: AppSpacing.md),
            Text(
              title,
              style: AppTypography.titleMedium.copyWith(
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              subtitle,
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.mutedForeground,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
