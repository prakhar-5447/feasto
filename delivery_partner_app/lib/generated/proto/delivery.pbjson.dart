// This is a generated file - do not edit.
//
// Generated from proto/delivery.proto.

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

@$core.Deprecated('Use getAvailableOrdersRequestDescriptor instead')
const GetAvailableOrdersRequest$json = {
  '1': 'GetAvailableOrdersRequest',
};

/// Descriptor for `GetAvailableOrdersRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getAvailableOrdersRequestDescriptor =
    $convert.base64Decode('ChlHZXRBdmFpbGFibGVPcmRlcnNSZXF1ZXN0');

@$core.Deprecated('Use getAvailableOrdersResponseDescriptor instead')
const GetAvailableOrdersResponse$json = {
  '1': 'GetAvailableOrdersResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
    {
      '1': 'orders',
      '3': 3,
      '4': 3,
      '5': 11,
      '6': '.delivery.DeliveryOrder',
      '10': 'orders'
    },
  ],
};

/// Descriptor for `GetAvailableOrdersResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getAvailableOrdersResponseDescriptor =
    $convert.base64Decode(
        'ChpHZXRBdmFpbGFibGVPcmRlcnNSZXNwb25zZRIYCgdzdWNjZXNzGAEgASgIUgdzdWNjZXNzEh'
        'gKB21lc3NhZ2UYAiABKAlSB21lc3NhZ2USLwoGb3JkZXJzGAMgAygLMhcuZGVsaXZlcnkuRGVs'
        'aXZlcnlPcmRlclIGb3JkZXJz');

@$core.Deprecated('Use acceptOrderRequestDescriptor instead')
const AcceptOrderRequest$json = {
  '1': 'AcceptOrderRequest',
  '2': [
    {'1': 'order_id', '3': 1, '4': 1, '5': 9, '10': 'orderId'},
  ],
};

/// Descriptor for `AcceptOrderRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List acceptOrderRequestDescriptor =
    $convert.base64Decode(
        'ChJBY2NlcHRPcmRlclJlcXVlc3QSGQoIb3JkZXJfaWQYASABKAlSB29yZGVySWQ=');

@$core.Deprecated('Use acceptOrderResponseDescriptor instead')
const AcceptOrderResponse$json = {
  '1': 'AcceptOrderResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
    {
      '1': 'order',
      '3': 3,
      '4': 1,
      '5': 11,
      '6': '.delivery.DeliveryOrder',
      '10': 'order'
    },
  ],
};

/// Descriptor for `AcceptOrderResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List acceptOrderResponseDescriptor = $convert.base64Decode(
    'ChNBY2NlcHRPcmRlclJlc3BvbnNlEhgKB3N1Y2Nlc3MYASABKAhSB3N1Y2Nlc3MSGAoHbWVzc2'
    'FnZRgCIAEoCVIHbWVzc2FnZRItCgVvcmRlchgDIAEoCzIXLmRlbGl2ZXJ5LkRlbGl2ZXJ5T3Jk'
    'ZXJSBW9yZGVy');

@$core.Deprecated('Use rejectOrderRequestDescriptor instead')
const RejectOrderRequest$json = {
  '1': 'RejectOrderRequest',
  '2': [
    {'1': 'order_id', '3': 1, '4': 1, '5': 9, '10': 'orderId'},
    {'1': 'reason', '3': 2, '4': 1, '5': 9, '10': 'reason'},
  ],
};

/// Descriptor for `RejectOrderRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List rejectOrderRequestDescriptor = $convert.base64Decode(
    'ChJSZWplY3RPcmRlclJlcXVlc3QSGQoIb3JkZXJfaWQYASABKAlSB29yZGVySWQSFgoGcmVhc2'
    '9uGAIgASgJUgZyZWFzb24=');

@$core.Deprecated('Use rejectOrderResponseDescriptor instead')
const RejectOrderResponse$json = {
  '1': 'RejectOrderResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
  ],
};

