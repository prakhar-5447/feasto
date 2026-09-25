import 'package:delivery_partner_app/features/active_delivery/widgets/arrived_customer_content.dart';
import 'package:delivery_partner_app/features/active_delivery/widgets/going_to_customer_content.dart';
import 'package:delivery_partner_app/features/active_delivery/widgets/picked_up_content.dart';
import 'package:delivery_partner_app/features/active_delivery/widgets/pickup_content.dart';
import 'package:delivery_partner_app/features/active_delivery/widgets/pin_verification_content.dart';
import 'package:delivery_partner_app/features/active_delivery/widgets/restaurant_waiting_content.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

import 'package:delivery_partner_app/features/active_delivery/controllers/active_delivery_controller.dart';
import 'package:delivery_partner_app/features/active_delivery/models/delivery_phase.dart';

class DeliveryBottomSheet extends GetView<ActiveDeliveryController> {
  const DeliveryBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.xl,
        AppSpacing.lg,
        AppSpacing.xl,
        AppSpacing.lg,
      ),
      decoration: const BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.vertical(top: Radius.circular(AppRadius.xl)),
      ),
      child: SingleChildScrollView(
        child: Obx(
          () => Column(
            children: [
              _buildPhaseContent(controller.phase.value),

              const SizedBox(height: AppSpacing.sm),

              _CancelOrderButton(onTap: controller.openCancel),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPhaseContent(DeliveryPhase phase) {
    switch (phase) {
      case DeliveryPhase.goingToRestaurant:
        return const GoingToRestaurant();

      case DeliveryPhase.arrivedAtRestaurant:
        return const ArrivedAtRestaurant();

      case DeliveryPhase.orderPickedUp:
        return const OrderPickedUp();

      case DeliveryPhase.goingToCustomer:
        return const GoingToCustomer();

      case DeliveryPhase.arrivedAtCustomer:
        return const ArrivedAtCustomer();

      case DeliveryPhase.pinVerification:
        return const PinVerification();

      case DeliveryPhase.delivered:
        return const SizedBox.shrink();
    }
  }
}

class _CancelOrderButton extends StatelessWidget {
  const _CancelOrderButton({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onTap,
      child: Text(
        'Cancel Order',
        style: AppTypography.bodySmall.copyWith(
          color: AppColors.mutedForeground,
        ),
      ),
    );
  }
}
