import { Task } from "./task";
import { todayView } from "./today-view";
import { tasksView } from "./tasks-view";
import { projectView } from "./project-view";
import { weekView } from "./week-view";
import { storeTask, storeProject } from "./storage";
import { format } from "date-fns";
import { buildTaskView, buildExpandedTaskView } from "./buildTask";
import { createTaskFromInput } from "./task";
import { pubsub } from "./pubsub";

(function ViewController() {
  const view = document.querySelector(".view");
  const task1 = Task("task1", "test", "2021-09-16", "!!!", "project1");
  const task2 = Task("task2", "test", "2021-09-30", "!!!", "Project2");
  const today = format(new Date(), "yyyy-MM-dd");
  const task3 = Task(
    "task2",
    "testing out this description thinggie majig blahblahblah",
    today,
    "!!!",
    "project2"
  );
  storeTask.store(task1, task2, task3);
  storeProject.store(task1.project, task2.project, task3.project);
  todayView.renderView();
  todayView.renderStats();
  weekView.renderStats();
  projectView.renderStats();
  tasksView.renderStats();

  const nav = document.querySelector(".view-nav");
  const navIcon = document.querySelector(".nav-icon");
  navIcon.addEventListener("click", () => nav.classList.toggle("toggle"));

  const todayIcon = document.querySelector(".today-icon");
  todayIcon.textContent = format(new Date(), "d");

  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach((btn) => btn.addEventListener("click", renderView));

  let currentPage = "Today";
  function renderView() {
    const page = this.textContent;
    if (page !== currentPage) {
      currentPage = page;
      if (page === "Today") {
        todayView.renderView();
      } else if (page === "Week Ahead") {
        weekView.renderView();
      } else if (page === "Projects") {
        projectView.renderView();
      } else tasksView.renderView();
    }
  }
})();

(function formController() {
  const formOverlay = document.querySelector(".form-overlay");
  const container = document.querySelector(".grid-container");

  const cancel = document.querySelector(".cancel");
  [formOverlay, cancel].forEach((item) =>
    item.addEventListener("click", (e) => {
      toggleForm(formOverlay, container);
      form.reset();
    })
  );

  const form = document.querySelector(".task-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = createTaskFromInput(this);

    pubsub.publish("taskAdded", task);

    toggleForm(formOverlay, container);
    form.reset();
  });
  form.addEventListener("click", (e) => e.stopPropagation());

  const addTaskBtns = document.querySelectorAll(".task-btn");
  addTaskBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      form.date.value = format(new Date(), "yyyy-MM-dd");
      toggleForm(formOverlay, container);
      document.querySelector(".task-form #name").focus();
    })
  );
  function toggleForm(content, background) {
    background.classList.toggle("blur");
    content.classList.toggle("active");
  }
})();
