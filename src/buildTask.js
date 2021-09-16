export function buildTaskView(task) {
  const tasksList = document.createElement("section");
  tasksList.classList.add("task-list");
  const view = document.querySelector(".view");
  const taskDiv = document.createElement("div");
  const name = document.createElement("span");
  const notes = document.createElement("span");
  const priority = document.createElement("span");

  taskDiv.classList.add("task-item");
  name.textContent = `${task.name}`;
  if (task.notes.length < 30) {
    notes.textContent = `${task.notes}`;
  } else {
    notes.textContent = `${task.notes.slice(0, 28)}...`;
  }
  priority.textContent = `${task.priority}`;
  taskDiv.append(name, notes, priority);

  const expandedTask = buildExpandedTaskView(task);
  tasksList.append(taskDiv, expandedTask);
  taskDiv.addEventListener("click", expandTask);
  view.append(tasksList);

  function expandTask() {
    this.classList.toggle("hidden");
    this.nextElementSibling.classList.toggle("active");
    // console.log(storeTask.tasks);
  }
}

export function buildExpandedTaskView(task) {
  const form = document.querySelector(".task-form");

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
