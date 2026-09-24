import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/help/controllers/help_controller.dart';

class NewSupportRequestSheet extends StatefulWidget {
  const NewSupportRequestSheet({super.key});

  @override
  State<NewSupportRequestSheet> createState() => _NewSupportRequestSheetState();
}

class _NewSupportRequestSheetState extends State<NewSupportRequestSheet> {
  final _descriptionController = TextEditingController();

  String selectedCategory = '';

  final categories = const [
    'Payment Issue',
    'Order Issue',
    'Earnings Problem',
    'Account Issue',
    'Technical Problem',
    'Other',
  ];

  @override
  void dispose() {
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (selectedCategory.isEmpty ||
        _descriptionController.text.trim().isEmpty) {
      return;
    }

    final controller = Get.find<HelpController>();

    final success = await controller.submitTicket(
      category: selectedCategory,
      description: _descriptionController.text.trim(),
    );

    if (!mounted) return;

    if (success) {
      Get.back();

      Get.snackbar(
        'Request Submitted',
        "We'll respond within 24 hours.",
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: AppColors.card,
        colorText: AppColors.foreground,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<HelpController>();

    return Container(
      padding: EdgeInsets.only(
        left: AppSpacing.lg,
        right: AppSpacing.lg,
        top: AppSpacing.xl,
        bottom: MediaQuery.of(context).viewInsets.bottom + AppSpacing.xl,
      ),
      decoration: const BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        border: Border(top: BorderSide(color: AppColors.border)),
      ),
      child: SingleChildScrollView(
        child: Obx(
          () => Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: AppColors.border,
                    borderRadius: BorderRadius.circular(AppRadius.pill),
                  ),
                ),
              ),

              const SizedBox(height: AppSpacing.xl),

              Text(
                'New Support Request',
                style: AppTypography.headingSmall.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),

              const SizedBox(height: AppSpacing.xl),

              Text(
                'CATEGORY',
                style: AppTypography.labelMedium.copyWith(
                  color: AppColors.mutedForeground,
                  letterSpacing: 1,
                  fontWeight: FontWeight.w600,
                ),
              ),

              const SizedBox(height: AppSpacing.sm),

              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: categories.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: AppSpacing.sm,
                  mainAxisSpacing: AppSpacing.sm,
                  childAspectRatio: 2.8,
                ),
                itemBuilder: (_, index) {
                  final category = categories[index];

                  final selected = selectedCategory == category;

                  return InkWell(
                    onTap: () {
                      setState(() {
                        selectedCategory = category;
                      });
                    },
                    borderRadius: BorderRadius.circular(AppRadius.md),
                    child: Container(
                      alignment: Alignment.centerLeft,
                      padding: const EdgeInsets.symmetric(
                        horizontal: AppSpacing.md,
                      ),
                      decoration: BoxDecoration(
                        color: selected
                            ? AppColors.primary.withValues(alpha: 0.10)
                            : AppColors.secondary,
                        borderRadius: BorderRadius.circular(AppRadius.md),
                        border: Border.all(
                          color: selected
                              ? AppColors.primary.withValues(alpha: 0.35)
                              : AppColors.border,
                        ),
                      ),
                      child: Text(
                        category,
                        style: AppTypography.labelMedium.copyWith(
                          color: selected
                              ? AppColors.primary
                              : AppColors.foreground,
                        ),
                      ),
                    ),
                  );
                },
              ),

              const SizedBox(height: AppSpacing.xl),

              Text(
                'DESCRIPTION',
                style: AppTypography.labelMedium.copyWith(
                  color: AppColors.mutedForeground,
                  letterSpacing: 1,
                  fontWeight: FontWeight.w600,
                ),
              ),

              const SizedBox(height: AppSpacing.sm),

              TextField(
                controller: _descriptionController,
                maxLines: 4,
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.foreground,
                ),
                decoration: InputDecoration(
                  hintText: 'Describe your issue...',
                  hintStyle: AppTypography.bodyMedium.copyWith(
                    color: AppColors.mutedForeground,
                  ),
                  filled: true,
                  fillColor: AppColors.secondary,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(AppRadius.lg),
                    borderSide: const BorderSide(color: AppColors.border),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(AppRadius.lg),
                    borderSide: const BorderSide(color: AppColors.border),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(AppRadius.lg),
                    borderSide: const BorderSide(color: AppColors.primary),
                  ),
                ),
              ),

              const SizedBox(height: AppSpacing.xl),

              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: controller.isSubmitting.value
                          ? null
                          : () => Get.back(),
                      style: OutlinedButton.styleFrom(
                        minimumSize: const Size.fromHeight(52),
                        foregroundColor: AppColors.mutedForeground,
                        side: const BorderSide(color: AppColors.border),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(AppRadius.lg),
                        ),
                      ),
                      child: const Text('Cancel'),
                    ),
                  ),

                  const SizedBox(width: AppSpacing.md),

                  Expanded(
                    flex: 2,
                    child: ElevatedButton(
                      onPressed:
                          controller.isSubmitting.value ||
                              selectedCategory.isEmpty ||
                              _descriptionController.text.trim().isEmpty
                          ? null
                          : _submit,
                      style: ElevatedButton.styleFrom(
                        minimumSize: const Size.fromHeight(52),
                        backgroundColor: AppColors.primary,
                        foregroundColor: AppColors.primaryForeground,
                        disabledBackgroundColor: AppColors.primary.withValues(
                          alpha: 0.35,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(AppRadius.lg),
                        ),
                      ),
                      child: controller.isSubmitting.value
                          ? const SizedBox(
                              width: 20,
                              height: 20,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                color: AppColors.primaryForeground,
                              ),
                            )
                          : const Text('Submit Request'),
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
