import 'package:delivery_partner_app/core/network/api_client.dart';
import 'package:delivery_partner_app/features/profile/models/profile.dart';
import 'package:delivery_partner_app/features/profile/models/profile_document.dart';

class ProfileService {
  ProfileService({required this._apiClient});

  final ApiClient _apiClient;

  Future<Profile> getProfile() async {
    // TODO: Replace with real API.
    //
    // final response = await _apiClient.get(
    //   ApiEndpoints.profile,
    // );
    //
    // return Profile.fromJson(response);

    await Future.delayed(const Duration(milliseconds: 500));

    return const Profile(
      id: 'delivery_partner_001',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@gmail.com',
      phone: '+91 98765 43210',
      vehicleNumber: 'KA 03 EF 7821',
      licenceNumber: 'KA-0320220012345',
      vehicleType: 'Motorcycle',
      city: 'Bengaluru',
      dateOfBirth: '1996-08-14',
      bankAccount: 'State Bank of India ••••4321',
      upiId: 'rahul.kumar@upi',
      rating: 4.8,
      documents: [
        ProfileDocument(
          name: 'Aadhar Card',
          status: DocumentStatus.verified,
          expiryDate: null,
          expiresSoon: false,
        ),
        ProfileDocument(
          name: 'PAN Card',
          status: DocumentStatus.verified,
          expiryDate: null,
          expiresSoon: false,
        ),
        ProfileDocument(
          name: 'Driving Licence',
          status: DocumentStatus.verified,
          expiryDate: '14 Mar 2027',
          expiresSoon: false,
        ),
        ProfileDocument(
          name: 'Vehicle RC',
          status: DocumentStatus.pending,
          expiryDate: '02 Oct 2026',
          expiresSoon: true,
        ),
        ProfileDocument(
          name: 'Insurance',
          status: DocumentStatus.verified,
          expiryDate: '30 Nov 2026',
          expiresSoon: false,
        ),
      ],
    );
  }

  Future<Profile> updateProfile(Profile profile) async {
    // TODO: Replace with real API.
    //
    // final response = await _apiClient.put(
    //   ApiEndpoints.profile,
    //   body: profile.toJson(),
    // );
    //
    // return Profile.fromJson(response);

    await Future.delayed(const Duration(milliseconds: 500));

    return profile;
  }
}
