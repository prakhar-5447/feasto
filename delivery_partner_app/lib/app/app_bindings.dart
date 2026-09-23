import 'package:delivery_partner_app/features/home/controllers/home_controller.dart';
import 'package:delivery_partner_app/features/home/services/home_services.dart';
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
  }
}
