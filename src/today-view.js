export function todayView() {
  const view = document.querySelector(".view");

  const heading = document.createElement("h1");
  heading.textContent = "Today's Tasks";

  const btn = document.createElement("button");
  btn.textContent = "Add New Task";
  btn.classList.add("task-btn");

  function renderForm() {
    const form = document.querySelector(".task-form");
    form.classList.add("active");
  }

  const addTaskBtns = document.querySelectorAll(".task-btn");
  addTaskBtns.forEach((btn) => addEventListener("click", renderForm));
  view.append(heading, btn);
}
