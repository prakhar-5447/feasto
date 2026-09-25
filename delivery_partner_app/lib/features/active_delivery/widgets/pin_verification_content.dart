import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

import 'package:delivery_partner_app/features/active_delivery/controllers/active_delivery_controller.dart';

class PinVerification extends StatefulWidget {
  const PinVerification({super.key});

  @override
  State<PinVerification> createState() => _PinVerificationState();
}

class _PinVerificationState extends State<PinVerification> {
  final controller = Get.find<ActiveDeliveryController>();

  late final List<TextEditingController> _controllers;

  late final List<FocusNode> _focusNodes;

  @override
  void initState() {
    super.initState();

    _controllers = List.generate(4, (_) => TextEditingController());

    _focusNodes = List.generate(4, (_) => FocusNode());
  }

  @override
  void dispose() {
    for (final item in _controllers) {
      item.dispose();
    }

    for (final item in _focusNodes) {
      item.dispose();
    }

    super.dispose();
  }

  void _onChanged(int index, String value) {
    controller.updatePin(index, value);

    if (value.isNotEmpty && index < 3) {
      _focusNodes[index + 1].requestFocus();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      final complete = controller.pinComplete;

      return Column(
        children: [
          Text('Enter Customer PIN', style: AppTypography.titleLarge),

          const SizedBox(height: 2),

          Text(
            'Ask the customer for their 4-digit delivery PIN',
            textAlign: TextAlign.center,
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.secondaryForeground,
            ),
          ),

          const SizedBox(height: AppSpacing.lg),

          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(4, (index) {
              final filled = controller.pin[index].isNotEmpty;

              return Container(
                width: 56,
                height: 56,
                margin: const EdgeInsets.symmetric(horizontal: 6),
                child: TextField(
                  controller: _controllers[index],
                  focusNode: _focusNodes[index],
                  keyboardType: TextInputType.number,
                  textAlign: TextAlign.center,
                  maxLength: 1,
                  style: AppTypography.headingMedium,
                  decoration: InputDecoration(
                    counterText: '',
                    filled: true,
                    fillColor: AppColors.secondary,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(AppRadius.md),
                      borderSide: BorderSide(
                        color: filled ? AppColors.success : AppColors.border,
                        width: 2,
                      ),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(AppRadius.md),
                      borderSide: BorderSide(
                        color: filled ? AppColors.success : AppColors.border,
                        width: 2,
                      ),
                    ),
                  ),
                  onChanged: (value) => _onChanged(index, value),
                ),
              );
            }),
          ),

          const SizedBox(height: AppSpacing.md),

          TextButton(
            onPressed: () {
              // Camera verification can be
              // integrated later.
            },
            child: const Text('📷 Take photo instead'),
          ),

          const SizedBox(height: AppSpacing.sm),

          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: complete ? controller.advance : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.success,
              ),
              child: const Text('✓ Confirm Delivery'),
            ),
          ),
        ],
      );
    });
  }
}