/// Descriptor for `RejectOrderResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List rejectOrderResponseDescriptor = $convert.base64Decode(
    'ChNSZWplY3RPcmRlclJlc3BvbnNlEhgKB3N1Y2Nlc3MYASABKAhSB3N1Y2Nlc3MSGAoHbWVzc2'
    'FnZRgCIAEoCVIHbWVzc2FnZQ==');

@$core.Deprecated('Use pickupOrderRequestDescriptor instead')
const PickupOrderRequest$json = {
  '1': 'PickupOrderRequest',
  '2': [
    {'1': 'order_id', '3': 1, '4': 1, '5': 9, '10': 'orderId'},
  ],
};

/// Descriptor for `PickupOrderRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List pickupOrderRequestDescriptor =
    $convert.base64Decode(
        'ChJQaWNrdXBPcmRlclJlcXVlc3QSGQoIb3JkZXJfaWQYASABKAlSB29yZGVySWQ=');

@$core.Deprecated('Use pickupOrderResponseDescriptor instead')
const PickupOrderResponse$json = {
  '1': 'PickupOrderResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
    {
      '1': 'order',
      '3': 3,
      '4': 1,
      '5': 11,
      '6': '.delivery.DeliveryOrder',
      '10': 'order'
    },
  ],
};

/// Descriptor for `PickupOrderResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List pickupOrderResponseDescriptor = $convert.base64Decode(
    'ChNQaWNrdXBPcmRlclJlc3BvbnNlEhgKB3N1Y2Nlc3MYASABKAhSB3N1Y2Nlc3MSGAoHbWVzc2'
    'FnZRgCIAEoCVIHbWVzc2FnZRItCgVvcmRlchgDIAEoCzIXLmRlbGl2ZXJ5LkRlbGl2ZXJ5T3Jk'
    'ZXJSBW9yZGVy');

@$core.Deprecated('Use requestDeliveryOTPRequestDescriptor instead')
const RequestDeliveryOTPRequest$json = {
  '1': 'RequestDeliveryOTPRequest',
  '2': [
    {'1': 'order_id', '3': 1, '4': 1, '5': 9, '10': 'orderId'},
  ],
};

/// Descriptor for `RequestDeliveryOTPRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List requestDeliveryOTPRequestDescriptor =
    $convert.base64Decode(
        'ChlSZXF1ZXN0RGVsaXZlcnlPVFBSZXF1ZXN0EhkKCG9yZGVyX2lkGAEgASgJUgdvcmRlcklk');

@$core.Deprecated('Use requestDeliveryOTPResponseDescriptor instead')
const RequestDeliveryOTPResponse$json = {
  '1': 'RequestDeliveryOTPResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
  ],
};

/// Descriptor for `RequestDeliveryOTPResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List requestDeliveryOTPResponseDescriptor =
    $convert.base64Decode(
        'ChpSZXF1ZXN0RGVsaXZlcnlPVFBSZXNwb25zZRIYCgdzdWNjZXNzGAEgASgIUgdzdWNjZXNzEh'
        'gKB21lc3NhZ2UYAiABKAlSB21lc3NhZ2U=');

@$core.Deprecated('Use verifyDeliveryOTPRequestDescriptor instead')
const VerifyDeliveryOTPRequest$json = {
  '1': 'VerifyDeliveryOTPRequest',
  '2': [
    {'1': 'order_id', '3': 1, '4': 1, '5': 9, '10': 'orderId'},
    {'1': 'otp', '3': 2, '4': 1, '5': 9, '10': 'otp'},
  ],
};

/// Descriptor for `VerifyDeliveryOTPRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List verifyDeliveryOTPRequestDescriptor =
    $convert.base64Decode(
        'ChhWZXJpZnlEZWxpdmVyeU9UUFJlcXVlc3QSGQoIb3JkZXJfaWQYASABKAlSB29yZGVySWQSEA'
        'oDb3RwGAIgASgJUgNvdHA=');

@$core.Deprecated('Use verifyDeliveryOTPResponseDescriptor instead')
const VerifyDeliveryOTPResponse$json = {
  '1': 'VerifyDeliveryOTPResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
  ],
};

