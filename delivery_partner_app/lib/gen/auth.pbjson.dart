// This is a generated file - do not edit.
//
// Generated from auth.proto.

// @dart = 3.3

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: curly_braces_in_flow_control_structures
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_relative_imports
// ignore_for_file: unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use sendLoginOTPRequestDescriptor instead')
const SendLoginOTPRequest$json = {
  '1': 'SendLoginOTPRequest',
  '2': [
    {'1': 'phone', '3': 1, '4': 1, '5': 9, '10': 'phone'},
  ],
};

/// Descriptor for `SendLoginOTPRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List sendLoginOTPRequestDescriptor =
    $convert.base64Decode(
        'ChNTZW5kTG9naW5PVFBSZXF1ZXN0EhQKBXBob25lGAEgASgJUgVwaG9uZQ==');

@$core.Deprecated('Use sendLoginOTPResponseDescriptor instead')
const SendLoginOTPResponse$json = {
  '1': 'SendLoginOTPResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
  ],
};

/// Descriptor for `SendLoginOTPResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List sendLoginOTPResponseDescriptor = $convert.base64Decode(
    'ChRTZW5kTG9naW5PVFBSZXNwb25zZRIYCgdzdWNjZXNzGAEgASgIUgdzdWNjZXNzEhgKB21lc3'
    'NhZ2UYAiABKAlSB21lc3NhZ2U=');

@$core.Deprecated('Use verifyLoginOTPRequestDescriptor instead')
const VerifyLoginOTPRequest$json = {
  '1': 'VerifyLoginOTPRequest',
  '2': [
    {'1': 'phone', '3': 1, '4': 1, '5': 9, '10': 'phone'},
    {'1': 'otp', '3': 2, '4': 1, '5': 9, '10': 'otp'},
  ],
};

/// Descriptor for `VerifyLoginOTPRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List verifyLoginOTPRequestDescriptor = $convert.base64Decode(
    'ChVWZXJpZnlMb2dpbk9UUFJlcXVlc3QSFAoFcGhvbmUYASABKAlSBXBob25lEhAKA290cBgCIA'
    'EoCVIDb3Rw');

@$core.Deprecated('Use verifyLoginOTPResponseDescriptor instead')
const VerifyLoginOTPResponse$json = {
  '1': 'VerifyLoginOTPResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
    {'1': 'access_token', '3': 3, '4': 1, '5': 9, '10': 'accessToken'},
    {'1': 'refresh_token', '3': 4, '4': 1, '5': 9, '10': 'refreshToken'},
  ],
};

/// Descriptor for `VerifyLoginOTPResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List verifyLoginOTPResponseDescriptor = $convert.base64Decode(
    'ChZWZXJpZnlMb2dpbk9UUFJlc3BvbnNlEhgKB3N1Y2Nlc3MYASABKAhSB3N1Y2Nlc3MSGAoHbW'
    'Vzc2FnZRgCIAEoCVIHbWVzc2FnZRIhCgxhY2Nlc3NfdG9rZW4YAyABKAlSC2FjY2Vzc1Rva2Vu'
    'EiMKDXJlZnJlc2hfdG9rZW4YBCABKAlSDHJlZnJlc2hUb2tlbg==');

@$core.Deprecated('Use completeProfileRequestDescriptor instead')
const CompleteProfileRequest$json = {
  '1': 'CompleteProfileRequest',
  '2': [
    {'1': 'name', '3': 1, '4': 1, '5': 9, '10': 'name'},
    {'1': 'email', '3': 2, '4': 1, '5': 9, '10': 'email'},
    {'1': 'vehicle_type', '3': 3, '4': 1, '5': 9, '10': 'vehicleType'},
    {'1': 'vehicle_number', '3': 4, '4': 1, '5': 9, '10': 'vehicleNumber'},
    {'1': 'license_number', '3': 5, '4': 1, '5': 9, '10': 'licenseNumber'},
  ],
};

/// Descriptor for `CompleteProfileRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List completeProfileRequestDescriptor = $convert.base64Decode(
    'ChZDb21wbGV0ZVByb2ZpbGVSZXF1ZXN0EhIKBG5hbWUYASABKAlSBG5hbWUSFAoFZW1haWwYAi'
    'ABKAlSBWVtYWlsEiEKDHZlaGljbGVfdHlwZRgDIAEoCVILdmVoaWNsZVR5cGUSJQoOdmVoaWNs'
    'ZV9udW1iZXIYBCABKAlSDXZlaGljbGVOdW1iZXISJQoObGljZW5zZV9udW1iZXIYBSABKAlSDW'
    'xpY2Vuc2VOdW1iZXI=');

