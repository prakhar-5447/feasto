import 'package:get/get.dart';

import 'package:delivery_partner_app/core/storage/token_storage.dart';
import 'package:delivery_partner_app/features/auth/controllers/auth_controller.dart';
import 'package:delivery_partner_app/features/auth/services/auth_service.dart';

class AppBindings extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<TokenStorage>(() => TokenStorage(), fenix: true);

    Get.lazyPut<AuthService>(
      () => AuthService(tokenStorage: Get.find<TokenStorage>()),
      fenix: true,
    );

    Get.lazyPut<AuthController>(
      () => AuthController(authService: Get.find<AuthService>()),
      fenix: true,
    );
  }
}
