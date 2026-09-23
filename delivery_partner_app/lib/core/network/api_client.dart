import 'dart:convert';

import 'package:http/http.dart' as http;

import 'api_endpoints.dart';

class ApiClient {
  ApiClient();

  final http.Client _client = http.Client();

  Future<Map<String, dynamic>> post(
    String endpoint, {
    Map<String, dynamic>? body,
    String? token,
  }) async {
    final response = await _client.post(
      Uri.parse('${ApiEndpoints.baseUrl}$endpoint'),
      headers: {
        'Content-Type': 'application/json',
        if (token != null) 'Authorization': 'Bearer $token',
      },
      body: jsonEncode(body ?? {}),
    );

    final data = jsonDecode(response.body);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return data as Map<String, dynamic>;
    }

    throw ApiException(
      statusCode: response.statusCode,
      message: data['message'] ?? 'Something went wrong',
    );
  }
}

class ApiException implements Exception {
  const ApiException({required this.statusCode, required this.message});

  final int statusCode;
  final String message;

  @override
  String toString() {
    return 'ApiException($statusCode): $message';
  }
}
