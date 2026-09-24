import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/demand_map/models/demand_level.dart';
import 'package:delivery_partner_app/features/demand_map/models/demand_zone.dart';

class DemandMap extends StatelessWidget {
  const DemandMap({super.key, required this.zones});

  final List<DemandZone> zones;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return Stack(
          children: [
            const Positioned.fill(child: _DemandMapBackground()),

            ...zones.map(
              (zone) =>
                  _DemandZoneMarker(zone: zone, mapSize: constraints.biggest),
            ),

            Positioned(
              left: constraints.maxWidth * 0.5,
              top: constraints.maxHeight * 0.5,
              child: const _RiderLocation(),
            ),
          ],
        );
      },
    );
  }
}

class _DemandMapBackground extends StatelessWidget {
  const _DemandMapBackground();

  @override
  Widget build(BuildContext context) {
    return CustomPaint(painter: _DemandGridPainter());
  }
}

class _DemandGridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppColors.primary.withValues(alpha: 0.15)
      ..strokeWidth = 0.5;

    const gridCount = 10;

    for (var i = 1; i <= gridCount; i++) {
      final y = size.height * i / gridCount;

      canvas.drawLine(Offset(0, y), Offset(size.width, y), paint);
    }

    for (var i = 1; i <= gridCount; i++) {
      final x = size.width * i / gridCount;

      canvas.drawLine(Offset(x, 0), Offset(x, size.height), paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return false;
  }
}

class _DemandZoneMarker extends StatefulWidget {
  const _DemandZoneMarker({required this.zone, required this.mapSize});

  final DemandZone zone;
  final Size mapSize;

  @override
  State<_DemandZoneMarker> createState() => _DemandZoneMarkerState();
}

class _DemandZoneMarkerState extends State<_DemandZoneMarker>
    with SingleTickerProviderStateMixin {
  late final AnimationController _animationController;

  @override
  void initState() {
    super.initState();

    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    );

    if (widget.zone.demand == DemandLevel.high) {
      _animationController.repeat();
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  Color get _color {
    switch (widget.zone.demand) {
      case DemandLevel.high:
        return AppColors.danger;

      case DemandLevel.medium:
        return AppColors.warning;

      case DemandLevel.low:
        return const Color(0xFF60A5FA);
    }
  }

  @override
  Widget build(BuildContext context) {
    final left = widget.mapSize.width * widget.zone.x / 100;

    final top = widget.mapSize.height * widget.zone.y / 100;

    return Positioned(
      left: left,
      top: top,
      child: Transform.translate(
        offset: const Offset(-0.0, -0.0),
        child: SizedBox(
          width: widget.zone.radius * 2.5,
          height: widget.zone.radius * 2.5 + 36,
          child: Stack(
            alignment: Alignment.topCenter,
            children: [
              if (widget.zone.demand == DemandLevel.high)
                AnimatedBuilder(
                  animation: _animationController,
                  builder: (context, child) {
                    final scale = 0.9 + (_animationController.value * 0.15);

                    return Transform.scale(
                      scale: scale,
                      child: _DemandCircle(
                        radius: widget.zone.radius,
                        color: _color,
                      ),
                    );
                  },
                )
              else
                _DemandCircle(radius: widget.zone.radius, color: _color),

              Positioned(
                top: widget.zone.radius * 1.25 - 8,
                child: Column(
                  children: [
                    Container(
                      width: 16,
                      height: 16,
                      decoration: BoxDecoration(
                        color: _color,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 6,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.card,
                        borderRadius: BorderRadius.circular(AppRadius.pill),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Text(
                        widget.zone.label,
                        style: AppTypography.labelSmall.copyWith(
                          fontSize: 9,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _DemandCircle extends StatelessWidget {
  const _DemandCircle({required this.radius, required this.color});

  final double radius;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: radius * 2.5,
      height: radius * 2.5,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: color.withValues(alpha: 0.15),
        border: Border.all(color: color.withValues(alpha: 0.5), width: 2),
      ),
    );
  }
}

class _RiderLocation extends StatelessWidget {
  const _RiderLocation();

  @override
  Widget build(BuildContext context) {
    return Transform.translate(
      offset: const Offset(-12, -12),
      child: Column(
        children: [
          Stack(
            alignment: Alignment.center,
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.primary.withValues(alpha: 0.3),
                ),
              ),
              Container(
                width: 24,
                height: 24,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.primary,
                  border: Border.all(color: Colors.white, width: 2),
                  boxShadow: const [
                    BoxShadow(blurRadius: 8, offset: Offset(0, 2)),
                  ],
                ),
                child: const Center(
                  child: Text('🛵', style: TextStyle(fontSize: 13)),
                ),
              ),
            ],
          ),
          const SizedBox(height: 2),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(
              color: AppColors.primary,
              borderRadius: BorderRadius.circular(AppRadius.pill),
            ),
            child: Text(
              'You',
              style: AppTypography.labelSmall.copyWith(
                color: Colors.white,
                fontSize: 9,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
