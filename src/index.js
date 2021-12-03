import { Task } from "./task";
import { todayView } from "./today-view";
import { tasksView } from "./tasks-view";
import { projectView } from "./project-view";
import { weekView } from "./week-view";
import { storeTask, localStorage } from "./storage";
import { format } from "date-fns";
import { createTaskFromInput } from "./task";
import { pubsub } from "./pubsub";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Initialize and control view navigation
(function ViewController() {
  // Configure firebase
  const firebaseConfig = {
    apiKey: "AIzaSyA8kj58x3zmCQ8D2cq9nFfbeom1KtCXktg",
    authDomain: "todoit-78839.firebaseapp.com",
    projectId: "todoit-78839",
    storageBucket: "todoit-78839.appspot.com",
    messagingSenderId: "699370873117",
    appId: "1:699370873117:web:298200be7a2acc21fa41f4",
  };

  async function signIn() {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  function signOutUser() {
    signOut(getAuth());
    console.log("signed out");
  }

  function getUserName() {
    return getAuth().currentUser.displayName;
  }

  function isUserSignedIn() {
    return !!getAuth().currentUser;
  }

  if (isUserSignedIn) {
    console.log("signed in");
  } else console.log("signed out");

  function initFirebaseAuth() {
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  function authStateObserver(user) {
    if (user) {
      const userName = getUserName();
      userNameDisplay.textContent = userName;

      userNameDisplay.removeAttribute("hidden");
      signOutBtn.removeAttribute("hidden");

      signInBtn.setAttribute("hidden", "true");
    } else {
      userNameDisplay.setAttribute("hidden", "true");
      signOutBtn.setAttribute("hidden", "true");
      signInBtn.removeAttribute("hidden");
    }
  }

  initializeApp(firebaseConfig);
  initFirebaseAuth();

  const signInBtn = document.querySelector(".sign-in");
  const signOutBtn = document.querySelector(".sign-out");
  const userNameDisplay = document.querySelector(".username");
  signInBtn.addEventListener("click", signIn);
  signOutBtn.addEventListener("click", signOutUser);

  const today = format(new Date(), "yyyy-MM-dd");
  const task1 = Task("Get out of bed", "10 more minutes", today, "!!!", "Rise");
  const task2 = Task("TOP", "Start pomodoro", today, "!!", "Webdev");
  const task3 = Task("Break", "2 hours break", today, "!", "Leisure");

  const tasks = localStorage.loadLocalStorage();
  storeTask.store(...tasks);
  if (!tasks.length) {
    storeTask.store(task1, task2, task3);
  }

  // Initial renders
  todayView.renderView();
  todayView.renderStats();
  weekView.renderStats();
  projectView.renderStats();
  tasksView.renderStats();

  // Hamburger Icon toggling nav
  const nav = document.querySelector(".view-nav");
  const navIcon = document.querySelector(".nav-icon");
  navIcon.addEventListener("click", () => nav.classList.toggle("toggle"));

  const todayIcon = document.querySelector(".today-icon");
  todayIcon.textContent += format(new Date(), "d");

  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach((btn) => btn.addEventListener("click", renderView));

  document.querySelector(".today").classList.add("active");
  let currentPage = "Today";

  function renderView() {
    const page = this.textContent;
    if (page !== currentPage) {
      document.querySelector(".view-nav div.active").classList.remove("active");
      currentPage = page;
      this.parentNode.classList.add("active");
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

// Control new task form toggling
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

  const addTaskBtn = document.querySelector(".task-btn");
  addTaskBtn.addEventListener("click", () => {
    form.date.value = format(new Date(), "yyyy-MM-dd");
    toggleForm(formOverlay, container);
    document.querySelector(".task-form #name").focus();
  });

  function toggleForm(content, background) {
    background.classList.toggle("blur");
    content.classList.toggle("active");
  }
})();
