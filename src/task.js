import { localStorage, storeTask } from "./storage";

export function Task(
  name,
  notes,
  date,
  priority,
  project = "No Project",
  completed = false
) {
  return {
    name,
    notes,
    date,
    priority,
    project,
    completed,
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
