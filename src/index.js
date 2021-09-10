import { Task } from "./task.js";
import { todayView } from "./today-view.js";

const task1 = Task("task1", "test", "9/9/2021", "project1", "!!!");
const task2 = Task("task2", "test", "9/9/2021", "project1", "!!!");
const view = document.querySelector(".view");
const tasks = document.createElement("div");

tasks.textContent = `${task1.name} ${task1.notes}`;
console.log(task1.name, task2.name);
todayView();
view.appendChild(tasks);
