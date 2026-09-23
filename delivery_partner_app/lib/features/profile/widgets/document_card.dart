import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/profile/models/profile_document.dart';

class DocumentCard extends StatelessWidget {
  const DocumentCard({super.key, required this.document, this.onUpdate});

  final ProfileDocument document;
  final VoidCallback? onUpdate;

  @override
  Widget build(BuildContext context) {
    final isVerified = document.status == DocumentStatus.verified;

    final statusColor = isVerified ? AppColors.success : AppColors.warning;

    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: document.expiresSoon
            ? AppColors.warning.withValues(alpha: 0.06)
            : AppColors.secondary,
        borderRadius: BorderRadius.circular(AppRadius.lg),
        border: Border.all(
          color: document.expiresSoon
              ? AppColors.warning.withValues(alpha: 0.25)
              : AppColors.border,
        ),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  document.name,
                  style: AppTypography.bodyMedium.copyWith(
                    color: AppColors.foreground,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),

              _StatusBadge(
                text: isVerified ? '✓ Verified' : '⏳ Pending',
                color: statusColor,
              ),
            ],
          ),

          if (document.expiryDate != null) ...[
            const SizedBox(height: AppSpacing.sm),

            Row(
              children: [
                Expanded(
                  child: RichText(
                    text: TextSpan(
                      text: 'Expires: ',
                      style: AppTypography.bodySmall.copyWith(
                        color: AppColors.mutedForeground,
                      ),
                      children: [
                        TextSpan(
                          text: document.expiryDate,
                          style: AppTypography.bodySmall.copyWith(
                            color: document.expiresSoon
                                ? AppColors.warning
                                : AppColors.foreground,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                if (document.expiresSoon)
                  GestureDetector(
                    onTap: onUpdate,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: AppSpacing.sm,
                        vertical: AppSpacing.xs,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.warning.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(AppRadius.md),
                      ),
                      child: Text(
                        'Update →',
                        style: AppTypography.labelSmall.copyWith(
                          color: AppColors.warning,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}

class _StatusBadge extends StatelessWidget {
  const _StatusBadge({required this.text, required this.color});

  final String text;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(AppRadius.pill),
        border: Border.all(color: color.withValues(alpha: 0.2)),
      ),
      child: Text(
        text,
        style: AppTypography.labelSmall.copyWith(
          color: color,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
