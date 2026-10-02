import 'package:grpc/grpc.dart';

import 'package:delivery_partner_app/core/network/grpc_client.dart';
import 'package:delivery_partner_app/core/storage/token_storage.dart';
import 'package:delivery_partner_app/features/auth/models/auth_user.dart';
import 'package:delivery_partner_app/gen/auth.pb.dart';
import 'package:delivery_partner_app/gen/auth.pbgrpc.dart';

class AuthService {
  AuthService({required this._tokenStorage});

  final TokenStorage _tokenStorage;

  final AuthServiceClient _client = AuthServiceClient(
    GrpcClient.instance.channel,
  );

  Future<void> sendOtp(String phone) async {
    final response = await _client.sendLoginOTP(
      SendLoginOTPRequest()..phone = phone.trim(),
    );

    if (!response.success) {
      throw Exception(response.message);
    }
  }

  Future<AuthResponse> verifyOtp({
    required String phone,
    required String otp,
  }) async {
    final response = await _client.verifyLoginOTP(
      VerifyLoginOTPRequest()
        ..phone = phone.trim()
        ..otp = otp.trim(),
    );

    if (!response.success || response.accessToken.isEmpty) {
      throw Exception(
        response.message.isEmpty ? 'Login failed' : response.message,
      );
    }

    await _tokenStorage.saveTokens(
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    );

    try {
      final profile = await getProfile(
        accessToken: response.accessToken,
      );

      return AuthResponse(
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: profile,
      );
    } catch (_) {
      await _tokenStorage.clear();
      rethrow;
    }
  }

  Future<AuthUser> getProfile({
    String? accessToken,
  }) async {
    final savedToken =
        accessToken ?? await _tokenStorage.getAccessToken();

    if (savedToken == null || savedToken.isEmpty) {
      throw Exception('Authentication token not found');
    }

    final response = await _client.getProfile(
      GetProfileRequest(),
      options: CallOptions(
        metadata: {
          'authorization': 'Bearer $savedToken',
        },
      ),
    );

    if (!response.success) {
      throw Exception(response.message);
    }

    return AuthUser(
      id: response.userId,
      name: response.name,
      email: response.email,
      phone: response.phone,
      vehicleNumber: response.vehicleNumber,
    );
  }

  // AUTO LOGIN / REFRESH SESSION
  Future<bool> refreshSession() async {
    final refreshToken =
        await _tokenStorage.getRefreshToken();

    if (refreshToken == null || refreshToken.isEmpty) {
      return false;
    }

    try {
      final response = await _client.refreshToken(
        RefreshTokenRequest()
          ..refreshToken = refreshToken,
      );

      if (!response.success ||
          response.accessToken.isEmpty) {
        return false;
      }

      await _tokenStorage.saveTokens(
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      );

      return true;
    } catch (_) {
      return false;
    }
  }

  Future<String?> getAccessToken() {
    return _tokenStorage.getAccessToken();
  }

  Future<String?> getRefreshToken() {
    return _tokenStorage.getRefreshToken();
  }

  Future<void> logout() async {
    await _tokenStorage.clear();
  }
}

class AuthResponse {
  const AuthResponse({
    required this.accessToken,
    required this.refreshToken,
    required this.user,
  });

  final String accessToken;
  final String refreshToken;
  final AuthUser user;
}