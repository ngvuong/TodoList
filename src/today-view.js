export function todayView() {
  const view = document.querySelector(".view");

  const heading = document.createElement("h1");
  heading.textContent = "Today's Tasks";

  const btn = document.createElement("button");
  btn.textContent = "Add New Task";
  btn.classList.add("task-btn");

  function renderForm() {
    const formOverlay = document.querySelector(".task-form");
    formOverlay.classList.add("active");
    const cancel = form.lastElementChild;
    cancel.addEventListener("click", () => console.log("cancelled"), true);
    console.log(cancel);
  }

  view.append(heading, btn);
  const addTaskBtns = document.querySelectorAll(".task-btn");
  console.log(addTaskBtns);
  addTaskBtns.forEach((btn) => btn.addEventListener("click", renderForm));
}
