import { storeTask } from "./storage";
import { buildTaskView } from "./buildTask";
import { pubsub } from "./pubsub";

export function tasksView() {
  const heading = document.createElement("h1");
  heading.textContent = "All Tasks";
  const tasks = storeTask.tasks.sort();
  const view = document.querySelector(".view");
  view.textContent = "";

  const tasksByDate = tasks.reduce((acc, task) => {
    if (acc[task.date]) {
      acc[task.date].push(task);
    } else acc[task.date] = [task];

    return acc;
  }, {});

  const taskList = document.createElement("div");
  taskList.classList.add("task-list");
  for (const date in tasksByDate) {
    const group = document.createElement("div");
    group.textContent = date;
    group.classList.add("task-group");
    tasksByDate[date].forEach((task) => {
      const taskItem = buildTaskView(task);
      group.append(taskItem);
    });
    taskList.append(group);
  }
  view.append(heading, taskList);

  pubsub.subscribe("taskAdded", renderTask);
  function renderTask(task) {}
}
