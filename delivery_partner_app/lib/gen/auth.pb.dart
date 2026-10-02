// This is a generated file - do not edit.
//
// Generated from auth.proto.

// @dart = 3.3

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: curly_braces_in_flow_control_structures
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_relative_imports

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

export 'package:protobuf/protobuf.dart' show GeneratedMessageGenericExtensions;

class SendLoginOTPRequest extends $pb.GeneratedMessage {
  factory SendLoginOTPRequest({
    $core.String? phone,
  }) {
    final result = SendLoginOTPRequest._();
    if (phone != null) result.phone = phone;
    return result;
  }

  SendLoginOTPRequest._();

  factory SendLoginOTPRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      SendLoginOTPRequest()..mergeFromBuffer(data, registry);
  factory SendLoginOTPRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      SendLoginOTPRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'SendLoginOTPRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: SendLoginOTPRequest.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'phone')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  SendLoginOTPRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  SendLoginOTPRequest copyWith(void Function(SendLoginOTPRequest) updates) =>
      super.copyWith((message) => updates(message as SendLoginOTPRequest))
          as SendLoginOTPRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core
      .Deprecated('Use SendLoginOTPRequest() / SendLoginOTPRequest.new instead')
  static SendLoginOTPRequest create() => SendLoginOTPRequest._();
  static $pb.GeneratedMessage $_createMessage() => SendLoginOTPRequest._();
  @$core.override
  SendLoginOTPRequest createEmptyInstance() => SendLoginOTPRequest._();
  @$core.pragma('dart2js:noInline')
  static SendLoginOTPRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<SendLoginOTPRequest>(
          SendLoginOTPRequest.$_createMessage);
  static SendLoginOTPRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get phone => $_getSZ(0);
  @$pb.TagNumber(1)
  set phone($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasPhone() => $_has(0);
  @$pb.TagNumber(1)
  void clearPhone() => $_clearField(1);
}

class SendLoginOTPResponse extends $pb.GeneratedMessage {
  factory SendLoginOTPResponse({
    $core.bool? success,
    $core.String? message,
  }) {
    final result = SendLoginOTPResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    return result;
  }

  SendLoginOTPResponse._();

  factory SendLoginOTPResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      SendLoginOTPResponse()..mergeFromBuffer(data, registry);
  factory SendLoginOTPResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      SendLoginOTPResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'SendLoginOTPResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: SendLoginOTPResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  SendLoginOTPResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  SendLoginOTPResponse copyWith(void Function(SendLoginOTPResponse) updates) =>
      super.copyWith((message) => updates(message as SendLoginOTPResponse))
          as SendLoginOTPResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use SendLoginOTPResponse() / SendLoginOTPResponse.new instead')
  static SendLoginOTPResponse create() => SendLoginOTPResponse._();
  static $pb.GeneratedMessage $_createMessage() => SendLoginOTPResponse._();
  @$core.override
  SendLoginOTPResponse createEmptyInstance() => SendLoginOTPResponse._();
  @$core.pragma('dart2js:noInline')
  static SendLoginOTPResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<SendLoginOTPResponse>(
          SendLoginOTPResponse.$_createMessage);
  static SendLoginOTPResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $core.bool get success => $_getBF(0);
  @$pb.TagNumber(1)
  set success($core.bool value) => $_setBool(0, value);
  @$pb.TagNumber(1)
  $core.bool hasSuccess() => $_has(0);
  @$pb.TagNumber(1)
  void clearSuccess() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get message => $_getSZ(1);
  @$pb.TagNumber(2)
  set message($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasMessage() => $_has(1);
  @$pb.TagNumber(2)
  void clearMessage() => $_clearField(2);
}

class VerifyLoginOTPRequest extends $pb.GeneratedMessage {
  factory VerifyLoginOTPRequest({
    $core.String? phone,
    $core.String? otp,
  }) {
    final result = VerifyLoginOTPRequest._();
    if (phone != null) result.phone = phone;
    if (otp != null) result.otp = otp;
    return result;
  }

