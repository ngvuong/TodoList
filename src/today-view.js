import { createTaskFromInput } from "./task.js";
import { storeTask } from "./storage.js";
import { format } from "date-fns";

export function todayView() {
  const view = document.querySelector(".view");

  const heading = document.createElement("h1");
  heading.textContent = "Today's Tasks";

  const btn = document.createElement("button");
  btn.textContent = "Add New Task";
  btn.classList.add("task-btn");

  const tasksList = document.createElement("section");
  tasksList.classList.add("task-list");

  const formOverlay = document.querySelector(".form-overlay");
  const container = document.querySelector(".container");

  const cancel = document.querySelector(".cancel");
  cancel.addEventListener("click", () => {
    toggleForm(formOverlay, container);
    form.reset();
  });

  const form = document.querySelector(".task-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = createTaskFromInput(this);
    buildTask(task);
    toggleForm(formOverlay, container);
    form.reset();
  });

  function buildTask(task) {
    const taskDiv = document.createElement("div");
    const name = document.createElement("span");
    const notes = document.createElement("span");
    const priority = document.createElement("span");

    taskDiv.classList.add("task-item");
    name.textContent = `${task.name}`;
    if (task.notes.length < 30) {
      notes.textContent = `${task.notes}`;
    } else {
      notes.textContent = `${task.notes.slice(0, 28)}..`;
    }
    priority.textContent = `${task.priority}`;
    taskDiv.append(name, notes, priority);

    const expandedTask = buildExpandedTaskView(task);
    tasksList.append(taskDiv, expandedTask);
    taskDiv.addEventListener("click", expandTask);
    view.append(tasksList);
  }

  function buildExpandedTaskView(task) {
    // const taskDiv = document.createElement("div");
    const formClone = form.cloneNode(true);
    formClone.classList.add("task-expanded");
    formClone.classList.remove("task-form");
    const name = formClone.name;
    const notes = formClone.notes;
    const date = formClone.date;
    const priority = formClone.priority;
    const project = formClone.project;

    name.value = task.name;
    notes.value = task.notes;
    date.value = task.date;
    priority.value = task.priority;
    project.value = task.project;

    formClone.firstElementChild.remove();
    formClone.lastElementChild.remove();

    // taskDiv.append(formClone);
    return formClone;
  }

  function expandTask() {
    this.classList.toggle("hidden");
    this.nextElementSibling.classList.toggle("active");
  }

  view.append(heading, btn);
  for (const task of storeTask.tasks) {
    buildTask(task);
  }
  const addTaskBtns = document.querySelectorAll(".task-btn");
  addTaskBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      form.date.value = format(new Date(), "yyyy-MM-dd");
      toggleForm(formOverlay, container);
      document.querySelector(".task-form #name").focus();
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
