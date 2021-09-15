import { storeTask } from "./storage.js";

export function Task(name, notes, date, priority, project = "No Project") {
  return {
    name,
    notes,
    date,
    priority,
    project,
  };
}

export function createTaskFromInput(form) {
  const formFields = form.elements;
  const name = formFields.name.value;
  const notes = formFields.notes.value;
  const date = formFields.date.value;
  const priority = formFields.priority.value;
  const project = formFields.project.value || "No Project";
  const task = Task(name, notes, date, priority, project);
  storeTask.store(task);
  return task;
}

export function taskList() {
  const tasks = [];
  const addTask = (task) => tasks.push(task);
  return { tasks, addTask };
}
