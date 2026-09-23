import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';

class TodayEarningsCard extends StatelessWidget {
  const TodayEarningsCard({
    super.key,
    this.earnings = '₹842',
    this.change = '+12%',
    this.yesterdayEarnings = '₹751',
    this.deliveries = '6',
    this.onlineTime = '7h 24m',
    this.averageOrder = '₹140',
  });

  final String earnings;
  final String change;
  final String yesterdayEarnings;
  final String deliveries;
  final String onlineTime;
  final String averageOrder;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(18),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [AppColors.primary, AppColors.primaryDark],
        ),
      ),
      child: Stack(
        children: [
          _buildBackgroundDecoration(),

          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Today's Earnings",
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: AppColors.primaryForeground.withValues(alpha: 0.70),
                  fontWeight: FontWeight.w500,
                ),
              ),

              const SizedBox(height: 2),

              Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    earnings,
                    style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                      color: AppColors.primaryForeground,
                      fontWeight: FontWeight.w900,
                      height: 1.1,
                    ),
                  ),

                  const SizedBox(width: 8),

                  Padding(
                    padding: const EdgeInsets.only(bottom: 5),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 3,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.primaryForeground.withValues(
                          alpha: 0.18,
                        ),
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Text(
                        '↑ $change',
                        style: Theme.of(context).textTheme.labelSmall?.copyWith(
                          color: AppColors.primaryForeground,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 2),

              Text(
                'vs $yesterdayEarnings yesterday',
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: AppColors.primaryForeground.withValues(alpha: 0.60),
                ),
              ),

              const SizedBox(height: 18),

              Row(
                children: [
                  Expanded(
                    child: _EarningsStat(
                      value: deliveries,
                      label: 'Deliveries',
                    ),
                  ),

                  _buildDivider(),

                  Expanded(
                    child: _EarningsStat(value: onlineTime, label: 'Online'),
                  ),

                  _buildDivider(),

                  Expanded(
                    child: _EarningsStat(
                      value: averageOrder,
                      label: 'Avg/order',
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBackgroundDecoration() {
    return Positioned(
      right: -50,
      top: -50,
      child: Container(
        width: 140,
        height: 140,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: AppColors.primaryForeground.withValues(alpha: 0.10),
        ),
      ),
    );
  }

  Widget _buildDivider() {
    return Container(
      width: 1,
      height: 34,
      color: AppColors.primaryForeground.withValues(alpha: 0.20),
    );
  }
}

class _EarningsStat extends StatelessWidget {
  const _EarningsStat({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          value,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            color: AppColors.primaryForeground,
            fontWeight: FontWeight.w700,
          ),
        ),

        const SizedBox(height: 2),

        Text(
          label,
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
            color: AppColors.primaryForeground.withValues(alpha: 0.60),
          ),
        ),
      ],
    );
  }
}
