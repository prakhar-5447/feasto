import 'dart:async';

import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../widgets/document_expiry_alert.dart';
import '../widgets/home_header.dart';
import '../widgets/incentive_card.dart';
import '../widgets/nearby_demand.dart';
import '../widgets/quick_actions.dart';
import '../widgets/recent_deliveries.dart';
import '../widgets/rider_status_card.dart';
import '../widgets/today_earnings_card.dart';
import '../widgets/incoming_order_sheet.dart';

enum RiderStatus { offline, online, onBreak }

class IncomingOrder {
  const IncomingOrder({
    required this.id,
    required this.restaurant,
    required this.restaurantArea,
    required this.pickupDistance,
    required this.customerName,
    required this.deliveryArea,
    required this.deliveryDistance,
    required this.totalDistance,
    required this.earnings,
    required this.items,
    required this.eta,
  });

  final String id;
  final String restaurant;
  final String restaurantArea;
  final String pickupDistance;
  final String customerName;
  final String deliveryArea;
  final String deliveryDistance;
  final String totalDistance;
  final String earnings;
  final int items;
  final String eta;
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  RiderStatus riderStatus = RiderStatus.online;

  IncomingOrder? incomingOrder;

  int orderTimer = 28;

  bool requestExpired = false;

  Timer? incomingOrderTimer;
  Timer? countdownTimer;
  Timer? expiredMessageTimer;

  static const mockOrder = IncomingOrder(
    id: '#FST-29381',
    restaurant: 'Spice Garden Kitchen',
    restaurantArea: 'Koramangala',
    pickupDistance: '1.8 km',
    customerName: 'Priya S.',
    deliveryArea: 'HSR Layout, Sec 2',
    deliveryDistance: '3.4 km',
    totalDistance: '5.2 km',
    earnings: '₹74',
    items: 3,
    eta: '~18 min',
  );

  @override
  void initState() {
    super.initState();

    _simulateIncomingOrder();
  }

  @override
  void dispose() {
    incomingOrderTimer?.cancel();
    countdownTimer?.cancel();
    expiredMessageTimer?.cancel();

    super.dispose();
  }

  // ------------------------------------------------------------
  // ORDER SIMULATION
  // ------------------------------------------------------------

  void _simulateIncomingOrder() {
    incomingOrderTimer?.cancel();

    if (riderStatus != RiderStatus.online) {
      return;
    }

    incomingOrderTimer = Timer(const Duration(seconds: 4), () {
      if (!mounted || riderStatus != RiderStatus.online) {
        return;
      }

      setState(() {
        incomingOrder = mockOrder;
        orderTimer = 28;
        requestExpired = false;
      });

      _startOrderCountdown();
    });
  }

  void _startOrderCountdown() {
    countdownTimer?.cancel();

    countdownTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) {
        timer.cancel();
        return;
      }

      if (orderTimer <= 1) {
        timer.cancel();

        setState(() {
          incomingOrder = null;
          orderTimer = 0;
          requestExpired = true;
        });

        _showExpiredMessage();

        return;
      }

      setState(() {
        orderTimer--;
      });
    });
  }

  void _showExpiredMessage() {
    expiredMessageTimer?.cancel();

    expiredMessageTimer = Timer(const Duration(seconds: 3), () {
      if (!mounted) return;

      setState(() {
        requestExpired = false;
      });
    });
  }

  // ------------------------------------------------------------
  // RIDER STATUS
  // ------------------------------------------------------------

  void changeRiderStatus(RiderStatus status) {
    setState(() {
      riderStatus = status;

      if (status != RiderStatus.online) {
        incomingOrder = null;
        incomingOrderTimer?.cancel();
        countdownTimer?.cancel();
      }
    });

    if (status == RiderStatus.online) {
      _simulateIncomingOrder();
    }
  }

  // ------------------------------------------------------------
  // ORDER ACTIONS
  // ------------------------------------------------------------

  void acceptOrder() {
    if (incomingOrder == null) {
      return;
    }

    final order = incomingOrder!;

    setState(() {
      incomingOrder = null;
    });

    countdownTimer?.cancel();

    // Temporary.
    //
    // Later this will navigate to:
    //
    // MapPage(
    //   orderData: order,
    //   phase: DeliveryPhase.goingToRestaurant,
    // )
    debugPrint('Accepted order ${order.id}');
  }

  void declineOrder() {
    setState(() {
      incomingOrder = null;
    });

    countdownTimer?.cancel();
  }

  // ------------------------------------------------------------
  // NAVIGATION
  // ------------------------------------------------------------

  void navigate(String page) {
    debugPrint('Navigate to: $page');

    // The AppShell currently owns the main navigation.
    //
    // Later we will replace this with the actual Flutter
    // routing solution.
  }

  // ------------------------------------------------------------
  // BUILD
  // ------------------------------------------------------------

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            HomeHeader(
              riderName: 'Rahul Kumar',
              riderInitials: 'RK',
              onMenuPressed: () {
                Scaffold.of(context).openDrawer();
              },
              onNotificationsPressed: () {
                navigate('notifications');
              },
            ),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 28),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const DocumentExpiryAlert(),

                    const SizedBox(height: 16),

                    RiderStatusCard(
                      status: riderStatus,
                      onStatusChanged: changeRiderStatus,
                    ),

                    const SizedBox(height: 16),

                    const TodayEarningsCard(),

                    const SizedBox(height: 16),

                    if (riderStatus == RiderStatus.online &&
                        incomingOrder == null)
                      const _ReadyForDeliveriesCard(),

                    if (riderStatus == RiderStatus.offline)
                      _OfflineCard(
                        onGoOnline: () {
                          changeRiderStatus(RiderStatus.online);
                        },
                      ),

                    if (riderStatus == RiderStatus.onBreak)
                      _OnBreakCard(
                        onResume: () {
                          changeRiderStatus(RiderStatus.online);
                        },
                      ),

                    if (requestExpired) ...[
                      const SizedBox(height: 16),
                      const _RequestExpiredCard(),
                    ],

                    const SizedBox(height: 16),

                    IncentiveCard(),

                    const SizedBox(height: 20),

                    NearbyDemand(
                      onViewMap: () {
                        navigate('demand-map');
                      },
                    ),

                    const SizedBox(height: 20),

                    QuickActions(
                      onOrders: () {
                        navigate('orders');
                      },
                      onEarnings: () {
                        navigate('earnings');
                      },
                      onHelp: () {
                        navigate('help');
                      },
                    ),

                    const SizedBox(height: 20),

                    RecentDeliveries(
                      onViewAll: () {
                        navigate('orders');
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
      bottomSheet: incomingOrder != null
          ? IncomingOrderSheet(
              order: incomingOrder!,
              remainingSeconds: orderTimer,
              onAccept: acceptOrder,
              onDecline: declineOrder,
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
