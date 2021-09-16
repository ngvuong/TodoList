import { storeTask } from "./storage";

export function tasksView() {
  const dates = [...new Set(storeTask.tasks.map((task) => task.date))];
  const tasks = storeTask.tasks;
  const view = document.querySelector(".view");
  for (const date of dates) {
    const group = document.createElement("div");
    tasks.forEach((task) => {
      if (task.date === date) {
      }
    });
  }
}
