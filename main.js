/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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


function todayView() {
  const view = document.querySelector(".view");

  const heading = document.createElement("h1");
  heading.textContent = "Today's Tasks";

  const btn = document.createElement("button");
  btn.textContent = "Add New Task";
  btn.classList.add("task-btn");

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
    toggleForm(formOverlay, container);
    console.log(task);
  });

  view.append(heading, btn);
  const addTaskBtns = document.querySelectorAll(".task-btn");
  console.log(addTaskBtns);
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



const task1 = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.Task)("task1", "test", "9/9/2021", "project1", "!!!");
const task2 = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.Task)("task2", "test", "9/9/2021", "project1", "!!!");
const view = document.querySelector(".view");
const tasks = document.createElement("div");

tasks.textContent = `${task1.name} ${task1.notes}`;
console.log(task1.name, task2.name);
(0,_today_view_js__WEBPACK_IMPORTED_MODULE_1__.todayView)();
view.appendChild(tasks);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLFdBQVc7QUFDWDs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCMEQ7O0FBRW5EO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw2REFBbUI7QUFDcEM7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7Ozs7OztVQzVDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNXOztBQUU1QyxjQUFjLDhDQUFJO0FBQ2xCLGNBQWMsOENBQUk7QUFDbEI7QUFDQTs7QUFFQSx1QkFBdUIsWUFBWSxFQUFFLFlBQVk7QUFDakQ7QUFDQSx5REFBUztBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy90b2RheS12aWV3LmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIFRhc2sobmFtZSwgbm90ZXMsIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0ID0gXCJObyBQcm9qZWN0XCIpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIG5vdGVzLFxuICAgIGRhdGUsXG4gICAgcHJpb3JpdHksXG4gICAgcHJvamVjdCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRhc2tGcm9tSW5wdXQoZm9ybSkge1xuICBjb25zdCBmb3JtRmllbGRzID0gZm9ybS5lbGVtZW50cztcbiAgY29uc3QgbmFtZSA9IGZvcm1GaWVsZHMubmFtZS52YWx1ZTtcbiAgY29uc3Qgbm90ZXMgPSBmb3JtRmllbGRzLm5vdGVzLnZhbHVlO1xuICBjb25zdCBkYXRlID0gZm9ybUZpZWxkcy5kYXRlLnZhbHVlO1xuICBjb25zdCBwcmlvcml0eSA9IGZvcm1GaWVsZHMucHJpb3JpdHkudmFsdWU7XG4gIGNvbnN0IHByb2plY3QgPSBmb3JtRmllbGRzLnByb2plY3QudmFsdWU7XG4gIGNvbnN0IHRhc2sgPSBUYXNrKG5hbWUsIG5vdGVzLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gIHJldHVybiB0YXNrO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGFza0xpc3QoKSB7XG4gIGNvbnN0IHRhc2tzID0gW107XG4gIGNvbnN0IGFkZFRhc2sgPSAodGFzaykgPT4gdGFza3MucHVzaCh0YXNrKTtcbiAgcmV0dXJuIHsgdGFza3MsIGFkZFRhc2sgfTtcbn1cbiIsImltcG9ydCB7IHRhc2tMaXN0LCBjcmVhdGVUYXNrRnJvbUlucHV0IH0gZnJvbSBcIi4vdGFzay5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9kYXlWaWV3KCkge1xuICBjb25zdCB2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52aWV3XCIpO1xuXG4gIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIGhlYWRpbmcudGV4dENvbnRlbnQgPSBcIlRvZGF5J3MgVGFza3NcIjtcblxuICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBidG4udGV4dENvbnRlbnQgPSBcIkFkZCBOZXcgVGFza1wiO1xuICBidG4uY2xhc3NMaXN0LmFkZChcInRhc2stYnRuXCIpO1xuXG4gIGNvbnN0IGZvcm1PdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLW92ZXJsYXlcIik7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyXCIpO1xuXG4gIGNvbnN0IGNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsXCIpO1xuICBjYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0b2dnbGVGb3JtKGZvcm1PdmVybGF5LCBjb250YWluZXIpO1xuICB9KTtcblxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWZvcm1cIik7XG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0YXNrID0gY3JlYXRlVGFza0Zyb21JbnB1dCh0aGlzKTtcbiAgICB0b2dnbGVGb3JtKGZvcm1PdmVybGF5LCBjb250YWluZXIpO1xuICAgIGNvbnNvbGUubG9nKHRhc2spO1xuICB9KTtcblxuICB2aWV3LmFwcGVuZChoZWFkaW5nLCBidG4pO1xuICBjb25zdCBhZGRUYXNrQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzay1idG5cIik7XG4gIGNvbnNvbGUubG9nKGFkZFRhc2tCdG5zKTtcbiAgYWRkVGFza0J0bnMuZm9yRWFjaCgoYnRuKSA9PlxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdG9nZ2xlRm9ybShmb3JtT3ZlcmxheSwgY29udGFpbmVyKTtcbiAgICB9KVxuICApO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVGb3JtKGNvbnRlbnQsIGJhY2tncm91bmQpIHtcbiAgaWYgKCFjb250ZW50LmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgIGJhY2tncm91bmQuc3R5bGUuZmlsdGVyID0gXCJibHVyKDVweClcIjtcbiAgICBiYWNrZ3JvdW5kLnN0eWxlLmJveFNoYWRvdyA9IFwiMCAwIDVweCA1cHhcIjtcbiAgfSBlbHNlIGJhY2tncm91bmQuc3R5bGUuZmlsdGVyID0gXCJub25lXCI7XG4gIGNvbnRlbnQuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2suanNcIjtcbmltcG9ydCB7IHRvZGF5VmlldyB9IGZyb20gXCIuL3RvZGF5LXZpZXcuanNcIjtcblxuY29uc3QgdGFzazEgPSBUYXNrKFwidGFzazFcIiwgXCJ0ZXN0XCIsIFwiOS85LzIwMjFcIiwgXCJwcm9qZWN0MVwiLCBcIiEhIVwiKTtcbmNvbnN0IHRhc2syID0gVGFzayhcInRhc2syXCIsIFwidGVzdFwiLCBcIjkvOS8yMDIxXCIsIFwicHJvamVjdDFcIiwgXCIhISFcIik7XG5jb25zdCB2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52aWV3XCIpO1xuY29uc3QgdGFza3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG50YXNrcy50ZXh0Q29udGVudCA9IGAke3Rhc2sxLm5hbWV9ICR7dGFzazEubm90ZXN9YDtcbmNvbnNvbGUubG9nKHRhc2sxLm5hbWUsIHRhc2syLm5hbWUpO1xudG9kYXlWaWV3KCk7XG52aWV3LmFwcGVuZENoaWxkKHRhc2tzKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==