/// Descriptor for `VerifyDeliveryOTPResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List verifyDeliveryOTPResponseDescriptor =
    $convert.base64Decode(
        'ChlWZXJpZnlEZWxpdmVyeU9UUFJlc3BvbnNlEhgKB3N1Y2Nlc3MYASABKAhSB3N1Y2Nlc3MSGA'
        'oHbWVzc2FnZRgCIAEoCVIHbWVzc2FnZQ==');

@$core.Deprecated('Use getCurrentOrderRequestDescriptor instead')
const GetCurrentOrderRequest$json = {
  '1': 'GetCurrentOrderRequest',
};

/// Descriptor for `GetCurrentOrderRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getCurrentOrderRequestDescriptor =
    $convert.base64Decode('ChZHZXRDdXJyZW50T3JkZXJSZXF1ZXN0');

@$core.Deprecated('Use getCurrentOrderResponseDescriptor instead')
const GetCurrentOrderResponse$json = {
  '1': 'GetCurrentOrderResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
    {
      '1': 'order',
      '3': 3,
      '4': 1,
      '5': 11,
      '6': '.delivery.DeliveryOrder',
      '10': 'order'
    },
  ],
};

/// Descriptor for `GetCurrentOrderResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getCurrentOrderResponseDescriptor = $convert.base64Decode(
    'ChdHZXRDdXJyZW50T3JkZXJSZXNwb25zZRIYCgdzdWNjZXNzGAEgASgIUgdzdWNjZXNzEhgKB2'
    '1lc3NhZ2UYAiABKAlSB21lc3NhZ2USLQoFb3JkZXIYAyABKAsyFy5kZWxpdmVyeS5EZWxpdmVy'
    'eU9yZGVyUgVvcmRlcg==');

@$core.Deprecated('Use getDeliveryHistoryRequestDescriptor instead')
const GetDeliveryHistoryRequest$json = {
  '1': 'GetDeliveryHistoryRequest',
  '2': [
    {'1': 'page', '3': 1, '4': 1, '5': 5, '10': 'page'},
    {'1': 'limit', '3': 2, '4': 1, '5': 5, '10': 'limit'},
  ],
};

/// Descriptor for `GetDeliveryHistoryRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getDeliveryHistoryRequestDescriptor =
    $convert.base64Decode(
        'ChlHZXREZWxpdmVyeUhpc3RvcnlSZXF1ZXN0EhIKBHBhZ2UYASABKAVSBHBhZ2USFAoFbGltaX'
        'QYAiABKAVSBWxpbWl0');

@$core.Deprecated('Use getDeliveryHistoryResponseDescriptor instead')
const GetDeliveryHistoryResponse$json = {
  '1': 'GetDeliveryHistoryResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
    {
      '1': 'orders',
      '3': 3,
      '4': 3,
      '5': 11,
      '6': '.delivery.DeliveryOrder',
      '10': 'orders'
    },
  ],
};

/// Descriptor for `GetDeliveryHistoryResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getDeliveryHistoryResponseDescriptor =
    $convert.base64Decode(
        'ChpHZXREZWxpdmVyeUhpc3RvcnlSZXNwb25zZRIYCgdzdWNjZXNzGAEgASgIUgdzdWNjZXNzEh'
        'gKB21lc3NhZ2UYAiABKAlSB21lc3NhZ2USLwoGb3JkZXJzGAMgAygLMhcuZGVsaXZlcnkuRGVs'
        'aXZlcnlPcmRlclIGb3JkZXJz');

