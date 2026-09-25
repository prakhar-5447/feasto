import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

import 'package:delivery_partner_app/features/active_delivery/controllers/active_delivery_controller.dart';

class GoingToRestaurant extends GetView<ActiveDeliveryController> {
  const GoingToRestaurant({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionLabel(text: 'Pickup from', color: AppColors.primary),

        Text(controller.order.restaurant, style: AppTypography.headingSmall),

        Text(
          controller.order.restaurantArea,
          style: AppTypography.bodyMedium.copyWith(
            color: AppColors.secondaryForeground,
          ),
        ),

        const SizedBox(height: AppSpacing.lg),

        Row(
          children: [
            _StatCard(value: '1.8 km', label: 'Distance'),
            _StatCard(value: '7 min', label: 'ETA'),
            _StatCard(
              value: controller.order.earnings,
              label: 'Earning',
              accent: true,
            ),
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
                child: const Text('Arrived at Restaurant →'),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _SectionLabel extends StatelessWidget {
  const _SectionLabel({required this.text, required this.color});

  final String text;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Text(
      text.toUpperCase(),
      style: AppTypography.labelSmall.copyWith(
        color: color,
        fontWeight: FontWeight.w700,
        letterSpacing: 1,
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({
    required this.value,
    required this.label,
    this.accent = false,
  });

  final String value;
  final String label;
  final bool accent;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        margin: const EdgeInsets.only(right: AppSpacing.sm),
        padding: const EdgeInsets.all(AppSpacing.md),
        decoration: BoxDecoration(
          color: AppColors.secondary,
          borderRadius: BorderRadius.circular(AppRadius.md),
          border: Border.all(color: AppColors.border),
        ),
        child: Column(
          children: [
            Text(
              value,
              style: AppTypography.titleMedium.copyWith(
                color: accent ? AppColors.primary : AppColors.foreground,
              ),
            ),
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
