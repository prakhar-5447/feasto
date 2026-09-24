import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/language/models/app_language.dart';
import 'package:delivery_partner_app/features/language/controllers/language_controller.dart';
import 'package:delivery_partner_app/features/language/widgets/current_language_card.dart';
import 'package:delivery_partner_app/features/language/widgets/language_search.dart';
import 'package:delivery_partner_app/features/language/widgets/language_tile.dart';

class LanguagePage extends GetView<LanguageController> {
  const LanguagePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            LanguageSearch(
              onChanged: Get.find<LanguageController>().setSearchQuery,
            ),

            Expanded(
              child: Obx(() {
                if (controller.isLoading.value) {
                  return const Center(
                    child: CircularProgressIndicator(color: AppColors.primary),
                  );
                }

                return _LanguageContent();
              }),
            ),
          ],
        ),
      ),
    );
  }
}

class _LanguageContent extends StatelessWidget {
  const _LanguageContent();

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<LanguageController>();

    return Obx(() {
      final languages = controller.filteredLanguages;
      final isSearching = controller.isSearching;
      final selected = controller.selectedLanguage;

      return ListView(
        padding: const EdgeInsets.fromLTRB(
          AppSpacing.lg,
          AppSpacing.lg,
          AppSpacing.lg,
          AppSpacing.xxl,
        ),
        children: [
          if (!isSearching && selected != null) ...[
            _SectionLabel(label: 'Current'),

            const SizedBox(height: AppSpacing.sm),

            CurrentLanguageCard(language: selected),

            const SizedBox(height: AppSpacing.lg),

            _SectionLabel(label: 'All Languages'),

            const SizedBox(height: AppSpacing.sm),
          ],

          if (isSearching) ...[
            _SectionLabel(label: 'Results'),

            const SizedBox(height: AppSpacing.sm),
          ],

          _LanguageList(
            languages: languages,
            selectedCode: controller.selectedCode.value,
            onSelect: controller.selectLanguage,
          ),
        ],
      );
    });
  }
}

class _LanguageList extends StatelessWidget {
  const _LanguageList({
    required this.languages,
    required this.selectedCode,
    required this.onSelect,
  });

  final List<AppLanguage> languages;
  final String selectedCode;
  final Future<void> Function(AppLanguage) onSelect;

  @override
  Widget build(BuildContext context) {
    if (languages.isEmpty) {
      return Container(
        padding: const EdgeInsets.symmetric(vertical: AppSpacing.xxxl),
        child: Column(
          children: [
            const Text('🌐', style: TextStyle(fontSize: 28)),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'No language found',
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.mutedForeground,
              ),
            ),
          ],
        ),
      );
    }

    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          for (int i = 0; i < languages.length; i++)
            LanguageTile(
              language: languages[i],
              selected: languages[i].code == selectedCode,
              showDivider: i > 0,
              onTap: () => onSelect(languages[i]),
            ),
        ],
      ),
    );
  }
}

class _SectionLabel extends StatelessWidget {
  const _SectionLabel({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Text(
      label.toUpperCase(),
      style: AppTypography.labelMedium.copyWith(
        color: AppColors.mutedForeground,
        letterSpacing: 1.1,
        fontWeight: FontWeight.w600,
      ),
    );
  }
}
