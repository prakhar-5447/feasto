import 'package:delivery_partner_app/core/network/api_client.dart';
import 'package:delivery_partner_app/features/orders/models/order.dart';
import 'package:delivery_partner_app/features/orders/models/order_filter.dart';
import 'package:delivery_partner_app/features/orders/models/order_status.dart';

class OrdersService {
  OrdersService({required this._apiClient});

  final ApiClient _apiClient;

  Future<List<Order>> getOrders({
    required OrderStatus status,
    required OrderFilter filter,
  }) async {
    // TODO: Replace mock data with API call.
    //
    // final response = await _apiClient.get(
    //   ApiEndpoints.orders,
    //   queryParameters: {
    //     'status': status.name,
    //     'filter': filter.name,
    //   },
    // );
    //
    // return (response['orders'] as List)
    //     .map((json) => Order.fromJson(json))
    //     .toList();

    await Future.delayed(const Duration(milliseconds: 500));

    return _mockOrders.where((order) => order.status == status).toList()
        as List<Order>;
  }

  Future<Order> getOrderDetail(String orderId) async {
    // TODO: Replace with API call.
    //
    // final response = await _apiClient.get(
    //   '${ApiEndpoints.orders}/$orderId',
    // );
    //
    // return Order.fromJson(response);

    await Future.delayed(const Duration(milliseconds: 300));

    return _mockOrders.firstWhere((order) => order.id == orderId);
  }

  static const _mockOrders = [
    // Your current ALL_ORDERS converted to Order objects.
  ];
}
