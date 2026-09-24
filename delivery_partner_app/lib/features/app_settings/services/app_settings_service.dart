import 'package:delivery_partner_app/features/app_settings/models/app_settings.dart';

class AppSettingsService {
  Future<AppSettings> getSettings() async {
    await Future.delayed(const Duration(milliseconds: 250));

    return const AppSettings();
  }

  Future<void> saveSettings(AppSettings settings) async {
    await Future.delayed(const Duration(milliseconds: 200));

    // Later:
    // Save settings using GetStorage / SharedPreferences
    // or sync selected settings with the backend.
  }

  Future<void> clearCache() async {
    await Future.delayed(const Duration(milliseconds: 500));

    // Clear application cache here later.
  }
}
