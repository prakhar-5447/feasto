import 'package:delivery_partner_app/features/active_delivery/models/delivery_order.dart';
import 'package:delivery_partner_app/features/active_delivery/pages/active_delivery_page.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/features/home/models/incoming_order.dart';
import 'package:delivery_partner_app/features/home/models/rider_status.dart';
import 'package:delivery_partner_app/features/home/services/home_services.dart';

import 'dart:async';

import 'package:flutter/foundation.dart';

class HomeController extends GetxController {
  HomeController({required this._homeService});

  final HomeService _homeService;

  // ------------------------------------------------------------
  // HOME STATE
  // ------------------------------------------------------------

  final Rx<RiderStatus> riderStatus = RiderStatus.online.obs;

  final Rxn<IncomingOrder> incomingOrder = Rxn<IncomingOrder>();

  final RxInt orderTimer = 28.obs;

  final RxBool requestExpired = false.obs;

  final RxDouble todayEarnings = 0.0.obs;

  final RxBool isLoading = false.obs;

  final RxString errorMessage = ''.obs;

  // ------------------------------------------------------------
  // TIMERS
  // ------------------------------------------------------------

  Timer? incomingOrderTimer;
  Timer? countdownTimer;
  Timer? expiredMessageTimer;

  // ------------------------------------------------------------
  // MOCK ORDER
  // ------------------------------------------------------------

  static const mockOrder = IncomingOrder(
    id: '#FST-29381',
    restaurant: 'Spice Garden Kitchen',
    restaurantArea: 'Koramangala',
    pickupDistance: '1.8 km',
    customerName: 'Priya S.',
    deliveryArea: 'HSR Layout, Sec 2',
    deliveryDistance: '3.4 km',
    totalDistance: '5.2 km',
    earnings: '₹74',
    items: 3,
    eta: '~18 min',
  );

  // ------------------------------------------------------------
  // INITIALIZATION
  // ------------------------------------------------------------

  @override
  void onInit() {
    super.onInit();

    loadHomeData();
  }

  @override
  void onClose() {
    incomingOrderTimer?.cancel();
    countdownTimer?.cancel();
    expiredMessageTimer?.cancel();

    super.onClose();
  }

  // ------------------------------------------------------------
  // HOME DATA
  // ------------------------------------------------------------

  Future<void> loadHomeData() async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final data = await _homeService.getHomeData();

      todayEarnings.value = data.todayEarnings;
      riderStatus.value = data.riderStatus;

      if (riderStatus.value == RiderStatus.online) {
        simulateIncomingOrder();
      }
    } catch (error) {
      errorMessage.value = error.toString();
    } finally {
      isLoading.value = false;
    }
  }

  // ------------------------------------------------------------
  // ORDER SIMULATION
  // ------------------------------------------------------------

  void simulateIncomingOrder() {
    incomingOrderTimer?.cancel();

    if (riderStatus.value != RiderStatus.online) {
      return;
    }

    incomingOrderTimer = Timer(const Duration(seconds: 4), () {
      if (riderStatus.value != RiderStatus.online) {
        return;
      }

      incomingOrder.value = mockOrder;
      orderTimer.value = 28;
      requestExpired.value = false;

      startOrderCountdown();
    });
  }

  void startOrderCountdown() {
    countdownTimer?.cancel();

    countdownTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (orderTimer.value <= 1) {
        timer.cancel();

        incomingOrder.value = null;
        orderTimer.value = 0;
        requestExpired.value = true;

        showExpiredMessage();

        return;
      }

      orderTimer.value--;
    });
  }

  void showExpiredMessage() {
    expiredMessageTimer?.cancel();

    expiredMessageTimer = Timer(const Duration(seconds: 3), () {
      requestExpired.value = false;
    });
  }

  // ------------------------------------------------------------
  // RIDER STATUS
  // ------------------------------------------------------------

  void changeRiderStatus(RiderStatus status) {
    riderStatus.value = status;

    if (status != RiderStatus.online) {
      incomingOrder.value = null;

      incomingOrderTimer?.cancel();
      countdownTimer?.cancel();

      return;
    }

    simulateIncomingOrder();
  }

  // ------------------------------------------------------------
  // ORDER ACTIONS
  // ------------------------------------------------------------

  void acceptOrder(IncomingOrder incomingOrder) {
    final deliveryOrder = DeliveryOrder(
      id: incomingOrder.id,
      restaurant: incomingOrder.restaurant,
      restaurantArea: incomingOrder.restaurantArea,
      customerName: incomingOrder.customerName,
      deliveryArea: incomingOrder.deliveryArea,
      distance: '${incomingOrder.totalDistance} km',
      earnings: '₹${incomingOrder.earnings}',
      items: incomingOrder.items,
    );

    Get.to(() => ActiveDeliveryPage(order: deliveryOrder));

    // Later:
    //
    // await _homeService.acceptOrder(order.id);
    //
    // Then navigate to:
    //
    // MapPage(
    //   orderData: order,
    //   phase: DeliveryPhase.goingToRestaurant,
    // );
  }

  void declineOrder() {
    incomingOrder.value = null;

    countdownTimer?.cancel();
  }

  // ------------------------------------------------------------
  // NAVIGATION
  // ------------------------------------------------------------

  void navigate(String page) {
    debugPrint('Navigate to: $page');

    // AppShell currently owns main navigation.
    //
    // Later this can be replaced by your routing solution.
  }
}
