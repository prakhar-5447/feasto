import 'package:delivery_partner_app/core/network/grpc_client.dart';
import 'package:delivery_partner_app/core/storage/token_storage.dart';
import 'package:delivery_partner_app/gen/delivery.pb.dart';
import 'package:delivery_partner_app/gen/delivery.pbgrpc.dart';
import 'package:grpc/grpc.dart';

class DeliveryService {
  DeliveryService({
    required TokenStorage tokenStorage,
  }) : _tokenStorage = tokenStorage;

  final TokenStorage _tokenStorage;

  final DeliveryServiceClient _client =
      DeliveryServiceClient(
    GrpcClient.instance.channel,
  );

  Future<String> updateAvailability(
    String status,
  ) async {
    final accessToken =
        await _tokenStorage.getAccessToken();

    if (accessToken == null ||
        accessToken.isEmpty) {
      throw Exception(
        'Authentication token not found',
      );
    }

    final response =
        await _client.updateAvailability(
      UpdateAvailabilityRequest()
        ..status = status,
      options: CallOptions(
        metadata: {
          'authorization':
              'Bearer $accessToken',
        },
      ),
    );

    if (!response.success) {
      throw Exception(
        response.message.isEmpty
            ? 'Failed to update availability'
            : response.message,
      );
    }

    return response.status;
  }

Future<String> getRiderStatus() async {
  final accessToken =
      await _tokenStorage.getAccessToken();

  if (accessToken == null || accessToken.isEmpty) {
    throw Exception(
      'Authentication token not found',
    );
  }

  final response =
      await _client.getRiderStatus(
    GetRiderStatusRequest(),
    options: CallOptions(
      metadata: {
        'authorization': 'Bearer $accessToken',
      },
    ),
  );

  if (!response.success) {
    throw Exception(response.message);
  }

  return response.status;
}

 Future<GetUpcomingOrderResponse> getUpcomingOrder() async {
    final accessToken =
        await _tokenStorage.getAccessToken();

    if (accessToken == null || accessToken.isEmpty) {
      throw Exception('Authentication token not found');
    }

    return _client.getUpcomingOrder(
      GetUpcomingOrderRequest(),
      options: CallOptions(
        metadata: {
          'authorization': 'Bearer $accessToken',
        },
      ),
    );
  }

  Future<void> acceptOrder(String orderId) async {
    final accessToken =
        await _tokenStorage.getAccessToken();

    if (accessToken == null || accessToken.isEmpty) {
      throw Exception('Authentication token not found');
    }

    final response = await _client.acceptOrder(
      AcceptOrderRequest()
        ..orderId = orderId,
      options: CallOptions(
        metadata: {
          'authorization': 'Bearer $accessToken',
        },
      ),
    );

    if (!response.success) {
      throw Exception(
        response.message.isEmpty
            ? 'Order is no longer available'
            : response.message,
      );
    }
  }

  Future<void> pickupOrder(String orderId) async {
    final accessToken =
        await _tokenStorage.getAccessToken();

    if (accessToken == null || accessToken.isEmpty) {
      throw Exception('Authentication token not found');
    }

    final response = await _client.pickupOrder(
      PickupOrderRequest()
        ..orderId = orderId,
      options: CallOptions(
        metadata: {
          'authorization': 'Bearer $accessToken',
        },
      ),
    );

    if (!response.success) {
      throw Exception(
        response.message.isEmpty
            ? 'Failed to confirm pickup'
            : response.message,
      );
    }
  }

  Future<void> requestDeliveryOTP(
    String orderId,
  ) async {
    final accessToken =
        await _tokenStorage.getAccessToken();

    if (accessToken == null || accessToken.isEmpty) {
      throw Exception('Authentication token not found');
    }

    final response =
        await _client.requestDeliveryOTP(
      RequestDeliveryOTPRequest()
        ..orderId = orderId,
      options: CallOptions(
        metadata: {
          'authorization': 'Bearer $accessToken',
        },
      ),
    );

    if (!response.success) {
      throw Exception(
        response.message.isEmpty
            ? 'Failed to request delivery OTP'
            : response.message,
      );
    }
  }

  Future<void> verifyDeliveryOTP(
    String orderId,
    String otp,
  ) async {
    final accessToken =
        await _tokenStorage.getAccessToken();

    if (accessToken == null || accessToken.isEmpty) {
      throw Exception('Authentication token not found');
    }

    final response =
        await _client.verifyDeliveryOTP(
      VerifyDeliveryOTPRequest()
        ..orderId = orderId
        ..otp = otp,
      options: CallOptions(
        metadata: {
          'authorization': 'Bearer $accessToken',
        },
      ),
    );

    if (!response.success) {
      throw Exception(
        response.message.isEmpty
            ? 'Invalid delivery OTP'
            : response.message,
      );
    }
  }
}