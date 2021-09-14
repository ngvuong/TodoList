export function todayView() {
  const view = document.querySelector(".view");

  const heading = document.createElement("h1");
  heading.textContent = "Today's Tasks";

  const btn = document.createElement("button");
  btn.textContent = "Add New Task";
  btn.classList.add("task-btn");

  const formOverlay = document.querySelector(".form-overlay");
  // formOverlay.classList.add("active");
  const container = document.querySelector(".container");

  const cancel = document.querySelector(".cancel");
  cancel.addEventListener("click", () => {
    container.style.filter = "none";

    formOverlay.classList.remove("active");
  });

  view.append(heading, btn);
  const addTaskBtns = document.querySelectorAll(".task-btn");
  console.log(addTaskBtns);
  addTaskBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      container.style.filter = "blur(5px)";
      container.style.boxShadow = "0 0 5px 10px";
      formOverlay.classList.add("active");
    })
  );
}
