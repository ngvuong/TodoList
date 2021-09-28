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

    weekAhead.forEach((date) => {
      const group = document.createElement("div");
      const day = document.createElement("div");
      day.textContent = date;
      tasks.forEach((task) => {});
    });
    view.append(heading);
  }

  return { renderView };
})();
