import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';

class IncentiveCard extends StatelessWidget {
  const IncentiveCard({
    super.key,
    this.completed = 6,
    this.target = 8,
    this.bonus = '₹150',
  });

  final int completed;
  final int target;
  final String bonus;

  @override
  Widget build(BuildContext context) {
    final progress = target == 0 ? 0.0 : (completed / target).clamp(0.0, 1.0);

    final remaining = target - completed;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      '🎯 Almost there!',
                      style: TextStyle(
                        color: AppColors.accent,
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 1.0,
                      ),
                    ),

                    const SizedBox(height: 4),

                    Text(
                      '$completed / $target deliveries',
                      style: const TextStyle(
                        color: AppColors.foreground,
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                      ),
                    ),

                    const SizedBox(height: 2),

                    Text(
                      remaining > 0
                          ? 'Complete $remaining more to unlock $bonus bonus'
                          : 'Bonus unlocked!',
                      style: const TextStyle(
                        color: AppColors.mutedForeground,
                        fontSize: 11,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(width: 12),

              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 5,
                ),
                decoration: BoxDecoration(
                  color: AppColors.accent.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: AppColors.accent.withValues(alpha: 0.20),
                  ),
                ),
                child: Text(
                  bonus,
                  style: const TextStyle(
                    color: AppColors.accent,
                    fontSize: 12,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 12),

          Row(
            children: [
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(999),
                  child: SizedBox(
                    height: 8,
                    child: LinearProgressIndicator(
                      value: progress,
                      backgroundColor: AppColors.muted,
                      valueColor: const AlwaysStoppedAnimation<Color>(
                        AppColors.accent,
                      ),
                    ),
                  ),
                ),
              ),

              const SizedBox(width: 8),

              Text(
                '${(progress * 100).round()}%',
                style: const TextStyle(
                  color: AppColors.mutedForeground,
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
