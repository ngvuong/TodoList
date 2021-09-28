import { storeTask } from "./storage";
import { buildTaskView } from "./buildTask";
import { format, startOfTomorrow, addDays } from "date-fns";
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
    console.log(weekAhead);
    const taskList = document.createElement("div");
    taskList.classList.add("task-list");

    weekAhead.forEach((date) => {
      const group = document.createElement("div");
      group.classList.add("task-group");
      const day = document.createElement("div");
      day.classList.add("group-name");
      day.textContent = date;
      group.appendChild(day);
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

  return { renderView };
})();
