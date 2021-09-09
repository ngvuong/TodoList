import { Task } from "./task.js";

const task1 = Task("task1", "test", "9/9/2021", "!!!");
const view = document.querySelector(".view");
const tasks = document.createElement("div");

tasks.textContent = task1.getName();

view.appendChild(tasks);
