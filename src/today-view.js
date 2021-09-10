export function todayView() {
  const view = document.querySelector(".view");

  const heading = document.createElement("h1");
  heading.textContent = "Today's Tasks";

  const addTaskBtn = document.createElement("button");

  view.append(heading);
}
