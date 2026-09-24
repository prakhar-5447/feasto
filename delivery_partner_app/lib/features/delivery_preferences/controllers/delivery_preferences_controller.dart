import 'dart:async';

import 'package:get/get.dart';

import 'package:delivery_partner_app/features/delivery_preferences/models/delivery_area.dart';
import 'package:delivery_partner_app/features/delivery_preferences/services/delivery_preferences_service.dart';

class DeliveryPreferencesController extends GetxController {
  DeliveryPreferencesController({required this._deliveryPreferencesService});

  final DeliveryPreferencesService _deliveryPreferencesService;

  final RxList<DeliveryArea> areas = <DeliveryArea>[].obs;

  final RxSet<String> selectedAreaIds = <String>{
    'koramangala',
    'hsr',
    'indiranagar',
  }.obs;

  final RxBool isLoading = false.obs;
  final RxBool isSaving = false.obs;
  final RxBool saved = false.obs;

  final RxString errorMessage = ''.obs;

  Timer? _savedMessageTimer;

  int get selectedCount => selectedAreaIds.length;

  bool isSelected(String id) {
    return selectedAreaIds.contains(id);
  }

  @override
  void onInit() {
    super.onInit();
    loadPreferences();
  }

  Future<void> loadPreferences() async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final result = await _deliveryPreferencesService.getDeliveryAreas();

      areas.assignAll(result);
    } catch (error) {
      errorMessage.value = error.toString();
    } finally {
      isLoading.value = false;
    }
  }

  void toggleArea(String id) {
    final next = Set<String>.from(selectedAreaIds);

    if (next.contains(id)) {
      // At least one area must always remain selected.
      if (next.length <= 1) {
        return;
      }

      next.remove(id);
    } else {
      next.add(id);
    }

    selectedAreaIds.value = next;
  }

  Future<void> savePreferences() async {
    if (selectedAreaIds.isEmpty || isSaving.value) {
      return;
    }

    try {
      isSaving.value = true;
      errorMessage.value = '';

      await _deliveryPreferencesService.savePreferences(
        selectedAreaIds.toList(),
      );

      saved.value = true;

      _savedMessageTimer?.cancel();

      _savedMessageTimer = Timer(const Duration(seconds: 2), () {
        saved.value = false;
      });
    } catch (error) {
      errorMessage.value = error.toString();
    } finally {
      isSaving.value = false;
    }
  }

  @override
  void onClose() {
    _savedMessageTimer?.cancel();
    super.onClose();
  }
}
