enum SupportTicketStatus { resolved, open, processing }

class SupportTicket {
  const SupportTicket({
    required this.id,
    required this.category,
    required this.status,
    required this.date,
  });

  final String id;
  final String category;
  final SupportTicketStatus status;
  final String date;
}
