import { pubsub } from "./pubsub";
import { getFirestore, addDoc, collection } from "firebase/firestore";

export const storeTask = (() => {
  const tasks = [];

  const store = (...task) => tasks.push(...task);
  const remove = (task) => {
    tasks.splice(tasks.indexOf(task), 1);
  };
  return { tasks, store, remove };
})();

// Store and load from local storage
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

  // Save to local storage with every change event
  function useLocal(isSignedIn) {
    if (!isSignedIn) {
      pubsub.subscribe("taskAdded", storeLocal);
      pubsub.subscribe("taskChecked", storeLocal);
      pubsub.subscribe("taskUnchecked", storeLocal);
      pubsub.subscribe("taskDeleted", storeLocal);
      pubsub.subscribe("taskUpdated", storeLocal);
    } else {
      pubsub.unsubscribe("taskAdded", storeLocal);
      pubsub.unsubscribe("taskChecked", storeLocal);
      pubsub.unsubscribe("taskUnchecked", storeLocal);
      pubsub.unsubscribe("taskDeleted", storeLocal);
      pubsub.unsubscribe("taskUpdated", storeLocal);
    }
  }

  return { storeLocal, loadLocalStorage, useLocal };
})();

export const dbStorage = (() => {
  async function storeDb() {
    try {
      await addDoc(collection(getFirestore(), "tasks"), {
        tasks: storeTask.tasks,
      });
    } catch (error) {
      console.error("Cannot write to Database", error);
    }
  }

  function useDb(isSignedIn) {
    if (isSignedIn) {
      pubsub.subscribe("taskAdded", storeDb);
      pubsub.subscribe("taskChecked", storeDb);
      pubsub.subscribe("taskUnchecked", storeDb);
      pubsub.subscribe("taskDeleted", storeDb);
      pubsub.subscribe("taskUpdated", storeDb);
    } else {
      pubsub.unsubscribe("taskAdded", storeDb);
      pubsub.unsubscribe("taskChecked", storeDb);
      pubsub.unsubscribe("taskUnchecked", storeDb);
      pubsub.unsubscribe("taskDeleted", storeDb);
      pubsub.unsubscribe("taskUpdated", storeDb);
    }
  }

  return { useDb };
})();
