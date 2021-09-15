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
    this.textContent = "";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQOztBQUVBOztBQUVBLFdBQVc7QUFDWCxDQUFDOztBQUVNO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQndDOztBQUVsQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsd0RBQWU7QUFDakI7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJnRDtBQUNQOztBQUVsQztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw2REFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWM7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQixVQUFVO0FBQ3BDLDJCQUEyQixXQUFXO0FBQ3RDLDhCQUE4QixjQUFjO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7Ozs7Ozs7VUM5R0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ1c7QUFDTjs7QUFFdEMsY0FBYyw4Q0FBSTtBQUNsQixjQUFjLDhDQUFJO0FBQ2xCLHFEQUFlOztBQUVmLHlEQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3RvZGF5LXZpZXcuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc3RvcmVUYXNrID0gKCgpID0+IHtcbiAgY29uc3QgdGFza3MgPSBbXTtcblxuICBjb25zdCBzdG9yZSA9ICguLi50YXNrKSA9PiB0YXNrcy5wdXNoKC4uLnRhc2spO1xuXG4gIHJldHVybiB7IHRhc2tzLCBzdG9yZSB9O1xufSkoKTtcblxuZXhwb3J0IGNvbnN0IHN0b3JlUHJvamVjdCA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzID0gW107XG5cbiAgY29uc3Qgc3RvcmUgPSAocHJvamVjdCkgPT4ge1xuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gIH07XG5cbiAgcmV0dXJuIHsgcHJvamVjdHMsIHN0b3JlIH07XG59KSgpO1xuIiwiaW1wb3J0IHsgc3RvcmVUYXNrIH0gZnJvbSBcIi4vc3RvcmFnZS5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gVGFzayhuYW1lLCBub3RlcywgZGF0ZSwgcHJpb3JpdHksIHByb2plY3QgPSBcIk5vIFByb2plY3RcIikge1xuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgbm90ZXMsXG4gICAgZGF0ZSxcbiAgICBwcmlvcml0eSxcbiAgICBwcm9qZWN0LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGFza0Zyb21JbnB1dChmb3JtKSB7XG4gIGNvbnN0IGZvcm1GaWVsZHMgPSBmb3JtLmVsZW1lbnRzO1xuICBjb25zdCBuYW1lID0gZm9ybUZpZWxkcy5uYW1lLnZhbHVlO1xuICBjb25zdCBub3RlcyA9IGZvcm1GaWVsZHMubm90ZXMudmFsdWU7XG4gIGNvbnN0IGRhdGUgPSBmb3JtRmllbGRzLmRhdGUudmFsdWU7XG4gIGNvbnN0IHByaW9yaXR5ID0gZm9ybUZpZWxkcy5wcmlvcml0eS52YWx1ZTtcbiAgY29uc3QgcHJvamVjdCA9IGZvcm1GaWVsZHMucHJvamVjdC52YWx1ZTtcbiAgY29uc3QgdGFzayA9IFRhc2sobmFtZSwgbm90ZXMsIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgc3RvcmVUYXNrLnN0b3JlKHRhc2spO1xuICByZXR1cm4gdGFzaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRhc2tMaXN0KCkge1xuICBjb25zdCB0YXNrcyA9IFtdO1xuICBjb25zdCBhZGRUYXNrID0gKHRhc2spID0+IHRhc2tzLnB1c2godGFzayk7XG4gIHJldHVybiB7IHRhc2tzLCBhZGRUYXNrIH07XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVUYXNrRnJvbUlucHV0IH0gZnJvbSBcIi4vdGFzay5qc1wiO1xuaW1wb3J0IHsgc3RvcmVUYXNrIH0gZnJvbSBcIi4vc3RvcmFnZS5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9kYXlWaWV3KCkge1xuICBjb25zdCB2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52aWV3XCIpO1xuXG4gIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIGhlYWRpbmcudGV4dENvbnRlbnQgPSBcIlRvZGF5J3MgVGFza3NcIjtcblxuICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBidG4udGV4dENvbnRlbnQgPSBcIkFkZCBOZXcgVGFza1wiO1xuICBidG4uY2xhc3NMaXN0LmFkZChcInRhc2stYnRuXCIpO1xuXG4gIGNvbnN0IHRhc2tzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICB0YXNrc0xpc3QuY2xhc3NMaXN0LmFkZChcInRhc2stbGlzdFwiKTtcblxuICBjb25zdCBmb3JtT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1vdmVybGF5XCIpO1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKTtcblxuICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbFwiKTtcbiAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdG9nZ2xlRm9ybShmb3JtT3ZlcmxheSwgY29udGFpbmVyKTtcbiAgfSk7XG5cbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1mb3JtXCIpO1xuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGFzayA9IGNyZWF0ZVRhc2tGcm9tSW5wdXQodGhpcyk7XG4gICAgYnVpbGRUYXNrKHRhc2spO1xuICAgIHRvZ2dsZUZvcm0oZm9ybU92ZXJsYXksIGNvbnRhaW5lcik7XG4gICAgZm9ybS5yZXNldCgpO1xuICB9KTtcblxuICAvLyBmdW5jdGlvbiBidWlsZFRhc2tzKCkge1xuICAvLyAgIHRhc2tzTGlzdC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIC8vICAgY29uc3QgdGFza3MgPSBzdG9yZVRhc2sudGFza3M7XG4gIC8vICAgZm9yIChjb25zdCB0YXNrIG9mIHRhc2tzKSB7XG4gIC8vICAgICBjb25zdCBwZWVrVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIC8vICAgICAvLyBjb25zdCBmdWxsVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIC8vICAgICBwZWVrVGFzay5jbGFzc0xpc3QuYWRkKFwidGFzay1pdGVtXCIpO1xuICAvLyAgICAgcGVla1Rhc2sudGV4dENvbnRlbnQgPSBgJHt0YXNrLm5hbWV9ICR7dGFzay5ub3Rlc30gJHt0YXNrLnByaW9yaXR5fWA7XG4gIC8vICAgICAvLyBmdWxsVGFzay5hcHBlbmQoZm9ybSk7XG4gIC8vICAgICAvLyBmdWxsVGFzay5jbGFzc0xpc3QuYWRkKFwidGFzay1leHBhbmRlZFwiKTtcbiAgLy8gICAgIHBlZWtUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSwgdGFzaykgPT4gZXhwYW5kVGFzayhlLCB0YXNrKSk7XG4gIC8vICAgICB0YXNrc0xpc3QuYXBwZW5kKHBlZWtUYXNrKTtcbiAgLy8gICAgIHZpZXcuYXBwZW5kKHRhc2tzTGlzdCk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgZnVuY3Rpb24gYnVpbGRUYXNrKHRhc2spIHtcbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgY29uc3Qgbm90ZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwidGFzay1pdGVtXCIpO1xuICAgIG5hbWUudGV4dENvbnRlbnQgPSBgJHt0YXNrLm5hbWV9YDtcbiAgICBub3Rlcy50ZXh0Q29udGVudCA9IGAke3Rhc2subm90ZXN9YDtcbiAgICBwcmlvcml0eS50ZXh0Q29udGVudCA9IGAke3Rhc2sucHJpb3JpdHl9YDtcbiAgICB0YXNrRGl2LmFwcGVuZChuYW1lLCBub3RlcywgcHJpb3JpdHkpO1xuXG4gICAgY29uc3QgZXhwYW5kZWRUYXNrID0gYnVpbGRFeHBhbmRlZFRhc2tWaWV3KHRhc2spO1xuICAgIHRhc2tzTGlzdC5hcHBlbmQodGFza0RpdiwgZXhwYW5kZWRUYXNrKTtcbiAgICB0YXNrRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHBhbmRUYXNrKTtcbiAgICB2aWV3LmFwcGVuZCh0YXNrc0xpc3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRFeHBhbmRlZFRhc2tWaWV3KHRhc2spIHtcbiAgICAvLyBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBmb3JtQ2xvbmUgPSBmb3JtLmNsb25lTm9kZSh0cnVlKTtcbiAgICBmb3JtQ2xvbmUuY2xhc3NMaXN0LmFkZChcInRhc2stZXhwYW5kZWRcIiwgXCJoaWRkZW5cIik7XG4gICAgY29uc3QgbmFtZSA9IGZvcm1DbG9uZS5uYW1lO1xuICAgIGNvbnN0IG5vdGVzID0gZm9ybUNsb25lLm5vdGVzO1xuICAgIGNvbnN0IGRhdGUgPSBmb3JtQ2xvbmUuZGF0ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGZvcm1DbG9uZS5wcmlvcml0eTtcbiAgICBjb25zdCBwcm9qZWN0ID0gZm9ybUNsb25lLnByb2plY3Q7XG5cbiAgICBuYW1lLnZhbHVlID0gdGFzay5uYW1lO1xuICAgIG5vdGVzLnZhbHVlID0gdGFzay5ub3RlcztcbiAgICBkYXRlLnZhbHVlID0gdGFzay5kYXRlO1xuICAgIHByaW9yaXR5LnZhbHVlID0gdGFzay5wcmlvcml0eTtcbiAgICBwcm9qZWN0LnZhbHVlID0gdGFzay5wcm9qZWN0O1xuXG4gICAgLy8gdGFza0Rpdi5hcHBlbmQoZm9ybUNsb25lKTtcbiAgICByZXR1cm4gZm9ybUNsb25lO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwYW5kVGFzayhlKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIiwgXCJ0YXNrLWZvcm1cIik7XG4gIH1cblxuICB2aWV3LmFwcGVuZChoZWFkaW5nLCBidG4pO1xuICAvLyBidWlsZFRhc2tzKCk7XG5cbiAgY29uc3QgYWRkVGFza0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2stYnRuXCIpO1xuICBhZGRUYXNrQnRucy5mb3JFYWNoKChidG4pID0+XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0b2dnbGVGb3JtKGZvcm1PdmVybGF5LCBjb250YWluZXIpO1xuICAgIH0pXG4gICk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUZvcm0oY29udGVudCwgYmFja2dyb3VuZCkge1xuICBpZiAoIWNvbnRlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgYmFja2dyb3VuZC5zdHlsZS5maWx0ZXIgPSBcImJsdXIoNXB4KVwiO1xuICAgIGJhY2tncm91bmQuc3R5bGUuYm94U2hhZG93ID0gXCIwIDAgNXB4IDVweFwiO1xuICB9IGVsc2UgYmFja2dyb3VuZC5zdHlsZS5maWx0ZXIgPSBcIm5vbmVcIjtcbiAgY29udGVudC5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFzay5qc1wiO1xuaW1wb3J0IHsgdG9kYXlWaWV3IH0gZnJvbSBcIi4vdG9kYXktdmlldy5qc1wiO1xuaW1wb3J0IHsgc3RvcmVUYXNrIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5jb25zdCB0YXNrMSA9IFRhc2soXCJ0YXNrMVwiLCBcInRlc3RcIiwgXCI5LzkvMjAyMVwiLCBcIiEhIVwiLCBcInByb2plY3QxXCIpO1xuY29uc3QgdGFzazIgPSBUYXNrKFwidGFzazJcIiwgXCJ0ZXN0XCIsIFwiOS85LzIwMjFcIiwgXCIhISFcIiwgXCJwcm9qZWN0MVwiKTtcbnN0b3JlVGFzay5zdG9yZSh0YXNrMSwgdGFzazIpO1xuXG50b2RheVZpZXcoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==