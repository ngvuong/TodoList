export function buildTaskView(task) {
  const taskItem = document.createElement("div");
  const taskShort = document.createElement("div");
  const name = document.createElement("span");
  const notes = document.createElement("span");
  const priority = document.createElement("span");

  taskItem.classList.add("task-item");
  taskShort.classList.add("task-short");
  name.textContent = `${task.name}`;
  if (task.notes.length < 30) {
    notes.textContent = `${task.notes}`;
  } else {
    notes.textContent = `${task.notes.slice(0, 28)}...`;
  }
  priority.textContent = `${task.priority}`;
  taskShort.append(name, notes, priority);
  if (task.priority === "!!!") {
    taskShort.style.borderColor = "red";
  } else if (task.priority === "!!") {
    taskShort.style.borderColor = "blue";
  } else taskShort.style.borderColor = "green";

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
    console.dir(notes);
    name.value = task.name;
    notes.value = task.notes;
    date.value = task.date;
    priority.value = task.priority;
    project.value = task.project;

    formClone.firstElementChild.remove();
    formClone.lastElementChild.remove();
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

  return taskItem;
}
