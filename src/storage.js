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

export const localstorage = (() => {
  const storage = window.localStorage;
  const storageAvailable = checkStorage("localStorage") ? true : false;

  const loadLocalStorage = () => {
    if (storageAvailable && storage.length) {
    }
  };
  const checkStorage = (type) => {
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
  };

  return { loadLocalStorage, checkStorage };
})();
