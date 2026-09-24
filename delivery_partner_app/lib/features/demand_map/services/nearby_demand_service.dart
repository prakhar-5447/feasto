import 'package:delivery_partner_app/features/demand_map/models/demand_level.dart';
import 'package:delivery_partner_app/features/demand_map/models/demand_zone.dart';

class NearbyDemandService {
  Future<List<DemandZone>> getDemandZones() async {
    await Future.delayed(const Duration(milliseconds: 300));

    return const [
      DemandZone(
        id: 1,
        label: 'Koramangala',
        demand: DemandLevel.high,
        orders: 14,
        x: 58,
        y: 40,
        radius: 52,
      ),
      DemandZone(
        id: 2,
        label: 'HSR Layout',
        demand: DemandLevel.high,
        orders: 11,
        x: 65,
        y: 60,
        radius: 44,
      ),
      DemandZone(
        id: 3,
        label: 'Indiranagar',
        demand: DemandLevel.medium,
        orders: 7,
        x: 72,
        y: 28,
        radius: 36,
      ),
      DemandZone(
        id: 4,
        label: 'BTM Layout',
        demand: DemandLevel.low,
        orders: 3,
        x: 45,
        y: 68,
        radius: 28,
      ),
      DemandZone(
        id: 5,
        label: 'JP Nagar',
        demand: DemandLevel.medium,
        orders: 6,
        x: 32,
        y: 75,
        radius: 32,
      ),
      DemandZone(
        id: 6,
        label: 'Whitefield',
        demand: DemandLevel.low,
        orders: 2,
        x: 82,
        y: 45,
        radius: 24,
      ),
    ];
  }
}
