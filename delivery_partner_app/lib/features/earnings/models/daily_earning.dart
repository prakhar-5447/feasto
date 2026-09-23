class DailyEarning {
  const DailyEarning({
    required this.day,
    required this.shortDay,
    required this.earned,
    required this.orders,
  });

  final String day;
  final String shortDay;
  final double earned;
  final int orders;
}
