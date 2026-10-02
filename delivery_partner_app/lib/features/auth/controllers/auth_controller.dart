import 'package:get/get.dart';

import 'package:delivery_partner_app/features/auth/models/auth_user.dart';
import 'package:delivery_partner_app/features/auth/services/auth_service.dart';

enum AuthStatus {
  unknown,
  unauthenticated,
  authenticated,
}

class AuthController extends GetxController {
  AuthController({
    required this._authService,
  });

  final AuthService _authService;

  final Rx<AuthStatus> authStatus =
      AuthStatus.unknown.obs;

  final Rxn<AuthUser> user =
      Rxn<AuthUser>();

  final RxString token =
      ''.obs;

  final RxString phone =
      ''.obs;

  final RxBool isLoading =
      false.obs;

  final RxString errorMessage =
      ''.obs;

  bool get isAuthenticated =>
      authStatus.value ==
      AuthStatus.authenticated;

  @override
  void onReady() {
    super.onReady();
    restoreSession();
  }

  // --------------------------------
  // AUTO LOGIN
  // --------------------------------

  Future<void> restoreSession() async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final accessToken =
          await _authService.getAccessToken();

      final refreshToken =
          await _authService.getRefreshToken();

      // No saved session
      if ((accessToken == null ||
              accessToken.isEmpty) &&
          (refreshToken == null ||
              refreshToken.isEmpty)) {
        authStatus.value =
            AuthStatus.unauthenticated;
        return;
      }

      // --------------------------------
      // 1. Try existing access token
      // --------------------------------

      if (accessToken != null &&
          accessToken.isNotEmpty) {
        try {
          final profile =
              await _authService.getProfile();

          user.value = profile;
          phone.value = profile.phone;
          token.value = accessToken;

          authStatus.value =
              AuthStatus.authenticated;

          return;
        } catch (_) {
          // Access token expired/invalid.
          // Continue with refresh token.
        }
      }

      // --------------------------------
      // 2. Refresh access token
      // --------------------------------

      final refreshed =
          await _authService.refreshSession();

      if (!refreshed) {
        await _authService.logout();

        user.value = null;
        token.value = '';
        phone.value = '';

        authStatus.value =
            AuthStatus.unauthenticated;

        return;
      }

      // --------------------------------
      // 3. Get new access token
      // --------------------------------

      final newAccessToken =
          await _authService.getAccessToken();

      // --------------------------------
      // 4. Load profile
      // --------------------------------

      final profile =
          await _authService.getProfile();

      user.value = profile;
      phone.value = profile.phone;
      token.value =
          newAccessToken ?? '';

      authStatus.value =
          AuthStatus.authenticated;
    } catch (error) {
      await _authService.logout();

      user.value = null;
      token.value = '';
      phone.value = '';

      authStatus.value =
          AuthStatus.unauthenticated;

      errorMessage.value =
          error.toString();
    } finally {
      isLoading.value = false;
    }
  }

  // --------------------------------
  // SEND OTP
  // --------------------------------

  Future<void> sendOtp(
    String phoneNumber,
  ) async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final cleanedPhone =
          phoneNumber.trim();

      if (!RegExp(r'^\d{10}$')
          .hasMatch(cleanedPhone)) {
        throw Exception(
          'Enter a valid 10-digit phone number',
        );
      }

      await _authService.sendOtp(
        cleanedPhone,
      );

      phone.value = cleanedPhone;
    } catch (error) {
      errorMessage.value =
          error.toString();

      rethrow;
    } finally {
      isLoading.value = false;
    }
  }

  // --------------------------------
  // LOGIN
  // --------------------------------

  Future<void> login({
    required String otp,
  }) async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      if (phone.value.isEmpty) {
        throw Exception(
          'Phone number is missing',
        );
      }

      final response =
          await _authService.verifyOtp(
        phone: phone.value,
        otp: otp,
      );

      token.value =
          response.accessToken;

      user.value =
          response.user;

      authStatus.value =
          AuthStatus.authenticated;
    } catch (error) {
      errorMessage.value =
          error.toString();

      authStatus.value =
          AuthStatus.unauthenticated;

      rethrow;
    } finally {
      isLoading.value = false;
    }
  }

  // --------------------------------
  // LOGOUT
  // --------------------------------

  Future<void> logout() async {
    await _authService.logout();

    token.value = '';
    phone.value = '';
    user.value = null;
    errorMessage.value = '';

    authStatus.value =
        AuthStatus.unauthenticated;
  }
}