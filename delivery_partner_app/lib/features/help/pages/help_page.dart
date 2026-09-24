import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/help/controllers/help_controller.dart';
import 'package:delivery_partner_app/features/help/widgets/emergency_card.dart';
import 'package:delivery_partner_app/features/help/widgets/faq_section.dart';
import 'package:delivery_partner_app/features/help/widgets/help_search.dart';
import 'package:delivery_partner_app/features/help/widgets/support_actions.dart';
import 'package:delivery_partner_app/features/help/widgets/support_requests.dart';

class HelpPage extends StatelessWidget {
  const HelpPage({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<HelpController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            _HelpHeader(onBack: () => Get.back()),

            Expanded(
              child: Obx(() {
                if (controller.isLoading.value) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (controller.errorMessage.value.isNotEmpty &&
                    controller.faqs.isEmpty) {
                  return Center(
                    child: Text(
                      controller.errorMessage.value,
                      style: AppTypography.bodyMedium.copyWith(
                        color: AppColors.mutedForeground,
                      ),
                    ),
                  );
                }

                return RefreshIndicator(
                  onRefresh: controller.loadHelpData,
                  child: ListView(
                    padding: const EdgeInsets.all(AppSpacing.lg),
                    children: [
                      HelpSearch(
                        value: controller.searchQuery.value,
                        onChanged: controller.updateSearch,
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      const EmergencyCard(),

                      const SizedBox(height: AppSpacing.lg),

                      const SupportActions(),

                      const SizedBox(height: AppSpacing.xxl),

                      FaqSection(
                        faqs: controller.filteredFaqs,
                        expandedIndex: controller.expandedFaq.value,
                        onFaqTap: controller.toggleFaq,
                      ),

                      const SizedBox(height: AppSpacing.xxl),

                      SupportRequests(tickets: controller.tickets),

                      const SizedBox(height: AppSpacing.xxl),
                    ],
                  ),
                );
              }),
            ),
          ],
        ),
      ),
    );
  }
}

class _HelpHeader extends StatelessWidget {
  const _HelpHeader({required this.onBack});

  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.lg,
        AppSpacing.md,
        AppSpacing.lg,
        AppSpacing.lg,
      ),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: AppColors.border)),
      ),
      child: Row(
        children: [
          IconButton(
            onPressed: onBack,
            style: IconButton.styleFrom(
              backgroundColor: AppColors.secondary,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(AppSpacing.md),
                side: const BorderSide(color: AppColors.border),
              ),
            ),
            icon: const Icon(
              Icons.arrow_back_rounded,
              size: 20,
              color: AppColors.foreground,
            ),
          ),

          const SizedBox(width: AppSpacing.md),

          Text(
            'Help Center',
            style: AppTypography.headingMedium.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}
