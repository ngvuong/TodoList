import { storeTask } from "./storage";
import { buildTaskView } from "./buildTask";
import { format, addDays, parseISO } from "date-fns";
import { pubsub } from "./pubsub";

export const weekView = (function () {
  const view = document.querySelector(".view");
  const heading = document.createElement("h1");
  heading.textContent = "Week Ahead";
  const tasks = storeTask.tasks;
  const today = new Date();
  const weekAhead = [];

  for (let i = 1; i < 8; i++) {
    const date = format(addDays(today, i), "yyyy-MM-dd");
    weekAhead.push(date);
  }

  function renderView() {
    view.textContent = "";
    const taskList = document.createElement("div");
    taskList.classList.add("task-list");

    weekAhead.forEach((date) => {
      const group = document.createElement("div");
      group.classList.add("task-group");

      const day = document.createElement("div");
      day.classList.add("group-name");
      day.textContent = format(parseISO(date), "EEEE, MMM d");

      group.appendChild(day);

      const tasks = storeTask.tasks;

      tasks.forEach((task) => {
        if (task.date === date) {
          const taskItem = buildTaskView(task);
          group.appendChild(taskItem);
        }
      });
      taskList.appendChild(group);
    });
    view.append(heading, taskList);
  }

  const weekStats = document.querySelector(".week-stats");
  function renderStats() {
    const tasks = storeTask.tasks;

    weekStats.textContent = tasks.filter(
      (task) => weekAhead.includes(task.date) && !task.completed
    ).length;
  }

  function updateView() {
    const currentPage = document.querySelector(".view h1");
    if (currentPage.textContent === "Week Ahead") {
      renderView();
    }
    renderStats();
  }

  pubsub.subscribe("taskAdded", updateView);
  pubsub.subscribe("taskChecked", updateView);
  pubsub.subscribe("taskUnchecked", updateView);
  pubsub.subscribe("taskDeleted", updateView);
  pubsub.subscribe("taskUpdated", updateView);
  pubsub.subscribe("tasksLoaded", updateView);

  return { renderView, renderStats };
})();
