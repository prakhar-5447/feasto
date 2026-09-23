import 'package:get/get.dart';

import 'package:delivery_partner_app/features/profile/models/profile.dart';
import 'package:delivery_partner_app/features/profile/services/profile_service.dart';

class ProfileController extends GetxController {
  ProfileController({required this._profileService});

  final ProfileService _profileService;

  final Rxn<Profile> profile = Rxn<Profile>();
  final Rxn<Profile> draft = Rxn<Profile>();

  final RxBool isLoading = false.obs;
  final RxBool isSaving = false.obs;
  final RxBool isEditing = false.obs;
  final RxBool showSavedMessage = false.obs;

  @override
  void onInit() {
    super.onInit();
    loadProfile();
  }

  Future<void> loadProfile() async {
    try {
      isLoading.value = true;

      final result = await _profileService.getProfile();

      profile.value = result;
    } catch (error) {
      // TODO: Add proper error handling.
    } finally {
      isLoading.value = false;
    }
  }

  void startEditing() {
    final currentProfile = profile.value;

    if (currentProfile == null) {
      return;
    }

    draft.value = currentProfile;
    isEditing.value = true;
    showSavedMessage.value = false;
  }

  void cancelEditing() {
    draft.value = profile.value;
    isEditing.value = false;
  }

  Future<void> saveProfile() async {
    final currentDraft = draft.value;

    if (currentDraft == null) {
      return;
    }

    try {
      isSaving.value = true;

      final updatedProfile = await _profileService.updateProfile(currentDraft);

      profile.value = updatedProfile;
      draft.value = updatedProfile;
      isEditing.value = false;
      showSavedMessage.value = true;

      await Future.delayed(const Duration(milliseconds: 2500));

      showSavedMessage.value = false;
    } catch (error) {
      // TODO: Add proper error handling.
    } finally {
      isSaving.value = false;
    }
  }

  void updateName(String value) {
    _updateDraft(draft.value?.copyWith(name: value));
  }

  void updateEmail(String value) {
    _updateDraft(draft.value?.copyWith(email: value));
  }

  void updateDateOfBirth(String value) {
    _updateDraft(draft.value?.copyWith(dateOfBirth: value));
  }

  void updateCity(String value) {
    _updateDraft(draft.value?.copyWith(city: value));
  }

  void updateVehicleType(String value) {
    _updateDraft(draft.value?.copyWith(vehicleType: value));
  }

  void updateVehicleNumber(String value) {
    _updateDraft(draft.value?.copyWith(vehicleNumber: value));
  }

  void updateLicenceNumber(String value) {
    _updateDraft(draft.value?.copyWith(licenceNumber: value));
  }

  void updateBankAccount(String value) {
    _updateDraft(draft.value?.copyWith(bankAccount: value));
  }

  void updateUpiId(String value) {
    _updateDraft(draft.value?.copyWith(upiId: value));
  }

  void _updateDraft(Profile? updatedProfile) {
    if (updatedProfile == null) {
      return;
    }

    draft.value = updatedProfile;
  }
}
