import { buildTaskView } from "./buildTask";
import { pubsub } from "./pubsub";
import { storeTask, storeProject } from "./storage";

export function projectView() {
  const view = document.querySelector(".view");
  view.textContent = "";

  const heading = document.createElement("h1");
  heading.textContent = "Projects";

  const projects = storeProject.projects;
  const tasks = storeTask.tasks;
  const projectList = document.createElement("section");
  projectList.classList.add("project-list");

  const tasksByProject = tasks.reduce((acc, task) => {
    const project = task.project.toLowerCase();
    if (acc[project]) {
      acc[project].push(task);
    } else acc[project] = [task];

    return acc;
  }, {});

  for (const key in tasksByProject) {
    const project = document.createElement("div");
    project.textContent = key;
    tasksByProject[key].forEach((task) => {
      const taskItem = buildTaskView(task);
      project.appendChild(taskItem);
    });
    projectList.appendChild(project);
  }
  view.append(heading, projectList);

  pubsub.subscribe("taskAdded", () => {
    const currentPage = document.querySelector(".view h1");
    if (currentPage.textContent === "Projects") {
      projectView();
    }
  });
}
