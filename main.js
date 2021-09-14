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

  const formOverlay = document.querySelector(".form-overlay");
  const container = document.querySelector(".container");

  const cancel = document.querySelector(".cancel");
  cancel.addEventListener("click", () => {
    toggleForm(formOverlay, container);
  });

  const form = document.querySelector(".task-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.createTaskFromInput)(this);
    toggleForm(formOverlay, container);
    renderTasks(tasksList);
    form.reset();
  });

  function renderTasks() {
    tasksList.textContent = "";
    const tasks = _storage_js__WEBPACK_IMPORTED_MODULE_1__.storeTask.tasks;
    for (let task of tasks) {
      const div = document.createElement("div");
      div.textContent = `${task.name} ${task.notes} ${task.priority}`;
      tasksList.append(div);
      view.append(tasksList);
    }
  }

  view.append(heading, btn);
  renderTasks();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQOztBQUVBOztBQUVBLFdBQVc7QUFDWCxDQUFDOztBQUVNO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQndDOztBQUVsQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsd0RBQWU7QUFDakI7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJnRDtBQUNQOztBQUVsQztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFJLDZEQUFtQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxrQkFBa0Isd0RBQWU7QUFDakM7QUFDQTtBQUNBLDJCQUEyQixXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWM7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7Ozs7OztVQzNEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDVztBQUNOOztBQUV0QyxjQUFjLDhDQUFJO0FBQ2xCLGNBQWMsOENBQUk7QUFDbEIscURBQWU7O0FBRWYseURBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdG9kYXktdmlldy5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzdG9yZVRhc2sgPSAoKCkgPT4ge1xuICBjb25zdCB0YXNrcyA9IFtdO1xuXG4gIGNvbnN0IHN0b3JlID0gKC4uLnRhc2spID0+IHRhc2tzLnB1c2goLi4udGFzayk7XG5cbiAgcmV0dXJuIHsgdGFza3MsIHN0b3JlIH07XG59KSgpO1xuXG5leHBvcnQgY29uc3Qgc3RvcmVQcm9qZWN0ID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHMgPSBbXTtcblxuICBjb25zdCBzdG9yZSA9IChwcm9qZWN0KSA9PiB7XG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgfTtcblxuICByZXR1cm4geyBwcm9qZWN0cywgc3RvcmUgfTtcbn0pKCk7XG4iLCJpbXBvcnQgeyBzdG9yZVRhc2sgfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBUYXNrKG5hbWUsIG5vdGVzLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdCA9IFwiTm8gUHJvamVjdFwiKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBub3RlcyxcbiAgICBkYXRlLFxuICAgIHByaW9yaXR5LFxuICAgIHByb2plY3QsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYXNrRnJvbUlucHV0KGZvcm0pIHtcbiAgY29uc3QgZm9ybUZpZWxkcyA9IGZvcm0uZWxlbWVudHM7XG4gIGNvbnN0IG5hbWUgPSBmb3JtRmllbGRzLm5hbWUudmFsdWU7XG4gIGNvbnN0IG5vdGVzID0gZm9ybUZpZWxkcy5ub3Rlcy52YWx1ZTtcbiAgY29uc3QgZGF0ZSA9IGZvcm1GaWVsZHMuZGF0ZS52YWx1ZTtcbiAgY29uc3QgcHJpb3JpdHkgPSBmb3JtRmllbGRzLnByaW9yaXR5LnZhbHVlO1xuICBjb25zdCBwcm9qZWN0ID0gZm9ybUZpZWxkcy5wcm9qZWN0LnZhbHVlO1xuICBjb25zdCB0YXNrID0gVGFzayhuYW1lLCBub3RlcywgZGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICBzdG9yZVRhc2suc3RvcmUodGFzayk7XG4gIHJldHVybiB0YXNrO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGFza0xpc3QoKSB7XG4gIGNvbnN0IHRhc2tzID0gW107XG4gIGNvbnN0IGFkZFRhc2sgPSAodGFzaykgPT4gdGFza3MucHVzaCh0YXNrKTtcbiAgcmV0dXJuIHsgdGFza3MsIGFkZFRhc2sgfTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZVRhc2tGcm9tSW5wdXQgfSBmcm9tIFwiLi90YXNrLmpzXCI7XG5pbXBvcnQgeyBzdG9yZVRhc2sgfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2RheVZpZXcoKSB7XG4gIGNvbnN0IHZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZpZXdcIik7XG5cbiAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgaGVhZGluZy50ZXh0Q29udGVudCA9IFwiVG9kYXkncyBUYXNrc1wiO1xuXG4gIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ0bi50ZXh0Q29udGVudCA9IFwiQWRkIE5ldyBUYXNrXCI7XG4gIGJ0bi5jbGFzc0xpc3QuYWRkKFwidGFzay1idG5cIik7XG5cbiAgY29uc3QgdGFza3NMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG5cbiAgY29uc3QgZm9ybU92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tb3ZlcmxheVwiKTtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXJcIik7XG5cbiAgY29uc3QgY2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWxcIik7XG4gIGNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRvZ2dsZUZvcm0oZm9ybU92ZXJsYXksIGNvbnRhaW5lcik7XG4gIH0pO1xuXG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZm9ybVwiKTtcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNyZWF0ZVRhc2tGcm9tSW5wdXQodGhpcyk7XG4gICAgdG9nZ2xlRm9ybShmb3JtT3ZlcmxheSwgY29udGFpbmVyKTtcbiAgICByZW5kZXJUYXNrcyh0YXNrc0xpc3QpO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcmVuZGVyVGFza3MoKSB7XG4gICAgdGFza3NMaXN0LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBjb25zdCB0YXNrcyA9IHN0b3JlVGFzay50YXNrcztcbiAgICBmb3IgKGxldCB0YXNrIG9mIHRhc2tzKSB7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGl2LnRleHRDb250ZW50ID0gYCR7dGFzay5uYW1lfSAke3Rhc2subm90ZXN9ICR7dGFzay5wcmlvcml0eX1gO1xuICAgICAgdGFza3NMaXN0LmFwcGVuZChkaXYpO1xuICAgICAgdmlldy5hcHBlbmQodGFza3NMaXN0KTtcbiAgICB9XG4gIH1cblxuICB2aWV3LmFwcGVuZChoZWFkaW5nLCBidG4pO1xuICByZW5kZXJUYXNrcygpO1xuICBjb25zdCBhZGRUYXNrQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzay1idG5cIik7XG4gIGFkZFRhc2tCdG5zLmZvckVhY2goKGJ0bikgPT5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRvZ2dsZUZvcm0oZm9ybU92ZXJsYXksIGNvbnRhaW5lcik7XG4gICAgfSlcbiAgKTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlRm9ybShjb250ZW50LCBiYWNrZ3JvdW5kKSB7XG4gIGlmICghY29udGVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcbiAgICBiYWNrZ3JvdW5kLnN0eWxlLmZpbHRlciA9IFwiYmx1cig1cHgpXCI7XG4gICAgYmFja2dyb3VuZC5zdHlsZS5ib3hTaGFkb3cgPSBcIjAgMCA1cHggNXB4XCI7XG4gIH0gZWxzZSBiYWNrZ3JvdW5kLnN0eWxlLmZpbHRlciA9IFwibm9uZVwiO1xuICBjb250ZW50LmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrLmpzXCI7XG5pbXBvcnQgeyB0b2RheVZpZXcgfSBmcm9tIFwiLi90b2RheS12aWV3LmpzXCI7XG5pbXBvcnQgeyBzdG9yZVRhc2sgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbmNvbnN0IHRhc2sxID0gVGFzayhcInRhc2sxXCIsIFwidGVzdFwiLCBcIjkvOS8yMDIxXCIsIFwiISEhXCIsIFwicHJvamVjdDFcIik7XG5jb25zdCB0YXNrMiA9IFRhc2soXCJ0YXNrMlwiLCBcInRlc3RcIiwgXCI5LzkvMjAyMVwiLCBcIiEhIVwiLCBcInByb2plY3QxXCIpO1xuc3RvcmVUYXNrLnN0b3JlKHRhc2sxLCB0YXNrMik7XG5cbnRvZGF5VmlldygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9