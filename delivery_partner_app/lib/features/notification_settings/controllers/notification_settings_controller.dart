import 'package:get/get.dart';

import 'package:delivery_partner_app/features/notification_settings/models/notification_setting.dart';
import 'package:delivery_partner_app/features/notification_settings/models/notification_sound.dart';
import 'package:delivery_partner_app/features/notification_settings/services/notification_settings_service.dart';

class NotificationSettingsController extends GetxController {
  NotificationSettingsController({required this.notificationSettingsService});

  final NotificationSettingsService notificationSettingsService;

  final settings = <NotificationSetting>[].obs;

  final sound = NotificationSound.loud.obs;

  final quietHours = false.obs;
  final quietStart = '22:00'.obs;
  final quietEnd = '07:00'.obs;

  final isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    loadSettings();
  }

  Future<void> loadSettings() async {
    try {
      isLoading.value = true;

      final result = await notificationSettingsService.getSettings();

      settings.assignAll(result);
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> toggleSetting(String id) async {
    final index = settings.indexWhere((setting) => setting.id == id);

    if (index == -1) {
      return;
    }

    final current = settings[index];

    final updated = current.copyWith(enabled: !current.enabled);

    settings[index] = updated;

    await notificationSettingsService.saveSetting(updated);
  }

  Future<void> changeSound(NotificationSound value) async {
    sound.value = value;

    await notificationSettingsService.saveSound(value);
  }

  Future<void> toggleQuietHours() async {
    quietHours.value = !quietHours.value;

    await _saveQuietHours();
  }

  Future<void> changeQuietStart(String value) async {
    quietStart.value = value;

    if (quietHours.value) {
      await _saveQuietHours();
    }
  }

  Future<void> changeQuietEnd(String value) async {
    quietEnd.value = value;

    if (quietHours.value) {
      await _saveQuietHours();
    }
  }

  Future<void> _saveQuietHours() async {
    await notificationSettingsService.saveQuietHours(
      enabled: quietHours.value,
      start: quietStart.value,
      end: quietEnd.value,
    );
  }

  List<NotificationSetting> getSettingsForGroup(List<String> ids) {
    return settings.where((setting) => ids.contains(setting.id)).toList();
  }
}
