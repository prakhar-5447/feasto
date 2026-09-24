import 'package:flutter/material.dart';

class Incentive {
  const Incentive({
    required this.id,
    required this.name,
    required this.description,
    required this.bonus,
    required this.deadline,
    required this.color,
    required this.backgroundColor,
    this.progress,
    this.total,
  });

  final int id;
  final String name;
  final String description;
  final String bonus;
  final String deadline;

  final Color color;
  final Color backgroundColor;

  final int? progress;
  final int? total;

  bool get hasProgress => progress != null && total != null;

  double get progressPercentage {
    if (!hasProgress || total == 0) {
      return 0;
    }

    return progress! / total!;
  }
}
