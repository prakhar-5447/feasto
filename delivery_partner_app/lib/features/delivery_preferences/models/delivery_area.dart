import 'package:flutter/material.dart';

enum DemandLevel { high, medium, low }

class DeliveryArea {
  const DeliveryArea({
    required this.id,
    required this.label,
    required this.demandLevel,
    required this.icon,
    required this.iconColor,
  });

  final String id;
  final String label;
  final DemandLevel demandLevel;
  final String icon;
  final Color iconColor;

  String get demandLabel {
    switch (demandLevel) {
      case DemandLevel.high:
        return 'High demand';
      case DemandLevel.medium:
        return 'Medium demand';
      case DemandLevel.low:
        return 'Low demand';
    }
  }
}
