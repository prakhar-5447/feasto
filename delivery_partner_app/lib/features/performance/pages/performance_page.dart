import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

import 'package:delivery_partner_app/features/performance/controllers/performance_controller.dart';
import 'package:delivery_partner_app/features/performance/widgets/completion_rate_card.dart';
import 'package:delivery_partner_app/features/performance/widgets/performance_insights.dart';
import 'package:delivery_partner_app/features/performance/widgets/performance_metric_card.dart';
import 'package:delivery_partner_app/features/performance/widgets/rating_hero.dart';

class PerformancePage extends StatelessWidget {
  const PerformancePage({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<PerformanceController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            const _PerformanceHeader(),

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
                    onRetry: controller.loadPerformance,
                  );
                }

                return RefreshIndicator(
                  color: AppColors.primary,
                  backgroundColor: AppColors.card,
                  onRefresh: controller.loadPerformance,
                  child: ListView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.fromLTRB(
                      AppSpacing.lg,
                      AppSpacing.xl,
                      AppSpacing.lg,
                      AppSpacing.xl,
                    ),
                    children: [
                      RatingHero(
                        rating: controller.overallRating.value,
                        ratingCount: controller.ratingCount.value,
                        acceptanceRate: controller.acceptanceRate.value,
                      ),

                      const SizedBox(height: AppSpacing.md),

                      GridView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        gridDelegate:
                            const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                              crossAxisSpacing: 12,
                              mainAxisSpacing: 12,
                              childAspectRatio: 1.45,
                            ),
                        itemCount: controller.metrics.length,
                        itemBuilder: (context, index) {
                          return PerformanceMetricCard(
                            metric: controller.metrics[index],
                          );
                        },
                      ),

                      const SizedBox(height: AppSpacing.md),

                      CompletionRateCard(
                        completionRate: controller.completionRate,
                      ),

                      const SizedBox(height: AppSpacing.md),

                      PerformanceInsights(
                        insights: controller.insights.toList(),
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

class _PerformanceHeader extends StatelessWidget {
  const _PerformanceHeader();

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
            'Performance',
            style: AppTypography.headingMedium.copyWith(fontSize: 20),
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
              'Unable to load performance',
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
