import 'package:flutter/material.dart';

import 'package:delivery_partner_app/features/delivery_preferences/models/delivery_area.dart';

class DeliveryPreferencesService {
  Future<List<DeliveryArea>> getDeliveryAreas() async {
    await Future.delayed(const Duration(milliseconds: 300));

    return const [
      DeliveryArea(
        id: 'koramangala',
        label: 'Koramangala',
        demandLevel: DemandLevel.high,
        icon: '🔥',
        iconColor: Color(0xFFFF6B35),
      ),
      DeliveryArea(
        id: 'hsr',
        label: 'HSR Layout',
        demandLevel: DemandLevel.high,
        icon: '🔥',
        iconColor: Color(0xFFFF6B35),
      ),
      DeliveryArea(
        id: 'indiranagar',
        label: 'Indiranagar',
        demandLevel: DemandLevel.medium,
        icon: '🟡',
        iconColor: Color(0xFFF59E0B),
      ),
      DeliveryArea(
        id: 'btm',
        label: 'BTM Layout',
        demandLevel: DemandLevel.low,
        icon: '🔵',
        iconColor: Color(0xFF3B82F6),
      ),
      DeliveryArea(
        id: 'jp-nagar',
        label: 'JP Nagar',
        demandLevel: DemandLevel.medium,
        icon: '🟡',
        iconColor: Color(0xFFF59E0B),
      ),
      DeliveryArea(
        id: 'whitefield',
        label: 'Whitefield',
        demandLevel: DemandLevel.low,
        icon: '🔵',
        iconColor: Color(0xFF3B82F6),
      ),
      DeliveryArea(
        id: 'electronic-city',
        label: 'Electronic City',
        demandLevel: DemandLevel.medium,
        icon: '🟡',
        iconColor: Color(0xFFF59E0B),
      ),
      DeliveryArea(
        id: 'marathahalli',
        label: 'Marathahalli',
        demandLevel: DemandLevel.medium,
        icon: '🟡',
        iconColor: Color(0xFFF59E0B),
      ),
      DeliveryArea(
        id: 'hebbal',
        label: 'Hebbal',
        demandLevel: DemandLevel.low,
        icon: '🔵',
        iconColor: Color(0xFF3B82F6),
      ),
      DeliveryArea(
        id: 'rajajinagar',
        label: 'Rajajinagar',
        demandLevel: DemandLevel.high,
        icon: '🔥',
        iconColor: Color(0xFFFF6B35),
      ),
      DeliveryArea(
        id: 'jayanagar',
        label: 'Jayanagar',
        demandLevel: DemandLevel.medium,
        icon: '🟡',
        iconColor: Color(0xFFF59E0B),
      ),
      DeliveryArea(
        id: 'malleswaram',
        label: 'Malleswaram',
        demandLevel: DemandLevel.low,
        icon: '🔵',
        iconColor: Color(0xFF3B82F6),
      ),
    ];
  }

  Future<void> savePreferences(List<String> selectedAreaIds) async {
    await Future.delayed(const Duration(milliseconds: 500));

    // Replace with API call later.
  }
}
