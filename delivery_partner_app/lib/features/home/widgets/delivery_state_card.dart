import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/features/home/models/rider_status.dart';

class DeliveryStateCard extends StatelessWidget {
  const DeliveryStateCard({
    super.key,
    required this.status,
    required this.onGoOnline,
    required this.onResume,
  });

  final RiderStatus status;
  final VoidCallback onGoOnline;
  final VoidCallback onResume;

  @override
  Widget build(BuildContext context) {
    switch (status) {
      case RiderStatus.online:
        return _buildOnlineCard();

      case RiderStatus.offline:
        return _buildOfflineCard();

      case RiderStatus.onBreak:
        return _buildBreakCard();
    }
  }

  Widget _buildOnlineCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.border),
      ),
      child: const Column(
        children: [
          Text('🛵', style: TextStyle(fontSize: 30)),

          SizedBox(height: 8),

          Text(
            'Ready for deliveries',
            style: TextStyle(
              color: AppColors.foreground,
              fontSize: 14,
              fontWeight: FontWeight.w700,
            ),
          ),

          SizedBox(height: 4),

          Text(
            'Stay near restaurants for faster assignments. '
            'New orders appear here.',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: AppColors.mutedForeground,
              fontSize: 12,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildOfflineCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          const Text('💤', style: TextStyle(fontSize: 30)),

          const SizedBox(height: 8),

          const Text(
            "You're Offline",
            style: TextStyle(
              color: AppColors.foreground,
              fontSize: 14,
              fontWeight: FontWeight.w700,
            ),
          ),

          const SizedBox(height: 12),

          _ActionButton(label: 'Go Online', onPressed: onGoOnline),
        ],
      ),
    );
  }

  Widget _buildBreakCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.warning.withValues(alpha: 0.06),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.warning.withValues(alpha: 0.20)),
      ),
      child: Column(
        children: [
          const Text('☕', style: TextStyle(fontSize: 30)),

          const SizedBox(height: 8),

          const Text(
            'On Break',
            style: TextStyle(
              color: AppColors.warning,
              fontSize: 14,
              fontWeight: FontWeight.w700,
            ),
          ),

          const SizedBox(height: 4),

          const Text(
            'Orders paused. Resume when ready.',
            style: TextStyle(color: AppColors.mutedForeground, fontSize: 12),
          ),

          const SizedBox(height: 12),

          _ActionButton(label: 'Resume Deliveries', onPressed: onResume),
        ],
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  const _ActionButton({required this.label, required this.onPressed});

  final String label;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary,
        foregroundColor: AppColors.primaryForeground,
        elevation: 0,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
      child: Text(
        label,
        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
      ),
    );
  }
}
