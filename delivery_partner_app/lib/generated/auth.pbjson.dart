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
