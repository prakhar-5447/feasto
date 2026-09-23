import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/orders/models/order_status.dart';

class OrderEmptyState extends StatelessWidget {
  const OrderEmptyState({super.key, required this.status});

  final OrderStatus status;

  @override
  Widget build(BuildContext context) {
    final title = switch (status) {
      OrderStatus.active => 'No active orders',
      OrderStatus.completed => 'No completed orders',
      OrderStatus.cancelled => 'No cancelled orders',
    };

    final description = switch (status) {
      OrderStatus.active => 'Your active deliveries will appear here.',
      OrderStatus.completed => 'Your completed deliveries will appear here.',
      OrderStatus.cancelled => 'Your cancelled deliveries will appear here.',
    };

    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.xl),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('📭', style: TextStyle(fontSize: 40)),
            const SizedBox(height: AppSpacing.md),
            Text(
              title,
              textAlign: TextAlign.center,
              style: AppTypography.titleLarge.copyWith(
                color: AppColors.foreground,
              ),
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              description,
              textAlign: TextAlign.center,
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.mutedForeground,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
