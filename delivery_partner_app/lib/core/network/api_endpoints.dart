abstract final class ApiEndpoints {
  static const baseUrl = 'http://192.168.1.100:8080/api/v1';

  static const sendOtp = '/auth/send-otp';
  static const verifyOtp = '/auth/verify-otp';
  static const me = '/auth/me';
  static const logout = '/auth/logout';
}
