import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

import 'package:delivery_partner_app/features/active_delivery/controllers/active_delivery_controller.dart';
import 'package:delivery_partner_app/features/active_delivery/models/issue_category.dart';

class ArrivedAtCustomer extends GetView<ActiveDeliveryController> {
  const ArrivedAtCustomer({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: AppColors.success.withValues(alpha: .12),
                shape: BoxShape.circle,
              ),
              child: const Text('🏠', textAlign: TextAlign.center),
            ),
            const SizedBox(width: AppSpacing.sm),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "You're at the customer",
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
          width: double.infinity,
          padding: const EdgeInsets.all(AppSpacing.md),
          decoration: BoxDecoration(
            color: AppColors.success.withValues(alpha: .08),
            borderRadius: BorderRadius.circular(AppRadius.md),
            border: Border.all(color: AppColors.success.withValues(alpha: .2)),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Payment Status', style: AppTypography.bodyMedium),
              Text(
                '✓ Paid Online',
                style: AppTypography.titleMedium.copyWith(
                  color: AppColors.success,
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: AppSpacing.md),

        Row(
          children: [
            Expanded(
              child: OutlinedButton(
                onPressed: () =>
                    controller.openIssue(category: IssueCategory.customer),
                child: const Text('Report Issue'),
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              flex: 2,
              child: ElevatedButton(
                onPressed: controller.advance,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.success,
                ),
                child: const Text('Enter Delivery PIN →'),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
