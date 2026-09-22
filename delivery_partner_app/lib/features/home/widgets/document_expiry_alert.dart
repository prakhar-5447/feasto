import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';

class DocumentExpiryAlert extends StatelessWidget {
  const DocumentExpiryAlert({
    super.key,
    this.daysRemaining = 30,
    this.onUpdate,
  });

  final int daysRemaining;
  final VoidCallback? onUpdate;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: AppColors.warning.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.warning.withValues(alpha: 0.25)),
      ),
      child: Row(
        children: [
          const Text('⚠️', style: TextStyle(fontSize: 18)),

          const SizedBox(width: 12),

          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Action Required',
                  style: TextStyle(
                    color: AppColors.warning,
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),

                const SizedBox(height: 2),

                Text(
                  'Vehicle registration expires in '
                  '$daysRemaining days',
                  style: const TextStyle(
                    color: AppColors.mutedForeground,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),

          if (onUpdate != null)
            TextButton(
              onPressed: onUpdate,
              style: TextButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 5,
                ),
                minimumSize: Size.zero,
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                backgroundColor: AppColors.warning.withValues(alpha: 0.12),
                foregroundColor: AppColors.warning,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                  side: BorderSide(
                    color: AppColors.warning.withValues(alpha: 0.20),
                  ),
                ),
              ),
              child: const Text(
                'Update',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700),
              ),
            ),
        ],
      ),
    );
  }
}
