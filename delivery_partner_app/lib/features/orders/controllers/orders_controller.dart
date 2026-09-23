import 'package:get/get.dart';

import 'package:delivery_partner_app/features/orders/models/order.dart';
import 'package:delivery_partner_app/features/orders/models/order_filter.dart';
import 'package:delivery_partner_app/features/orders/models/order_status.dart';
import 'package:delivery_partner_app/features/orders/services/order_service.dart';

class OrdersController extends GetxController {
  OrdersController({required this._ordersService});

  final OrdersService _ordersService;

  final Rx<OrderStatus> selectedStatus = OrderStatus.active.obs;

  final Rx<OrderFilter> selectedFilter = OrderFilter.today.obs;

  final RxList<Order> orders = <Order>[].obs;

  final Rxn<Order> selectedOrder = Rxn<Order>();

  final RxBool isLoading = false.obs;

  final RxString errorMessage = ''.obs;

  @override
  void onInit() {
    super.onInit();
    loadOrders();
  }

  Future<void> loadOrders() async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final result = await _ordersService.getOrders(
        status: selectedStatus.value,
        filter: selectedFilter.value,
      );

      orders.assignAll(result);
    } catch (error) {
      errorMessage.value = error.toString();
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> changeStatus(OrderStatus status) async {
    selectedStatus.value = status;

    await loadOrders();
  }

  Future<void> changeFilter(OrderFilter filter) async {
    selectedFilter.value = filter;

    await loadOrders();
  }

  Future<void> selectOrder(Order order) async {
    try {
      isLoading.value = true;

      final result = await _ordersService.getOrderDetail(order.id);

      selectedOrder.value = result;
    } catch (error) {
      errorMessage.value = error.toString();
    } finally {
      isLoading.value = false;
    }
  }

  void clearSelectedOrder() {
    selectedOrder.value = null;
  }

  Future<Order?> getOrderDetail(String orderId) async {
    try {
      return await _ordersService.getOrderDetail(orderId);
    } catch (error) {
      errorMessage.value = error.toString();
      return null;
    }
  }
}
