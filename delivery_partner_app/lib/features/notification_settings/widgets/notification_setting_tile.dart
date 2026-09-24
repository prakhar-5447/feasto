import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/notification_settings/models/notification_setting.dart';

class NotificationSettingTile extends StatelessWidget {
  const NotificationSettingTile({
    super.key,
    required this.setting,
    required this.onToggle,
    required this.showDivider,
  });

  final NotificationSetting setting;
  final VoidCallback onToggle;
  final bool showDivider;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (showDivider)
          const Divider(
            height: 1,
            indent: 16,
            endIndent: 16,
            color: AppColors.border,
          ),
        Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.lg,
            vertical: 14,
          ),
          child: Row(
            children: [
              Container(
                width: 36,
                height: 36,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: AppColors.secondary,
                  borderRadius: BorderRadius.circular(AppRadius.md),
                ),
                child: Text(setting.icon, style: const TextStyle(fontSize: 16)),
              ),

              const SizedBox(width: AppSpacing.md),

              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      setting.label,
                      style: AppTypography.bodyMedium.copyWith(
                        color: AppColors.foreground,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      setting.subtitle,
                      style: AppTypography.bodySmall.copyWith(
                        color: AppColors.mutedForeground,
                      ),
                    ),
                  ],
                ),
              ),

              _NotificationToggle(enabled: setting.enabled, onTap: onToggle),
            ],
          ),
        ),
      ],
    );
  }
}

class _NotificationToggle extends StatelessWidget {
  const _NotificationToggle({required this.enabled, required this.onTap});

  final bool enabled;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        width: 44,
        height: 24,
        padding: const EdgeInsets.all(2),
        decoration: BoxDecoration(
          color: enabled ? AppColors.primary : AppColors.muted,
          borderRadius: BorderRadius.circular(AppRadius.pill),
        ),
        child: AnimatedAlign(
          duration: const Duration(milliseconds: 180),
          alignment: enabled ? Alignment.centerRight : Alignment.centerLeft,
          child: Container(
            width: 20,
            height: 20,
            decoration: const BoxDecoration(
              color: Colors.white,
              shape: BoxShape.circle,
              boxShadow: [BoxShadow(blurRadius: 3, offset: Offset(0, 1))],
            ),
          ),
        ),
      ),
    );
  }
}
