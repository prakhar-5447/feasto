import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';

enum DemandLevel { high, medium, low }

class DemandArea {
  const DemandArea({
    required this.name,
    required this.demand,
    required this.orders,
    required this.distance,
  });

  final String name;
  final DemandLevel demand;
  final int orders;
  final String distance;
}

class NearbyDemand extends StatelessWidget {
  const NearbyDemand({super.key, required this.onViewMap});

  final VoidCallback onViewMap;

  final List<DemandArea> areas = const [
    DemandArea(
      name: 'Koramangala',
      demand: DemandLevel.high,
      orders: 14,
      distance: '0.8 km',
    ),
    DemandArea(
      name: 'HSR Layout',
      demand: DemandLevel.high,
      orders: 11,
      distance: '1.2 km',
    ),
    DemandArea(
      name: 'Indiranagar',
      demand: DemandLevel.medium,
      orders: 7,
      distance: '2.4 km',
    ),
    DemandArea(
      name: 'BTM Layout',
      demand: DemandLevel.low,
      orders: 3,
      distance: '3.1 km',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildHeader(),

        const SizedBox(height: 10),

        Container(
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            color: AppColors.card,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: AppColors.border),
          ),
          child: Column(
            children: List.generate(areas.length, (index) {
              return _DemandRow(area: areas[index], showTopBorder: index > 0);
            }),
          ),
        ),
      ],
    );
  }

  Widget _buildHeader() {
    return Row(
      children: [
        const Expanded(
          child: Text(
            'NEARBY DEMAND',
            style: TextStyle(
              color: AppColors.mutedForeground,
              fontSize: 11,
              fontWeight: FontWeight.w700,
              letterSpacing: 1.0,
            ),
          ),
        ),

        TextButton(
          onPressed: onViewMap,
          style: TextButton.styleFrom(
            padding: EdgeInsets.zero,
            minimumSize: Size.zero,
            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
            foregroundColor: AppColors.primary,
          ),
          child: const Text(
            'View Map →',
            style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700),
          ),
        ),
      ],
    );
  }
}

class _DemandRow extends StatelessWidget {
  const _DemandRow({required this.area, required this.showTopBorder});

  final DemandArea area;
  final bool showTopBorder;

  @override
  Widget build(BuildContext context) {
    final config = _DemandConfig.from(area.demand);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        border: showTopBorder
            ? const Border(top: BorderSide(color: AppColors.border))
            : null,
      ),
      child: Row(
        children: [
          Text(config.icon, style: const TextStyle(fontSize: 16)),

          const SizedBox(width: 12),

          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  area.name,
                  style: const TextStyle(
                    color: AppColors.foreground,
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                  ),
                ),

                const SizedBox(height: 2),

                Text(
                  '~${area.orders} orders/hour · ${area.distance}',
                  style: const TextStyle(
                    color: AppColors.mutedForeground,
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),

          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color: config.backgroundColor,
              borderRadius: BorderRadius.circular(999),
            ),
            child: Text(
              config.label,
              style: TextStyle(
                color: config.textColor,
                fontSize: 10,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _DemandConfig {
  const _DemandConfig({
    required this.icon,
    required this.label,
    required this.textColor,
    required this.backgroundColor,
  });

  final String icon;
  final String label;
  final Color textColor;
  final Color backgroundColor;

  static _DemandConfig from(DemandLevel level) {
    switch (level) {
      case DemandLevel.high:
        return _DemandConfig(
          icon: '🔥',
          label: 'high',
          textColor: AppColors.danger,
          backgroundColor: AppColors.danger.withValues(alpha: 0.10),
        );

      case DemandLevel.medium:
        return _DemandConfig(
          icon: '🟡',
          label: 'medium',
          textColor: AppColors.warning,
          backgroundColor: AppColors.warning.withValues(alpha: 0.10),
        );

      case DemandLevel.low:
        return _DemandConfig(
          icon: '🔵',
          label: 'low',
          textColor: const Color(0xFF60A5FA),
          backgroundColor: const Color(0xFF3B82F6).withValues(alpha: 0.10),
        );
    }
  }
}
