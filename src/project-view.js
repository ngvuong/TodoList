export function projectView() {
  const view = document.querySelector(".view");

  const heading = document.createElement("h1");
  heading.textContent = "Projects";

  view.append(heading);
}
