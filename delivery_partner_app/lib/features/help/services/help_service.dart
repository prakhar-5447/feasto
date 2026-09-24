import 'package:delivery_partner_app/features/help/models/faq.dart';
import 'package:delivery_partner_app/features/help/models/support_ticket.dart';

class HelpService {
  Future<List<Faq>> getFaqs() async {
    await Future.delayed(const Duration(milliseconds: 300));

    return const [
      Faq(
        question: 'How do I cancel an order?',
        answer: "During an active delivery, tap the Help icon (?) at the top right, then select 'Cancel Order'. You must provide a reason. Excessive cancellations affect your completion rate.",
      ),
      Faq(
        question: "Why hasn't my payment arrived?",
        answer: 'Payouts are processed every Monday. Allow 2 business days for the transfer. If it has been more than 5 business days, create a support request.',
      ),
      Faq(
        question: 'What happens if the restaurant is closed?',
        answer: "Cancel with reason 'Restaurant is closed'. This type of cancellation does not affect your completion rate or rating.",
      ),
      Faq(
        question: 'How are earnings calculated?',
        answer: 'Earnings = Base Pay + Distance Bonus + any active Surge/Incentives + Tips. You can view the full breakdown in any completed order.',
      ),
      Faq(
        question: 'How do I update my documents?',
        answer: "Go to Profile → Documents and tap 'Update' next to the document you want to replace. Approvals typically take 24–48 hours.",
      ),
    ];
  }

  Future<List<SupportTicket>> getTickets() async {
    await Future.delayed(const Duration(milliseconds: 300));

    return const [
      SupportTicket(
        id: '#SUP28491',
        category: 'Payment issue',
        status: SupportTicketStatus.resolved,
        date: 'Aug 22',
      ),
      SupportTicket(
        id: '#SUP28109',
        category: 'Order cancellation',
        status: SupportTicketStatus.resolved,
        date: 'Aug 14',
      ),
      SupportTicket(
        id: '#SUP28003',
        category: 'Navigation problem',
        status: SupportTicketStatus.open,
        date: 'Sep 1',
      ),
    ];
  }

  Future<void> createTicket({
    required String category,
    required String description,
  }) async {
    await Future.delayed(const Duration(milliseconds: 800));
  }
}
