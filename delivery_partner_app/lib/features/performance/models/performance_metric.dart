enum PerformanceMetricColor { accent, success, primary, foreground }

class PerformanceMetric {
  const PerformanceMetric({
    required this.label,
    required this.value,
    required this.unit,
    required this.color,
    required this.description,
  });

  final String label;
  final String value;
  final String unit;
  final PerformanceMetricColor color;
  final String description;
}
