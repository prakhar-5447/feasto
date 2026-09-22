import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'core/localization/app_localizations.dart';
import 'core/theme/app_theme.dart';

void main() {
  runApp(const FeastoDeliveryPartnerApp());
}

class FeastoDeliveryPartnerApp extends StatelessWidget {
  const FeastoDeliveryPartnerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,

      title: 'Feasto Delivery Partner',

      theme: AppTheme.light,

      // Supported languages
      supportedLocales: AppLocalizations.supportedLocales,

      // Flutter's built-in localization support
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],

      home: const Scaffold(
        body: Center(child: Text('Feasto Delivery Partner')),
      ),
    );
  }
}
