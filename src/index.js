import { Task } from "./task";
import { todayView } from "./today-view";
import { tasksView } from "./tasks-view";
import { projectView } from "./project-view";
import { weekView } from "./week-view";
import { storeTask, localStorage } from "./storage";
import { format } from "date-fns";
import { createTaskFromInput } from "./task";
import { pubsub } from "./pubsub";

(function ViewController() {
  const today = format(new Date(), "yyyy-MM-dd");
  const task1 = Task("Get out of bed", "10 more minutes", today, "!!!", "Rise");
  const task2 = Task("TOP", "Start pomodoro", today, "!!", "Webdev");
  const task3 = Task("Break", "2 hours break", today, "!", "Leisure");

  const tasks = localStorage.loadLocalStorage();
  storeTask.store(...tasks);
  if (!tasks.length) {
    storeTask.store(task1, task2, task3);
  }

  todayView.renderView();
  todayView.renderStats();
  weekView.renderStats();
  projectView.renderStats();
  tasksView.renderStats();

  const nav = document.querySelector(".view-nav");
  const navIcon = document.querySelector(".nav-icon");
  navIcon.addEventListener("click", () => nav.classList.toggle("toggle"));

  const todayIcon = document.querySelector(".today-icon");
  todayIcon.textContent += format(new Date(), "d");

  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach((btn) => btn.addEventListener("click", renderView));

  let currentPage = "Today";
  function renderView() {
    const page = this.textContent;
    if (page !== currentPage) {
      currentPage = page;
      if (page === "Today") {
        todayView.renderView();
      } else if (page === "Week") {
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
