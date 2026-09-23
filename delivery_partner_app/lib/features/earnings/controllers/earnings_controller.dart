import 'package:get/get.dart';

import 'package:delivery_partner_app/features/earnings/models/daily_earning.dart';
import 'package:delivery_partner_app/features/earnings/models/earning_summary.dart';
import 'package:delivery_partner_app/features/earnings/models/payment_history.dart';
import 'package:delivery_partner_app/features/earnings/services/earnings_service.dart';

class EarningsController extends GetxController {
  EarningsController({required this._earningsService});

  final EarningsService _earningsService;

  final Rx<EarningsFilter> selectedFilter = EarningsFilter.today.obs;

  final Rxn<EarningSummary> summary = Rxn<EarningSummary>();

  final RxList<DailyEarning> dailyEarnings = <DailyEarning>[].obs;

  final RxList<PaymentHistory> paymentHistory = <PaymentHistory>[].obs;

  final RxBool isLoading = false.obs;
  final RxString errorMessage = ''.obs;

  @override
  void onInit() {
    super.onInit();
    loadEarnings();
  }

  Future<void> loadEarnings() async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final results = await Future.wait([
        _earningsService.getSummary(selectedFilter.value),
        _earningsService.getDailyBreakdown(),
        _earningsService.getPaymentHistory(),
      ]);

      summary.value = results[0] as EarningSummary;

      dailyEarnings.assignAll(results[1] as List<DailyEarning>);

      paymentHistory.assignAll(results[2] as List<PaymentHistory>);
    } catch (error) {
      errorMessage.value = error.toString();
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> changeFilter(EarningsFilter filter) async {
    if (selectedFilter.value == filter) {
      return;
    }

    selectedFilter.value = filter;

    await loadEarnings();
  }
}
