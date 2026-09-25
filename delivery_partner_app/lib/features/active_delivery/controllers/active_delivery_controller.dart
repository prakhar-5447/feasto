import 'dart:async';

import 'package:get/get.dart';

import 'package:delivery_partner_app/features/active_delivery/models/delivery_order.dart';
import 'package:delivery_partner_app/features/active_delivery/models/delivery_phase.dart';
import 'package:delivery_partner_app/features/active_delivery/models/issue_category.dart';

class ActiveDeliveryController extends GetxController {
  ActiveDeliveryController({required this.order});

  final DeliveryOrder order;

  // ---------------------------------------------------------------------------
  // DELIVERY PHASE
  // ---------------------------------------------------------------------------

  final phase = DeliveryPhase.goingToRestaurant.obs;

  bool get isPickupPhase {
    return phase.value == DeliveryPhase.goingToRestaurant ||
        phase.value == DeliveryPhase.arrivedAtRestaurant;
  }

  int get phaseIndex {
    return DeliveryPhase.values.indexOf(phase.value);
  }

  // ---------------------------------------------------------------------------
  // WAIT TIMER
  // ---------------------------------------------------------------------------

  final waitSeconds = 0.obs;
  final isDelayed = false.obs;

  static const int preparationEstimate = 12 * 60;

  Timer? _waitTimer;

  String get formattedWaitTime {
    final minutes = (waitSeconds.value ~/ 60).toString().padLeft(2, '0');

    final seconds = (waitSeconds.value % 60).toString().padLeft(2, '0');

    return '$minutes:$seconds';
  }

  // ---------------------------------------------------------------------------
  // PIN
  // ---------------------------------------------------------------------------

  final pin = <String>['', '', '', ''].obs;

  bool get pinComplete {
    return pin.every((digit) => digit.isNotEmpty);
  }

  void updatePin(int index, String value) {
    if (!RegExp(r'^\d*$').hasMatch(value)) {
      return;
    }

    final updated = [...pin];

    updated[index] = value.isEmpty ? '' : value.substring(value.length - 1);

    pin.assignAll(updated);
  }

  // ---------------------------------------------------------------------------
  // CANCEL
  // ---------------------------------------------------------------------------

  final showCancel = false.obs;
  final cancelReason = ''.obs;
  final cancelStep = 0.obs;

  final cancelReasons = const [
    'Restaurant is closed',
    'Restaurant is taking too long',
    'Vehicle problem',
    'Unable to reach location',
    'Safety concern',
    'Other',
  ];

  void openCancel() {
    cancelReason.value = '';
    cancelStep.value = 0;
    showCancel.value = true;
  }

  void closeCancel() {
    showCancel.value = false;
  }

  void selectCancelReason(String reason) {
    cancelReason.value = reason;
  }

  void nextCancelStep() {
    if (cancelReason.value.isEmpty) {
      return;
    }

    cancelStep.value = 1;
  }

  void confirmCancel() {
    showCancel.value = false;

    Get.back(result: 'cancelled');
  }

  // ---------------------------------------------------------------------------
  // ISSUE
  // ---------------------------------------------------------------------------

  final showIssue = false.obs;
  final issueCategory = Rxn<IssueCategory>();
  final issueOption = ''.obs;
  final issueSubmitted = false.obs;

  void openIssue({IssueCategory? category}) {
    issueCategory.value = category;
    issueOption.value = '';
    issueSubmitted.value = false;
    showIssue.value = true;
  }

  void closeIssue() {
    showIssue.value = false;
    issueCategory.value = null;
    issueOption.value = '';
    issueSubmitted.value = false;
  }

  void selectIssueCategory(IssueCategory category) {
    issueCategory.value = category;
    issueOption.value = '';
  }

  void selectIssueOption(String option) {
    issueOption.value = option;
  }

  Future<void> submitIssue() async {
    if (issueOption.value.isEmpty) {
      return;
    }

    issueSubmitted.value = true;

    await Future.delayed(const Duration(milliseconds: 1500));

    closeIssue();
  }

  // ---------------------------------------------------------------------------
  // NAVIGATION
  // ---------------------------------------------------------------------------

  final showNavigation = false.obs;

  void openNavigation() {
    showNavigation.value = true;
  }

  void closeNavigation() {
    showNavigation.value = false;
  }

  void confirmNavigation() {
    showNavigation.value = false;
  }

  void arriveAfterNavigation() {
    showNavigation.value = false;
    advance();
  }

  String get navigationDestination {
    return isPickupPhase ? order.restaurant : 'Customer';
  }

  String get navigationArea {
    return isPickupPhase ? order.restaurantArea : order.deliveryArea;
  }

  String get navigationDistance {
    return isPickupPhase ? '1.8 km' : '3.4 km';
  }

  String get navigationEta {
    return isPickupPhase ? '7 min' : '12 min';
  }

  // ---------------------------------------------------------------------------
  // CONTACT
  // ---------------------------------------------------------------------------

  final showContact = false.obs;

  void openContact() {
    showContact.value = true;
  }

  void closeContact() {
    showContact.value = false;
  }

  // ---------------------------------------------------------------------------
  // SAFETY
  // ---------------------------------------------------------------------------

  final showSafetyConfirmation = false.obs;

  void openSafetyConfirmation() {
    showSafetyConfirmation.value = true;
  }

  void closeSafetyConfirmation() {
    showSafetyConfirmation.value = false;
  }

  // ---------------------------------------------------------------------------
  // RATING
  // ---------------------------------------------------------------------------

  final riderRating = 0.obs;

  void setRating(int rating) {
    riderRating.value = rating;
  }

  // ---------------------------------------------------------------------------
  // DELIVERY
  // ---------------------------------------------------------------------------

  void advance() {
    final currentIndex = phaseIndex;

    if (currentIndex >= DeliveryPhase.values.length - 1) {
      return;
    }

    phase.value = DeliveryPhase.values[currentIndex + 1];

    waitSeconds.value = 0;
    isDelayed.value = false;

    _stopWaitTimerIfNeeded();
    _startWaitTimerIfNeeded();
  }

  // ---------------------------------------------------------------------------
  // TIMER
  // ---------------------------------------------------------------------------

  void _startWaitTimerIfNeeded() {
    if (phase.value != DeliveryPhase.arrivedAtRestaurant) {
      return;
    }

    _waitTimer?.cancel();

    _waitTimer = Timer.periodic(const Duration(seconds: 1), (_) {
      final next = waitSeconds.value + 1;

      waitSeconds.value = next;

      if (next > preparationEstimate) {
        isDelayed.value = true;
      }
    });
  }

  void _stopWaitTimerIfNeeded() {
    if (phase.value != DeliveryPhase.arrivedAtRestaurant) {
      _waitTimer?.cancel();
      _waitTimer = null;
    }
  }

  @override
  void onInit() {
    super.onInit();
    _startWaitTimerIfNeeded();
  }

  @override
  void onClose() {
    _waitTimer?.cancel();
    super.onClose();
  }
}
