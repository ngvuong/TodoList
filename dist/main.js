/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "storeTask": () => (/* binding */ storeTask),
/* harmony export */   "storeProject": () => (/* binding */ storeProject)
/* harmony export */ });
const storeTask = (() => {
  const tasks = [];

  const store = (...task) => tasks.push(...task);

  return { tasks, store };
})();

const storeProject = (() => {
  const projects = [];

  const store = (project) => {
    projects.push(project);
  };

  return { projects, store };
})();


/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task),
/* harmony export */   "createTaskFromInput": () => (/* binding */ createTaskFromInput),
/* harmony export */   "taskList": () => (/* binding */ taskList)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");


function Task(name, notes, date, priority, project = "No Project") {
  return {
    name,
    notes,
    date,
    priority,
    project,
  };
}

function createTaskFromInput(form) {
  const formFields = form.elements;
  const name = formFields.name.value;
  const notes = formFields.notes.value;
  const date = formFields.date.value;
  const priority = formFields.priority.value;
  const project = formFields.project.value;
  const task = Task(name, notes, date, priority, project);
  _storage_js__WEBPACK_IMPORTED_MODULE_0__.storeTask.store(task);
  return task;
}

function taskList() {
  const tasks = [];
  const addTask = (task) => tasks.push(task);
  return { tasks, addTask };
}


/***/ }),

/***/ "./src/today-view.js":
/*!***************************!*\
  !*** ./src/today-view.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "todayView": () => (/* binding */ todayView)
/* harmony export */ });
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ "./src/task.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");



function todayView() {
  const view = document.querySelector(".view");

  const heading = document.createElement("h1");
  heading.textContent = "Today's Tasks";

  const btn = document.createElement("button");
  btn.textContent = "Add New Task";
  btn.classList.add("task-btn");

  const tasksList = document.createElement("section");
  tasksList.classList.add("task-list");

  const formOverlay = document.querySelector(".form-overlay");
  const container = document.querySelector(".container");

  const cancel = document.querySelector(".cancel");
  cancel.addEventListener("click", () => {
    toggleForm(formOverlay, container);
    form.reset();
  });

  const form = document.querySelector(".task-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.createTaskFromInput)(this);
    buildTask(task);
    toggleForm(formOverlay, container);
    form.reset();
  });

  // function buildTasks() {
  //   tasksList.textContent = "";
  //   const tasks = storeTask.tasks;
  //   for (const task of tasks) {
  //     const peekTask = document.createElement("div");
  //     // const fullTask = document.createElement("div");
  //     peekTask.classList.add("task-item");
  //     peekTask.textContent = `${task.name} ${task.notes} ${task.priority}`;
  //     // fullTask.append(form);
  //     // fullTask.classList.add("task-expanded");
  //     peekTask.addEventListener("click", (e, task) => expandTask(e, task));
  //     tasksList.append(peekTask);
  //     view.append(tasksList);
  //   }
  // }

  function buildTask(task) {
    const taskDiv = document.createElement("div");
    const name = document.createElement("span");
    const notes = document.createElement("span");
    const priority = document.createElement("span");

    taskDiv.classList.add("task-item");
    name.textContent = `${task.name}`;
    notes.textContent = `${task.notes}`;
    priority.textContent = `${task.priority}`;
    taskDiv.append(name, notes, priority);

    const expandedTask = buildExpandedTaskView(task);
    tasksList.append(taskDiv, expandedTask);
    taskDiv.addEventListener("click", expandTask);
    view.append(tasksList);
  }

  function buildExpandedTaskView(task) {
    // const taskDiv = document.createElement("div");
    const formClone = form.cloneNode(true);
    formClone.classList.add("task-expanded", "hidden");
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

    // taskDiv.append(formClone);
    return formClone;
  }

  function expandTask(e) {
    console.log(this.nextElementSibling);
    this.classList.add("hidden");
    this.nextElementSibling.classList.remove("hidden", "task-form");
  }

  view.append(heading, btn);
  // buildTasks();

  const addTaskBtns = document.querySelectorAll(".task-btn");
  addTaskBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      toggleForm(formOverlay, container);
    })
  );
}

