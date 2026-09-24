import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:delivery_partner_app/features/help/models/support_ticket.dart';

import 'new_support_request_sheet.dart';

class SupportRequests extends StatelessWidget {
  const SupportRequests({super.key, required this.tickets});

  final List<SupportTicket> tickets;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                'SUPPORT REQUESTS',
                style: AppTypography.labelMedium.copyWith(
                  color: AppColors.mutedForeground,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 1.2,
                ),
              ),
            ),

            TextButton(
              onPressed: () {
                Get.bottomSheet(
                  const NewSupportRequestSheet(),
                  isScrollControlled: true,
                  backgroundColor: Colors.transparent,
                );
              },
              child: const Text('+ New Request'),
            ),
          ],
        ),

        const SizedBox(height: AppSpacing.sm),

        Container(
          decoration: BoxDecoration(
            color: AppColors.card,
            borderRadius: BorderRadius.circular(AppRadius.xl),
            border: Border.all(color: AppColors.border),
          ),
          child: Column(
            children: [
              for (int i = 0; i < tickets.length; i++)
                _TicketTile(ticket: tickets[i], showTopBorder: i != 0),
            ],
          ),
        ),
      ],
    );
  }
}

class _TicketTile extends StatelessWidget {
  const _TicketTile({required this.ticket, required this.showTopBorder});

  final SupportTicket ticket;
  final bool showTopBorder;

  @override
  Widget build(BuildContext context) {
    final config = _statusConfig(ticket.status);

    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      decoration: BoxDecoration(
        border: showTopBorder
            ? const Border(top: BorderSide(color: AppColors.border))
            : null,
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  ticket.id,
                  style: AppTypography.bodyMedium.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  '${ticket.category} · ${ticket.date}',
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.mutedForeground,
                  ),
                ),
              ],
            ),
          ),

          Container(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.md,
              vertical: AppSpacing.sm,
            ),
            decoration: BoxDecoration(
              color: config.background,
              borderRadius: BorderRadius.circular(AppRadius.pill),
              border: Border.all(color: config.color.withValues(alpha: 0.25)),
            ),
            child: Text(
              config.label,
              style: AppTypography.labelSmall.copyWith(
                color: config.color,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  _TicketStatusConfig _statusConfig(SupportTicketStatus status) {
    switch (status) {
      case SupportTicketStatus.resolved:
        return const _TicketStatusConfig(
          color: AppColors.success,
          background: Color(0x1A22C55E),
          label: 'Resolved ✓',
        );

      case SupportTicketStatus.open:
        return const _TicketStatusConfig(
          color: AppColors.primary,
          background: Color(0x1AFF6B35),
          label: 'Open',
        );

      case SupportTicketStatus.processing:
        return const _TicketStatusConfig(
          color: AppColors.warning,
          background: Color(0x1AF59E0B),
          label: 'In Progress',
        );
    }
  }
}

class _TicketStatusConfig {
  const _TicketStatusConfig({
    required this.color,
    required this.background,
    required this.label,
  });

  final Color color;
  final Color background;
  final String label;
}
