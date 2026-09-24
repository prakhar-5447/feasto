import 'dart:async';

import 'package:delivery_partner_app/core/utils/string_utils.dart';
import 'package:delivery_partner_app/features/auth/controllers/auth_controller.dart';
import 'package:delivery_partner_app/features/home/controllers/home_controller.dart';
import 'package:delivery_partner_app/features/home/models/incoming_order.dart';
import 'package:delivery_partner_app/features/home/models/rider_status.dart';
import 'package:delivery_partner_app/features/notifications/pages/notifications_page.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';

import 'package:delivery_partner_app/features/home/widgets/document_expiry_alert.dart';
import 'package:delivery_partner_app/features/home/widgets/home_header.dart';
import 'package:delivery_partner_app/features/home/widgets/incentive_card.dart';
import 'package:delivery_partner_app/features/home/widgets/nearby_demand.dart';
import 'package:delivery_partner_app/features/home/widgets/quick_actions.dart';
import 'package:delivery_partner_app/features/home/widgets/recent_deliveries.dart';
import 'package:delivery_partner_app/features/home/widgets/rider_status_card.dart';
import 'package:delivery_partner_app/features/home/widgets/today_earnings_card.dart';
import 'package:delivery_partner_app/features/home/widgets/incoming_order_sheet.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final authController = Get.find<AuthController>();
  final homeController = Get.find<HomeController>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            Obx(() {
              final user = authController.user.value;

              return HomeHeader(
                riderName: user?.name ?? '',
                riderInitials: StringUtils.getInitials(user?.name),
                onMenuPressed: () {
                  Scaffold.of(context).openDrawer();
                },
                onNotificationsPressed: () {
                  Get.to(() => const NotificationsPage());
                },
              );
            }),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 28),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const DocumentExpiryAlert(),

                    const SizedBox(height: 16),
                    Obx(() {
                      return RiderStatusCard(
                        status: homeController.riderStatus.value,
                        onStatusChanged: homeController.changeRiderStatus,
                      );
                    }),

                    const SizedBox(height: 16),

                    const TodayEarningsCard(),

                    const SizedBox(height: 16),
                    Obx(() {
                      final status = homeController.riderStatus.value;
                      final incomingOrder = homeController.incomingOrder.value;
                      final requestExpired =
                          homeController.requestExpired.value;

                      return Column(
                        children: [
                          if (status == RiderStatus.online &&
                              incomingOrder == null)
                            const _ReadyForDeliveriesCard(),

                          if (status == RiderStatus.offline)
                            _OfflineCard(
                              onGoOnline: () {
                                homeController.changeRiderStatus(
                                  RiderStatus.online,
                                );
                              },
                            ),

                          if (status == RiderStatus.onBreak)
                            _OnBreakCard(
                              onResume: () {
                                homeController.changeRiderStatus(
                                  RiderStatus.online,
                                );
                              },
                            ),

                          if (requestExpired) ...[
                            const SizedBox(height: 16),
                            const _RequestExpiredCard(),
                          ],
                        ],
                      );
                    }),

                    const SizedBox(height: 16),

                    IncentiveCard(),

                    const SizedBox(height: 20),

                    NearbyDemand(
                      onViewMap: () {
                        homeController.navigate('demand-map');
                      },
                    ),

                    const SizedBox(height: 20),

                    QuickActions(
                      onOrders: () {
                        homeController.navigate('orders');
                      },
                      onEarnings: () {
                        homeController.navigate('earnings');
                      },
                      onHelp: () {
                        homeController.navigate('help');
                      },
                    ),

                    const SizedBox(height: 20),

                    RecentDeliveries(
                      onViewAll: () {
                        homeController.navigate('orders');
                      },
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),

      // Incoming order is handled as a modal bottom sheet.
      //
      // This replaces the React:
      //
      // fixed inset-0 z-50
      // flex items-end
      //
      // overlay.
      bottomSheet: homeController.incomingOrder.value != null
          ? IncomingOrderSheet(
              order: homeController.incomingOrder.value!,
              remainingSeconds: homeController.orderTimer.value,
              onAccept: homeController.acceptOrder,
              onDecline: homeController.declineOrder,
            )
          : null,
    );
  }
}

// ============================================================
// READY FOR DELIVERIES
// ============================================================

class _ReadyForDeliveriesCard extends StatelessWidget {
  const _ReadyForDeliveriesCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.border),
      ),
      child: const Column(
        children: [
          Text('🛵', style: TextStyle(fontSize: 30)),

          SizedBox(height: 8),

          Text(
            'Ready for deliveries',
            style: TextStyle(
              color: AppColors.foreground,
              fontSize: 14,
              fontWeight: FontWeight.w700,
            ),
          ),

          SizedBox(height: 4),

          Text(
            'Stay near restaurants for faster assignments. '
            'New orders appear here.',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: AppColors.mutedForeground,
              fontSize: 12,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}

// ============================================================
// OFFLINE
// ============================================================

class _OfflineCard extends StatelessWidget {
  const _OfflineCard({required this.onGoOnline});

  final VoidCallback onGoOnline;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.border),
        // Flutter equivalent of the React dashed border
      ),
      child: Column(
        children: [
          const Text('💤', style: TextStyle(fontSize: 30)),

          const SizedBox(height: 8),

          const Text(
            "You're Offline",
            style: TextStyle(
              color: AppColors.foreground,
              fontSize: 14,
              fontWeight: FontWeight.w700,
            ),
          ),

          const SizedBox(height: 12),

          ElevatedButton(
            onPressed: onGoOnline,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: AppColors.primaryForeground,
              elevation: 0,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text(
              'Go Online',
              style: TextStyle(fontWeight: FontWeight.w700),
            ),
          ),
        ],
      ),
    );
  }
}

// ============================================================
// ON BREAK
// ============================================================

class _OnBreakCard extends StatelessWidget {
  const _OnBreakCard({required this.onResume});

  final VoidCallback onResume;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.warning.withValues(alpha: 0.06),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.warning.withValues(alpha: 0.20)),
      ),
      child: Column(
        children: [
          const Text('☕', style: TextStyle(fontSize: 30)),

          const SizedBox(height: 8),

          const Text(
            'On Break',
            style: TextStyle(
              color: AppColors.warning,
              fontSize: 14,
              fontWeight: FontWeight.w700,
            ),
          ),

          const SizedBox(height: 4),

          const Text(
            'Orders paused. Resume when ready.',
            style: TextStyle(color: AppColors.mutedForeground, fontSize: 12),
          ),

          const SizedBox(height: 12),

          ElevatedButton(
            onPressed: onResume,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: AppColors.primaryForeground,
              elevation: 0,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text(
              'Resume Deliveries',
              style: TextStyle(fontWeight: FontWeight.w700),
            ),
          ),
        ],
      ),
    );
  }
}

// ============================================================
// EXPIRED REQUEST
// ============================================================

class _RequestExpiredCard extends StatelessWidget {
  const _RequestExpiredCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.danger.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.danger.withValues(alpha: 0.20)),
      ),
      child: const Row(
        children: [
          Text('⏰', style: TextStyle(fontSize: 22)),

          SizedBox(width: 12),

          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Delivery request expired',
                  style: TextStyle(
                    color: AppColors.danger,
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                  ),
                ),

                SizedBox(height: 3),

                Text(
                  'This delivery was assigned to another rider.',
                  style: TextStyle(
                    color: AppColors.mutedForeground,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
