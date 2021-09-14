import { createTaskFromInput } from "./task.js";
import { storeTask } from "./storage.js";

export function todayView() {
  const view = document.querySelector(".view");

  const heading = document.createElement("h1");
  heading.textContent = "Today's Tasks";

  const btn = document.createElement("button");
  btn.textContent = "Add New Task";
  btn.classList.add("task-btn");

  const tasksList = document.createElement("section");

  const formOverlay = document.querySelector(".form-overlay");
  const container = document.querySelector(".container");

  const cancel = document.querySelector(".cancel");
  cancel.addEventListener("click", () => {
    toggleForm(formOverlay, container);
  });

  const form = document.querySelector(".task-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    createTaskFromInput(this);
    toggleForm(formOverlay, container);
    renderTasks(tasksList);
    form.reset();
  });

  const taskItems = document.querySelectorAll(".task-item");
  taskItems.forEach((task) =>
    task.addEventListener("click", () => {
      console.log(this);
    })
  );

  function renderTasks() {
    tasksList.textContent = "";
    const tasks = storeTask.tasks;
    for (let task of tasks) {
      const div = document.createElement("div");
      div.textContent = `${task.name} ${task.notes} ${task.priority}`;
      div.classList.add("task-item");
      tasksList.append(div);
      view.append(tasksList);
    }
  }

  view.append(heading, btn);
  renderTasks();
  const addTaskBtns = document.querySelectorAll(".task-btn");
  addTaskBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      toggleForm(formOverlay, container);
    })
  );
}

function toggleForm(content, background) {
  if (!content.classList.contains("active")) {
    background.style.filter = "blur(5px)";
    background.style.boxShadow = "0 0 5px 5px";
  } else background.style.filter = "none";
  content.classList.toggle("active");
}
