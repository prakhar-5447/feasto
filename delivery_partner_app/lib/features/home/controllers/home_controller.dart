import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/features/active_delivery/models/delivery_order.dart';
import 'package:delivery_partner_app/features/active_delivery/pages/active_delivery_page.dart';
import 'package:delivery_partner_app/features/home/models/incoming_order.dart';
import 'package:delivery_partner_app/features/home/models/rider_status.dart';
import 'package:delivery_partner_app/features/home/services/home_services.dart';

class HomeController extends GetxController {
  HomeController({
    required this._homeService,
  });

  final HomeService _homeService;

  final Rx<RiderStatus> riderStatus =
      RiderStatus.offline.obs;

  final Rxn<IncomingOrder> incomingOrder =
      Rxn<IncomingOrder>();

  final RxInt orderTimer = 28.obs;

  final RxBool requestExpired =
      false.obs;

  final RxBool isFetchingOrder =
      false.obs;

  final RxDouble todayEarnings =
      0.0.obs;

  final RxBool isLoading =
      false.obs;

  final RxBool isUpdatingStatus =
      false.obs;

  final RxString errorMessage =
      ''.obs;

  Timer? incomingOrderTimer;
  Timer? countdownTimer;
  Timer? expiredMessageTimer;
  Timer? orderTimerInstance;

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
    orderTimerInstance?.cancel();

    super.onClose();
  }


void startOrderTimer() {
  orderTimerInstance?.cancel();

  orderTimer.value = 30;

  orderTimerInstance = Timer.periodic(
    const Duration(seconds: 1),
    (timer) {
      if (orderTimer.value <= 0) {
        timer.cancel();

        incomingOrder.value = null;
        requestExpired.value = true;

        return;
      }

      orderTimer.value--;
    },
  );
}

  Future<void> loadHomeData() async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final data =
          await _homeService.getHomeData();

      todayEarnings.value =
          data.todayEarnings;

      // This is now coming from MongoDB.
      riderStatus.value =
          data.riderStatus;

      if (riderStatus.value ==
          RiderStatus.online) {
        // simulateIncomingOrder();
      }
    } catch (error) {
      errorMessage.value =
          error.toString();

      debugPrint(
        'Failed to load rider status: $error',
      );
    } finally {
      isLoading.value = false;
    }
  }

  void changeRiderStatus(
    RiderStatus status,
  ) {
    if (isUpdatingStatus.value) {
      return;
    }

    if (status == riderStatus.value) {
      return;
    }

    updateRiderStatus(status);
  }

  Future<void> updateRiderStatus(
    RiderStatus status,
  ) async {
    try {
      isUpdatingStatus.value = true;
      errorMessage.value = '';

      // Backend is updated first.
      final updatedStatus =
          await _homeService.updateRiderStatus(
        status,
      );

      // Update UI only after backend succeeds.
      riderStatus.value =
          updatedStatus;

      if (updatedStatus !=
          RiderStatus.online) {
        incomingOrder.value = null;

        incomingOrderTimer?.cancel();
        countdownTimer?.cancel();

        return;
      }

      // simulateIncomingOrder();
    } catch (error) {
      errorMessage.value =
          error.toString();

      debugPrint(
        'Failed to update rider status: $error',
      );
    } finally {
      isUpdatingStatus.value = false;
    }
  }

  Future<void> fetchUpcomingOrder() async {
  // if (isFetchingOrder.value) {
  //   return;
  // }

  if (riderStatus.value != RiderStatus.online) {
    Get.snackbar(
      'Go online',
      'You must be online to receive orders.',
    );

    return;
  }

  try {
    isFetchingOrder.value = true;
    requestExpired.value = false;

    final order =
        await _homeService.getUpcomingOrder();

    if (order == null) {
      Get.snackbar(
        'No orders',
        'There are no upcoming orders right now.',
      );

      return;
    }

    incomingOrder.value = order;

    startOrderTimer();
  } catch (error) {
    errorMessage.value =
        error.toString();
  } finally {
    isFetchingOrder.value = false;
  }
}

  void simulateIncomingOrder() {
    incomingOrderTimer?.cancel();

    if (riderStatus.value !=
        RiderStatus.online) {
      return;
    }

    incomingOrderTimer =
        Timer(
      const Duration(seconds: 4),
      () {
        if (riderStatus.value !=
            RiderStatus.online) {
          return;
        }

        incomingOrder.value =
            mockOrder;

        orderTimer.value = 28;
        requestExpired.value = false;

        startOrderCountdown();
      },
    );
  }

  void startOrderCountdown() {
    countdownTimer?.cancel();

    countdownTimer =
        Timer.periodic(
      const Duration(seconds: 1),
      (timer) {
        if (orderTimer.value <= 1) {
          timer.cancel();

          incomingOrder.value = null;
          orderTimer.value = 0;
          requestExpired.value = true;

          showExpiredMessage();

          return;
        }

        orderTimer.value--;
      },
    );
  }

  void showExpiredMessage() {
    expiredMessageTimer?.cancel();

    expiredMessageTimer =
        Timer(
      const Duration(seconds: 3),
      () {
        requestExpired.value = false;
      },
    );
  }

 Future<void> acceptOrder(
  IncomingOrder order,
) async {
  if (isFetchingOrder.value) {
    return;
  }

  try {
    isFetchingOrder.value = true;

    await _homeService.acceptOrder(
      order.id,
    );

    incomingOrder.value = null;

    orderTimerInstance?.cancel();

    final deliveryOrder = DeliveryOrder(
      id: order.id,
      restaurant: order.restaurant,
      restaurantArea: order.restaurantArea,
      customerName: order.customerName,
      deliveryArea: order.deliveryArea,
      distance: order.totalDistance,
      earnings: order.earnings,
      items: order.items,
    );

    Get.to(
      () => ActiveDeliveryPage(
        order: deliveryOrder,
      ),
    );
  } catch (error) {
    incomingOrder.value = null;

    orderTimerInstance?.cancel();

    Get.snackbar(
      'Order unavailable',
      error.toString().replaceFirst(
        'Exception: ',
        '',
      ),
    );
  } finally {
    isFetchingOrder.value = false;
  }
}

void declineOrder() {
  incomingOrder.value = null;
  orderTimerInstance?.cancel();
  orderTimer.value = 0;
}

  void navigate(String page) {
    debugPrint('Navigate to: $page');
  }

  static const mockOrder =
      IncomingOrder(
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
}