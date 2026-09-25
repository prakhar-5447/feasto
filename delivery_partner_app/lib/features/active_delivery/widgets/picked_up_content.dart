import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

import 'package:delivery_partner_app/features/active_delivery/controllers/active_delivery_controller.dart';

class OrderPickedUp extends GetView<ActiveDeliveryController> {
  const OrderPickedUp({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.success.withValues(alpha: .12),
              ),
              child: const Icon(
                Icons.check,
                color: AppColors.success,
                size: 18,
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
            Text(
              'Order Picked Up ✓',
              style: AppTypography.titleMedium.copyWith(
                color: AppColors.success,
              ),
            ),
          ],
        ),

        const SizedBox(height: AppSpacing.lg),

        Text(
          'DELIVER TO',
          style: AppTypography.labelSmall.copyWith(
            color: AppColors.success,
            letterSpacing: 1,
          ),
        ),

        Text(controller.order.customerName, style: AppTypography.headingSmall),

        Text(
          controller.order.deliveryArea,
          style: AppTypography.bodyMedium.copyWith(
            color: AppColors.secondaryForeground,
          ),
        ),

        const SizedBox(height: 2),

        Text(
          'Block B, Flat 402',
          style: AppTypography.bodySmall.copyWith(
            color: AppColors.secondaryForeground,
          ),
        ),

        const SizedBox(height: AppSpacing.lg),

        Row(
          children: [
            _Info(value: '3.4 km', label: 'Distance'),
            _Info(value: '12 min', label: 'ETA'),
          ],
        ),

        const SizedBox(height: AppSpacing.lg),

        Row(
          children: [
            Expanded(
              child: OutlinedButton(
                onPressed: controller.openNavigation,
                child: const Text('🧭 Navigate'),
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
                child: const Text('Reached Customer →'),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _Info extends StatelessWidget {
  const _Info({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        margin: const EdgeInsets.only(right: 8),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: AppColors.secondary,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: AppColors.border),
        ),
        child: Column(
          children: [
            Text(value, style: AppTypography.titleMedium),
            Text(
              label,
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.secondaryForeground,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
