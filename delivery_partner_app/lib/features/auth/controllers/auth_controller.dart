import 'package:get/get.dart';

import 'package:delivery_partner_app/features/auth/models/auth_user.dart';
import 'package:delivery_partner_app/features/auth/services/auth_service.dart';

enum AuthStatus { unknown, unauthenticated, authenticated }

class AuthController extends GetxController {
  AuthController({required this._authService});

  final AuthService _authService;

  final Rx<AuthStatus> authStatus = AuthStatus.unauthenticated.obs;

  final Rxn<AuthUser> user = Rxn<AuthUser>();

  final RxString token = ''.obs;

  final RxBool isLoading = false.obs;

  final RxString errorMessage = ''.obs;

  bool get isAuthenticated => authStatus.value == AuthStatus.authenticated;

  Future<void> login({required String phone, required String otp}) async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final response = await _authService.verifyOtp(phone: phone, otp: otp);

      token.value = response.accessToken;

      user.value = response.user;

      authStatus.value = AuthStatus.authenticated;
    } catch (error) {
      errorMessage.value = error.toString();

      authStatus.value = AuthStatus.unauthenticated;
    } finally {
      isLoading.value = false;
    }
  }

  void logout() {
    token.value = '';

    user.value = null;

    authStatus.value = AuthStatus.unauthenticated;
  }
}
