import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/incentives/controllers/incentives_controller.dart';
import 'package:delivery_partner_app/features/incentives/widgets/active_incentive_card.dart';
import 'package:delivery_partner_app/features/incentives/widgets/completed_incentives.dart';
import 'package:delivery_partner_app/features/incentives/widgets/incentives_summary.dart';

class IncentivesPage extends StatelessWidget {
  const IncentivesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<IncentivesController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            _IncentivesHeader(onBack: () => Get.back()),

            Expanded(
              child: Obx(() {
                if (controller.isLoading.value) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (controller.errorMessage.value.isNotEmpty &&
                    controller.activeIncentives.isEmpty) {
                  return Center(
                    child: Text(
                      controller.errorMessage.value,
                      style: AppTypography.bodyMedium.copyWith(
                        color: AppColors.mutedForeground,
                      ),
                    ),
                  );
                }

                return RefreshIndicator(
                  onRefresh: controller.loadIncentives,
                  child: ListView(
                    padding: const EdgeInsets.all(AppSpacing.lg),
                    children: [
                      IncentivesSummary(
                        weeklyBonus: controller.weeklyBonus.value,
                        activeCount: controller.activeIncentives.length,
                      ),

                      const SizedBox(height: AppSpacing.xxl),

                      Text(
                        'ACTIVE INCENTIVES',
                        style: AppTypography.labelMedium.copyWith(
                          color: AppColors.mutedForeground,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 1.2,
                        ),
                      ),

                      const SizedBox(height: AppSpacing.md),

                      ...controller.activeIncentives.map(
                        (incentive) => Padding(
                          padding: const EdgeInsets.only(bottom: AppSpacing.md),
                          child: ActiveIncentiveCard(incentive: incentive),
                        ),
                      ),

                      const SizedBox(height: AppSpacing.md),

                      CompletedIncentives(
                        incentives: controller.completedIncentives,
                      ),

                      const SizedBox(height: AppSpacing.xxl),
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

class _IncentivesHeader extends StatelessWidget {
  const _IncentivesHeader({required this.onBack});

  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.lg,
        AppSpacing.md,
        AppSpacing.lg,
        AppSpacing.lg,
      ),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: AppColors.border)),
      ),
      child: Row(
        children: [
          IconButton(
            onPressed: onBack,
            style: IconButton.styleFrom(
              backgroundColor: AppColors.secondary,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
                side: const BorderSide(color: AppColors.border),
              ),
            ),
            icon: const Icon(
              Icons.arrow_back_rounded,
              color: AppColors.foreground,
              size: 20,
            ),
          ),

          const SizedBox(width: AppSpacing.md),

          Text(
            'Incentives',
            style: AppTypography.headingMedium.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}
