import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/help/models/faq.dart';

class FaqSection extends StatelessWidget {
  const FaqSection({
    super.key,
    required this.faqs,
    required this.expandedIndex,
    required this.onFaqTap,
  });

  final List<Faq> faqs;
  final int? expandedIndex;
  final ValueChanged<int> onFaqTap;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'POPULAR QUESTIONS',
          style: AppTypography.labelMedium.copyWith(
            color: AppColors.mutedForeground,
            fontWeight: FontWeight.w700,
            letterSpacing: 1.2,
          ),
        ),

        const SizedBox(height: AppSpacing.md),

        Container(
          decoration: BoxDecoration(
            color: AppColors.card,
            borderRadius: BorderRadius.circular(AppRadius.xl),
            border: Border.all(color: AppColors.border),
          ),
          child: faqs.isEmpty
              ? Padding(
                  padding: const EdgeInsets.all(AppSpacing.xl),
                  child: Center(
                    child: Text(
                      'No results found',
                      style: AppTypography.bodyMedium.copyWith(
                        color: AppColors.mutedForeground,
                      ),
                    ),
                  ),
                )
              : Column(
                  children: [
                    for (int i = 0; i < faqs.length; i++)
                      _FaqTile(
                        faq: faqs[i],
                        expanded: expandedIndex == i,
                        showTopBorder: i != 0,
                        onTap: () => onFaqTap(i),
                      ),
                  ],
                ),
        ),
      ],
    );
  }
}

class _FaqTile extends StatelessWidget {
  const _FaqTile({
    required this.faq,
    required this.expanded,
    required this.showTopBorder,
    required this.onTap,
  });

  final Faq faq;
  final bool expanded;
  final bool showTopBorder;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: showTopBorder
            ? const Border(top: BorderSide(color: AppColors.border))
            : null,
      ),
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.lg,
            vertical: AppSpacing.md,
          ),
          child: Column(
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      faq.question,
                      style: AppTypography.bodyMedium.copyWith(
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  AnimatedRotation(
                    turns: expanded ? 0.25 : 0,
                    duration: const Duration(milliseconds: 180),
                    child: const Icon(
                      Icons.chevron_right_rounded,
                      color: AppColors.mutedForeground,
                      size: 20,
                    ),
                  ),
                ],
              ),

              if (expanded) ...[
                const SizedBox(height: AppSpacing.sm),
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    faq.answer,
                    style: AppTypography.bodySmall.copyWith(
                      color: AppColors.mutedForeground,
                      height: 1.5,
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