@$core.Deprecated('Use completeProfileResponseDescriptor instead')
const CompleteProfileResponse$json = {
  '1': 'CompleteProfileResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
  ],
};

/// Descriptor for `CompleteProfileResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List completeProfileResponseDescriptor =
    $convert.base64Decode(
        'ChdDb21wbGV0ZVByb2ZpbGVSZXNwb25zZRIYCgdzdWNjZXNzGAEgASgIUgdzdWNjZXNzEhgKB2'
        '1lc3NhZ2UYAiABKAlSB21lc3NhZ2U=');

@$core.Deprecated('Use getProfileRequestDescriptor instead')
const GetProfileRequest$json = {
  '1': 'GetProfileRequest',
};

/// Descriptor for `GetProfileRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getProfileRequestDescriptor =
    $convert.base64Decode('ChFHZXRQcm9maWxlUmVxdWVzdA==');

@$core.Deprecated('Use getProfileResponseDescriptor instead')
const GetProfileResponse$json = {
  '1': 'GetProfileResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
    {'1': 'user_id', '3': 3, '4': 1, '5': 9, '10': 'userId'},
    {'1': 'name', '3': 4, '4': 1, '5': 9, '10': 'name'},
    {'1': 'email', '3': 5, '4': 1, '5': 9, '10': 'email'},
    {'1': 'phone', '3': 6, '4': 1, '5': 9, '10': 'phone'},
    {'1': 'vehicle_number', '3': 7, '4': 1, '5': 9, '10': 'vehicleNumber'},
    {'1': 'vehicle_type', '3': 8, '4': 1, '5': 9, '10': 'vehicleType'},
  ],
};

/// Descriptor for `GetProfileResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getProfileResponseDescriptor = $convert.base64Decode(
    'ChJHZXRQcm9maWxlUmVzcG9uc2USGAoHc3VjY2VzcxgBIAEoCFIHc3VjY2VzcxIYCgdtZXNzYW'
    'dlGAIgASgJUgdtZXNzYWdlEhcKB3VzZXJfaWQYAyABKAlSBnVzZXJJZBISCgRuYW1lGAQgASgJ'
    'UgRuYW1lEhQKBWVtYWlsGAUgASgJUgVlbWFpbBIUCgVwaG9uZRgGIAEoCVIFcGhvbmUSJQoOdm'
    'VoaWNsZV9udW1iZXIYByABKAlSDXZlaGljbGVOdW1iZXISIQoMdmVoaWNsZV90eXBlGAggASgJ'
    'Ugt2ZWhpY2xlVHlwZQ==');

@$core.Deprecated('Use refreshTokenRequestDescriptor instead')
const RefreshTokenRequest$json = {
  '1': 'RefreshTokenRequest',
  '2': [
    {'1': 'refresh_token', '3': 1, '4': 1, '5': 9, '10': 'refreshToken'},
  ],
};

/// Descriptor for `RefreshTokenRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List refreshTokenRequestDescriptor = $convert.base64Decode(
    'ChNSZWZyZXNoVG9rZW5SZXF1ZXN0EiMKDXJlZnJlc2hfdG9rZW4YASABKAlSDHJlZnJlc2hUb2'
    'tlbg==');

@$core.Deprecated('Use refreshTokenResponseDescriptor instead')
const RefreshTokenResponse$json = {
  '1': 'RefreshTokenResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
    {'1': 'access_token', '3': 3, '4': 1, '5': 9, '10': 'accessToken'},
    {'1': 'refresh_token', '3': 4, '4': 1, '5': 9, '10': 'refreshToken'},
  ],
};

/// Descriptor for `RefreshTokenResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List refreshTokenResponseDescriptor = $convert.base64Decode(
    'ChRSZWZyZXNoVG9rZW5SZXNwb25zZRIYCgdzdWNjZXNzGAEgASgIUgdzdWNjZXNzEhgKB21lc3'
    'NhZ2UYAiABKAlSB21lc3NhZ2USIQoMYWNjZXNzX3Rva2VuGAMgASgJUgthY2Nlc3NUb2tlbhIj'
    'Cg1yZWZyZXNoX3Rva2VuGAQgASgJUgxyZWZyZXNoVG9rZW4=');
