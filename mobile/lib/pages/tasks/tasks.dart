// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../provider/task_provider.dart';

class TasksPage extends StatefulWidget {
  const TasksPage({super.key});

  @override
  State<TasksPage> createState() => _TasksPageState();
}

class _TasksPageState extends State<TasksPage> {
  final _formKey = GlobalKey<FormState>();
  String _title = '';

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<TaskProvider>(context, listen: false).fetchTasks();
    });
  }

  Future<void> _addTask() async {
    if (!_formKey.currentState!.validate()) return;
    _formKey.currentState!.save();
    try {
      await Provider.of<TaskProvider>(
        context,
        listen: false,
      ).addTask({'title': _title});
      _formKey.currentState!.reset();
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Task added')));
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Failed to add task: $e')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<TaskProvider>(context);
    return Scaffold(
      appBar: AppBar(title: const Text('Tasks')),
      body: RefreshIndicator(
        onRefresh: provider.fetchTasks,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Form(
                  key: _formKey,
                  child: Row(
                    children: [
                      Expanded(
                        child: TextFormField(
                          decoration: const InputDecoration(
                            hintText: 'New task title',
                          ),
                          validator: (v) =>
                              (v == null || v.isEmpty) ? 'Enter title' : null,
                          onSaved: (v) => _title = v ?? '',
                        ),
                      ),
                      const SizedBox(width: 8),
                      ElevatedButton(
                        onPressed: _addTask,
                        child: const Text('Add'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(height: 12),
            if (provider.loading)
              const Center(child: CircularProgressIndicator()),
            if (!provider.loading && provider.tasks.isEmpty)
              const Center(child: Text('No tasks yet')),
            ...provider.tasks.map((t) {
              final status = t['status'] ?? 'pending';
              final id = t['_id'] as String?;
              return Card(
                child: ListTile(
                  title: Text(t['title'] ?? ''),
                  subtitle: Text(status),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: Icon(
                          status == 'completed' ? Icons.undo : Icons.check,
                          color: status == 'completed'
                              ? Colors.orange
                              : Colors.green,
                        ),
                        onPressed: (id != null)
                            ? () async {
                                final newStatus = status == 'completed'
                                    ? 'pending'
                                    : 'completed';
                                await provider.toggleTask(id, {
                                  'status': newStatus,
                                });
                              }
                            : null,
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: (id != null)
                            ? () async {
                                await provider.removeTask(id);
                              }
                            : null,
                      ),
                    ],
                  ),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
