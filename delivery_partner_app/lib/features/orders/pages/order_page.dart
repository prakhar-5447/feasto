import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/features/orders/controllers/orders_controller.dart';
import 'package:delivery_partner_app/features/orders/models/order.dart';
import 'package:delivery_partner_app/features/orders/models/order_filter.dart';
import 'package:delivery_partner_app/features/orders/models/order_status.dart';
import 'package:delivery_partner_app/features/orders/pages/order_detail_page.dart';
import 'package:delivery_partner_app/features/orders/widgets/order_card.dart';
import 'package:delivery_partner_app/features/orders/widgets/order_empty_state.dart';

class OrdersPage extends StatelessWidget {
  const OrdersPage({super.key});

  void onOrderTap(Order order) {
    Get.to(() => OrderDetailPage(order: order));
  }

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<OrdersController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            Obx(() {
              return _OrdersHeader(
                selectedStatus: controller.selectedStatus.value,
                selectedFilter: controller.selectedFilter.value,
                onStatusChanged: controller.changeStatus,
                onFilterChanged: controller.changeFilter,
              );
            }),

            Expanded(
              child: Obx(() {
                if (controller.isLoading.value) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (controller.orders.isEmpty) {
                  return OrderEmptyState(
                    status: controller.selectedStatus.value,
                  );
                }

                return ListView.separated(
                  padding: const EdgeInsets.all(16),
                  itemCount: controller.orders.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final order = controller.orders[index];

                    return OrderCard(
                      order: order,
                      onTap: () => onOrderTap(order),
                    );
                  },
                );
              }),
            ),
          ],
        ),
      ),
    );
  }
}

class _OrdersHeader extends StatelessWidget {
  const _OrdersHeader({
    required this.selectedStatus,
    required this.selectedFilter,
    required this.onStatusChanged,
    required this.onFilterChanged,
  });

  final OrderStatus selectedStatus;
  final OrderFilter selectedFilter;

  final ValueChanged<OrderStatus> onStatusChanged;
  final ValueChanged<OrderFilter> onFilterChanged;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 24, 16, 16),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: Color(0xFF2A2D3E))),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Order History',
            style: TextStyle(
              color: Color(0xFFF0F2F5),
              fontSize: 20,
              fontWeight: FontWeight.w800,
            ),
          ),

          const SizedBox(height: 16),

          _StatusTabs(
            selectedStatus: selectedStatus,
            onChanged: onStatusChanged,
          ),

          const SizedBox(height: 12),

          _FilterChips(
            selectedFilter: selectedFilter,
            onChanged: onFilterChanged,
          ),
        ],
      ),
    );
  }
}

class _StatusTabs extends StatelessWidget {
  const _StatusTabs({required this.selectedStatus, required this.onChanged});

  final OrderStatus selectedStatus;
  final ValueChanged<OrderStatus> onChanged;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: const Color(0xFF1E2130),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          _TabButton(
            label: 'Active',
            selected: selectedStatus == OrderStatus.active,
            onTap: () => onChanged(OrderStatus.active),
          ),
          _TabButton(
            label: 'Completed',
            selected: selectedStatus == OrderStatus.completed,
            onTap: () => onChanged(OrderStatus.completed),
          ),
          _TabButton(
            label: 'Cancelled',
            selected: selectedStatus == OrderStatus.cancelled,
            onTap: () => onChanged(OrderStatus.cancelled),
          ),
        ],
      ),
    );
  }
}

class _TabButton extends StatelessWidget {
  const _TabButton({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: selected ? const Color(0xFF171A23) : Colors.transparent,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: TextStyle(
              color: selected
                  ? const Color(0xFFF0F2F5)
                  : const Color(0xFF6B7280),
              fontSize: 12,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
      ),
    );
  }
}

class _FilterChips extends StatelessWidget {
  const _FilterChips({required this.selectedFilter, required this.onChanged});

  final OrderFilter selectedFilter;
  final ValueChanged<OrderFilter> onChanged;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        _FilterChip(
          label: 'Today',
          selected: selectedFilter == OrderFilter.today,
          onTap: () => onChanged(OrderFilter.today),
        ),
        const SizedBox(width: 8),
        _FilterChip(
          label: 'This Week',
          selected: selectedFilter == OrderFilter.thisWeek,
          onTap: () => onChanged(OrderFilter.thisWeek),
        ),
        const SizedBox(width: 8),
        _FilterChip(
          label: 'This Month',
          selected: selectedFilter == OrderFilter.thisMonth,
          onTap: () => onChanged(OrderFilter.thisMonth),
        ),
      ],
    );
  }
}

class _FilterChip extends StatelessWidget {
  const _FilterChip({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: selected ? const Color(0xFFFF6B35) : const Color(0xFF252836),
          borderRadius: BorderRadius.circular(999),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: selected ? Colors.white : const Color(0xFF6B7280),
            fontSize: 12,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
