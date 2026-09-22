import 'dart:async';

import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../widgets/login_hero.dart';
import '../widgets/otp_login_form.dart';
import '../widgets/phone_login_form.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key, required this.onLogin});

  final VoidCallback onLogin;

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  // -----------------------------
  // State
  // -----------------------------

  bool isOtpStep = false;
  bool loading = false;

  String phone = '';
  String phoneError = '';

  final List<String> otp = ['', '', '', '', '', ''];

  final phoneController = TextEditingController();

  final List<TextEditingController> otpControllers = List.generate(
    6,
    (_) => TextEditingController(),
  );

  final List<FocusNode> otpFocusNodes = List.generate(6, (_) => FocusNode());

  int resendTimer = 0;
  Timer? resendTimerController;

  // -----------------------------
  // Lifecycle
  // -----------------------------

  @override
  void dispose() {
    phoneController.dispose();

    for (final controller in otpControllers) {
      controller.dispose();
    }

    for (final focusNode in otpFocusNodes) {
      focusNode.dispose();
    }

    resendTimerController?.cancel();

    super.dispose();
  }

  // -----------------------------
  // Phone
  // -----------------------------

  void handleSendOtp() {
    final value = phoneController.text.trim();

    if (value.length != 10 || !RegExp(r'^\d+$').hasMatch(value)) {
      setState(() {
        phoneError = 'Enter a valid 10-digit mobile number';
      });
      return;
    }

    setState(() {
      phone = value;
      phoneError = '';
      loading = true;
    });

    // Mock API delay.
    Future.delayed(const Duration(milliseconds: 1200), () {
      if (!mounted) return;

      setState(() {
        loading = false;
        isOtpStep = true;
      });

      startResendTimer();

      Future.delayed(const Duration(milliseconds: 100), () {
        if (mounted) {
          otpFocusNodes[0].requestFocus();
        }
      });
    });
  }

  // -----------------------------
  // Phone
  // -----------------------------
  void handlePhoneChanged(String value) {
    final cleaned = value.replaceAll(RegExp(r'\D'), '');

    if (cleaned != value) {
      phoneController.value = TextEditingValue(
        text: cleaned,
        selection: TextSelection.collapsed(offset: cleaned.length),
      );
    }

    setState(() {
      phoneError = '';
    });
  }

  // -----------------------------
  // OTP
  // -----------------------------

  void handleOtpChanged(int index, String value) {
    if (value.isNotEmpty && !RegExp(r'^\d$').hasMatch(value)) {
      return;
    }

    setState(() {
      otp[index] = value;
    });

    if (value.isNotEmpty && index < 5) {
      otpFocusNodes[index + 1].requestFocus();
    }

    if (otp.every((digit) => digit.isNotEmpty)) {
      Future.delayed(const Duration(milliseconds: 120), () {
        if (mounted) {
          verifyOtp();
        }
      });
    }
  }

  void verifyOtp() {
    if (otp.any((digit) => digit.isEmpty)) {
      return;
    }

    setState(() {
      loading = true;
    });

    // Mock API delay.
    Future.delayed(const Duration(seconds: 1), () {
      if (!mounted) return;

      setState(() {
        loading = false;
      });

      widget.onLogin();
    });
  }

  // -----------------------------
  // Resend
  // -----------------------------

  void startResendTimer() {
    resendTimerController?.cancel();

    setState(() {
      resendTimer = 30;
    });

    resendTimerController = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) {
        timer.cancel();
        return;
      }

      if (resendTimer <= 1) {
        timer.cancel();

        setState(() {
          resendTimer = 0;
        });
      } else {
        setState(() {
          resendTimer--;
        });
      }
    });
  }

  void handleResend() {
    if (resendTimer > 0) {
      return;
    }

    for (var i = 0; i < otp.length; i++) {
      otp[i] = '';
      otpControllers[i].clear();
    }

    setState(() {});

    startResendTimer();

    otpFocusNodes[0].requestFocus();
  }

  // -----------------------------
  // Back to phone
  // -----------------------------

  void backToPhone() {
    for (var i = 0; i < otp.length; i++) {
      otp[i] = '';
      otpControllers[i].clear();
    }

    setState(() {
      isOtpStep = false;
      loading = false;
    });
  }

  // -----------------------------
  // Build
  // -----------------------------

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            const LoginHero(),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(24, 32, 24, 40),
                child: AnimatedSwitcher(
                  duration: const Duration(milliseconds: 350),
                  transitionBuilder: (child, animation) {
                    final offsetAnimation = Tween<Offset>(
                      begin: const Offset(0, 0.08),
                      end: Offset.zero,
                    ).animate(animation);

                    return FadeTransition(
                      opacity: animation,
                      child: SlideTransition(
                        position: offsetAnimation,
                        child: child,
                      ),
                    );
                  },
                  child: isOtpStep
                      ? OtpLoginForm(
                          key: const ValueKey('otp'),

                          phone: phone,

                          otp: otp,

                          otpControllers: otpControllers,

                          otpFocusNodes: otpFocusNodes,

                          resendTimer: resendTimer,

                          loading: loading,

                          onOtpChanged: handleOtpChanged,

                          onVerify: verifyOtp,

                          onResend: handleResend,

                          onBack: backToPhone,
                        )
                      : PhoneLoginForm(
                          key: const ValueKey('phone'),

                          phoneController: phoneController,

                          phoneError: phoneError,

                          loading: loading,

                          onPhoneChanged: handlePhoneChanged,

                          onSendOtp: handleSendOtp,
                        ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
