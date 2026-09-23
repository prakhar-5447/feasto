import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/earnings/models/payment_history.dart';

class PaymentHistoryList extends StatelessWidget {
  const PaymentHistoryList({super.key, required this.payments});

  final List<PaymentHistory> payments;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'PAYMENT HISTORY',
          style: AppTypography.labelMedium.copyWith(
            color: AppColors.mutedForeground,
            letterSpacing: 1,
            fontWeight: FontWeight.w700,
          ),
        ),

        const SizedBox(height: AppSpacing.sm),

        Container(
          decoration: BoxDecoration(
            color: AppColors.card,
            borderRadius: BorderRadius.circular(AppRadius.xl),
            border: Border.all(color: AppColors.border),
          ),
          clipBehavior: Clip.antiAlias,
          child: Column(
            children: payments.asMap().entries.map((entry) {
              final payment = entry.value;

              return _PaymentRow(payment: payment, showBorder: entry.key != 0);
            }).toList(),
          ),
        ),
      ],
    );
  }
}

class _PaymentRow extends StatelessWidget {
  const _PaymentRow({required this.payment, required this.showBorder});

  final PaymentHistory payment;
  final bool showBorder;

  @override
  Widget build(BuildContext context) {
    final style = _statusStyle;

    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      decoration: BoxDecoration(
        border: showBorder
            ? const Border(top: BorderSide(color: AppColors.border))
            : null,
      ),
      child: Row(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                payment.date,
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.foreground,
                  fontWeight: FontWeight.w600,
                ),
              ),
              Text(
                'Weekly payout',
                style: AppTypography.labelSmall.copyWith(
                  color: AppColors.mutedForeground,
                ),
              ),
            ],
          ),

          const Spacer(),

          Text(
            '₹${payment.amount.toStringAsFixed(0)}',
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.foreground,
              fontWeight: FontWeight.w700,
            ),
          ),

          const SizedBox(width: AppSpacing.sm),

          Container(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.sm,
              vertical: AppSpacing.xs,
            ),
            decoration: BoxDecoration(
              color: style.background,
              borderRadius: BorderRadius.circular(AppRadius.pill),
            ),
            child: Text(
              style.label,
              style: AppTypography.labelSmall.copyWith(
                color: style.color,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  _PaymentStatusStyle get _statusStyle {
    switch (payment.status) {
      case PaymentStatus.paid:
        return const _PaymentStatusStyle(
          color: AppColors.success,
          background: Color(0x1A22C55E),
          label: 'Paid ✓',
        );

      case PaymentStatus.pending:
        return const _PaymentStatusStyle(
          color: AppColors.warning,
          background: Color(0x1AF59E0B),
          label: 'Pending',
        );

      case PaymentStatus.processing:
        return const _PaymentStatusStyle(
          color: AppColors.primary,
          background: Color(0x1AFF6B35),
          label: 'Processing',
        );

      case PaymentStatus.failed:
        return const _PaymentStatusStyle(
          color: AppColors.danger,
          background: Color(0x1AEF4444),
          label: 'Failed',
        );
    }
  }
}

class _PaymentStatusStyle {
  const _PaymentStatusStyle({
    required this.color,
    required this.background,
    required this.label,
  });

  final Color color;
  final Color background;
  final String label;
}
