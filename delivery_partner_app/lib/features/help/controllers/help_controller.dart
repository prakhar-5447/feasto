import 'package:get/get.dart';

import 'package:delivery_partner_app/features/help/models/faq.dart';
import 'package:delivery_partner_app/features/help/models/support_ticket.dart';
import 'package:delivery_partner_app/features/help/services/help_service.dart';

class HelpController extends GetxController {
  HelpController({required this._helpService});

  final HelpService _helpService;

  final RxList<Faq> faqs = <Faq>[].obs;
  final RxList<SupportTicket> tickets = <SupportTicket>[].obs;

  final RxString searchQuery = ''.obs;
  final RxnInt expandedFaq = RxnInt();

  final RxBool isLoading = false.obs;
  final RxBool isSubmitting = false.obs;

  final RxString errorMessage = ''.obs;

  List<Faq> get filteredFaqs {
    final query = searchQuery.value.trim().toLowerCase();

    if (query.isEmpty) {
      return faqs;
    }

    return faqs
        .where(
          (faq) =>
              faq.question.toLowerCase().contains(query) ||
              faq.answer.toLowerCase().contains(query),
        )
        .toList();
  }

  @override
  void onInit() {
    super.onInit();
    loadHelpData();
  }

  Future<void> loadHelpData() async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final results = await Future.wait([
        _helpService.getFaqs(),
        _helpService.getTickets(),
      ]);

      faqs.assignAll(results[0] as List<Faq>);
      tickets.assignAll(results[1] as List<SupportTicket>);
    } catch (error) {
      errorMessage.value = error.toString();
    } finally {
      isLoading.value = false;
    }
  }

  void updateSearch(String value) {
    searchQuery.value = value;

    if (expandedFaq.value != null) {
      expandedFaq.value = null;
    }
  }

  void toggleFaq(int index) {
    if (expandedFaq.value == index) {
      expandedFaq.value = null;
    } else {
      expandedFaq.value = index;
    }
  }

  Future<bool> submitTicket({
    required String category,
    required String description,
  }) async {
    try {
      isSubmitting.value = true;

      await _helpService.createTicket(
        category: category,
        description: description,
      );

      await loadTickets();

      return true;
    } catch (error) {
      errorMessage.value = error.toString();
      return false;
    } finally {
      isSubmitting.value = false;
    }
  }

  Future<void> loadTickets() async {
    final result = await _helpService.getTickets();
    tickets.assignAll(result);
  }
}
