import 'demand_level.dart';

class DemandZone {
  const DemandZone({
    required this.id,
    required this.label,
    required this.demand,
    required this.orders,
    required this.x,
    required this.y,
    required this.radius,
  });

  final int id;
  final String label;
  final DemandLevel demand;
  final int orders;

  /// Position as percentage of map width.
  final double x;

  /// Position as percentage of map height.
  final double y;

  /// Base radius used to render the demand circle.
  final double radius;
}
