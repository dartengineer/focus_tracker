import 'package:flutter/material.dart';
import '../services/api_service.dart';

class TaskProvider with ChangeNotifier {
  List<dynamic> _tasks = [];
  bool _loading = false;

  List<dynamic> get tasks => _tasks;
  bool get loading => _loading;

  Future<void> fetchTasks() async {
    _loading = true;
    notifyListeners();
    try {
      final res = await ApiService.getTasks();
      _tasks = res;
    } catch (e) {
      _tasks = [];
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<void> addTask(Map<String, dynamic> data) async {
    try {
      await ApiService.createTask(data);
      await fetchTasks();
    } catch (e) {
      rethrow;
    }
  }

  Future<void> toggleTask(String id, Map<String, dynamic> data) async {
    try {
      await ApiService.updateTask(id, data);
      await fetchTasks();
    } catch (e) {
      rethrow;
    }
  }

  Future<void> removeTask(String id) async {
    try {
      await ApiService.deleteTask(id);
      await fetchTasks();
    } catch (e) {
      rethrow;
    }
  }
}
