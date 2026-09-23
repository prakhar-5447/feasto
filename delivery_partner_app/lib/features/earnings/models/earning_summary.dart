enum EarningsFilter { today, thisWeek, thisMonth }

class EarningSummary {
  const EarningSummary({
    required this.total,
    required this.orders,
    required this.onlineHours,
    required this.averageOrder,
    required this.averageHour,
    required this.percentage,
    required this.percentageUp,
  });

  final double total;
  final int orders;
  final String onlineHours;
  final double averageOrder;
  final double averageHour;
  final int percentage;
  final bool percentageUp;
}
