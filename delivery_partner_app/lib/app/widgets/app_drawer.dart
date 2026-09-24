import 'package:flutter/material.dart';

import '../../core/theme/app_colors.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({
    super.key,
    required this.riderName,
    required this.riderInitials,
    required this.isOnline,
    required this.onNavigate,
    required this.onLogout,
  });

  final String riderName;
  final String riderInitials;
  final bool isOnline;

  final ValueChanged<String> onNavigate;
  final VoidCallback onLogout;

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: AppColors.background,
      child: SafeArea(
        child: Column(
          children: [
            _buildHeader(context),

            const SizedBox(height: 12),

            Expanded(
              child: ListView(
                padding: EdgeInsets.zero,
                children: [
                  _buildSectionLabel('DELIVERIES'),

                  _buildItem(
                    icon: Icons.home_outlined,
                    label: 'Home',
                    page: 'home',
                  ),

                  _buildItem(
                    icon: Icons.receipt_long_outlined,
                    label: 'Orders',
                    page: 'orders',
                  ),

                  _buildItem(
                    icon: Icons.account_balance_wallet_outlined,
                    label: 'Earnings',
                    page: 'earnings',
                  ),

                  const SizedBox(height: 12),

                  _buildSectionLabel('PERFORMANCE'),

                  _buildItem(
                    icon: Icons.bar_chart_rounded,
                    label: 'Performance',
                    page: 'performance',
                  ),

                  _buildItem(
                    icon: Icons.emoji_events_outlined,
                    label: 'Incentives',
                    page: 'incentives',
                  ),

                  _buildItem(
                    icon: Icons.delivery_dining,
                    label: 'Delivery History',
                    page: 'delivery-history',
                  ),

                  const SizedBox(height: 12),

                  _buildSectionLabel('SUPPORT'),

                  _buildItem(
                    icon: Icons.question_mark,
                    label: 'Help Center',
                    page: 'help',
                  ),

                  const SizedBox(height: 12),

                  _buildSectionLabel('ACCOUNT'),

                  _buildItem(
                    icon: Icons.notifications_none_rounded,
                    label: 'Notifications',
                    page: 'notification-settings',
                  ),

                  _buildItem(
                    icon: Icons.location_pin,
                    label: 'Delivery Preferences',
                    page: 'delivery-preferences',
                  ),

                  _buildItem(
                    icon: Icons.language,
                    label: 'Language',
                    page: 'language',
                  ),

                  _buildItem(
                    icon: Icons.settings,
                    label: 'App Settings',
                    page: 'app-settings',
                  ),
                ],
              ),
            ),

            _buildLogout(),

            const SizedBox(height: 12),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {
          Navigator.of(context).pop();
          onNavigate('profile');
        },
        child: Container(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
          decoration: const BoxDecoration(
            border: Border(bottom: BorderSide(color: AppColors.border)),
          ),
          child: Row(
            children: [
              Container(
                width: 52,
                height: 52,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: const LinearGradient(
                    colors: [AppColors.primary, Color(0xFFFF9A5C)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                alignment: Alignment.center,
                child: Text(
                  riderInitials,
                  style: const TextStyle(
                    color: AppColors.primaryForeground,
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),

              const SizedBox(width: 12),

              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      riderName,
                      style: const TextStyle(
                        color: AppColors.foreground,
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                      ),
                    ),

                    const SizedBox(height: 4),

                    Row(
                      children: [
                        Container(
                          width: 8,
                          height: 8,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: isOnline
                                ? AppColors.success
                                : AppColors.mutedForeground,
                          ),
                        ),

                        const SizedBox(width: 6),

                        Text(
                          isOnline ? 'Online' : 'Offline',
                          style: TextStyle(
                            color: isOnline
                                ? AppColors.success
                                : AppColors.mutedForeground,
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const Icon(
                Icons.chevron_right_rounded,
                color: AppColors.mutedForeground,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionLabel(String label) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 8),
      child: Text(
        label,
        style: const TextStyle(
          color: AppColors.mutedForeground,
          fontSize: 10,
          fontWeight: FontWeight.w700,
          letterSpacing: 1.2,
        ),
      ),
    );
  }

  Widget _buildItem({
    required IconData icon,
    required String label,
    required String page,
  }) {
    return Builder(
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 2),
          child: ListTile(
            onTap: () {
              Navigator.of(context).pop();
              onNavigate(page);
            },
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            leading: Icon(icon, size: 21, color: AppColors.mutedForeground),
            title: Text(
              label,
              style: const TextStyle(
                color: AppColors.foreground,
                fontSize: 14,
                fontWeight: FontWeight.w500,
              ),
            ),
            contentPadding: const EdgeInsets.symmetric(horizontal: 12),
            minTileHeight: 48,
          ),
        );
      },
    );
  }

  Widget _buildLogout() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      child: ListTile(
        onTap: onLogout,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        leading: const Icon(
          Icons.logout_rounded,
          size: 21,
          color: AppColors.danger,
        ),
        title: const Text(
          'Logout',
          style: TextStyle(
            color: AppColors.danger,
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 12),
        minTileHeight: 48,
      ),
    );
  }
}
