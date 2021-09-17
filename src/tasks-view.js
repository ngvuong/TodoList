import { storeTask } from "./storage";

export function tasksView() {
  const dates = [...new Set(storeTask.tasks.map((task) => task.date))];
  const tasks = storeTask.tasks;
  const view = document.querySelector(".view");
  // view.textContent = "";

  const tasksByDate = tasks.reduce((acc, task) => {
    if (acc[task.date]) {
      acc[task.date].push(task);
    } else acc[task.date] = [task];

    return acc;
  }, {});

  console.log(tasksByDate);

  for (const date in tasksByDate) {
    const group = document.createElement("div");
    group.textContent = date;
    tasksByDate[date].forEach((task) => {
      const taskItem = document.createElement("div");
      taskItem.textContent = group.append(taskItem);
    });
    view.append(group);
  }
}
