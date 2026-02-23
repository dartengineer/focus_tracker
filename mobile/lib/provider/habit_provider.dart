import 'package:flutter/material.dart';
import '../services/api_service.dart';

class HabitProvider with ChangeNotifier {
  List<dynamic> _habits = [];
  bool _loading = false;

  List<dynamic> get habits => _habits;
  bool get loading => _loading;

  Future<void> fetchHabits() async {
    _loading = true;
    notifyListeners();
    try {
      final res = await ApiService.getHabits();
      _habits = res;
    } catch (e) {
      _habits = [];
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<void> addHabit(Map<String, dynamic> data) async {
    try {
      await ApiService.createHabit(data);
      await fetchHabits();
    } catch (e) {
      rethrow;
    }
  }

  Future<void> completeHabit(String id) async {
    try {
      await ApiService.completeHabit(id);
      await fetchHabits();
    } catch (e) {
      rethrow;
    }
  }

  Future<void> deleteHabit(String id) async {
    try {
      await ApiService.deleteHabit(id);
      await fetchHabits();
    } catch (e) {
      rethrow;
    }
  }
}
