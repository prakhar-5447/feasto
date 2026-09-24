import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

import 'package:delivery_partner_app/features/app_settings/controllers/app_settings_controller.dart';
import 'package:delivery_partner_app/features/app_settings/models/app_settings.dart';
import 'package:delivery_partner_app/features/app_settings/widgets/map_type_selector.dart';
import 'package:delivery_partner_app/features/app_settings/widgets/setting_row.dart';
import 'package:delivery_partner_app/features/app_settings/widgets/setting_section.dart';
import 'package:delivery_partner_app/features/app_settings/widgets/setting_toggle.dart';

class AppSettingsPage extends StatelessWidget {
  const AppSettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<AppSettingsController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            const _AppSettingsHeader(),

            Expanded(
              child: Obx(() {
                if (controller.isLoading.value) {
                  return const Center(
                    child: CircularProgressIndicator(color: AppColors.primary),
                  );
                }

                if (controller.errorMessage.value.isNotEmpty) {
                  return _ErrorState(
                    message: controller.errorMessage.value,
                    onRetry: controller.loadSettings,
                  );
                }

                final settings = controller.settings.value;

                return RefreshIndicator(
                  color: AppColors.primary,
                  backgroundColor: AppColors.card,
                  onRefresh: controller.loadSettings,
                  child: ListView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.only(
                      top: AppSpacing.xl,
                      bottom: AppSpacing.xl,
                    ),
                    children: [
                      // Appearance
                      SettingSection(
                        title: 'Appearance',
                        children: [
                          SettingRow(
                            icon: '🌙',
                            label: 'Dark Mode',
                            subtitle: 'Reduce eye strain at night',
                            trailing: SettingToggle(
                              value: settings.darkMode,
                              onChanged: controller.toggleDarkMode,
                            ),
                          ),
                          const _SectionDivider(),
                          SettingRow(
                            icon: '📐',
                            label: 'Compact View',
                            subtitle: 'Show more orders in less space',
                            trailing: SettingToggle(
                              value: settings.compactView,
                              onChanged: controller.toggleCompactView,
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Map
                      SettingSection(
                        title: 'Map',
                        children: [
                          MapTypeSelector(
                            selected: settings.mapType,
                            onChanged: controller.changeMapType,
                          ),
                          const _SectionDivider(),
                          SettingRow(
                            icon: '📍',
                            label: 'Always-On Location',
                            subtitle: 'Required for accurate delivery tracking',
                            trailing: SettingToggle(
                              value: settings.locationAlways,
                              onChanged: controller.toggleLocationAlways,
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Delivery
                      SettingSection(
                        title: 'Delivery',
                        children: [
                          SettingRow(
                            icon: '⚡',
                            label: 'Auto-Accept Orders',
                            subtitle: 'Accept orders automatically when online',
                            trailing: SettingToggle(
                              value: settings.autoAccept,
                              onChanged: controller.toggleAutoAccept,
                            ),
                          ),

                          if (settings.autoAccept) const _AutoAcceptWarning(),
                        ],
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Sound & Haptics
                      SettingSection(
                        title: 'Sound & Haptics',
                        children: [
                          SettingRow(
                            icon: '🔊',
                            label: 'Sound Effects',
                            subtitle: 'Order alerts and confirmations',
                            trailing: SettingToggle(
                              value: settings.soundFx,
                              onChanged: controller.toggleSoundFx,
                            ),
                          ),
                          const _SectionDivider(),
                          SettingRow(
                            icon: '📳',
                            label: 'Haptic Feedback',
                            subtitle: 'Vibrate on order alerts',
                            trailing: SettingToggle(
                              value: settings.haptics,
                              onChanged: controller.toggleHaptics,
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Privacy & Data
                      SettingSection(
                        title: 'Privacy & Data',
                        children: [
                          SettingRow(
                            icon: '☁️',
                            label: 'Background Data Sync',
                            subtitle: 'Keep earnings & orders up to date',
                            trailing: SettingToggle(
                              value: settings.dataSync,
                              onChanged: controller.toggleDataSync,
                            ),
                          ),
                          const _SectionDivider(),
                          SettingRow(
                            icon: '📊',
                            label: 'Share Analytics',
                            subtitle: 'Help improve the app anonymously',
                            trailing: SettingToggle(
                              value: settings.analytics,
                              onChanged: controller.toggleAnalytics,
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // About
                      SettingSection(
                        title: 'About',
                        children: [
                          const _InfoRow(
                            icon: '📱',
                            label: 'App Version',
                            value: 'v2.4.1 (build 4812)',
                          ),
                          const _SectionDivider(),
                          const _InfoRow(
                            icon: '🔄',
                            label: 'Last Synced',
                            value: 'Just now',
                          ),
                          const _SectionDivider(),
                          _ClearCacheRow(
                            isLoading: controller.isClearingCache.value,
                            onTap: controller.clearCache,
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              }),
            ),
          ],
        ),
      ),
    );
  }
}

class _AppSettingsHeader extends StatelessWidget {
  const _AppSettingsHeader();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.lg,
        AppSpacing.md,
        AppSpacing.lg,
        AppSpacing.md,
      ),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: AppColors.border)),
      ),
      child: Row(
        children: [
          SizedBox(
            width: 40,
            height: 40,
            child: IconButton(
              onPressed: Get.back,
              style: IconButton.styleFrom(
                backgroundColor: AppColors.secondary,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                  side: const BorderSide(color: AppColors.border),
                ),
              ),
              icon: const Icon(
                Icons.arrow_back_ios_new,
                size: 17,
                color: AppColors.foreground,
              ),
            ),
          ),

          const SizedBox(width: AppSpacing.md),

          Text(
            'App Settings',
            style: AppTypography.headingMedium.copyWith(fontSize: 20),
          ),
        ],
      ),
    );
  }
}

class _SectionDivider extends StatelessWidget {
  const _SectionDivider();

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 16),
      child: Divider(height: 1, color: AppColors.border),
    );
  }
}

class _AutoAcceptWarning extends StatelessWidget {
  const _AutoAcceptWarning();

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 0, 16, 12),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: AppColors.warning.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.warning.withValues(alpha: 0.2)),
      ),
      child: Text(
        '⚠️ Auto-accept may affect your completion rate. '
        'Use carefully.',
        style: AppTypography.bodySmall.copyWith(color: AppColors.warning),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  const _InfoRow({
    required this.icon,
    required this.label,
    required this.value,
  });

  final String icon;
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
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
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(icon, style: const TextStyle(fontSize: 16)),
          ),

          const SizedBox(width: AppSpacing.md),

          Expanded(
            child: Text(
              label,
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.foreground,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),

          Text(
            value,
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.mutedForeground,
            ),
          ),
        ],
      ),
    );
  }
}

class _ClearCacheRow extends StatelessWidget {
  const _ClearCacheRow({required this.isLoading, required this.onTap});

  final bool isLoading;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: isLoading ? null : onTap,
      child: Padding(
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
                color: AppColors.danger.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Text('🗑️', style: TextStyle(fontSize: 16)),
            ),

            const SizedBox(width: AppSpacing.md),

            Text(
              'Clear Cache',
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.danger,
                fontWeight: FontWeight.w500,
              ),
            ),

            const Spacer(),

            if (isLoading)
              const SizedBox(
                width: 18,
                height: 18,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  color: AppColors.danger,
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _ErrorState extends StatelessWidget {
  const _ErrorState({required this.message, required this.onRetry});

  final String message;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.xl),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.error_outline, size: 42, color: AppColors.danger),
            const SizedBox(height: AppSpacing.md),
            Text(
              'Unable to load settings',
              style: AppTypography.titleLarge,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              message,
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.mutedForeground,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: AppSpacing.lg),
            TextButton(onPressed: onRetry, child: const Text('Try Again')),
          ],
        ),
      ),
    );
  }
}
