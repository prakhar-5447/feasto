import 'package:delivery_partner_app/core/network/api_client.dart';
import 'package:delivery_partner_app/core/network/api_endpoints.dart';

import 'package:delivery_partner_app/features/auth/models/auth_user.dart';

class AuthService {
  AuthService({required this._apiClient});

  final ApiClient _apiClient;

  Future<void> sendOtp(String phone) async {
    await _apiClient.post(ApiEndpoints.sendOtp, body: {'phone': phone});
  }

  Future<AuthResponse> verifyOtp({
    required String phone,
    required String otp,
  }) async {
    // final response = await _apiClient.post(
    //   ApiEndpoints.verifyOtp,
    //   body: {'phone': phone, 'otp': otp},
    // );

    // return AuthResponse.fromJson(response);

    await Future.delayed(const Duration(seconds: 1));

    return AuthResponse(
      accessToken: 'dummy_access_token',
      user: AuthUser(
        id: 'delivery_partner_001',
        name: 'Rahul Kumar',
        phone: phone,
        email: 'rahul@example.com',
        vehicleNumber: 'JH10AB1234',
      ),
    );
  }
}

class AuthResponse {
  const AuthResponse({required this.accessToken, required this.user});

  final String accessToken;
  final AuthUser user;

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      accessToken: json['accessToken'] as String,
      user: AuthUser.fromJson(json['user'] as Map<String, dynamic>),
    );
  }
}
