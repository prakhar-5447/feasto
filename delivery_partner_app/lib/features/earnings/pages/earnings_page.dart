import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/features/earnings/controllers/earnings_controller.dart';
import 'package:delivery_partner_app/features/earnings/widgets/earnings_header.dart';
import 'package:delivery_partner_app/features/earnings/widgets/earnings_page_content.dart';

class EarningsPage extends StatelessWidget {
  const EarningsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<EarningsController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            Obx(
              () => EarningsHeader(
                selectedFilter: controller.selectedFilter.value,
                onFilterChanged: controller.changeFilter,
              ),
            ),

            Expanded(
              child: Obx(() {
                if (controller.isLoading.value) {
                  return const Center(child: CircularProgressIndicator());
                }

                final summary = controller.summary.value;

                if (summary == null) {
                  return Center(
                    child: Text(
                      controller.errorMessage.value.isEmpty
                          ? 'Unable to load earnings'
                          : controller.errorMessage.value,
                    ),
                  );
                }

                return EarningsPageContent(
                  controller: controller,
                  summary: summary,
                  filter: controller.selectedFilter.value,
                );
              }),
            ),
          ],
        ),
      ),
    );
  }
}
