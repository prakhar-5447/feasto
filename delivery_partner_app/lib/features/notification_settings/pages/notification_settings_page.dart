import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

import 'package:delivery_partner_app/features/notification_settings/controllers/notification_settings_controller.dart';

import 'package:delivery_partner_app/features/notification_settings/widgets/notification_setting_tile.dart';
import 'package:delivery_partner_app/features/notification_settings/widgets/notification_sound_selector.dart';
import 'package:delivery_partner_app/features/notification_settings/widgets/quiet_hours_card.dart';

class NotificationSettingsPage extends GetView<NotificationSettingsController> {
  const NotificationSettingsPage({super.key});

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
      child: Row(
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
                color: AppColors.foreground,
              ),
            ),
          ),

          const SizedBox(width: AppSpacing.md),

          Text(
            'Notification Settings',
            style: AppTypography.headingMedium.copyWith(
              color: AppColors.foreground,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContent() {
    return ListView(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.lg,
        20,
        AppSpacing.lg,
        AppSpacing.xxl,
      ),
      children: [
        _buildSectionLabel('Order Alert Sound'),

        const SizedBox(height: AppSpacing.sm),

        Obx(
          () => NotificationSoundSelector(
            selected: controller.sound.value,
            onChanged: controller.changeSound,
          ),
        ),

        const SizedBox(height: 20),

        _buildSectionLabel('Quiet Hours'),

        const SizedBox(height: AppSpacing.sm),

        Obx(
          () => QuietHoursCard(
            enabled: controller.quietHours.value,
            start: controller.quietStart.value,
            end: controller.quietEnd.value,
            onToggle: controller.toggleQuietHours,
            onStartChanged: controller.changeQuietStart,
            onEndChanged: controller.changeQuietEnd,
          ),
        ),

        const SizedBox(height: 20),

        _buildNotificationGroup(
          title: 'Orders',
          ids: ['new-orders', 'order-updates'],
        ),

        const SizedBox(height: 20),

        _buildNotificationGroup(
          title: 'Earnings',
          ids: ['earnings', 'incentives', 'payout'],
        ),

        const SizedBox(height: 20),

        _buildNotificationGroup(
          title: 'Account',
          ids: ['documents', 'ratings'],
        ),

        const SizedBox(height: 20),

        _buildNotificationGroup(title: 'General', ids: ['promotional', 'tips']),
      ],
    );
  }

  Widget _buildNotificationGroup({
    required String title,
    required List<String> ids,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionLabel(title),

        const SizedBox(height: AppSpacing.sm),

        Obx(() {
          final groupSettings = controller.getSettingsForGroup(ids);

          return Container(
            clipBehavior: Clip.antiAlias,
            decoration: BoxDecoration(
              color: AppColors.card,
              borderRadius: BorderRadius.circular(AppRadius.xl),
              border: Border.all(color: AppColors.border),
            ),
            child: Column(
              children: [
                for (int i = 0; i < groupSettings.length; i++)
                  NotificationSettingTile(
                    setting: groupSettings[i],
                    showDivider: i > 0,
                    onToggle: () =>
                        controller.toggleSetting(groupSettings[i].id),
                  ),
              ],
            ),
          );
        }),
      ],
    );
  }

  Widget _buildSectionLabel(String label) {
    return Text(
      label.toUpperCase(),
      style: AppTypography.labelMedium.copyWith(
        color: AppColors.mutedForeground,
        letterSpacing: 1.1,
        fontWeight: FontWeight.w600,
      ),
    );
  }
}