  VerifyLoginOTPRequest._();

  factory VerifyLoginOTPRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      VerifyLoginOTPRequest()..mergeFromBuffer(data, registry);
  factory VerifyLoginOTPRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      VerifyLoginOTPRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'VerifyLoginOTPRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: VerifyLoginOTPRequest.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'phone')
    ..aOS(2, _omitFieldNames ? '' : 'otp')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  VerifyLoginOTPRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  VerifyLoginOTPRequest copyWith(
          void Function(VerifyLoginOTPRequest) updates) =>
      super.copyWith((message) => updates(message as VerifyLoginOTPRequest))
          as VerifyLoginOTPRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use VerifyLoginOTPRequest() / VerifyLoginOTPRequest.new instead')
  static VerifyLoginOTPRequest create() => VerifyLoginOTPRequest._();
  static $pb.GeneratedMessage $_createMessage() => VerifyLoginOTPRequest._();
  @$core.override
  VerifyLoginOTPRequest createEmptyInstance() => VerifyLoginOTPRequest._();
  @$core.pragma('dart2js:noInline')
  static VerifyLoginOTPRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<VerifyLoginOTPRequest>(
          VerifyLoginOTPRequest.$_createMessage);
  static VerifyLoginOTPRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get phone => $_getSZ(0);
  @$pb.TagNumber(1)
  set phone($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasPhone() => $_has(0);
  @$pb.TagNumber(1)
  void clearPhone() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get otp => $_getSZ(1);
  @$pb.TagNumber(2)
  set otp($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasOtp() => $_has(1);
  @$pb.TagNumber(2)
  void clearOtp() => $_clearField(2);
}

class VerifyLoginOTPResponse extends $pb.GeneratedMessage {
  factory VerifyLoginOTPResponse({
    $core.bool? success,
    $core.String? message,
    $core.String? accessToken,
    $core.String? refreshToken,
  }) {
    final result = VerifyLoginOTPResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (accessToken != null) result.accessToken = accessToken;
    if (refreshToken != null) result.refreshToken = refreshToken;
    return result;
  }

  VerifyLoginOTPResponse._();

  factory VerifyLoginOTPResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      VerifyLoginOTPResponse()..mergeFromBuffer(data, registry);
  factory VerifyLoginOTPResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      VerifyLoginOTPResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'VerifyLoginOTPResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: VerifyLoginOTPResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..aOS(3, _omitFieldNames ? '' : 'accessToken')
    ..aOS(4, _omitFieldNames ? '' : 'refreshToken')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  VerifyLoginOTPResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  VerifyLoginOTPResponse copyWith(
          void Function(VerifyLoginOTPResponse) updates) =>
      super.copyWith((message) => updates(message as VerifyLoginOTPResponse))
          as VerifyLoginOTPResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use VerifyLoginOTPResponse() / VerifyLoginOTPResponse.new instead')
  static VerifyLoginOTPResponse create() => VerifyLoginOTPResponse._();
  static $pb.GeneratedMessage $_createMessage() => VerifyLoginOTPResponse._();
  @$core.override
  VerifyLoginOTPResponse createEmptyInstance() => VerifyLoginOTPResponse._();
  @$core.pragma('dart2js:noInline')
  static VerifyLoginOTPResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<VerifyLoginOTPResponse>(
          VerifyLoginOTPResponse.$_createMessage);
  static VerifyLoginOTPResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $core.bool get success => $_getBF(0);
  @$pb.TagNumber(1)
  set success($core.bool value) => $_setBool(0, value);
  @$pb.TagNumber(1)
  $core.bool hasSuccess() => $_has(0);
  @$pb.TagNumber(1)
  void clearSuccess() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get message => $_getSZ(1);
  @$pb.TagNumber(2)
  set message($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasMessage() => $_has(1);
  @$pb.TagNumber(2)
  void clearMessage() => $_clearField(2);

  @$pb.TagNumber(3)
  $core.String get accessToken => $_getSZ(2);
  @$pb.TagNumber(3)
  set accessToken($core.String value) => $_setString(2, value);
  @$pb.TagNumber(3)
  $core.bool hasAccessToken() => $_has(2);
  @$pb.TagNumber(3)
  void clearAccessToken() => $_clearField(3);

  @$pb.TagNumber(4)
  $core.String get refreshToken => $_getSZ(3);
  @$pb.TagNumber(4)
  set refreshToken($core.String value) => $_setString(3, value);
  @$pb.TagNumber(4)
  $core.bool hasRefreshToken() => $_has(3);
  @$pb.TagNumber(4)
  void clearRefreshToken() => $_clearField(4);
}

class CompleteProfileRequest extends $pb.GeneratedMessage {
  factory CompleteProfileRequest({
    $core.String? name,
    $core.String? email,
    $core.String? vehicleType,
    $core.String? vehicleNumber,
    $core.String? licenseNumber,
  }) {
    final result = CompleteProfileRequest._();
    if (name != null) result.name = name;
    if (email != null) result.email = email;
    if (vehicleType != null) result.vehicleType = vehicleType;
    if (vehicleNumber != null) result.vehicleNumber = vehicleNumber;
    if (licenseNumber != null) result.licenseNumber = licenseNumber;
    return result;
  }

  CompleteProfileRequest._();

  factory CompleteProfileRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      CompleteProfileRequest()..mergeFromBuffer(data, registry);
  factory CompleteProfileRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      CompleteProfileRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'CompleteProfileRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: CompleteProfileRequest.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'name')
    ..aOS(2, _omitFieldNames ? '' : 'email')
    ..aOS(3, _omitFieldNames ? '' : 'vehicleType')
    ..aOS(4, _omitFieldNames ? '' : 'vehicleNumber')
    ..aOS(5, _omitFieldNames ? '' : 'licenseNumber')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  CompleteProfileRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  CompleteProfileRequest copyWith(
          void Function(CompleteProfileRequest) updates) =>
      super.copyWith((message) => updates(message as CompleteProfileRequest))
          as CompleteProfileRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use CompleteProfileRequest() / CompleteProfileRequest.new instead')
  static CompleteProfileRequest create() => CompleteProfileRequest._();
  static $pb.GeneratedMessage $_createMessage() => CompleteProfileRequest._();
  @$core.override
  CompleteProfileRequest createEmptyInstance() => CompleteProfileRequest._();
  @$core.pragma('dart2js:noInline')
  static CompleteProfileRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<CompleteProfileRequest>(
          CompleteProfileRequest.$_createMessage);
  static CompleteProfileRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get name => $_getSZ(0);
  @$pb.TagNumber(1)
  set name($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasName() => $_has(0);
  @$pb.TagNumber(1)
  void clearName() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get email => $_getSZ(1);
  @$pb.TagNumber(2)
  set email($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasEmail() => $_has(1);
  @$pb.TagNumber(2)
  void clearEmail() => $_clearField(2);

  @$pb.TagNumber(3)
  $core.String get vehicleType => $_getSZ(2);
  @$pb.TagNumber(3)
  set vehicleType($core.String value) => $_setString(2, value);
  @$pb.TagNumber(3)
  $core.bool hasVehicleType() => $_has(2);
  @$pb.TagNumber(3)
  void clearVehicleType() => $_clearField(3);

  @$pb.TagNumber(4)
  $core.String get vehicleNumber => $_getSZ(3);
  @$pb.TagNumber(4)
  set vehicleNumber($core.String value) => $_setString(3, value);
  @$pb.TagNumber(4)
  $core.bool hasVehicleNumber() => $_has(3);
  @$pb.TagNumber(4)
  void clearVehicleNumber() => $_clearField(4);

  @$pb.TagNumber(5)
  $core.String get licenseNumber => $_getSZ(4);
  @$pb.TagNumber(5)
  set licenseNumber($core.String value) => $_setString(4, value);
  @$pb.TagNumber(5)
  $core.bool hasLicenseNumber() => $_has(4);
  @$pb.TagNumber(5)
  void clearLicenseNumber() => $_clearField(5);
}

class CompleteProfileResponse extends $pb.GeneratedMessage {
  factory CompleteProfileResponse({
    $core.bool? success,
    $core.String? message,
  }) {
    final result = CompleteProfileResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    return result;
  }

  CompleteProfileResponse._();

  factory CompleteProfileResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      CompleteProfileResponse()..mergeFromBuffer(data, registry);
  factory CompleteProfileResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      CompleteProfileResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'CompleteProfileResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: CompleteProfileResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  CompleteProfileResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  CompleteProfileResponse copyWith(
          void Function(CompleteProfileResponse) updates) =>
      super.copyWith((message) => updates(message as CompleteProfileResponse))
          as CompleteProfileResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use CompleteProfileResponse() / CompleteProfileResponse.new instead')
  static CompleteProfileResponse create() => CompleteProfileResponse._();
  static $pb.GeneratedMessage $_createMessage() => CompleteProfileResponse._();
  @$core.override
  CompleteProfileResponse createEmptyInstance() => CompleteProfileResponse._();
  @$core.pragma('dart2js:noInline')
  static CompleteProfileResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<CompleteProfileResponse>(
          CompleteProfileResponse.$_createMessage);
  static CompleteProfileResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $core.bool get success => $_getBF(0);
  @$pb.TagNumber(1)
  set success($core.bool value) => $_setBool(0, value);
  @$pb.TagNumber(1)
  $core.bool hasSuccess() => $_has(0);
  @$pb.TagNumber(1)
  void clearSuccess() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get message => $_getSZ(1);
  @$pb.TagNumber(2)
  set message($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasMessage() => $_has(1);
  @$pb.TagNumber(2)
  void clearMessage() => $_clearField(2);
}

class GetProfileRequest extends $pb.GeneratedMessage {
  factory GetProfileRequest() => GetProfileRequest._();

  GetProfileRequest._();

  factory GetProfileRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetProfileRequest()..mergeFromBuffer(data, registry);
  factory GetProfileRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetProfileRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'GetProfileRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: GetProfileRequest.$_createMessage)
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetProfileRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetProfileRequest copyWith(void Function(GetProfileRequest) updates) =>
      super.copyWith((message) => updates(message as GetProfileRequest))
          as GetProfileRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated('Use GetProfileRequest() / GetProfileRequest.new instead')
  static GetProfileRequest create() => GetProfileRequest._();
  static $pb.GeneratedMessage $_createMessage() => GetProfileRequest._();
  @$core.override
  GetProfileRequest createEmptyInstance() => GetProfileRequest._();
  @$core.pragma('dart2js:noInline')
  static GetProfileRequest getDefault() =>
      _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<GetProfileRequest>(
          GetProfileRequest.$_createMessage);
  static GetProfileRequest? _defaultInstance;
}

class GetProfileResponse extends $pb.GeneratedMessage {
  factory GetProfileResponse({
    $core.bool? success,
    $core.String? message,
    $core.String? userId,
    $core.String? name,
    $core.String? email,
    $core.String? phone,
    $core.String? vehicleNumber,
    $core.String? vehicleType,
  }) {
    final result = GetProfileResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (userId != null) result.userId = userId;
    if (name != null) result.name = name;
    if (email != null) result.email = email;
    if (phone != null) result.phone = phone;
    if (vehicleNumber != null) result.vehicleNumber = vehicleNumber;
    if (vehicleType != null) result.vehicleType = vehicleType;
    return result;
  }

  GetProfileResponse._();

  factory GetProfileResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetProfileResponse()..mergeFromBuffer(data, registry);
  factory GetProfileResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetProfileResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'GetProfileResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: GetProfileResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..aOS(3, _omitFieldNames ? '' : 'userId')
    ..aOS(4, _omitFieldNames ? '' : 'name')
    ..aOS(5, _omitFieldNames ? '' : 'email')
    ..aOS(6, _omitFieldNames ? '' : 'phone')
    ..aOS(7, _omitFieldNames ? '' : 'vehicleNumber')
    ..aOS(8, _omitFieldNames ? '' : 'vehicleType')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetProfileResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetProfileResponse copyWith(void Function(GetProfileResponse) updates) =>
      super.copyWith((message) => updates(message as GetProfileResponse))
          as GetProfileResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated('Use GetProfileResponse() / GetProfileResponse.new instead')
  static GetProfileResponse create() => GetProfileResponse._();
  static $pb.GeneratedMessage $_createMessage() => GetProfileResponse._();
  @$core.override
  GetProfileResponse createEmptyInstance() => GetProfileResponse._();
  @$core.pragma('dart2js:noInline')
  static GetProfileResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<GetProfileResponse>(
          GetProfileResponse.$_createMessage);
  static GetProfileResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $core.bool get success => $_getBF(0);
  @$pb.TagNumber(1)
  set success($core.bool value) => $_setBool(0, value);
  @$pb.TagNumber(1)
  $core.bool hasSuccess() => $_has(0);
  @$pb.TagNumber(1)
  void clearSuccess() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get message => $_getSZ(1);
  @$pb.TagNumber(2)
  set message($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasMessage() => $_has(1);
  @$pb.TagNumber(2)
  void clearMessage() => $_clearField(2);

  @$pb.TagNumber(3)
  $core.String get userId => $_getSZ(2);
  @$pb.TagNumber(3)
  set userId($core.String value) => $_setString(2, value);
  @$pb.TagNumber(3)
  $core.bool hasUserId() => $_has(2);
  @$pb.TagNumber(3)
  void clearUserId() => $_clearField(3);

  @$pb.TagNumber(4)
  $core.String get name => $_getSZ(3);
  @$pb.TagNumber(4)
  set name($core.String value) => $_setString(3, value);
  @$pb.TagNumber(4)
  $core.bool hasName() => $_has(3);
  @$pb.TagNumber(4)
  void clearName() => $_clearField(4);

  @$pb.TagNumber(5)
  $core.String get email => $_getSZ(4);
  @$pb.TagNumber(5)
  set email($core.String value) => $_setString(4, value);
  @$pb.TagNumber(5)
  $core.bool hasEmail() => $_has(4);
  @$pb.TagNumber(5)
  void clearEmail() => $_clearField(5);

  @$pb.TagNumber(6)
  $core.String get phone => $_getSZ(5);
  @$pb.TagNumber(6)
  set phone($core.String value) => $_setString(5, value);
  @$pb.TagNumber(6)
  $core.bool hasPhone() => $_has(5);
  @$pb.TagNumber(6)
  void clearPhone() => $_clearField(6);

  @$pb.TagNumber(7)
  $core.String get vehicleNumber => $_getSZ(6);
  @$pb.TagNumber(7)
  set vehicleNumber($core.String value) => $_setString(6, value);
  @$pb.TagNumber(7)
  $core.bool hasVehicleNumber() => $_has(6);
  @$pb.TagNumber(7)
  void clearVehicleNumber() => $_clearField(7);

  @$pb.TagNumber(8)
  $core.String get vehicleType => $_getSZ(7);
  @$pb.TagNumber(8)
  set vehicleType($core.String value) => $_setString(7, value);
  @$pb.TagNumber(8)
  $core.bool hasVehicleType() => $_has(7);
  @$pb.TagNumber(8)
  void clearVehicleType() => $_clearField(8);
}

class RefreshTokenRequest extends $pb.GeneratedMessage {
  factory RefreshTokenRequest({
    $core.String? refreshToken,
  }) {
    final result = RefreshTokenRequest._();
    if (refreshToken != null) result.refreshToken = refreshToken;
    return result;
  }

  RefreshTokenRequest._();

  factory RefreshTokenRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      RefreshTokenRequest()..mergeFromBuffer(data, registry);
  factory RefreshTokenRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      RefreshTokenRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'RefreshTokenRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: RefreshTokenRequest.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'refreshToken')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  RefreshTokenRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  RefreshTokenRequest copyWith(void Function(RefreshTokenRequest) updates) =>
      super.copyWith((message) => updates(message as RefreshTokenRequest))
          as RefreshTokenRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core
      .Deprecated('Use RefreshTokenRequest() / RefreshTokenRequest.new instead')
  static RefreshTokenRequest create() => RefreshTokenRequest._();
  static $pb.GeneratedMessage $_createMessage() => RefreshTokenRequest._();
  @$core.override
  RefreshTokenRequest createEmptyInstance() => RefreshTokenRequest._();
  @$core.pragma('dart2js:noInline')
  static RefreshTokenRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<RefreshTokenRequest>(
          RefreshTokenRequest.$_createMessage);
  static RefreshTokenRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get refreshToken => $_getSZ(0);
  @$pb.TagNumber(1)
  set refreshToken($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasRefreshToken() => $_has(0);
  @$pb.TagNumber(1)
  void clearRefreshToken() => $_clearField(1);
}

class RefreshTokenResponse extends $pb.GeneratedMessage {
  factory RefreshTokenResponse({
    $core.bool? success,
    $core.String? message,
    $core.String? accessToken,
    $core.String? refreshToken,
  }) {
    final result = RefreshTokenResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (accessToken != null) result.accessToken = accessToken;
    if (refreshToken != null) result.refreshToken = refreshToken;
    return result;
  }

  RefreshTokenResponse._();

  factory RefreshTokenResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      RefreshTokenResponse()..mergeFromBuffer(data, registry);
  factory RefreshTokenResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      RefreshTokenResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'RefreshTokenResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: RefreshTokenResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..aOS(3, _omitFieldNames ? '' : 'accessToken')
    ..aOS(4, _omitFieldNames ? '' : 'refreshToken')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  RefreshTokenResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  RefreshTokenResponse copyWith(void Function(RefreshTokenResponse) updates) =>
      super.copyWith((message) => updates(message as RefreshTokenResponse))
          as RefreshTokenResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use RefreshTokenResponse() / RefreshTokenResponse.new instead')
  static RefreshTokenResponse create() => RefreshTokenResponse._();
  static $pb.GeneratedMessage $_createMessage() => RefreshTokenResponse._();
  @$core.override
  RefreshTokenResponse createEmptyInstance() => RefreshTokenResponse._();
  @$core.pragma('dart2js:noInline')
  static RefreshTokenResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<RefreshTokenResponse>(
          RefreshTokenResponse.$_createMessage);
  static RefreshTokenResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $core.bool get success => $_getBF(0);
  @$pb.TagNumber(1)
  set success($core.bool value) => $_setBool(0, value);
  @$pb.TagNumber(1)
  $core.bool hasSuccess() => $_has(0);
  @$pb.TagNumber(1)
  void clearSuccess() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get message => $_getSZ(1);
  @$pb.TagNumber(2)
  set message($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasMessage() => $_has(1);
  @$pb.TagNumber(2)
  void clearMessage() => $_clearField(2);

  @$pb.TagNumber(3)
  $core.String get accessToken => $_getSZ(2);
  @$pb.TagNumber(3)
  set accessToken($core.String value) => $_setString(2, value);
  @$pb.TagNumber(3)
  $core.bool hasAccessToken() => $_has(2);
  @$pb.TagNumber(3)
  void clearAccessToken() => $_clearField(3);

  @$pb.TagNumber(4)
  $core.String get refreshToken => $_getSZ(3);
  @$pb.TagNumber(4)
  set refreshToken($core.String value) => $_setString(3, value);
  @$pb.TagNumber(4)
  $core.bool hasRefreshToken() => $_has(3);
  @$pb.TagNumber(4)
  void clearRefreshToken() => $_clearField(4);
}

const $core.bool _omitFieldNames =
    $core.bool.fromEnvironment('protobuf.omit_field_names');
const $core.bool _omitMessageNames =
    $core.bool.fromEnvironment('protobuf.omit_message_names');
