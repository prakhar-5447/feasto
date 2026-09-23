import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/localization/app_localizations.dart';
import 'package:delivery_partner_app/core/theme/app_theme.dart';
import 'package:delivery_partner_app/features/auth/controllers/auth_controller.dart';
import 'package:delivery_partner_app/features/auth/pages/login_page.dart';

import 'app_bindings.dart';
import 'app_shell.dart';

class FeastoDeliveryPartnerApp extends StatelessWidget {
  const FeastoDeliveryPartnerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Feasto Delivery Partner',

      theme: AppTheme.dark,
      initialBinding: AppBindings(),

      supportedLocales: AppLocalizations.supportedLocales,

      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],

      home: const _AppRoot(),
    );
  }
}

class _AppRoot extends StatelessWidget {
  const _AppRoot();

  @override
  Widget build(BuildContext context) {
    final authController = Get.find<AuthController>();
    return Obx(() {
      switch (authController.authStatus.value) {
        case AuthStatus.unknown:
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );

        case AuthStatus.unauthenticated:
          return const LoginPage();

        case AuthStatus.authenticated:
          return const AppShell();
      }
    });
  }
}
