enum DocumentStatus { verified, pending }

class ProfileDocument {
  const ProfileDocument({
    required this.name,
    required this.status,
    required this.expiryDate,
    required this.expiresSoon,
  });

  final String name;
  final DocumentStatus status;
  final String? expiryDate;
  final bool expiresSoon;
}
