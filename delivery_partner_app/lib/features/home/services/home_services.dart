import 'package:delivery_partner_app/core/network/api_client.dart';
import 'package:delivery_partner_app/features/home/models/rider_status.dart';

class HomeService {
  HomeService({required this._apiClient});

  final ApiClient _apiClient;

  Future<HomeResponse> getHomeData() async {
    // TODO: Replace with actual API call when backend is ready.
    //
    // final response = await _apiClient.get(
    //   ApiEndpoints.home,
    // );
    //
    // return HomeResponse.fromJson(response);

    await Future.delayed(const Duration(milliseconds: 500));

    return const HomeResponse(
      todayEarnings: 1240.0,
      riderStatus: RiderStatus.offline,
    );
  }
}

class HomeResponse {
  const HomeResponse({required this.todayEarnings, required this.riderStatus});

  final double todayEarnings;
  final RiderStatus riderStatus;

  factory HomeResponse.fromJson(Map<String, dynamic> json) {
    return HomeResponse(
      todayEarnings: json['todayEarnings'] as double,
      riderStatus: json['riderStatus'] as RiderStatus,
    );
  }
}
