import Task from "../models/taskModel";

export const checkAndMoveTimeoutTasks = async () => {
  const now = new Date();

  await Task.updateMany(
    { expiresAt: { $lt: now }, category: { $nin: ["Timeout", "Done"] } },
    { category: "Timeout" }
  );

  // console.log("Expired tasks moved to Timeout at:", now);
};
