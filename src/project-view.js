import { storeProject } from "./storage";
export function projectView() {
  const view = document.querySelector(".view");

  const heading = document.createElement("h1");
  heading.textContent = "Projects";

  const projects = storeProject.projects;
  console.log(projects);
  const projectList = document.createElement("section");
  for (const item of projects) {
    const project = document.createElement("div");
    project.textContent = item;
    projectList.appendChild(project);
  }
  view.append(heading, projectList);
}
