import 'package:delivery_partner_app/features/app_settings/controllers/app_settings_controller.dart';
import 'package:delivery_partner_app/features/app_settings/services/app_settings_service.dart';
import 'package:delivery_partner_app/features/delivery_preferences/controllers/delivery_preferences_controller.dart';
import 'package:delivery_partner_app/features/delivery_preferences/services/delivery_preferences_service.dart';
import 'package:delivery_partner_app/features/earnings/controllers/earnings_controller.dart';
import 'package:delivery_partner_app/features/earnings/services/earnings_service.dart';
import 'package:delivery_partner_app/features/help/controllers/help_controller.dart';
import 'package:delivery_partner_app/features/help/services/help_service.dart';
import 'package:delivery_partner_app/features/home/controllers/home_controller.dart';
import 'package:delivery_partner_app/features/home/services/home_services.dart';
import 'package:delivery_partner_app/features/incentives/controllers/incentives_controller.dart';
import 'package:delivery_partner_app/features/incentives/services/incentives_service.dart';
import 'package:delivery_partner_app/features/language/controllers/language_controller.dart';
import 'package:delivery_partner_app/features/language/services/language_service.dart';
import 'package:delivery_partner_app/features/orders/controllers/orders_controller.dart';
import 'package:delivery_partner_app/features/orders/services/order_service.dart';
import 'package:delivery_partner_app/features/performance/controllers/performance_controller.dart';
import 'package:delivery_partner_app/features/performance/services/performance_service.dart';
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

    Get.lazyPut<HelpService>(() => HelpService(), fenix: true);

    Get.lazyPut<HelpController>(
      () => HelpController(helpService: Get.find<HelpService>()),
      fenix: true,
    );

    Get.lazyPut<IncentivesService>(() => IncentivesService(), fenix: true);

    Get.lazyPut<IncentivesController>(
      () => IncentivesController(
        incentivesService: Get.find<IncentivesService>(),
      ),
      fenix: true,
    );

    Get.lazyPut<DeliveryPreferencesService>(
      () => DeliveryPreferencesService(),
      fenix: true,
    );

    Get.lazyPut<DeliveryPreferencesController>(
      () => DeliveryPreferencesController(
        deliveryPreferencesService: Get.find<DeliveryPreferencesService>(),
      ),
      fenix: true,
    );

    Get.lazyPut<PerformanceService>(() => PerformanceService(), fenix: true);

    Get.lazyPut<PerformanceController>(
      () => PerformanceController(
        performanceService: Get.find<PerformanceService>(),
      ),
      fenix: true,
    );

    Get.lazyPut<AppSettingsService>(() => AppSettingsService(), fenix: true);

    Get.lazyPut<AppSettingsController>(
      () => AppSettingsController(
        appSettingsService: Get.find<AppSettingsService>(),
      ),
      fenix: true,
    );

    Get.lazyPut<LanguageService>(() => LanguageService(), fenix: true);

    Get.lazyPut<LanguageController>(
      () => LanguageController(languageService: Get.find<LanguageService>()),
      fenix: true,
    );
  }
}
