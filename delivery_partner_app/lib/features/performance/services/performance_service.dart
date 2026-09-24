import 'package:delivery_partner_app/features/performance/models/performance_insight.dart';
import 'package:delivery_partner_app/features/performance/models/performance_metric.dart';

class PerformanceService {
  Future<double> getOverallRating() async {
    await Future.delayed(const Duration(milliseconds: 250));

    return 4.8;
  }

  Future<int> getRatingCount() async {
    await Future.delayed(const Duration(milliseconds: 200));

    return 248;
  }

  Future<int> getAcceptanceRate() async {
    await Future.delayed(const Duration(milliseconds: 200));

    return 94;
  }

  Future<List<PerformanceMetric>> getMetrics() async {
    await Future.delayed(const Duration(milliseconds: 300));

    return const [
      PerformanceMetric(
        label: 'Completion Rate',
        value: '98',
        unit: '%',
        color: PerformanceMetricColor.success,
        description: 'Orders completed',
      ),
      PerformanceMetric(
        label: 'Avg Delivery Time',
        value: '12',
        unit: 'min',
        color: PerformanceMetricColor.primary,
        description: 'Per order',
      ),
      PerformanceMetric(
        label: 'Total Deliveries',
        value: '248',
        unit: '',
        color: PerformanceMetricColor.foreground,
        description: 'All time',
      ),
    ];
  }

  Future<List<PerformanceInsight>> getInsights() async {
    await Future.delayed(const Duration(milliseconds: 250));

    return const [
      PerformanceInsight(
        icon: '📈',
        text: 'Your average delivery time is 8% faster than last month.',
        positive: true,
      ),
      PerformanceInsight(
        icon: '⭐',
        text: 'Your rating increased from 4.7 to 4.8 this week.',
        positive: true,
      ),
      PerformanceInsight(
        icon: '💪',
        text: "You're in the top 15% of riders in your area.",
        positive: true,
      ),
      PerformanceInsight(
        icon: '⚠️',
        text:
            'Your acceptance rate dropped 2% this week. '
            'Try to accept more orders.',
        positive: false,
      ),
    ];
  }
}
