import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/features/home/models/incoming_order.dart';

class IncomingOrderSheet extends StatelessWidget {
  const IncomingOrderSheet({
    super.key,
    required this.order,
    required this.remainingSeconds,
    required this.onAccept,
    required this.onDecline,
  });

  final IncomingOrder order;
  final int remainingSeconds;

  final VoidCallback onAccept;
  final VoidCallback onDecline;

  @override
  Widget build(BuildContext context) {
    final timerColor = _timerColor();

    return Container(
      decoration: const BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        border: Border(top: BorderSide(color: AppColors.border)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildTimerBar(timerColor),

          Padding(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
            child: Column(
              children: [
                _buildHeader(timerColor),

                const SizedBox(height: 16),

                _buildRoute(),

                const SizedBox(height: 16),

                _buildMetrics(),

                const SizedBox(height: 20),

                _buildActions(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimerBar(Color timerColor) {
    final progress = (remainingSeconds / 28).clamp(0.0, 1.0);

    return ClipRRect(
      borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
      child: SizedBox(
        height: 6,
        child: LinearProgressIndicator(
          value: progress,
          backgroundColor: AppColors.muted,
          valueColor: AlwaysStoppedAnimation<Color>(timerColor),
        ),
      ),
    );
  }

  Widget _buildHeader(Color timerColor) {
    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'NEW DELIVERY REQUEST',
                style: TextStyle(
                  color: AppColors.primary,
                  fontSize: 10,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 1.2,
                ),
              ),

              const SizedBox(height: 3),

              Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    order.earnings,
                    style: const TextStyle(
                      color: AppColors.foreground,
                      fontSize: 26,
                      fontWeight: FontWeight.w900,
                    ),
                  ),

                  const SizedBox(width: 6),

                  const Padding(
                    padding: EdgeInsets.only(bottom: 4),
                    child: Text(
                      'estimated',
                      style: TextStyle(
                        color: AppColors.mutedForeground,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),

        _buildTimerCircle(timerColor),
      ],
    );
  }

  Widget _buildTimerCircle(Color timerColor) {
    Color backgroundColor;

    if (remainingSeconds > 15) {
      backgroundColor = AppColors.success.withValues(alpha: 0.12);
    } else if (remainingSeconds > 8) {
      backgroundColor = AppColors.warning.withValues(alpha: 0.12);
    } else {
      backgroundColor = AppColors.danger.withValues(alpha: 0.12);
    }

    return Container(
      width: 56,
      height: 56,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: backgroundColor,
        border: Border.all(color: timerColor, width: 2),
      ),
      alignment: Alignment.center,
      child: Text(
        '$remainingSeconds',
        style: TextStyle(
          color: timerColor,
          fontSize: 18,
          fontWeight: FontWeight.w900,
        ),
      ),
    );
  }

  Widget _buildRoute() {
    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: AppColors.secondary,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          _RouteItem(
            icon: '🍽',
            iconBackground: AppColors.primary.withValues(alpha: 0.15),
            title: order.restaurant,
            subtitle: order.restaurantArea,
            distance: order.pickupDistance,
            distanceColor: AppColors.primary,
          ),

          const Divider(height: 1, color: AppColors.border),

          _RouteItem(
            icon: '📍',
            iconBackground: AppColors.success.withValues(alpha: 0.12),
            title: order.customerName,
            subtitle: order.deliveryArea,
            distance: order.deliveryDistance,
            distanceColor: AppColors.success,
          ),
        ],
      ),
    );
  }

  Widget _buildMetrics() {
    return Row(
      children: [
        Expanded(
          child: _OrderMetric(value: order.totalDistance, label: 'Total'),
        ),

        const SizedBox(width: 8),

        Expanded(
          child: _OrderMetric(value: order.eta, label: 'Est. Time'),
        ),

        const SizedBox(width: 8),

        Expanded(
          child: _OrderMetric(value: '${order.items}', label: 'Items'),
        ),
      ],
    );
  }

  Widget _buildActions() {
    return Row(
      children: [
        Expanded(
          child: SizedBox(
            height: 54,
            child: ElevatedButton(
              onPressed: onDecline,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.muted,
                foregroundColor: AppColors.mutedForeground,
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: const Text(
                'DECLINE',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 0.6,
                ),
              ),
            ),
          ),
        ),

        const SizedBox(width: 12),

        Expanded(
          flex: 2,
          child: SizedBox(
            height: 54,
            child: ElevatedButton(
              onPressed: onAccept,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: AppColors.primaryForeground,
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'ACCEPT',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 0.6,
                    ),
                  ),
                  SizedBox(width: 6),
                  Icon(Icons.arrow_forward_rounded, size: 18),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Color _timerColor() {
    if (remainingSeconds > 15) {
      return AppColors.success;
    }

    if (remainingSeconds > 8) {
      return AppColors.warning;
    }

    return AppColors.danger;
  }
}

class _RouteItem extends StatelessWidget {
  const _RouteItem({
    required this.icon,
    required this.iconBackground,
    required this.title,
    required this.subtitle,
    required this.distance,
    required this.distanceColor,
  });

  final String icon;
  final Color iconBackground;

  final String title;
  final String subtitle;
  final String distance;

  final Color distanceColor;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: iconBackground,
              shape: BoxShape.circle,
            ),
            alignment: Alignment.center,
            child: Text(icon, style: const TextStyle(fontSize: 14)),
          ),

          const SizedBox(width: 12),

          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: AppColors.foreground,
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                  ),
                ),

                const SizedBox(height: 2),

                Text(
                  subtitle,
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

          const SizedBox(width: 8),

          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
            decoration: BoxDecoration(
              color: distanceColor.withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              distance,
              style: TextStyle(
                color: distanceColor,
                fontSize: 10,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _OrderMetric extends StatelessWidget {
  const _OrderMetric({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 6),
      decoration: BoxDecoration(
        color: AppColors.secondary,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          Text(
            value,
            style: const TextStyle(
              color: AppColors.foreground,
              fontSize: 13,
              fontWeight: FontWeight.w700,
            ),
          ),

          const SizedBox(height: 2),

          Text(
            label,
            style: const TextStyle(
              color: AppColors.mutedForeground,
              fontSize: 10,
            ),
          ),
        ],
      ),
    );
  }
}
