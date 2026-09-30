import 'package:delivery_partner_app/core/network/grpc_client.dart';
import 'package:delivery_partner_app/core/storage/token_storage.dart';
import 'package:delivery_partner_app/features/auth/models/auth_user.dart';
import 'package:delivery_partner_app/generated/auth.pb.dart';
import 'package:delivery_partner_app/generated/auth.pbgrpc.dart';

class AuthService {
  AuthService({required TokenStorage tokenStorage})
    : _tokenStorage = tokenStorage;

  final TokenStorage _tokenStorage;

  final AuthServiceClient _client = AuthServiceClient(
    GrpcClient.instance.channel,
  );

  Future<void> sendOtp(String phone) async {
    final request = SendLoginOTPRequest()..phone = phone;

    final response = await _client.sendLoginOTP(request);

    if (!response.success) {
      throw Exception(response.message);
    }
  }

  Future<AuthResponse> verifyOtp({
    required String phone,
    required String otp,
  }) async {
    final request = VerifyLoginOTPRequest()
      ..phone = phone
      ..otp = otp;

    final response = await _client.verifyLoginOTP(request);

    if (!response.success) {
      throw Exception(response.message);
    }

    if (response.accessToken.isEmpty) {
      throw Exception('Access token was not returned');
    }

    await _tokenStorage.saveTokens(
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    );

    /*
     * Your current Go VerifyLoginOTP response does not return
     * the complete user object.
     *
     * Therefore we temporarily create the minimum AuthUser
     * available from the login information.
     *
     * Later we should add GetMe() to the Go backend and fetch
     * the complete delivery-partner profile.
     */
    final user = AuthUser(id: '', name: '', phone: phone);

    return AuthResponse(
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      user: user,
    );
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
