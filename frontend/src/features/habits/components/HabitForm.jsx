import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Select, Card } from "../../../shared/components/UIComponents";
import { notifySuccess, notifyError } from "../../../shared/utils/notifications";

const HabitForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      notifyError("Please enter a habit name");
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreate({ title, frequency });
      setTitle("");
      setFrequency("daily");
      notifySuccess("Habit created! Start tracking!");
    } catch (error) {
      notifyError("Failed to create habit");
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
          Create New Habit
        </h3>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Habit name (e.g., Drink Water, Exercise)..."
          disabled={isSubmitting}
        />
        <Select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          disabled={isSubmitting}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </Select>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Creating..." : "Create Habit"}
        </Button>
      </Card>
    </motion.form>
  );
};

export default HabitForm;
