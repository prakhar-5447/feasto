import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/features/home/models/rider_status.dart';

class RiderStatusCard extends StatelessWidget {
  const RiderStatusCard({
    super.key,
    required this.status,
    required this.onStatusChanged,
  });

  final RiderStatus status;
  final ValueChanged<RiderStatus> onStatusChanged;

  @override
  Widget build(BuildContext context) {
    final config = _StatusConfig.from(status);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: config.borderColor),
      ),
      child: Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: _buildStatusInfo(config)),

              const SizedBox(width: 12),

              _buildChangeButton(context, config),
            ],
          ),

          if (status == RiderStatus.online) ...[
            const SizedBox(height: 12),

            const Divider(height: 1, color: AppColors.border),

            const SizedBox(height: 12),

            _buildOnlineStats(),
          ],
        ],
      ),
    );
  }

  Widget _buildStatusInfo(_StatusConfig config) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(config.icon, style: const TextStyle(fontSize: 16)),

            const SizedBox(width: 8),

            Flexible(
              child: Text(
                "You're ${config.label}",
                style: const TextStyle(
                  color: AppColors.foreground,
                  fontSize: 16,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
          ],
        ),

        const SizedBox(height: 3),

        Text(
          config.description,
          style: TextStyle(color: config.textColor, fontSize: 12),
        ),
      ],
    );
  }

  Widget _buildChangeButton(BuildContext context, _StatusConfig config) {
    return PopupMenuButton<RiderStatus>(
      onSelected: onStatusChanged,

      color: AppColors.card,

      elevation: 8,

      offset: const Offset(0, 8),

      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: const BorderSide(color: AppColors.border),
      ),

      itemBuilder: (context) {
        return RiderStatus.values.map((status) {
          final itemConfig = _StatusConfig.from(status);
          final selected = status == this.status;

          return PopupMenuItem<RiderStatus>(
            value: status,

            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                children: [
                  Text(itemConfig.icon, style: const TextStyle(fontSize: 15)),

                  const SizedBox(width: 10),

                  Expanded(
                    child: Text(
                      itemConfig.label,
                      style: TextStyle(
                        color: selected
                            ? itemConfig.textColor
                            : AppColors.foreground,
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),

                  if (selected)
                    Icon(
                      Icons.check_rounded,
                      size: 17,
                      color: itemConfig.textColor,
                    ),
                ],
              ),
            ),
          );
        }).toList();
      },

      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          color: config.backgroundColor,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: config.borderColor),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Change',
              style: TextStyle(
                color: config.textColor,
                fontSize: 12,
                fontWeight: FontWeight.w700,
              ),
            ),

            const SizedBox(width: 5),

            Icon(
              Icons.keyboard_arrow_down_rounded,
              size: 16,
              color: config.textColor,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOnlineStats() {
    return const Row(
      children: [
        Expanded(
          child: _StatusStat(value: '7h 24m', label: 'Online'),
        ),

        Expanded(
          child: _StatusStat(value: '6', label: 'Deliveries'),
        ),

        Expanded(
          child: _StatusStat(value: '4.8★', label: 'Rating'),
        ),
      ],
    );
  }
}

class _StatusStat extends StatelessWidget {
  const _StatusStat({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            color: AppColors.foreground,
            fontSize: 14,
            fontWeight: FontWeight.w700,
          ),
        ),

        const SizedBox(height: 2),

        Text(
          label,
          style: const TextStyle(
            color: AppColors.mutedForeground,
            fontSize: 11,
          ),
        ),
      ],
    );
  }
}

class _StatusConfig {
  const _StatusConfig({
    required this.label,
    required this.icon,
    required this.textColor,
    required this.backgroundColor,
    required this.borderColor,
    required this.description,
  });

  final String label;
  final String icon;

  final Color textColor;
  final Color backgroundColor;
  final Color borderColor;

  final String description;

  static _StatusConfig from(RiderStatus status) {
    switch (status) {
      case RiderStatus.offline:
        return _StatusConfig(
          label: 'Offline',
          icon: '⚪',
          textColor: AppColors.mutedForeground,
          backgroundColor: AppColors.muted,
          borderColor: AppColors.border,
          description: 'Go online to receive orders',
        );

      case RiderStatus.online:
        return _StatusConfig(
          label: 'Online',
          icon: '🟢',
          textColor: AppColors.success,
          backgroundColor: AppColors.success.withValues(alpha: 0.10),
          borderColor: AppColors.success.withValues(alpha: 0.25),
          description: 'Accepting new deliveries',
        );

      case RiderStatus.onBreak:
        return _StatusConfig(
          label: 'On Break',
          icon: '🟡',
          textColor: AppColors.warning,
          backgroundColor: AppColors.warning.withValues(alpha: 0.10),
          borderColor: AppColors.warning.withValues(alpha: 0.25),
          description: 'Orders paused while on break',
        );
    }
  }
}
