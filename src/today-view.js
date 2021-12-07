import { storeTask } from "./storage";
import { buildTaskView } from "./buildTask";
import { format } from "date-fns";
import { pubsub } from "./pubsub";

export const todayView = (function () {
  const view = document.querySelector(".view");
  const heading = document.createElement("h1");
  heading.textContent = "Today's Tasks";

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
    view.append(heading, taskList);
  }

  function renderTask(task) {
    if (task.date === today) {
      taskList.append(buildTaskView(task));
    }
  }

  function renderStats() {
    todayStats.textContent = tasks.filter(
      (task) => task.date === today && !task.completed
    ).length;
  }

  function updateView() {
    const currentPage = document.querySelector(".view h1");
    if (currentPage.textContent === "Today's Tasks") {
      renderView();
    }
    renderStats();
  }

  // Re-render main view and stats with every change
  pubsub.subscribe("taskAdded", updateView);
  pubsub.subscribe("taskChecked", updateView);
  pubsub.subscribe("taskUnchecked", updateView);
  pubsub.subscribe("taskDeleted", updateView);
  pubsub.subscribe("taskUpdated", updateView);
  pubsub.subscribe("tasksLoaded", updateView);
  return { renderView, renderStats };
})();
