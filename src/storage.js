import { pubsub } from "./pubsub";
export const storeTask = (() => {
  const tasks = [];

  const store = (...task) => tasks.push(...task);
  const remove = (task) => {
    tasks.splice(tasks.indexOf(task), 1);
  };
  return { tasks, store, remove };
})();

export const storeProject = (() => {
  const projects = [];

  const store = (...project) => {
    [...project].forEach((project) => {
      project = project.toLowerCase();
      if (!projects.includes(project)) {
        projects.push(project);
      }
    });
    // projects.push(...project.toLowerCase());
  };

  return { projects, store };
})();

export const localStorage = (() => {
  const storage = window.localStorage;
  const storageAvailable = checkStorage("localStorage") ? true : false;
  const tasks = [];

  function storeLocal() {
    storage.setItem("tasks", JSON.stringify(storeTask.tasks));
  }

  function loadLocalStorage() {
    if (storageAvailable && storage.tasks) {
      for (const task of JSON.parse(storage["tasks"])) {
        tasks.push(task);
      }
    }
    return tasks;
  }
  function checkStorage(type) {
    let storage;
    try {
      storage = window[type];
      let x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        (e.code === 22 ||
          e.code === 1014 ||
          e.name === "QuotaExceededError" ||
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        storage &&
        storage.length !== 0
      );
    }
  }

  pubsub.subscribe("taskAdded", storeLocal);
  pubsub.subscribe("taskChecked", storeLocal);
  pubsub.subscribe("taskUnchecked", storeLocal);
  pubsub.subscribe("taskDeleted", storeLocal);
  pubsub.subscribe("taskUpdated", storeLocal);

  return { storeLocal, loadLocalStorage };
})();
