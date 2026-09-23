import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';

class LoginHero extends StatelessWidget {
  const LoginHero({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(24, 48, 24, 40),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF1A0F07), Color(0xFF1E1410), Color(0xFF0D0F14)],
        ),
      ),
      child: Column(
        children: [
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(18),
              gradient: const LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [AppColors.primary, Color(0xFFFF9A5C)],
              ),
              boxShadow: const [
                BoxShadow(blurRadius: 20, offset: Offset(0, 8)),
              ],
            ),
            child: const Icon(
              Icons.delivery_dining_rounded,
              size: 42,
              color: AppColors.primaryForeground,
            ),
          ),

          const SizedBox(height: 16),

          RichText(
            text: TextSpan(
              style: Theme.of(context).textTheme.headlineMedium,
              children: const [
                TextSpan(
                  text: 'feasto ',
                  style: TextStyle(color: AppColors.primaryForeground),
                ),
                TextSpan(
                  text: 'partner',
                  style: TextStyle(color: AppColors.primary),
                ),
              ],
            ),
          ),

          const SizedBox(height: 4),

          Text(
            'Deliver. Earn. Grow.',
            style: Theme.of(context).textTheme.bodyMedium
                ?.copyWith(color: AppColors.textMuted),
          ),
        ],
      ),
    );
  }
}
