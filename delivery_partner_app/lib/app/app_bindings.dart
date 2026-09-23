import 'package:delivery_partner_app/features/earnings/controllers/earnings_controller.dart';
import 'package:delivery_partner_app/features/earnings/services/earnings_service.dart';
import 'package:delivery_partner_app/features/home/controllers/home_controller.dart';
import 'package:delivery_partner_app/features/home/services/home_services.dart';
import 'package:delivery_partner_app/features/orders/controllers/orders_controller.dart';
import 'package:delivery_partner_app/features/orders/services/order_service.dart';
import 'package:delivery_partner_app/features/profile/controllers/profile_controller.dart';
import 'package:delivery_partner_app/features/profile/services/profile_service.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/network/api_client.dart';
import 'package:delivery_partner_app/features/auth/controllers/auth_controller.dart';
import 'package:delivery_partner_app/features/auth/services/auth_service.dart';

class AppBindings extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<ApiClient>(() => ApiClient());

    Get.lazyPut<AuthService>(
      () => AuthService(apiClient: Get.find<ApiClient>()),
      fenix: true,
    );

    Get.lazyPut<AuthController>(
      () => AuthController(authService: Get.find<AuthService>()),
      fenix: true,
    );

    Get.lazyPut<HomeService>(
      () => HomeService(apiClient: Get.find<ApiClient>()),
      fenix: true,
    );

    Get.lazyPut<HomeController>(
      () => HomeController(homeService: Get.find<HomeService>()),
      fenix: true,
    );

    Get.lazyPut<OrdersService>(
      () => OrdersService(apiClient: Get.find<ApiClient>()),
      fenix: true,
    );

    Get.lazyPut<OrdersController>(
      () => OrdersController(ordersService: Get.find<OrdersService>()),
      fenix: true,
    );

    Get.lazyPut<ProfileService>(
      () => ProfileService(apiClient: Get.find<ApiClient>()),
      fenix: true,
    );

    Get.lazyPut<ProfileController>(
      () => ProfileController(profileService: Get.find<ProfileService>()),
      fenix: true,
    );

    Get.lazyPut<EarningsService>(
      () => EarningsService(apiClient: Get.find<ApiClient>()),
      fenix: true,
    );

    Get.lazyPut<EarningsController>(
      () => EarningsController(earningsService: Get.find<EarningsService>()),
      fenix: true,
    );
  }
}
