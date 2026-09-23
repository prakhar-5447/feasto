import 'package:delivery_partner_app/core/network/api_client.dart';
import 'package:delivery_partner_app/features/earnings/models/daily_earning.dart';
import 'package:delivery_partner_app/features/earnings/models/earning_summary.dart';
import 'package:delivery_partner_app/features/earnings/models/payment_history.dart';

class EarningsService {
  EarningsService({required this._apiClient});

  final ApiClient _apiClient;

  Future<EarningSummary> getSummary(EarningsFilter filter) async {
    // TODO: Replace with real API.
    await Future.delayed(const Duration(milliseconds: 400));

    switch (filter) {
      case EarningsFilter.today:
        return const EarningSummary(
          total: 842,
          orders: 12,
          onlineHours: '7h 24m',
          averageOrder: 70,
          averageHour: 113,
          percentage: 12,
          percentageUp: true,
        );

      case EarningsFilter.thisWeek:
        return const EarningSummary(
          total: 6085,
          orders: 93,
          onlineHours: '48h 12m',
          averageOrder: 65,
          averageHour: 126,
          percentage: 8,
          percentageUp: true,
        );

      case EarningsFilter.thisMonth:
        return const EarningSummary(
          total: 24340,
          orders: 372,
          onlineHours: '192h',
          averageOrder: 65,
          averageHour: 127,
          percentage: 3,
          percentageUp: false,
        );
    }
  }

  Future<List<DailyEarning>> getDailyBreakdown() async {
    // TODO: Replace with real API.

    await Future.delayed(const Duration(milliseconds: 300));

    return const [
      DailyEarning(day: 'Mon', shortDay: 'M', earned: 742, orders: 11),
      DailyEarning(day: 'Tue', shortDay: 'T', earned: 831, orders: 13),
      DailyEarning(day: 'Wed', shortDay: 'W', earned: 912, orders: 14),
      DailyEarning(day: 'Thu', shortDay: 'T', earned: 780, orders: 12),
      DailyEarning(day: 'Fri', shortDay: 'F', earned: 1020, orders: 16),
      DailyEarning(day: 'Sat', shortDay: 'S', earned: 958, orders: 15),
      DailyEarning(day: 'Sun', shortDay: 'S', earned: 842, orders: 12),
    ];
  }

  Future<List<PaymentHistory>> getPaymentHistory() async {
    // TODO: Replace with real API.

    await Future.delayed(const Duration(milliseconds: 300));

    return const [
      PaymentHistory(date: '28 Aug', amount: 2420, status: PaymentStatus.paid),
      PaymentHistory(date: '21 Aug', amount: 3120, status: PaymentStatus.paid),
      PaymentHistory(date: '14 Aug', amount: 2860, status: PaymentStatus.paid),
      PaymentHistory(
        date: '7 Aug',
        amount: 1680,
        status: PaymentStatus.processing,
      ),
      PaymentHistory(date: '31 Jul', amount: 3940, status: PaymentStatus.paid),
    ];
  }
}
