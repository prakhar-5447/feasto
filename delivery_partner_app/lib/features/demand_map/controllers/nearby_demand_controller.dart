import 'package:get/get.dart';

import 'package:delivery_partner_app/features/demand_map/models/demand_zone.dart';
import 'package:delivery_partner_app/features/demand_map/services/nearby_demand_service.dart';

class NearbyDemandController extends GetxController {
  NearbyDemandController({required this.nearbyDemandService});

  final NearbyDemandService nearbyDemandService;

  final zones = <DemandZone>[].obs;
  final isLoading = false.obs;
  final errorMessage = RxnString();

  @override
  void onInit() {
    super.onInit();
    loadDemandZones();
  }

  Future<void> loadDemandZones() async {
    try {
      isLoading.value = true;
      errorMessage.value = null;

      final result = await nearbyDemandService.getDemandZones();

      zones.assignAll(result);
    } catch (e) {
      errorMessage.value = 'Unable to load nearby demand.';
    } finally {
      isLoading.value = false;
    }
  }

  List<DemandZone> get sortedZones {
    final result = [...zones];

    result.sort((a, b) => b.orders.compareTo(a.orders));

    return result;
  }
}
