enum PaymentStatus { paid, pending, processing, failed }

class PaymentHistory {
  const PaymentHistory({
    required this.date,
    required this.amount,
    required this.status,
  });

  final String date;
  final double amount;
  final PaymentStatus status;
}
