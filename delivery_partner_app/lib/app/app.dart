import 'package:flutter/material.dart';

import '../core/theme/app_theme.dart';
import '../features/auth/pages/login_page.dart';
import 'app_shell.dart';

class FeastoDeliveryPartnerApp extends StatefulWidget {
  const FeastoDeliveryPartnerApp({super.key});

  @override
  State<FeastoDeliveryPartnerApp> createState() =>
      _FeastoDeliveryPartnerAppState();
}

class _FeastoDeliveryPartnerAppState extends State<FeastoDeliveryPartnerApp> {
  bool loggedIn = false;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Feasto Delivery Partner',
      theme: AppTheme.dark,

      home: loggedIn
          ? const AppShell()
          : LoginPage(
              onLogin: () {
                setState(() {
                  loggedIn = true;
                });
              },
            ),
    );
  }
}
