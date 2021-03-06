import { storeTask } from "./storage";
import { buildTaskView } from "./buildTask";
import { pubsub } from "./pubsub";
import { format, parseISO } from "date-fns";

export const tasksView = (function () {
  const view = document.querySelector(".view");
  const heading = document.createElement("h1");
  heading.textContent = "All Tasks";

  const taskList = document.createElement("div");
  taskList.classList.add("task-list");

  function renderView() {
    const tasks = [...storeTask.tasks];
    tasks.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));

    view.textContent = "";
    taskList.textContent = "";

    // Arrange tasks into groups by date
    const tasksByDate = tasks.reduce((acc, task) => {
      if (acc[task.date]) {
        acc[task.date].push(task);
      } else acc[task.date] = [task];

      return acc;
    }, {});

    for (const date in tasksByDate) {
      const group = document.createElement("div");
      const groupName = document.createElement("div");
      groupName.textContent = format(parseISO(date), "EEEE, MMM d, yyyy");
      group.appendChild(groupName);
      group.classList.add("task-group");

      tasksByDate[date].forEach((task) => {
        const taskItem = buildTaskView(task);
        group.append(taskItem);
      });
      taskList.append(group);
    }
    view.append(heading, taskList);
  }

  function updateView() {
    const currentPage = document.querySelector(".view h1");
    if (currentPage.textContent === "All Tasks") {
      renderView();
    }
    renderStats();
  }

  const taskStats = document.querySelector(".task-stats");
  function renderStats() {
    const tasks = storeTask.tasks;
    taskStats.textContent = tasks.filter((task) => !task.completed).length;
  }

  pubsub.subscribe("taskAdded", updateView);
  pubsub.subscribe("taskChecked", updateView);
  pubsub.subscribe("taskUnchecked", updateView);
  pubsub.subscribe("taskDeleted", updateView);
  pubsub.subscribe("taskUpdated", updateView);
  pubsub.subscribe("tasksLoaded", updateView);

  return { renderView, renderStats };
})();
