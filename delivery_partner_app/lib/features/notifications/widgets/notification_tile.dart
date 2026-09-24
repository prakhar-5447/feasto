import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/notifications/models/notification.dart';
import 'package:delivery_partner_app/features/notifications/models/notification_type.dart';

class NotificationTile extends StatelessWidget {
  const NotificationTile({
    super.key,
    required this.notification,
    required this.showDivider,
  });

  final AppNotification notification;
  final bool showDivider;

  Color get typeColor {
    switch (notification.type) {
      case NotificationType.orders:
        return AppColors.primary;

      case NotificationType.earnings:
        return AppColors.success;

      case NotificationType.account:
        return AppColors.warning;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: notification.unread
          ? AppColors.primary.withValues(alpha: 0.025)
          : Colors.transparent,
      child: Column(
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
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  width: 6,
                  child: notification.unread
                      ? Padding(
                          padding: const EdgeInsets.only(top: 17),
                          child: Container(
                            width: 6,
                            height: 6,
                            decoration: const BoxDecoration(
                              color: AppColors.primary,
                              shape: BoxShape.circle,
                            ),
                          ),
                        )
                      : null,
                ),

                const SizedBox(width: AppSpacing.sm),

                Container(
                  width: 40,
                  height: 40,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: typeColor.withValues(alpha: 0.12),
                    shape: BoxShape.circle,
                  ),
                  child: Text(
                    notification.icon,
                    style: const TextStyle(fontSize: 16),
                  ),
                ),

                const SizedBox(width: AppSpacing.md),

                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        notification.title,
                        style: AppTypography.titleMedium.copyWith(
                          color: AppColors.foreground,
                        ),
                      ),

                      const SizedBox(height: 2),

                      Text(
                        notification.body,
                        style: AppTypography.bodySmall.copyWith(
                          color: AppColors.mutedForeground,
                        ),
                      ),

                      const SizedBox(height: 4),

                      Text(
                        notification.time,
                        style: AppTypography.bodySmall.copyWith(
                          color: typeColor,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
