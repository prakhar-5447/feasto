class AuthUser {
  const AuthUser({
    required this.id,
    required this.name,
    required this.phone,
    this.email,
    this.vehicleNumber,
  });

  final String id;
  final String name;
  final String phone;
  final String? email;
  final String? vehicleNumber;

  factory AuthUser.fromJson(Map<String, dynamic> json) {
    return AuthUser(
      id: json['id'] as String,
      name: json['name'] as String,
      phone: json['phone'] as String,
      email: json['email'] as String?,
      vehicleNumber: json['vehicleNumber'] as String?,
    );
  }
}
