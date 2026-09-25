import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/features/active_delivery/controllers/active_delivery_controller.dart';
import 'package:delivery_partner_app/features/active_delivery/models/delivery_order.dart';
import 'package:delivery_partner_app/features/active_delivery/models/delivery_phase.dart';
import 'package:delivery_partner_app/features/active_delivery/widgets/delivery_bottom_sheet.dart';
import 'package:delivery_partner_app/features/active_delivery/widgets/delivery_map.dart';

class ActiveDeliveryPage extends StatelessWidget {
  const ActiveDeliveryPage({super.key, required this.order});

  final DeliveryOrder order;

  @override
  Widget build(BuildContext context) {
    return GetBuilderScope(order: order);
  }
}

class GetBuilderScope extends StatelessWidget {
  const GetBuilderScope({super.key, required this.order});

  final DeliveryOrder order;

  @override
  Widget build(BuildContext context) {
    return GetBuilder<ActiveDeliveryController>(
      init: ActiveDeliveryController(order: order),
      builder: (controller) {
        return Scaffold(
          backgroundColor: AppColors.background,
          body: Obx(() {
            final phase = controller.phase.value;

            if (phase == DeliveryPhase.delivered) {
              return _DeliveredPage(controller: controller);
            }

            return Column(
              children: [
                Expanded(
                  child: Stack(
                    children: [
                      Positioned.fill(
                        child: DeliveryMap(order: order, phase: phase),
                      ),

                      _TopBar(controller: controller),

                      _StepIndicator(controller: controller),
                    ],
                  ),
                ),

                const DeliveryBottomSheet(),
              ],
            );
          }),
        );
      },
    );
  }
}

class _TopBar extends StatelessWidget {
  const _TopBar({required this.controller});

  final ActiveDeliveryController controller;

  @override
  Widget build(BuildContext context) {
    final pickup = controller.isPickupPhase;

    return Positioned(
      top: MediaQuery.paddingOf(context).top + AppSpacing.sm,
      left: AppSpacing.lg,
      right: AppSpacing.lg,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          _TopButton(
            icon: Icons.arrow_back_ios_new_rounded,
            onTap: () {
              Get.back();
            },
          ),

          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
            decoration: BoxDecoration(
              color: AppColors.card,
              borderRadius: BorderRadius.circular(999),
              border: Border.all(
                color: pickup
                    ? AppColors.primary.withValues(alpha: .3)
                    : AppColors.success.withValues(alpha: .3),
              ),
            ),
            child: Row(
              children: [
                Container(
                  width: 6,
                  height: 6,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: pickup ? AppColors.primary : AppColors.success,
                  ),
                ),
                const SizedBox(width: 6),
                Text(
                  controller.phase.value.label,
                  style: AppTypography.labelSmall.copyWith(
                    color: pickup ? AppColors.primary : AppColors.success,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),

          Row(
            children: [
              _TopButton(
                icon: Icons.phone_outlined,
                onTap: controller.openContact,
              ),
              const SizedBox(width: 8),
              _TopButton(
                icon: Icons.help_outline_rounded,
                onTap: controller.openIssue,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _TopButton extends StatelessWidget {
  const _TopButton({required this.icon, required this.onTap});

  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: AppColors.card,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: AppColors.border),
          ),
          child: Icon(icon, size: 18, color: AppColors.foreground),
        ),
      ),
    );
  }
}

class _StepIndicator extends StatelessWidget {
  const _StepIndicator({required this.controller});

  final ActiveDeliveryController controller;

  @override
  Widget build(BuildContext context) {
    final phaseIndex = controller.phaseIndex;

    final pickup = controller.isPickupPhase;

    final color = pickup ? AppColors.primary : AppColors.success;

    return Positioned(
      top: MediaQuery.paddingOf(context).top + 72,
      left: 0,
      right: 0,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: List.generate(6, (index) {
          final active = index <= phaseIndex;

          final current = index == phaseIndex;

          return AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            margin: const EdgeInsets.symmetric(horizontal: 3),
            width: current ? 20 : 6,
            height: 6,
            decoration: BoxDecoration(
              color: active ? color : AppColors.muted,
              borderRadius: BorderRadius.circular(999),
            ),
          );
        }),
      ),
    );
  }
}

class _DeliveredPage extends StatelessWidget {
  const _DeliveredPage({required this.controller});

  final ActiveDeliveryController controller;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.xl),
          child: Column(
            children: [
              Container(
                width: 96,
                height: 96,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.success.withValues(alpha: .15),
                  border: Border.all(color: AppColors.success, width: 2),
                ),
                child: const Icon(
                  Icons.check_rounded,
                  size: 42,
                  color: AppColors.success,
                ),
              ),

              const SizedBox(height: AppSpacing.lg),

              Text('Delivery Completed ✓', style: AppTypography.headingMedium),

              const SizedBox(height: 4),

              Text(
                '${controller.order.earnings} earned',
                style: AppTypography.titleLarge.copyWith(
                  color: AppColors.success,
                ),
              ),

              Text(
                "Today's total: ₹916",
                style: AppTypography.bodySmall.copyWith(
                  color: AppColors.secondaryForeground,
                ),
              ),

              const SizedBox(height: AppSpacing.xl),

              _RatingCard(controller: controller),

              const SizedBox(height: AppSpacing.lg),

              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () {
                        Get.offNamed('/orders');
                      },
                      child: const Text('Skip'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    flex: 2,
                    child: ElevatedButton(
                      onPressed: () {
                        Get.back();
                      },
                      child: const Text('Continue Online →'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _RatingCard extends StatelessWidget {
  const _RatingCard({required this.controller});

  final ActiveDeliveryController controller;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          Text('How was this delivery?', style: AppTypography.titleMedium),

          const SizedBox(height: AppSpacing.sm),

          Obx(
            () => Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(5, (index) {
                final rating = index + 1;

                return IconButton(
                  onPressed: () => controller.setRating(rating),
                  icon: Icon(
                    Icons.star_rounded,
                    size: 32,
                    color: rating <= controller.riderRating.value
                        ? AppColors.accent
                        : AppColors.border,
                  ),
                );
              }),
            ),
          ),

          Obx(
            () => Text(
              controller.riderRating.value == 0
                  ? 'Tap a star to rate'
                  : '${controller.riderRating.value} star${controller.riderRating.value > 1 ? 's' : ''}',
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.secondaryForeground,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
