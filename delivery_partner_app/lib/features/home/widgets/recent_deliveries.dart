import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';

class RecentDeliveries extends StatelessWidget {
  const RecentDeliveries({super.key, required this.onViewAll});

  final VoidCallback onViewAll;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Expanded(
              child: Text(
                'RECENT',
                style: TextStyle(
                  color: AppColors.mutedForeground,
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 1.0,
                ),
              ),
            ),
            TextButton(
              onPressed: onViewAll,
              style: TextButton.styleFrom(
                padding: EdgeInsets.zero,
                minimumSize: Size.zero,
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                foregroundColor: AppColors.primary,
              ),
              child: const Text(
                'View all',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700),
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        Container(
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            color: AppColors.card,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: AppColors.border),
          ),
          child: Column(
            children: const [
              _RecentDeliveryRow(
                restaurant: 'The Burger Lab',
                dropLocation: 'Indiranagar',
                amount: '₹48',
                time: '1h ago',
                successful: true,
              ),
              _RecentDeliveryRow(
                restaurant: 'Pind Balluchi',
                dropLocation: 'HSR Layout',
                amount: '₹61',
                time: '3h ago',
                successful: true,
              ),
              _RecentDeliveryRow(
                restaurant: "Domino's Pizza",
                dropLocation: 'Marathahalli',
                amount: '–',
                time: '5h ago',
                successful: false,
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _RecentDeliveryRow extends StatelessWidget {
  const _RecentDeliveryRow({
    required this.restaurant,
    required this.dropLocation,
    required this.amount,
    required this.time,
    required this.successful,
  });

  final String restaurant;
  final String dropLocation;
  final String amount;
  final String time;
  final bool successful;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        border: Border(top: BorderSide(color: AppColors.border, width: 1)),
      ),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: successful
                  ? AppColors.success.withValues(alpha: 0.12)
                  : AppColors.danger.withValues(alpha: 0.10),
            ),
            alignment: Alignment.center,
            child: Text(
              successful ? '✓' : '✕',
              style: TextStyle(
                color: successful ? AppColors.success : AppColors.danger,
                fontSize: 14,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  restaurant,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: AppColors.foreground,
                    fontSize: 13,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  '→ $dropLocation · $time',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: AppColors.mutedForeground,
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          Text(
            amount,
            style: TextStyle(
              color: successful ? AppColors.success : AppColors.mutedForeground,
              fontSize: 14,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}
