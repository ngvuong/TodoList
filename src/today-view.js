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
  tasksList.classList.add("task-list");

  const formOverlay = document.querySelector(".form-overlay");
  const container = document.querySelector(".container");

  const cancel = document.querySelector(".cancel");
  cancel.addEventListener("click", () => {
    toggleForm(formOverlay, container);
  });

  const form = document.querySelector(".task-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = createTaskFromInput(this);
    buildTask(task);
    toggleForm(formOverlay, container);
    form.reset();
  });

  // function buildTasks() {
  //   tasksList.textContent = "";
  //   const tasks = storeTask.tasks;
  //   for (const task of tasks) {
  //     const peekTask = document.createElement("div");
  //     // const fullTask = document.createElement("div");
  //     peekTask.classList.add("task-item");
  //     peekTask.textContent = `${task.name} ${task.notes} ${task.priority}`;
  //     // fullTask.append(form);
  //     // fullTask.classList.add("task-expanded");
  //     peekTask.addEventListener("click", (e, task) => expandTask(e, task));
  //     tasksList.append(peekTask);
  //     view.append(tasksList);
  //   }
  // }

  function buildTask(task) {
    const taskDiv = document.createElement("div");
    const name = document.createElement("span");
    const notes = document.createElement("span");
    const priority = document.createElement("span");
    taskDiv.classList.add("task-item");
    name.textContent = `${task.name}`;
    notes.textContent = `${task.notes}`;
    priority.textContent = `${task.priority}`;
    taskDiv.append(name, notes, priority);
    buildExpandedTaskView(task);
    tasksList.append(taskDiv);
    taskDiv.addEventListener("click", expandTask);
    view.append(tasksList);
  }

  function buildExpandedTaskView(task) {
    const taskDiv = document.createElement("div");
    const name = document.createElement("input");
    const notes = document.createElement("textarea");
    const date = document.createElement("input");
    const priority = document.createElement("select");
    const lowPriority = document.createElement("option");
    const medPriority = document.createElement("option");
    const highPriority = document.createElement("option");
    const project = document.createElement("input");

    date.type = "date";
    lowPriority.value = "!";
    medPriority.value = "!!";
    highPriority.value = "!!!";
    priority.append(lowPriority, medPriority, highPriority);

    name.value = task.name;
    notes.value = task.notes;
    date.value = task.date;
    priority.value = task.priority;
    project.value = task.project;

    taskDiv.append(name, notes, date, priority, project);
    return taskDiv;
  }

  function expandTask(e) {
    const div = document.createElement("div");
    this.append(div);
    console.log(this);
  }

  view.append(heading, btn);
  // buildTasks();

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
