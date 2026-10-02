import 'package:delivery_partner_app/core/network/api_client.dart';
import 'package:delivery_partner_app/core/storage/token_storage.dart';
import 'package:delivery_partner_app/features/home/models/rider_status.dart';
import 'package:delivery_partner_app/features/home/services/delivery_services.dart';
import 'package:delivery_partner_app/features/home/models/incoming_order.dart';

class HomeService {
  HomeService({
    required ApiClient apiClient,
    required TokenStorage tokenStorage,
  })  : _apiClient = apiClient,
        _deliveryService = DeliveryService(
          tokenStorage: tokenStorage,
        );

  final ApiClient _apiClient;
  final DeliveryService _deliveryService;

  Future<HomeResponse> getHomeData() async {
    final status =
        await _deliveryService.getRiderStatus();

    return HomeResponse(
      todayEarnings: 1240.0,
      riderStatus: _mapStatus(status),
    );
  }

  Future<RiderStatus> updateRiderStatus(
    RiderStatus status,
  ) async {
    final statusString = switch (status) {
      RiderStatus.offline => 'offline',
      RiderStatus.online => 'online',
      RiderStatus.onBreak => 'on_break',
    };

    final updatedStatus =
        await _deliveryService.updateAvailability(
      statusString,
    );

    return _mapStatus(updatedStatus);
  }

  RiderStatus _mapStatus(String status) {
    return switch (status) {
      'offline' => RiderStatus.offline,
      'online' => RiderStatus.online,
      'on_break' => RiderStatus.onBreak,
      _ => throw Exception(
          'Unknown rider status: $status',
        ),
    };
  }

  Future<IncomingOrder?> getUpcomingOrder() async {
  final response =
      await _deliveryService.getUpcomingOrder();

  if (!response.success) {
    throw Exception(
      response.message.isEmpty
          ? 'Failed to fetch upcoming order'
          : response.message,
    );
  }

  if (!response.hasOrder) {
    return null;
  }

  return IncomingOrder(
    id: response.orderId,
    restaurant: response.restaurant,
    restaurantArea: response.restaurantArea,
    pickupDistance: response.pickupDistance,
    customerName: response.customerName,
    deliveryArea: response.deliveryArea,
    deliveryDistance: response.deliveryDistance,
    totalDistance: response.totalDistance,
    earnings: response.earnings,
    items: response.items,
    eta: response.eta,
  );
}

Future<void> acceptOrder(
  String orderId,
) async {
  await _deliveryService.acceptOrder(
    orderId,
  );
}
}

class HomeResponse {
  const HomeResponse({
    required this.todayEarnings,
    required this.riderStatus,
  });

  final double todayEarnings;
  final RiderStatus riderStatus;
}