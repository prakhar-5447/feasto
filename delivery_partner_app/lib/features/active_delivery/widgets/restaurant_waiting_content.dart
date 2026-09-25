import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/active_delivery/models/issue_category.dart';
import 'package:delivery_partner_app/features/active_delivery/controllers/active_delivery_controller.dart';

class ArrivedAtRestaurant extends GetView<ActiveDeliveryController> {
  const ArrivedAtRestaurant({super.key});

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      final delayed = controller.isDelayed.value;

      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              _IconCircle(icon: '📍', color: AppColors.primary),
              const SizedBox(width: AppSpacing.sm),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    delayed ? '⚠️ Order Delayed' : "You're at the restaurant",
                    style: AppTypography.titleMedium,
                  ),
                  Text(
                    controller.order.id,
                    style: AppTypography.bodySmall.copyWith(
                      color: AppColors.secondaryForeground,
                    ),
                  ),
                ],
              ),
            ],
          ),

          const SizedBox(height: AppSpacing.md),

          Container(
            padding: const EdgeInsets.all(AppSpacing.md),
            decoration: BoxDecoration(
              color: delayed
                  ? AppColors.danger.withValues(alpha: .08)
                  : AppColors.primary.withValues(alpha: .06),
              borderRadius: BorderRadius.circular(AppRadius.md),
              border: Border.all(
                color: delayed
                    ? AppColors.danger.withValues(alpha: .25)
                    : AppColors.primary.withValues(alpha: .2),
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        delayed
                            ? 'Restaurant taking longer than expected'
                            : 'Order is being prepared',
                        style: AppTypography.labelMedium.copyWith(
                          color: delayed ? AppColors.danger : AppColors.primary,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Est. preparation: 12 min',
                        style: AppTypography.bodySmall.copyWith(
                          color: AppColors.secondaryForeground,
                        ),
                      ),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      controller.formattedWaitTime,
                      style: AppTypography.headingMedium.copyWith(
                        color: delayed
                            ? AppColors.danger
                            : AppColors.foreground,
                      ),
                    ),
                    Text(
                      'waiting',
                      style: AppTypography.bodySmall.copyWith(
                        color: AppColors.secondaryForeground,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          if (delayed) ...[
            const SizedBox(height: AppSpacing.md),
            Row(
              children: [
                Expanded(
                  child: _SmallAction(
                    text: 'Report Delay',
                    color: AppColors.danger,
                  ),
                ),
                Expanded(
                  child: _SmallAction(
                    text: 'Contact Support',
                    color: AppColors.secondaryForeground,
                  ),
                ),
                Expanded(
                  child: _SmallAction(
                    text: 'Wait',
                    color: AppColors.foreground,
                  ),
                ),
              ],
            ),
          ],

          const SizedBox(height: AppSpacing.md),

          _OrderSummary(),

          const SizedBox(height: AppSpacing.md),

          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () =>
                      controller.openIssue(category: IssueCategory.restaurant),
                  child: const Text('Report Issue'),
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                flex: 2,
                child: ElevatedButton(
                  onPressed: controller.advance,
                  child: const Text('✓ Confirm Pickup'),
                ),
              ),
            ],
          ),
        ],
      );
    });
  }
}

class _OrderSummary extends GetView<ActiveDeliveryController> {
  const _OrderSummary();

  static const items = [
    '2 × Butter Chicken',
    '1 × Garlic Naan',
    '1 × Coke 500ml',
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: AppColors.secondary,
        borderRadius: BorderRadius.circular(AppRadius.md),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Order Summary',
            style: AppTypography.labelMedium.copyWith(
              color: AppColors.secondaryForeground,
            ),
          ),
          ...items.map(
            (item) => Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                children: [
                  const Text('•'),
                  const SizedBox(width: 8),
                  Text(item, style: AppTypography.bodyMedium),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _IconCircle extends StatelessWidget {
  const _IconCircle({required this.icon, required this.color});

  final String icon;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: color.withValues(alpha: .12),
      ),
      child: Center(child: Text(icon)),
    );
  }
}

class _SmallAction extends StatelessWidget {
  const _SmallAction({required this.text, required this.color});

  final String text;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right: 6),
      padding: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
        color: AppColors.muted,
        borderRadius: BorderRadius.circular(AppRadius.sm),
      ),
      child: Text(
        text,
        textAlign: TextAlign.center,
        style: AppTypography.labelSmall.copyWith(color: color),
      ),
    );
  }
}
