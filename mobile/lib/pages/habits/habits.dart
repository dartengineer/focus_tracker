// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../provider/habit_provider.dart';

class HabitsPage extends StatefulWidget {
  const HabitsPage({super.key});

  @override
  State<HabitsPage> createState() => _HabitsPageState();
}

class _HabitsPageState extends State<HabitsPage> {
  final _formKey = GlobalKey<FormState>();
  String _title = '';
  String _frequency = 'daily';

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<HabitProvider>(context, listen: false).fetchHabits();
    });
  }

  Future<void> _addHabit() async {
    if (!_formKey.currentState!.validate()) return;
    _formKey.currentState!.save();
    try {
      await Provider.of<HabitProvider>(
        context,
        listen: false,
      ).addHabit({'title': _title, 'frequency': _frequency});
      _formKey.currentState!.reset();
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Habit added')));
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Failed to add habit: $e')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<HabitProvider>(context);
    return Scaffold(
      appBar: AppBar(title: const Text('Habits')),
      body: RefreshIndicator(
        onRefresh: provider.fetchHabits,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      TextFormField(
                        decoration: const InputDecoration(
                          labelText: 'Habit name',
                        ),
                        validator: (v) =>
                            (v == null || v.isEmpty) ? 'Enter name' : null,
                        onSaved: (v) => _title = v ?? '',
                      ),
                      const SizedBox(height: 8),
                      DropdownButtonFormField<String>(
                        value: _frequency,
                        items: const [
                          DropdownMenuItem(
                            value: 'daily',
                            child: Text('Daily'),
                          ),
                          DropdownMenuItem(
                            value: 'weekly',
                            child: Text('Weekly'),
                          ),
                        ],
                        onChanged: (v) => _frequency = v ?? 'daily',
                        decoration: const InputDecoration(
                          labelText: 'Frequency',
                        ),
                      ),
                      const SizedBox(height: 12),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: _addHabit,
                          child: const Text('Add Habit'),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(height: 12),
            if (provider.loading)
              const Center(child: CircularProgressIndicator()),
            if (!provider.loading && provider.habits.isEmpty)
              const Center(child: Text('No habits yet')),
            ...provider.habits.map((h) {
              final streak = h['streakCount'] ?? 0;
              final last = h['lastCompleted'] ?? 'Never';
              final id = h['_id'] as String?;
              return Card(
                child: ListTile(
                  title: Text(h['title'] ?? ''),
                  subtitle: Text('Streak: $streak • Last: $last'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.check, color: Colors.green),
                        onPressed: (id != null)
                            ? () async {
                                await provider.completeHabit(id);
                              }
                            : null,
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: (id != null)
                            ? () async {
                                await provider.deleteHabit(id);
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
