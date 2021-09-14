export function Project(name, notes) {
  const tasks = [];

  addTask = function (task) {
    tasks.push(task);
  };

  return { name, notes, tasks };
}
