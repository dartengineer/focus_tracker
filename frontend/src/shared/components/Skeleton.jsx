import { motion } from "framer-motion";

export const Skeleton = ({ className = "" }) => {
  return (
    <motion.div
      className={`bg-gray-300 dark:bg-gray-700 rounded ${className}`}
      animate={{
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-5/6" />
  </div>
);

export const TaskSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-16 w-full rounded-lg" />
    ))}
  </div>
);
