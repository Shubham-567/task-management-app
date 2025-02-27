import Task from "../models/taskModel";

export const checkAndMoveTimeoutTasks = async () => {
  const now = new Date();

  await Task.updateMany(
    // $lt: less than (<)
    // $ne: not equal (!=)
    { expiresAt: { $lt: now }, category: { $ne: "Timeout" } },
    { category: "Timeout" }
  );
};

setInterval(checkAndMoveTimeoutTasks, 60000); // run in every 1 minute