@$core.Deprecated('Use deliveryOrderDescriptor instead')
const DeliveryOrder$json = {
  '1': 'DeliveryOrder',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
    {'1': 'order_id', '3': 2, '4': 1, '5': 9, '10': 'orderId'},
    {
      '1': 'restaurant',
      '3': 3,
      '4': 1,
      '5': 11,
      '6': '.delivery.Restaurant',
      '10': 'restaurant'
    },
    {
      '1': 'customer',
      '3': 4,
      '4': 1,
      '5': 11,
      '6': '.delivery.Customer',
      '10': 'customer'
    },
    {
      '1': 'delivery_address',
      '3': 5,
      '4': 1,
      '5': 11,
      '6': '.delivery.DeliveryAddress',
      '10': 'deliveryAddress'
    },
    {'1': 'grand_total', '3': 6, '4': 1, '5': 1, '10': 'grandTotal'},
    {'1': 'order_status', '3': 7, '4': 1, '5': 9, '10': 'orderStatus'},
    {'1': 'created_at', '3': 8, '4': 1, '5': 9, '10': 'createdAt'},
  ],
};

/// Descriptor for `DeliveryOrder`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List deliveryOrderDescriptor = $convert.base64Decode(
    'Cg1EZWxpdmVyeU9yZGVyEg4KAmlkGAEgASgJUgJpZBIZCghvcmRlcl9pZBgCIAEoCVIHb3JkZX'
    'JJZBI0CgpyZXN0YXVyYW50GAMgASgLMhQuZGVsaXZlcnkuUmVzdGF1cmFudFIKcmVzdGF1cmFu'
    'dBIuCghjdXN0b21lchgEIAEoCzISLmRlbGl2ZXJ5LkN1c3RvbWVyUghjdXN0b21lchJEChBkZW'
    'xpdmVyeV9hZGRyZXNzGAUgASgLMhkuZGVsaXZlcnkuRGVsaXZlcnlBZGRyZXNzUg9kZWxpdmVy'
    'eUFkZHJlc3MSHwoLZ3JhbmRfdG90YWwYBiABKAFSCmdyYW5kVG90YWwSIQoMb3JkZXJfc3RhdH'
    'VzGAcgASgJUgtvcmRlclN0YXR1cxIdCgpjcmVhdGVkX2F0GAggASgJUgljcmVhdGVkQXQ=');

@$core.Deprecated('Use restaurantDescriptor instead')
const Restaurant$json = {
  '1': 'Restaurant',
  '2': [
    {'1': 'name', '3': 1, '4': 1, '5': 9, '10': 'name'},
    {'1': 'address', '3': 2, '4': 1, '5': 9, '10': 'address'},
  ],
};

/// Descriptor for `Restaurant`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List restaurantDescriptor = $convert.base64Decode(
    'CgpSZXN0YXVyYW50EhIKBG5hbWUYASABKAlSBG5hbWUSGAoHYWRkcmVzcxgCIAEoCVIHYWRkcm'
    'Vzcw==');

@$core.Deprecated('Use customerDescriptor instead')
const Customer$json = {
  '1': 'Customer',
  '2': [
    {'1': 'name', '3': 1, '4': 1, '5': 9, '10': 'name'},
    {'1': 'phone', '3': 2, '4': 1, '5': 9, '10': 'phone'},
  ],
};

/// Descriptor for `Customer`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List customerDescriptor = $convert.base64Decode(
    'CghDdXN0b21lchISCgRuYW1lGAEgASgJUgRuYW1lEhQKBXBob25lGAIgASgJUgVwaG9uZQ==');

@$core.Deprecated('Use deliveryAddressDescriptor instead')
const DeliveryAddress$json = {
  '1': 'DeliveryAddress',
  '2': [
    {'1': 'full_address', '3': 1, '4': 1, '5': 9, '10': 'fullAddress'},
    {'1': 'lat', '3': 2, '4': 1, '5': 1, '10': 'lat'},
    {'1': 'lng', '3': 3, '4': 1, '5': 1, '10': 'lng'},
  ],
};

/// Descriptor for `DeliveryAddress`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List deliveryAddressDescriptor = $convert.base64Decode(
    'Cg9EZWxpdmVyeUFkZHJlc3MSIQoMZnVsbF9hZGRyZXNzGAEgASgJUgtmdWxsQWRkcmVzcxIQCg'
    'NsYXQYAiABKAFSA2xhdBIQCgNsbmcYAyABKAFSA2xuZw==');
