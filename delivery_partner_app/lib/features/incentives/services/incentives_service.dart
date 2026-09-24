import 'package:flutter/material.dart';

import 'package:delivery_partner_app/features/incentives/models/completed_incentive.dart';
import 'package:delivery_partner_app/features/incentives/models/incentive.dart';

class IncentivesService {
  Future<List<Incentive>> getActiveIncentives() async {
    await Future.delayed(const Duration(milliseconds: 400));

    return [
      Incentive(
        id: 1,
        name: 'Weekend Challenge',
        description: 'Complete 8 deliveries this weekend',
        bonus: '₹150',
        progress: 6,
        total: 8,
        deadline: 'Ends Sun 11:59 PM',
        color: const Color(0xFFFF6B35),
        backgroundColor: const Color(0x14FF6B35),
      ),

      Incentive(
        id: 2,
        name: 'Peak Hour Bonus',
        description: '₹20 extra per delivery · 6 PM – 9 PM',
        bonus: '+₹20/order',
        progress: null,
        total: null,
        deadline: 'Active now',
        color: const Color(0xFFFFB347),
        backgroundColor: const Color(0x14FFB347),
      ),

      Incentive(
        id: 3,
        name: 'Top Earner',
        description: 'Be in top 10% this week',
        bonus: '₹500',
        progress: 22,
        total: 30,
        deadline: 'Ends Sun',
        color: const Color(0xFF22C55E),
        backgroundColor: const Color(0x1422C55E),
      ),
    ];
  }

  Future<List<CompletedIncentive>> getCompletedIncentives() async {
    await Future.delayed(const Duration(milliseconds: 300));

    return const [
      CompletedIncentive(
        name: 'Monsoon Surge',
        bonus: '₹200',
        earned: true,
        date: 'Aug 28',
      ),
      CompletedIncentive(
        name: '5-Star Week',
        bonus: '₹100',
        earned: true,
        date: 'Aug 25',
      ),
      CompletedIncentive(
        name: 'Speed Champion',
        bonus: '₹150',
        earned: false,
        date: 'Aug 21',
      ),
    ];
  }

  Future<double> getWeeklyBonus() async {
    await Future.delayed(const Duration(milliseconds: 200));

    return 450;
  }
}
