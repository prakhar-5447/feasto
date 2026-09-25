import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/active_delivery/controllers/active_delivery_controller.dart';

class NavigationSheet extends GetView<ActiveDeliveryController> {
  const NavigationSheet({super.key});

  static Future<void> show() {
    return Get.bottomSheet(const NavigationSheet(), isScrollControlled: true);
  }

  @override
  Widget build(BuildContext conntext) {
    return SafeArea(
      child: Container(
        padding: const EdgeInsets.all(AppSpacing.xl),
        decoration: const BoxDecoration(
          color: AppColors.card,
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Navigate to ${controller.navigationDestination}',
              style: AppTypography.titleLarge,
            ),

            Text(
              controller.navigationArea,
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.secondaryForeground,
              ),
            ),

            const SizedBox(height: AppSpacing.sm),

            Row(
              children: [
                Text(
                  controller.navigationDistance,
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.secondaryForeground,
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 10),
                  child: Text('•'),
                ),
                Text(
                  controller.navigationEta,
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.secondaryForeground,
                  ),
                ),
              ],
            ),

            const SizedBox(height: AppSpacing.xl),

            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  controller.confirmNavigation();

                  // Later:
                  // launch external Google Maps/
                  // Mapbox navigation here.
                },
                child: const Text('🧭 Start Navigation'),
              ),
            ),

            const SizedBox(height: AppSpacing.sm),

            Center(
              child: Text(
                'After navigating, tap below when you arrive',
                style: AppTypography.bodySmall.copyWith(
                  color: AppColors.secondaryForeground,
                ),
              ),
            ),

            const SizedBox(height: AppSpacing.sm),

            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () {
                  Get.back();
                  controller.advance();
                },
                child: const Text("✓ Yes, I'm here"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
