import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';

class QuickActions extends StatelessWidget {
  const QuickActions({
    super.key,
    required this.onOrders,
    required this.onEarnings,
    required this.onHelp,
  });

  final VoidCallback onOrders;
  final VoidCallback onEarnings;
  final VoidCallback onHelp;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'QUICK ACTIONS',
          style: TextStyle(
            color: AppColors.mutedForeground,
            fontSize: 11,
            fontWeight: FontWeight.w700,
            letterSpacing: 1.0,
          ),
        ),
        const SizedBox(height: 10),
        Row(
          children: [
            Expanded(
              child: _ActionItem(icon: '📦', label: 'Orders', onTap: onOrders),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _ActionItem(
                icon: '💰',
                label: 'Earnings',
                onTap: onEarnings,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _ActionItem(icon: '🆘', label: 'Help', onTap: onHelp),
            ),
          ],
        ),
      ],
    );
  }
}

class _ActionItem extends StatelessWidget {
  const _ActionItem({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  final String icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Ink(
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
          decoration: BoxDecoration(
            color: AppColors.card,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: AppColors.border),
          ),
          child: Column(
            children: [
              Text(icon, style: const TextStyle(fontSize: 24)),
              const SizedBox(height: 8),
              Text(
                label,
                style: const TextStyle(
                  color: AppColors.mutedForeground,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
