import 'package:get/get.dart';

import 'package:delivery_partner_app/features/incentives/models/completed_incentive.dart';
import 'package:delivery_partner_app/features/incentives/models/incentive.dart';
import 'package:delivery_partner_app/features/incentives/services/incentives_service.dart';

class IncentivesController extends GetxController {
  IncentivesController({required this._incentivesService});

  final IncentivesService _incentivesService;

  final RxList<Incentive> activeIncentives = <Incentive>[].obs;

  final RxList<CompletedIncentive> completedIncentives =
      <CompletedIncentive>[].obs;

  final RxDouble weeklyBonus = 0.0.obs;

  final RxBool isLoading = false.obs;

  final RxString errorMessage = ''.obs;

  @override
  void onInit() {
    super.onInit();
    loadIncentives();
  }

  Future<void> loadIncentives() async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final results = await Future.wait([
        _incentivesService.getActiveIncentives(),
        _incentivesService.getCompletedIncentives(),
        _incentivesService.getWeeklyBonus(),
      ]);

      activeIncentives.assignAll(results[0] as List<Incentive>);

      completedIncentives.assignAll(results[1] as List<CompletedIncentive>);

      weeklyBonus.value = results[2] as double;
    } catch (error) {
      errorMessage.value = error.toString();
    } finally {
      isLoading.value = false;
    }
  }
}
