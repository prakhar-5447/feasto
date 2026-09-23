import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/orders/models/order.dart';
import 'package:delivery_partner_app/features/orders/models/order_status.dart';

class OrderEarningsBreakdown extends StatelessWidget {
  const OrderEarningsBreakdown({super.key, required this.order});

  final Order order;

  @override
  Widget build(BuildContext context) {
    if (order.breakdown == null) {
      return _buildNoBreakdown();
    }

    return Container(
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(AppRadius.xl),
        border: Border.all(color: AppColors.border),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        children: [
          _buildHeader(),
          ...order.breakdown!.asMap().entries.map(
            (entry) => _buildRow(entry.value, showBorder: entry.key > 0),
          ),
          _buildTotal(),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: AppColors.border)),
      ),
      child: Text(
        'Delivery Earnings',
        style: AppTypography.titleMedium.copyWith(color: AppColors.foreground),
      ),
    );
  }

  Widget _buildRow(OrderEarning earning, {required bool showBorder}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        border: showBorder
            ? const Border(top: BorderSide(color: AppColors.border))
            : null,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            earning.label,
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.mutedForeground,
            ),
          ),
          Text(
            earning.value,
            style: AppTypography.titleMedium.copyWith(
              color: AppColors.foreground,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTotal() {
    final totalColor = order.status == OrderStatus.completed
        ? AppColors.success
        : AppColors.primary;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: const BoxDecoration(
        color: AppColors.secondary,
        border: Border(top: BorderSide(color: AppColors.border, width: 2)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Total',
            style: AppTypography.titleMedium.copyWith(
              color: AppColors.foreground,
            ),
          ),
          Text(
            order.amount,
            style: AppTypography.headingSmall.copyWith(color: totalColor),
          ),
        ],
      ),
    );
  }

  Widget _buildNoBreakdown() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(AppRadius.xl),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Earnings',
            style: AppTypography.titleMedium.copyWith(
              color: AppColors.foreground,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Delivery earning',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.mutedForeground,
                ),
              ),
              Text(
                '–',
                style: AppTypography.titleLarge.copyWith(
                  color: AppColors.mutedForeground,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
