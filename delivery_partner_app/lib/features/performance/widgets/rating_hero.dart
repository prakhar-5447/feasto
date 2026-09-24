import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

class RatingHero extends StatelessWidget {
  const RatingHero({
    super.key,
    required this.rating,
    required this.ratingCount,
    required this.acceptanceRate,
  });

  final double rating;
  final int ratingCount;
  final int acceptanceRate;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.xl),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF1A1200), Color(0xFF1E1800)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(AppRadius.xl),
        border: Border.all(color: AppColors.accent.withValues(alpha: 0.2)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Overall Rating',
                style: AppTypography.bodySmall.copyWith(
                  color: AppColors.mutedForeground,
                ),
              ),

              const SizedBox(height: 2),

              Text(
                rating.toStringAsFixed(1),
                style: AppTypography.headingLarge.copyWith(
                  fontSize: 48,
                  fontWeight: FontWeight.w700,
                  color: AppColors.accent,
                  height: 1.1,
                ),
              ),

              const SizedBox(height: 4),

              _RatingStars(rating: rating),

              const SizedBox(height: 2),

              Text(
                '$ratingCount ratings',
                style: AppTypography.bodySmall.copyWith(
                  color: AppColors.mutedForeground,
                ),
              ),
            ],
          ),

          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                'Acceptance',
                style: AppTypography.bodySmall.copyWith(
                  color: AppColors.mutedForeground,
                ),
              ),

              const SizedBox(height: 2),

              Text(
                '$acceptanceRate%',
                style: AppTypography.headingMedium.copyWith(
                  fontSize: 30,
                  color: AppColors.success,
                ),
              ),

              Text(
                'Excellent',
                style: AppTypography.bodySmall.copyWith(
                  color: AppColors.success,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _RatingStars extends StatelessWidget {
  const _RatingStars({required this.rating});

  final double rating;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: List.generate(5, (index) {
        final filled = index < rating.floor();

        return Padding(
          padding: const EdgeInsets.only(right: 2),
          child: Icon(
            Icons.star_rounded,
            size: 16,
            color: filled
                ? AppColors.accent
                : AppColors.accent.withValues(alpha: 0.25),
          ),
        );
      }),
    );
  }
}
