import { createTaskFromInput } from "./task";
import { storeTask } from "./storage";
import { buildTaskView } from "./buildTask";
import { format } from "date-fns";
import { pubsub } from "./pubsub";

export const todayView = (function () {
  const view = document.querySelector(".view");
  // view.textContent = "";
  const heading = document.createElement("h1");
  heading.textContent = "Today's Tasks";

  const btn = document.createElement("button");
  btn.textContent = "Add New Task";
  btn.classList.add("task-btn");

  const taskList = document.createElement("section");
  taskList.classList.add("task-list");

  const today = format(new Date(), "yyyy-MM-dd");
  const tasks = storeTask.tasks;
  const todayStats = document.querySelector(".today-stats");

  function renderView() {
    view.textContent = "";
    taskList.textContent = "";

    for (const task of tasks) {
      renderTask(task);
    }
    view.append(heading, btn, taskList);
  }
  function renderTask(task) {
    if (task.date === today) {
      taskList.append(buildTaskView(task));
    }
  }

  function renderStats() {
    todayStats.textContent = tasks.filter((task) => task.date === today).length;
  }

  function addTask(task) {
    if (task.date === today) {
      todayStats.textContent++;
    }
  }

  function completeTask(task) {
    if (task.date === today) {
      todayStats.textContent--;
    }
  }

  function deleteTask(task) {}

  pubsub.subscribe("taskAdded", renderTask, addTask);
  pubsub.subscribe("taskChecked", completeTask);
  pubsub.subscribe("taskUnchecked", addTask);
  // pubsub.subscribe('taskDeleted', )
  return { renderView, renderStats };
})();
