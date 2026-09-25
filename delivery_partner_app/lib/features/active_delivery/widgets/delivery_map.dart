import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/features/active_delivery/models/delivery_phase.dart';
import 'package:delivery_partner_app/features/active_delivery/models/delivery_order.dart';

class DeliveryMap extends StatelessWidget {
  const DeliveryMap({super.key, required this.order, required this.phase});

  final DeliveryOrder order;
  final DeliveryPhase phase;

  bool get isPickupPhase {
    return phase == DeliveryPhase.goingToRestaurant ||
        phase == DeliveryPhase.arrivedAtRestaurant;
  }

  Color get routeColor {
    return isPickupPhase ? AppColors.primary : AppColors.success;
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        const Positioned.fill(child: _MapBackground()),

        if (phase != DeliveryPhase.delivered)
          _RouteLine(isPickupPhase: isPickupPhase, color: routeColor),

        if (phase != DeliveryPhase.delivered)
          _RiderMarker(phase: phase, color: routeColor),

        if (phase != DeliveryPhase.delivered)
          _RestaurantMarker(phase: phase, restaurant: order.restaurant),

        if (!isPickupPhase) _CustomerMarker(phase: phase),

        if (phase == DeliveryPhase.delivered) const _DeliveredMapOverlay(),
      ],
    );
  }
}

class _MapBackground extends StatelessWidget {
  const _MapBackground();

  @override
  Widget build(BuildContext context) {
    return CustomPaint(painter: _MapGridPainter());
  }
}

class _MapGridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppColors.primary.withValues(alpha: 0.15)
      ..strokeWidth = 0.5;

    for (var i = 1; i <= 10; i++) {
      final y = size.height * i / 10;

      canvas.drawLine(Offset(0, y), Offset(size.width, y), paint);
    }

    for (var i = 1; i <= 10; i++) {
      final x = size.width * i / 10;

      canvas.drawLine(Offset(x, 0), Offset(x, size.height), paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return false;
  }
}

class _RouteLine extends StatelessWidget {
  const _RouteLine({required this.isPickupPhase, required this.color});

  final bool isPickupPhase;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: CustomPaint(
        painter: _RoutePainter(isPickupPhase: isPickupPhase, color: color),
      ),
    );
  }
}

class _RoutePainter extends CustomPainter {
  const _RoutePainter({required this.isPickupPhase, required this.color});

  final bool isPickupPhase;
  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final path = Path();

    if (isPickupPhase) {
      path.moveTo(size.width * .28, size.height * .68);

      path.cubicTo(
        size.width * .40,
        size.height * .55,
        size.width * .55,
        size.height * .45,
        size.width * .65,
        size.height * .35,
      );
    } else {
      path.moveTo(size.width * .65, size.height * .35);

      path.cubicTo(
        size.width * .52,
        size.height * .48,
        size.width * .40,
        size.height * .55,
        size.width * .26,
        size.height * .65,
      );
    }

    final paint = Paint()
      ..color = color
      ..strokeWidth = 3.5
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    _drawDashedPath(canvas, path, paint);
  }

  void _drawDashedPath(Canvas canvas, Path path, Paint paint) {
    for (final metric in path.computeMetrics()) {
      double distance = 0;

      while (distance < metric.length) {
        final end = (distance + 8).clamp(0, metric.length);

        canvas.drawPath(metric.extractPath(distance, end.toDouble()), paint);

        distance += 14;
      }
    }
  }

  @override
  bool shouldRepaint(covariant _RoutePainter oldDelegate) {
    return oldDelegate.isPickupPhase != isPickupPhase ||
        oldDelegate.color != color;
  }
}

class _RiderMarker extends StatelessWidget {
  const _RiderMarker({required this.phase, required this.color});

  final DeliveryPhase phase;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final bool arrived = phase == DeliveryPhase.arrivedAtRestaurant;

    return Positioned(
      left:
          MediaQuery.sizeOf(context).width *
          (isPickupPhase ? (arrived ? .63 : .28) : .65),
      top: MediaQuery.sizeOf(context).height * .34,
      child: Transform.translate(
        offset: const Offset(-14, -14),
        child: Stack(
          alignment: Alignment.center,
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: color.withValues(alpha: .25),
              ),
            ),
            Container(
              width: 28,
              height: 28,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: color,
                border: Border.all(color: Colors.white, width: 2),
                boxShadow: const [
                  BoxShadow(blurRadius: 8, offset: Offset(0, 2)),
                ],
              ),
              child: const Center(
                child: Text('🛵', style: TextStyle(fontSize: 14)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  bool get isPickupPhase {
    return phase == DeliveryPhase.goingToRestaurant ||
        phase == DeliveryPhase.arrivedAtRestaurant;
  }
}

class _RestaurantMarker extends StatelessWidget {
  const _RestaurantMarker({required this.phase, required this.restaurant});

  final DeliveryPhase phase;
  final String restaurant;

  @override
  Widget build(BuildContext context) {
    final active = phase == DeliveryPhase.arrivedAtRestaurant;

    return Positioned(
      left: MediaQuery.sizeOf(context).width * .65,
      top: MediaQuery.sizeOf(context).height * .35,
      child: Transform.translate(
        offset: const Offset(-22, -48),
        child: Column(
          children: [
            Container(
              width: 38,
              height: 38,
              decoration: BoxDecoration(
                color: active ? AppColors.primary : AppColors.card,
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.primary, width: 2),
              ),
              child: const Center(
                child: Text('🍽', style: TextStyle(fontSize: 16)),
              ),
            ),
            const SizedBox(height: 4),
            _MapLabel(text: restaurant.split(' ').first),
          ],
        ),
      ),
    );
  }
}

class _CustomerMarker extends StatelessWidget {
  const _CustomerMarker({required this.phase});

  final DeliveryPhase phase;

  @override
  Widget build(BuildContext context) {
    final active =
        phase == DeliveryPhase.arrivedAtCustomer ||
        phase == DeliveryPhase.pinVerification;

    return Positioned(
      left: MediaQuery.sizeOf(context).width * .26,
      top: MediaQuery.sizeOf(context).height * .65,
      child: Transform.translate(
        offset: const Offset(-22, -48),
        child: Column(
          children: [
            Container(
              width: 38,
              height: 38,
              decoration: BoxDecoration(
                color: active ? AppColors.success : AppColors.card,
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.success, width: 2),
              ),
              child: const Center(
                child: Text('📍', style: TextStyle(fontSize: 16)),
              ),
            ),
            const SizedBox(height: 4),
            const _MapLabel(text: 'Customer'),
          ],
        ),
      ),
    );
  }
}

class _MapLabel extends StatelessWidget {
  const _MapLabel({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: AppColors.border),
      ),
      child: Text(
        text,
        style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600),
      ),
    );
  }
}

class _DeliveredMapOverlay extends StatelessWidget {
  const _DeliveredMapOverlay();

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: Container(color: AppColors.background.withValues(alpha: .90)),
    );
  }
}
