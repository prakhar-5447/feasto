import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/active_delivery/controllers/active_delivery_controller.dart';

class GoingToCustomer extends GetView<ActiveDeliveryController> {
  const GoingToCustomer({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'EN ROUTE TO CUSTOMER',
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

        const SizedBox(height: AppSpacing.lg),

        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: controller.advance,
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.success),
            child: const Text("I've Reached Customer →"),
          ),
        ),
      ],
    );
  }
}