function toggleForm(content, background) {
  if (!content.classList.contains("active")) {
    background.style.filter = "blur(5px)";
    background.style.boxShadow = "0 0 5px 5px";
  } else background.style.filter = "none";
  content.classList.toggle("active");
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ "./src/task.js");
/* harmony import */ var _today_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./today-view.js */ "./src/today-view.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");




const task1 = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.Task)("task1", "test", "9/9/2021", "!!!", "project1");
const task2 = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.Task)("task2", "test", "9/9/2021", "!!!", "project1");
_storage__WEBPACK_IMPORTED_MODULE_2__.storeTask.store(task1, task2);

(0,_today_view_js__WEBPACK_IMPORTED_MODULE_1__.todayView)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQOztBQUVBOztBQUVBLFdBQVc7QUFDWCxDQUFDOztBQUVNO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQndDOztBQUVsQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsd0RBQWU7QUFDakI7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJnRDtBQUNQOztBQUVsQztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDZEQUFtQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFdBQVcsRUFBRSxZQUFZLEVBQUUsY0FBYztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLFVBQVU7QUFDcEMsMkJBQTJCLFdBQVc7QUFDdEMsOEJBQThCLGNBQWM7QUFDNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7Ozs7OztVQy9HQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDVztBQUNOOztBQUV0QyxjQUFjLDhDQUFJO0FBQ2xCLGNBQWMsOENBQUk7QUFDbEIscURBQWU7O0FBRWYseURBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdG9kYXktdmlldy5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzdG9yZVRhc2sgPSAoKCkgPT4ge1xuICBjb25zdCB0YXNrcyA9IFtdO1xuXG4gIGNvbnN0IHN0b3JlID0gKC4uLnRhc2spID0+IHRhc2tzLnB1c2goLi4udGFzayk7XG5cbiAgcmV0dXJuIHsgdGFza3MsIHN0b3JlIH07XG59KSgpO1xuXG5leHBvcnQgY29uc3Qgc3RvcmVQcm9qZWN0ID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHMgPSBbXTtcblxuICBjb25zdCBzdG9yZSA9IChwcm9qZWN0KSA9PiB7XG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgfTtcblxuICByZXR1cm4geyBwcm9qZWN0cywgc3RvcmUgfTtcbn0pKCk7XG4iLCJpbXBvcnQgeyBzdG9yZVRhc2sgfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBUYXNrKG5hbWUsIG5vdGVzLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdCA9IFwiTm8gUHJvamVjdFwiKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBub3RlcyxcbiAgICBkYXRlLFxuICAgIHByaW9yaXR5LFxuICAgIHByb2plY3QsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYXNrRnJvbUlucHV0KGZvcm0pIHtcbiAgY29uc3QgZm9ybUZpZWxkcyA9IGZvcm0uZWxlbWVudHM7XG4gIGNvbnN0IG5hbWUgPSBmb3JtRmllbGRzLm5hbWUudmFsdWU7XG4gIGNvbnN0IG5vdGVzID0gZm9ybUZpZWxkcy5ub3Rlcy52YWx1ZTtcbiAgY29uc3QgZGF0ZSA9IGZvcm1GaWVsZHMuZGF0ZS52YWx1ZTtcbiAgY29uc3QgcHJpb3JpdHkgPSBmb3JtRmllbGRzLnByaW9yaXR5LnZhbHVlO1xuICBjb25zdCBwcm9qZWN0ID0gZm9ybUZpZWxkcy5wcm9qZWN0LnZhbHVlO1xuICBjb25zdCB0YXNrID0gVGFzayhuYW1lLCBub3RlcywgZGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICBzdG9yZVRhc2suc3RvcmUodGFzayk7XG4gIHJldHVybiB0YXNrO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGFza0xpc3QoKSB7XG4gIGNvbnN0IHRhc2tzID0gW107XG4gIGNvbnN0IGFkZFRhc2sgPSAodGFzaykgPT4gdGFza3MucHVzaCh0YXNrKTtcbiAgcmV0dXJuIHsgdGFza3MsIGFkZFRhc2sgfTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZVRhc2tGcm9tSW5wdXQgfSBmcm9tIFwiLi90YXNrLmpzXCI7XG5pbXBvcnQgeyBzdG9yZVRhc2sgfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2RheVZpZXcoKSB7XG4gIGNvbnN0IHZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZpZXdcIik7XG5cbiAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgaGVhZGluZy50ZXh0Q29udGVudCA9IFwiVG9kYXkncyBUYXNrc1wiO1xuXG4gIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ0bi50ZXh0Q29udGVudCA9IFwiQWRkIE5ldyBUYXNrXCI7XG4gIGJ0bi5jbGFzc0xpc3QuYWRkKFwidGFzay1idG5cIik7XG5cbiAgY29uc3QgdGFza3NMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIHRhc2tzTGlzdC5jbGFzc0xpc3QuYWRkKFwidGFzay1saXN0XCIpO1xuXG4gIGNvbnN0IGZvcm1PdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLW92ZXJsYXlcIik7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyXCIpO1xuXG4gIGNvbnN0IGNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsXCIpO1xuICBjYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0b2dnbGVGb3JtKGZvcm1PdmVybGF5LCBjb250YWluZXIpO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgfSk7XG5cbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1mb3JtXCIpO1xuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGFzayA9IGNyZWF0ZVRhc2tGcm9tSW5wdXQodGhpcyk7XG4gICAgYnVpbGRUYXNrKHRhc2spO1xuICAgIHRvZ2dsZUZvcm0oZm9ybU92ZXJsYXksIGNvbnRhaW5lcik7XG4gICAgZm9ybS5yZXNldCgpO1xuICB9KTtcblxuICAvLyBmdW5jdGlvbiBidWlsZFRhc2tzKCkge1xuICAvLyAgIHRhc2tzTGlzdC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIC8vICAgY29uc3QgdGFza3MgPSBzdG9yZVRhc2sudGFza3M7XG4gIC8vICAgZm9yIChjb25zdCB0YXNrIG9mIHRhc2tzKSB7XG4gIC8vICAgICBjb25zdCBwZWVrVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIC8vICAgICAvLyBjb25zdCBmdWxsVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIC8vICAgICBwZWVrVGFzay5jbGFzc0xpc3QuYWRkKFwidGFzay1pdGVtXCIpO1xuICAvLyAgICAgcGVla1Rhc2sudGV4dENvbnRlbnQgPSBgJHt0YXNrLm5hbWV9ICR7dGFzay5ub3Rlc30gJHt0YXNrLnByaW9yaXR5fWA7XG4gIC8vICAgICAvLyBmdWxsVGFzay5hcHBlbmQoZm9ybSk7XG4gIC8vICAgICAvLyBmdWxsVGFzay5jbGFzc0xpc3QuYWRkKFwidGFzay1leHBhbmRlZFwiKTtcbiAgLy8gICAgIHBlZWtUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSwgdGFzaykgPT4gZXhwYW5kVGFzayhlLCB0YXNrKSk7XG4gIC8vICAgICB0YXNrc0xpc3QuYXBwZW5kKHBlZWtUYXNrKTtcbiAgLy8gICAgIHZpZXcuYXBwZW5kKHRhc2tzTGlzdCk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgZnVuY3Rpb24gYnVpbGRUYXNrKHRhc2spIHtcbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgY29uc3Qgbm90ZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwidGFzay1pdGVtXCIpO1xuICAgIG5hbWUudGV4dENvbnRlbnQgPSBgJHt0YXNrLm5hbWV9YDtcbiAgICBub3Rlcy50ZXh0Q29udGVudCA9IGAke3Rhc2subm90ZXN9YDtcbiAgICBwcmlvcml0eS50ZXh0Q29udGVudCA9IGAke3Rhc2sucHJpb3JpdHl9YDtcbiAgICB0YXNrRGl2LmFwcGVuZChuYW1lLCBub3RlcywgcHJpb3JpdHkpO1xuXG4gICAgY29uc3QgZXhwYW5kZWRUYXNrID0gYnVpbGRFeHBhbmRlZFRhc2tWaWV3KHRhc2spO1xuICAgIHRhc2tzTGlzdC5hcHBlbmQodGFza0RpdiwgZXhwYW5kZWRUYXNrKTtcbiAgICB0YXNrRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHBhbmRUYXNrKTtcbiAgICB2aWV3LmFwcGVuZCh0YXNrc0xpc3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRFeHBhbmRlZFRhc2tWaWV3KHRhc2spIHtcbiAgICAvLyBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBmb3JtQ2xvbmUgPSBmb3JtLmNsb25lTm9kZSh0cnVlKTtcbiAgICBmb3JtQ2xvbmUuY2xhc3NMaXN0LmFkZChcInRhc2stZXhwYW5kZWRcIiwgXCJoaWRkZW5cIik7XG4gICAgY29uc3QgbmFtZSA9IGZvcm1DbG9uZS5uYW1lO1xuICAgIGNvbnN0IG5vdGVzID0gZm9ybUNsb25lLm5vdGVzO1xuICAgIGNvbnN0IGRhdGUgPSBmb3JtQ2xvbmUuZGF0ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGZvcm1DbG9uZS5wcmlvcml0eTtcbiAgICBjb25zdCBwcm9qZWN0ID0gZm9ybUNsb25lLnByb2plY3Q7XG5cbiAgICBuYW1lLnZhbHVlID0gdGFzay5uYW1lO1xuICAgIG5vdGVzLnZhbHVlID0gdGFzay5ub3RlcztcbiAgICBkYXRlLnZhbHVlID0gdGFzay5kYXRlO1xuICAgIHByaW9yaXR5LnZhbHVlID0gdGFzay5wcmlvcml0eTtcbiAgICBwcm9qZWN0LnZhbHVlID0gdGFzay5wcm9qZWN0O1xuXG4gICAgLy8gdGFza0Rpdi5hcHBlbmQoZm9ybUNsb25lKTtcbiAgICByZXR1cm4gZm9ybUNsb25lO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwYW5kVGFzayhlKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICB0aGlzLm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIsIFwidGFzay1mb3JtXCIpO1xuICB9XG5cbiAgdmlldy5hcHBlbmQoaGVhZGluZywgYnRuKTtcbiAgLy8gYnVpbGRUYXNrcygpO1xuXG4gIGNvbnN0IGFkZFRhc2tCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLWJ0blwiKTtcbiAgYWRkVGFza0J0bnMuZm9yRWFjaCgoYnRuKSA9PlxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdG9nZ2xlRm9ybShmb3JtT3ZlcmxheSwgY29udGFpbmVyKTtcbiAgICB9KVxuICApO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVGb3JtKGNvbnRlbnQsIGJhY2tncm91bmQpIHtcbiAgaWYgKCFjb250ZW50LmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgIGJhY2tncm91bmQuc3R5bGUuZmlsdGVyID0gXCJibHVyKDVweClcIjtcbiAgICBiYWNrZ3JvdW5kLnN0eWxlLmJveFNoYWRvdyA9IFwiMCAwIDVweCA1cHhcIjtcbiAgfSBlbHNlIGJhY2tncm91bmQuc3R5bGUuZmlsdGVyID0gXCJub25lXCI7XG4gIGNvbnRlbnQuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2suanNcIjtcbmltcG9ydCB7IHRvZGF5VmlldyB9IGZyb20gXCIuL3RvZGF5LXZpZXcuanNcIjtcbmltcG9ydCB7IHN0b3JlVGFzayB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxuY29uc3QgdGFzazEgPSBUYXNrKFwidGFzazFcIiwgXCJ0ZXN0XCIsIFwiOS85LzIwMjFcIiwgXCIhISFcIiwgXCJwcm9qZWN0MVwiKTtcbmNvbnN0IHRhc2syID0gVGFzayhcInRhc2syXCIsIFwidGVzdFwiLCBcIjkvOS8yMDIxXCIsIFwiISEhXCIsIFwicHJvamVjdDFcIik7XG5zdG9yZVRhc2suc3RvcmUodGFzazEsIHRhc2syKTtcblxudG9kYXlWaWV3KCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=