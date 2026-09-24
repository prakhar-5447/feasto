import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/features/language/models/app_language.dart';
import 'package:delivery_partner_app/features/language/services/language_service.dart';

class LanguageController extends GetxController {
  LanguageController({required this.languageService});

  final LanguageService languageService;

  final languages = <AppLanguage>[].obs;

  final selectedCode = 'en'.obs;
  final searchQuery = ''.obs;

  final isLoading = false.obs;
  final isSaving = false.obs;

  @override
  void onInit() {
    super.onInit();
    loadLanguages();
  }

  Future<void> loadLanguages() async {
    try {
      isLoading.value = true;

      final result = await languageService.getLanguages();

      languages.assignAll(result);
    } finally {
      isLoading.value = false;
    }
  }

  List<AppLanguage> get filteredLanguages {
    final query = searchQuery.value.trim().toLowerCase();

    if (query.isEmpty) {
      return languages;
    }

    return languages.where((language) {
      return language.label.toLowerCase().contains(query) ||
          language.native.contains(searchQuery.value);
    }).toList();
  }

  AppLanguage? get selectedLanguage {
    for (final language in languages) {
      if (language.code == selectedCode.value) {
        return language;
      }
    }

    return null;
  }

  bool get isSearching => searchQuery.value.trim().isNotEmpty;

  void setSearchQuery(String value) {
    searchQuery.value = value;
  }

  Future<void> selectLanguage(AppLanguage language) async {
    if (selectedCode.value == language.code) {
      return;
    }

    try {
      isSaving.value = true;

      await languageService.saveLanguage(language.code);

      selectedCode.value = language.code;

      // For now, show the confirmation.
      // Actual locale switching can be connected here.
      Get.snackbar(
        'Language updated',
        '${language.label} selected',
        snackPosition: SnackPosition.BOTTOM,
        margin: const EdgeInsets.all(16),
        backgroundColor: Colors.green,
        colorText: Colors.white,
        duration: const Duration(seconds: 2),
      );
    } finally {
      isSaving.value = false;
    }
  }
}
