import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';

class HomeHeader extends StatelessWidget {
  const HomeHeader({
    super.key,
    required this.riderName,
    required this.riderInitials,
    required this.onMenuPressed,
    required this.onNotificationsPressed,
  });

  final String riderName;
  final String riderInitials;

  final VoidCallback onMenuPressed;
  final VoidCallback onNotificationsPressed;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
      child: Row(
        children: [
          _buildMenuButton(),

          const Spacer(),

          _buildRiderInfo(),

          const Spacer(),

          _buildNotificationButton(),
        ],
      ),
    );
  }

  Widget _buildMenuButton() {
    return _HeaderButton(
      onPressed: onMenuPressed,
      child: const Icon(
        Icons.menu_rounded,
        size: 20,
        color: AppColors.foreground,
      ),
    );
  }

  Widget _buildRiderInfo() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 36,
          height: 36,
          decoration: const BoxDecoration(
            shape: BoxShape.circle,
            gradient: LinearGradient(
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
              fontSize: 13,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),

        const SizedBox(width: 8),

        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Good evening',
              style: TextStyle(
                color: AppColors.mutedForeground,
                fontSize: 11,
                height: 1,
              ),
            ),

            const SizedBox(height: 3),

            Text(
              riderName,
              style: const TextStyle(
                color: AppColors.foreground,
                fontSize: 13,
                fontWeight: FontWeight.w700,
                height: 1.1,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildNotificationButton() {
    return _HeaderButton(
      onPressed: onNotificationsPressed,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          const Icon(
            Icons.notifications_none_rounded,
            size: 20,
            color: AppColors.foreground,
          ),

          Positioned(
            top: -1,
            right: -1,
            child: Container(
              width: 7,
              height: 7,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.primary,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _HeaderButton extends StatelessWidget {
  const _HeaderButton({required this.onPressed, required this.child});

  final VoidCallback onPressed;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 40,
      height: 40,
      child: Material(
        color: AppColors.secondary,
        borderRadius: BorderRadius.circular(12),
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(12),
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.border),
            ),
            alignment: Alignment.center,
            child: child,
          ),
        ),
      ),
    );
  }
}
