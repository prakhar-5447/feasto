import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_shadows.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

import 'package:delivery_partner_app/features/demand_map/controllers/nearby_demand_controller.dart';
import 'package:delivery_partner_app/features/demand_map/widgets/demand_legend.dart';
import 'package:delivery_partner_app/features/demand_map/widgets/demand_zone_tile.dart';
import 'package:delivery_partner_app/features/demand_map/widgets/demand_map.dart';

class NearbyDemandPage extends GetView<NearbyDemandController> {
  const NearbyDemandPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Obx(() {
        if (controller.isLoading.value && controller.zones.isEmpty) {
          return const Center(
            child: CircularProgressIndicator(color: AppColors.primary),
          );
        }

        if (controller.errorMessage.value != null && controller.zones.isEmpty) {
          return _ErrorState(
            message: controller.errorMessage.value!,
            onRetry: controller.loadDemandZones,
          );
        }

        return Column(
          children: [
            Expanded(
              flex: 6,
              child: Stack(
                children: [
                  Positioned.fill(child: DemandMap(zones: controller.zones)),

                  Positioned(
                    top: MediaQuery.paddingOf(context).top + AppSpacing.lg,
                    left: AppSpacing.lg,
                    child: _BackButton(),
                  ),

                  Positioned(
                    top: MediaQuery.paddingOf(context).top + AppSpacing.lg,
                    left: 68,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: AppSpacing.lg,
                        vertical: AppSpacing.sm,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.card,
                        borderRadius: BorderRadius.circular(AppRadius.lg),
                        border: Border.all(color: AppColors.border),
                        boxShadow: AppShadows.card,
                      ),
                      child: Text(
                        'Nearby Demand',
                        style: AppTypography.titleLarge.copyWith(
                          color: AppColors.foreground,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            Expanded(
              flex: 5,
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.fromLTRB(
                  AppSpacing.xl,
                  AppSpacing.lg,
                  AppSpacing.xl,
                  AppSpacing.xxl,
                ),
                decoration: BoxDecoration(
                  color: AppColors.card,
                  borderRadius: const BorderRadius.vertical(
                    top: Radius.circular(AppRadius.xl),
                  ),
                  border: Border.all(color: AppColors.border),
                ),
                child: RefreshIndicator(
                  color: AppColors.primary,
                  backgroundColor: AppColors.card,
                  onRefresh: controller.loadDemandZones,
                  child: ListView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    children: [
                      const DemandLegend(),

                      const SizedBox(height: AppSpacing.lg),

                      ...controller.sortedZones.map(
                        (zone) => Padding(
                          padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                          child: DemandZoneTile(zone: zone),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        );
      }),
    );
  }
}

class _BackButton extends StatelessWidget {
  const _BackButton();

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: Get.back,
        borderRadius: BorderRadius.circular(AppRadius.lg),
        child: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: AppColors.card,
            borderRadius: BorderRadius.circular(AppRadius.lg),
            border: Border.all(color: AppColors.border),
            boxShadow: AppShadows.card,
          ),
          child: const Icon(
            Icons.arrow_back_ios_new_rounded,
            size: 18,
            color: AppColors.foreground,
          ),
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
            const Icon(
              Icons.error_outline_rounded,
              size: 42,
              color: AppColors.danger,
            ),
            const SizedBox(height: AppSpacing.md),
            Text(
              message,
              textAlign: TextAlign.center,
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.secondaryForeground,
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
            ElevatedButton(
              onPressed: onRetry,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: AppColors.primaryForeground,
              ),
              child: const Text('Retry'),
            ),
          ],
        ),
      ),
    );
  }
}
