import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/delivery_preferences/controllers/delivery_preferences_controller.dart';
import 'package:delivery_partner_app/features/delivery_preferences/widgets/delivery_area_tile.dart';
import 'package:delivery_partner_app/features/delivery_preferences/widgets/preferences_info_banner.dart';
import 'package:delivery_partner_app/features/delivery_preferences/widgets/save_preferences_button.dart';
import 'package:delivery_partner_app/features/delivery_preferences/widgets/selected_area_count.dart';

class DeliveryPreferencesPage extends StatelessWidget {
  const DeliveryPreferencesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<DeliveryPreferencesController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            const _DeliveryPreferencesHeader(),
            Expanded(
              child: Obx(() {
                if (controller.isLoading.value) {
                  return const Center(
                    child: CircularProgressIndicator(color: AppColors.primary),
                  );
                }

                if (controller.errorMessage.value.isNotEmpty &&
                    controller.areas.isEmpty) {
                  return _ErrorState(
                    message: controller.errorMessage.value,
                    onRetry: controller.loadPreferences,
                  );
                }

                return RefreshIndicator(
                  color: AppColors.primary,
                  backgroundColor: AppColors.card,
                  onRefresh: controller.loadPreferences,
                  child: ListView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.fromLTRB(
                      AppSpacing.lg,
                      AppSpacing.xl,
                      AppSpacing.lg,
                      AppSpacing.xl,
                    ),
                    children: [
                      const PreferencesInfoBanner(),

                      const SizedBox(height: AppSpacing.xl),

                      SelectedAreaCount(count: controller.selectedCount),

                      const SizedBox(height: AppSpacing.md),

                      ...controller.areas.map(
                        (area) => Padding(
                          padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                          child: DeliveryAreaTile(
                            area: area,
                            selected: controller.isSelected(area.id),
                            onTap: () => controller.toggleArea(area.id),
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              }),
            ),
            Obx(
              () => SavePreferencesButton(
                isSaving: controller.isSaving.value,
                onPressed: controller.savePreferences,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _DeliveryPreferencesHeader extends StatelessWidget {
  const _DeliveryPreferencesHeader();

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
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Delivery Preferences',
                  style: AppTypography.headingMedium.copyWith(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  'Select your preferred work areas',
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.mutedForeground,
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
              'Unable to load preferences',
              textAlign: TextAlign.center,
              style: AppTypography.titleLarge,
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              message,
              textAlign: TextAlign.center,
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.mutedForeground,
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
            TextButton(onPressed: onRetry, child: const Text('Try Again')),
          ],
        ),
      ),
    );
  }
}
