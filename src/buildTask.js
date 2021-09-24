import { pubsub } from "./pubsub";
import { storeTask } from "./storage";
export function buildTaskView(task) {
  const taskItem = document.createElement("div");
  const taskShort = document.createElement("div");
  const name = document.createElement("span");
  const notes = document.createElement("span");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("check-task");
  checkbox.addEventListener("click", (e) => {
    e.stopPropagation();
    taskShort.classList.toggle("completed");
    if (checkbox.checked) {
      task.completed = true;
      pubsub.publish("taskChecked", task);
    } else {
      task.completed = false;
      pubsub.publish("taskUnchecked", task);
    }
  });
  if (task.completed) {
    checkbox.checked = true;
    taskShort.classList.add("completed");
  }
  taskItem.classList.add("task-item");
  taskShort.classList.add("task-short");
  name.textContent = `${task.name}`;
  notes.textContent = `${task.notes}`;

  taskShort.append(checkbox, name, notes);

  if (task.priority === "!!!") {
    taskShort.style.borderLeftColor = "red";
  } else if (task.priority === "!!") {
    taskShort.style.borderLeftColor = "blue";
  } else taskShort.style.borderLeftColor = "green";

  const taskFull = buildExpandedTask(task);
  taskItem.append(taskShort, taskFull);
  taskShort.addEventListener("click", expandTask);

  function buildExpandedTask(task) {
    const form = document.querySelector(".task-form");
    const formClone = form.cloneNode(true);
    formClone.classList.add("task-expanded");
    formClone.classList.remove("task-form");
    const name = formClone.name;
    const notes = formClone.notes;
    const date = formClone.date;
    const priority = formClone.priority;
    const project = formClone.project;
    const save = formClone.save;
    const del = formClone.cancel;
    del.classList.remove("cancel");
    del.value = "Delete";
    del.addEventListener("click", () => {
      storeTask.remove(task);
      pubsub.publish("taskDeleted", task);
    });
    save.addEventListener("click", (e) => {
      e.preventDefault();
      modifyTask(task);
    });

    name.value = task.name;
    notes.value = task.notes;
    date.value = task.date;
    priority.value = task.priority;
    project.value = task.project;
    save.textContent = "Save";
    formClone.firstElementChild.remove();

    return formClone;
  }

  function expandTask() {
    this.classList.toggle("hidden");
    const expanded = this.nextElementSibling;
    expanded.classList.toggle("active");
    if (expanded.style.maxHeight) {
      expanded.style.maxHeight = null;
    } else {
      expanded.style.maxHeight = `${expanded.scrollHeight}px`;
    }
  }

  function modifyTask() {}

  return taskItem;
}
