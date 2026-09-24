import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/features/app_settings/models/app_settings.dart';
import 'package:delivery_partner_app/features/app_settings/services/app_settings_service.dart';

class AppSettingsController extends GetxController {
  AppSettingsController({required this._appSettingsService});

  final AppSettingsService _appSettingsService;

  final Rx<AppSettings> settings = const AppSettings().obs;

  final RxBool isLoading = false.obs;
  final RxBool isSaving = false.obs;
  final RxBool isClearingCache = false.obs;

  final RxString errorMessage = ''.obs;

  @override
  void onInit() {
    super.onInit();
    loadSettings();
  }

  Future<void> loadSettings() async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      settings.value = await _appSettingsService.getSettings();
    } catch (error) {
      errorMessage.value = error.toString();
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> _saveSettings(AppSettings updated) async {
    settings.value = updated;

    try {
      isSaving.value = true;

      await _appSettingsService.saveSettings(updated);
    } catch (error) {
      errorMessage.value = error.toString();
    } finally {
      isSaving.value = false;
    }
  }

  void toggleDarkMode() {
    _saveSettings(settings.value.copyWith(darkMode: !settings.value.darkMode));
  }

  void toggleCompactView() {
    _saveSettings(
      settings.value.copyWith(compactView: !settings.value.compactView),
    );
  }

  void toggleLocationAlways() {
    _saveSettings(
      settings.value.copyWith(locationAlways: !settings.value.locationAlways),
    );
  }

  void toggleDataSync() {
    _saveSettings(settings.value.copyWith(dataSync: !settings.value.dataSync));
  }

  void toggleAnalytics() {
    _saveSettings(
      settings.value.copyWith(analytics: !settings.value.analytics),
    );
  }

  void toggleHaptics() {
    _saveSettings(settings.value.copyWith(haptics: !settings.value.haptics));
  }

  void toggleSoundFx() {
    _saveSettings(settings.value.copyWith(soundFx: !settings.value.soundFx));
  }

  void toggleAutoAccept() {
    _saveSettings(
      settings.value.copyWith(autoAccept: !settings.value.autoAccept),
    );
  }

  void changeMapType(MapType type) {
    _saveSettings(settings.value.copyWith(mapType: type));
  }

  Future<void> clearCache() async {
    try {
      isClearingCache.value = true;

      await _appSettingsService.clearCache();

      Get.snackbar(
        'Cache Cleared',
        'Temporary app data has been cleared.',
        snackPosition: SnackPosition.BOTTOM,
        margin: const EdgeInsets.fromLTRB(16, 0, 16, 24),
        backgroundColor: AppColors.success,
        colorText: AppColors.primaryForeground,
        duration: const Duration(seconds: 2),
        borderRadius: 12,
      );
    } catch (error) {
      Get.snackbar(
        'Error',
        'Unable to clear cache.',
        snackPosition: SnackPosition.BOTTOM,
        margin: const EdgeInsets.fromLTRB(16, 0, 16, 24),
        backgroundColor: AppColors.danger,
        colorText: AppColors.primaryForeground,
        duration: const Duration(seconds: 2),
        borderRadius: 12,
      );
    } finally {
      isClearingCache.value = false;
    }
  }
}
