import 'package:delivery_partner_app/features/app_settings/pages/app_settings_page.dart';
import 'package:delivery_partner_app/features/delivery_preferences/pages/delivery_preferences_page.dart';
import 'package:delivery_partner_app/features/incentives/pages/incentives_page.dart';
import 'package:delivery_partner_app/features/performance/pages/performance_page.dart';
import 'package:flutter/material.dart';

import 'package:get/get.dart';

import 'package:delivery_partner_app/features/home/pages/home_page.dart';
import 'package:delivery_partner_app/features/orders/pages/order_page.dart';
import 'package:delivery_partner_app/features/earnings/pages/earnings_page.dart';
import 'package:delivery_partner_app/features/profile/pages/profile_page.dart';
import 'package:delivery_partner_app/features/help/pages/help_page.dart';

import 'widgets/app_bottom_navigation_bar.dart';
import 'widgets/app_drawer.dart';

class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int currentIndex = 0;

  final List<Widget> pages = const [
    HomePage(),
    OrdersPage(),
    EarningsPage(),
    ProfilePage(),
  ];

  void handleNavigate(String page) {
    switch (page) {
      case 'home':
        setState(() {
          currentIndex = 0;
        });
        break;

      case 'orders':
        setState(() {
          currentIndex = 1;
        });
        break;

      case 'earnings':
        setState(() {
          currentIndex = 2;
        });
        break;

      case 'profile':
        setState(() {
          currentIndex = 3;
        });
        break;

      case 'performance':
        Get.to(() => const PerformancePage());
        break;

      case 'incentives':
        Get.to(() => const IncentivesPage());
        break;

      case 'help':
        Get.to(() => const HelpPage());
        break;

      case 'delivery-preferences':
        Get.to(() => const DeliveryPreferencesPage());
        break;

      case 'app-settings':
        Get.to(() => const AppSettingsPage());
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: AppDrawer(
        riderName: 'Rahul Kumar',
        riderInitials: 'RK',
        isOnline: true,
        onNavigate: handleNavigate,
        onLogout: () {
          // Later connect this to auth state.
        },
      ),

      body: IndexedStack(index: currentIndex, children: pages),

      bottomNavigationBar: AppBottomNavigationBar(
        currentIndex: currentIndex,
        onTabSelected: (index) {
          setState(() {
            currentIndex = index;
          });
        },
      ),
    );
  }
}
