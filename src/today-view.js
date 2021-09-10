export function todayView() {
  const view = document.querySelector(".view");

  const heading = document.createElement("h1");
  heading.textContent = "Today's Tasks";

  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "Add New Task";

  function renderForm() {
    const form = document.createElement("form");
  }
  addTaskBtn.addEventListener("click", renderForm);
  view.append(heading, addTaskBtn);
}
