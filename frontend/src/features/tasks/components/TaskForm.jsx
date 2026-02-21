import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Card } from "../../../shared/components/UIComponents";
import { notifySuccess, notifyError } from "../../../shared/utils/notifications";

const TaskForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      notifyError("Please enter a task title");
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreate({ title, description, dueDate });
      setTitle("");
      setDescription("");
      setDueDate("");
      notifySuccess("Task created successfully!");
    } catch (error) {
      notifyError("Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Add New Task
        </h3>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          disabled={isSubmitting}
        />
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          disabled={isSubmitting}
        />
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Creating..." : "Add Task"}
        </Button>
      </Card>
    </motion.form>
  );
};

export default TaskForm;
