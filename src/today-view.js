import { createTaskFromInput } from "./task";
import { storeTask } from "./storage";
import { buildTaskView } from "./buildTask";
import { format } from "date-fns";
import { pubsub } from "./pubsub";

export function todayView() {
  const view = document.querySelector(".view");
  view.textContent = "";
  const heading = document.createElement("h1");
  heading.textContent = "Today's Tasks";

  const btn = document.createElement("button");
  btn.textContent = "Add New Task";
  btn.classList.add("task-btn");

  const taskList = document.createElement("section");
  taskList.classList.add("task-list");

  const today = format(new Date(), "yyyy-MM-dd");
  const todayStats = document.querySelector(".today-stats");
  const tasks = storeTask.tasks;

  for (const task of tasks) {
    update(task);
  }
  view.append(heading, taskList);

  pubsub.subscribe("taskAdded", update);
  function update(task) {
    if (task.date === today) {
      taskList.append(buildTaskView(task));
      todayStats.textContent++;
    }
  }
  // todayStats.textContent = tasks.filter((task) => task.date === today).length;
  function updateStats(task) {
    if (task.date === today) {
      todayStats.textContent++;
    }
  }
}
