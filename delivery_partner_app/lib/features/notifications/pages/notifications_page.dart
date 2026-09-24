import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/notifications/controllers/notifications_controller.dart';
import 'package:delivery_partner_app/features/notifications/widgets/notification_empty_state.dart';
import 'package:delivery_partner_app/features/notifications/widgets/notification_tabs.dart';
import 'package:delivery_partner_app/features/notifications/widgets/notification_tile.dart';

class NotificationsPage extends GetView<NotificationsController> {
  const NotificationsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(),

            Expanded(
              child: Obx(() {
                if (controller.isLoading.value) {
                  return const Center(
                    child: CircularProgressIndicator(color: AppColors.primary),
                  );
                }

                return _buildContent();
              }),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.lg,
        AppSpacing.lg,
        AppSpacing.lg,
        AppSpacing.lg,
      ),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: AppColors.border)),
      ),
      child: Column(
        children: [
          Row(
            children: [
              InkWell(
                onTap: Get.back,
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: AppColors.secondary,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppColors.border),
                  ),
                  child: const Icon(
                    Icons.chevron_left,
                    size: 22,
                    color: AppColors.foreground,
                  ),
                ),
              ),

              const SizedBox(width: AppSpacing.md),

              Expanded(
                child: Text(
                  'Notifications',
                  style: AppTypography.headingMedium.copyWith(
                    color: AppColors.foreground,
                  ),
                ),
              ),

              Obx(() {
                if (controller.unreadCount == 0) {
                  return const SizedBox.shrink();
                }

                return TextButton(
                  onPressed: controller.markAllAsRead,
                  child: Text(
                    'Mark all read',
                    style: AppTypography.labelMedium.copyWith(
                      color: AppColors.primary,
                    ),
                  ),
                );
              }),
            ],
          ),

          const SizedBox(height: AppSpacing.lg),

          Obx(
            () => NotificationTabs(
              selectedType: controller.selectedType.value,
              onChanged: controller.selectType,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContent() {
    return Obx(() {
      final filtered = controller.filteredNotifications;

      if (filtered.isEmpty) {
        return const SingleChildScrollView(child: NotificationEmptyState());
      }

      final today = controller.todayNotifications;

      final earlier = controller.earlierNotifications;

      return RefreshIndicator(
        color: AppColors.primary,
        backgroundColor: AppColors.card,
        onRefresh: controller.loadNotifications,
        child: ListView(
          padding: const EdgeInsets.only(bottom: AppSpacing.xl),
          children: [
            if (today.isNotEmpty) ...[
              _buildSectionLabel('Today'),

              _buildNotificationList(today),
            ],

            if (earlier.isNotEmpty) ...[
              _buildSectionLabel('Earlier'),

              _buildNotificationList(earlier, older: true),
            ],
          ],
        ),
      );
    });
  }

  Widget _buildSectionLabel(String label) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.lg,
        AppSpacing.lg,
        AppSpacing.lg,
        AppSpacing.sm,
      ),
      child: Text(
        label.toUpperCase(),
        style: AppTypography.labelMedium.copyWith(
          color: AppColors.mutedForeground,
          letterSpacing: 1.1,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  Widget _buildNotificationList(List notifications, {bool older = false}) {
    return Column(
      children: [
        for (int i = 0; i < notifications.length; i++)
          Opacity(
            opacity: older ? 0.82 : 1,
            child: NotificationTile(
              notification: notifications[i],
              showDivider: i > 0,
            ),
          ),
      ],
    );
  }
}
