import 'profile_document.dart';

class Profile {
  const Profile({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.vehicleNumber,
    required this.licenceNumber,
    required this.vehicleType,
    required this.city,
    required this.dateOfBirth,
    required this.bankAccount,
    required this.upiId,
    required this.rating,
    required this.documents,
  });

  final String id;
  final String name;
  final String email;
  final String phone;
  final String vehicleNumber;
  final String licenceNumber;
  final String vehicleType;
  final String city;
  final String dateOfBirth;
  final String bankAccount;
  final String upiId;
  final double rating;
  final List<ProfileDocument> documents;

  Profile copyWith({
    String? name,
    String? email,
    String? phone,
    String? vehicleNumber,
    String? licenceNumber,
    String? vehicleType,
    String? city,
    String? dateOfBirth,
    String? bankAccount,
    String? upiId,
  }) {
    return Profile(
      id: id,
      name: name ?? this.name,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      vehicleNumber: vehicleNumber ?? this.vehicleNumber,
      licenceNumber: licenceNumber ?? this.licenceNumber,
      vehicleType: vehicleType ?? this.vehicleType,
      city: city ?? this.city,
      dateOfBirth: dateOfBirth ?? this.dateOfBirth,
      bankAccount: bankAccount ?? this.bankAccount,
      upiId: upiId ?? this.upiId,
      rating: rating,
      documents: documents,
    );
  }
}
