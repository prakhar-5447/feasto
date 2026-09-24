import 'package:get/get.dart';

import 'package:delivery_partner_app/features/performance/models/performance_insight.dart';
import 'package:delivery_partner_app/features/performance/models/performance_metric.dart';
import 'package:delivery_partner_app/features/performance/services/performance_service.dart';

class PerformanceController extends GetxController {
  PerformanceController({required this._performanceService});

  final PerformanceService _performanceService;

  final RxDouble overallRating = 0.0.obs;
  final RxInt ratingCount = 0.obs;
  final RxInt acceptanceRate = 0.obs;

  final RxList<PerformanceMetric> metrics = <PerformanceMetric>[].obs;

  final RxList<PerformanceInsight> insights = <PerformanceInsight>[].obs;

  final RxBool isLoading = false.obs;
  final RxString errorMessage = ''.obs;

  int get completionRate {
    final metric = metrics.firstWhereOrNull(
      (metric) => metric.label == 'Completion Rate',
    );

    return int.tryParse(metric?.value ?? '0') ?? 0;
  }

  @override
  void onInit() {
    super.onInit();
    loadPerformance();
  }

  Future<void> loadPerformance() async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final results = await Future.wait([
        _performanceService.getOverallRating(),
        _performanceService.getRatingCount(),
        _performanceService.getAcceptanceRate(),
        _performanceService.getMetrics(),
        _performanceService.getInsights(),
      ]);

      overallRating.value = results[0] as double;
      ratingCount.value = results[1] as int;
      acceptanceRate.value = results[2] as int;

      metrics.assignAll(results[3] as List<PerformanceMetric>);

      insights.assignAll(results[4] as List<PerformanceInsight>);
    } catch (error) {
      errorMessage.value = error.toString();
    } finally {
      isLoading.value = false;
    }
  }
}
