import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/features/earnings/controllers/earnings_controller.dart';
import 'package:delivery_partner_app/features/earnings/models/earning_summary.dart';
import 'package:delivery_partner_app/features/earnings/widgets/daily_breakdown.dart';
import 'package:delivery_partner_app/features/earnings/widgets/earnings_breakdown.dart';
import 'package:delivery_partner_app/features/earnings/widgets/earnings_hero.dart';
import 'package:delivery_partner_app/features/earnings/widgets/payment_history.dart';
import 'package:delivery_partner_app/features/earnings/widgets/payment_info.dart';
import 'package:delivery_partner_app/features/earnings/widgets/settlement_summary.dart';

class EarningsPageContent extends StatelessWidget {
  const EarningsPageContent({
    super.key,
    required this.controller,
    required this.summary,
    required this.filter,
  });

  final EarningsController controller;
  final EarningSummary summary;
  final EarningsFilter filter;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(AppSpacing.lg, 0, AppSpacing.lg, 100),
      children: [
        EarningsHero(filter: filter, summary: summary),

        const SizedBox(height: AppSpacing.lg),

        const SettlementSummary(),

        const SizedBox(height: AppSpacing.lg),

        DailyBreakdown(data: controller.dailyEarnings),

        const SizedBox(height: AppSpacing.lg),

        const EarningsBreakdown(),

        const SizedBox(height: AppSpacing.xl),

        PaymentHistoryList(payments: controller.paymentHistory),

        const SizedBox(height: AppSpacing.lg),

        const PaymentInfo(),
      ],
    );
  }
}
