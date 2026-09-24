import 'package:delivery_partner_app/features/language/models/app_language.dart';

class LanguageService {
  Future<List<AppLanguage>> getLanguages() async {
    await Future.delayed(const Duration(milliseconds: 200));

    return const [
      AppLanguage(
        code: 'en',
        label: 'English',
        native: 'English',
        region: 'Global',
      ),
      AppLanguage(
        code: 'hi',
        label: 'Hindi',
        native: 'हिन्दी',
        region: 'India',
      ),
      AppLanguage(
        code: 'bn',
        label: 'Bengali',
        native: 'বাংলা',
        region: 'India / Bangladesh',
      ),
      AppLanguage(
        code: 'te',
        label: 'Telugu',
        native: 'తెలుగు',
        region: 'South India',
      ),
      AppLanguage(
        code: 'mr',
        label: 'Marathi',
        native: 'मराठी',
        region: 'Maharashtra',
      ),
      AppLanguage(
        code: 'ta',
        label: 'Tamil',
        native: 'தமிழ்',
        region: 'South India / Sri Lanka',
      ),
      AppLanguage(
        code: 'ur',
        label: 'Urdu',
        native: 'اردو',
        region: 'India / Pakistan',
      ),
      AppLanguage(
        code: 'gu',
        label: 'Gujarati',
        native: 'ગુજરાતી',
        region: 'Gujarat',
      ),
      AppLanguage(
        code: 'kn',
        label: 'Kannada',
        native: 'ಕನ್ನಡ',
        region: 'Karnataka',
      ),
      AppLanguage(
        code: 'ml',
        label: 'Malayalam',
        native: 'മലയാളം',
        region: 'Kerala',
      ),
      AppLanguage(
        code: 'pa',
        label: 'Punjabi',
        native: 'ਪੰਜਾਬੀ',
        region: 'Punjab',
      ),
      AppLanguage(code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ', region: 'Odisha'),
    ];
  }

  Future<void> saveLanguage(String code) async {
    await Future.delayed(const Duration(milliseconds: 150));

    // Later:
    // Persist the language using SharedPreferences/GetStorage
    // or sync it with the backend.
  }
}
