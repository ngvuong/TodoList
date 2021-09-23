import { storeTask } from "./storage";
import { buildTaskView } from "./buildTask";
import { pubsub } from "./pubsub";

export const tasksView = (function () {
  const heading = document.createElement("h1");
  heading.textContent = "All Tasks";
  const view = document.querySelector(".view");
  view.textContent = "";

  const taskList = document.createElement("div");
  taskList.classList.add("task-list");

  const tasks = storeTask.tasks;

  const render = () => {
    const tasks = [...storeTask.tasks];
    tasks.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));

    view.textContent = "";
    taskList.textContent = "";

    const tasksByDate = tasks.reduce((acc, task) => {
      if (acc[task.date]) {
        acc[task.date].push(task);
      } else acc[task.date] = [task];

      return acc;
    }, {});
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
  };

  function renderTasksView() {
    const currentPage = document.querySelector(".view h1");
    if (currentPage.textContent === "All Tasks") {
      tasksView.render();
    }
  }
  const taskStats = document.querySelector(".task-stats");
  taskStats.textContent = tasks.length;
  console.log(tasks, tasks.length);
  function updateStats() {}

  pubsub.subscribe("taskAdded", renderTasksView, updateStats);

  return { render };
})();
