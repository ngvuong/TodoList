import { pubsub } from "./pubsub";
import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore";

export const storeTask = (() => {
  let tasks = [];

  const store = (...task) => tasks.push(...task);
  const remove = (task) => {
    tasks = tasks.filter((t) => t !== task);
    storeTask.tasks = tasks;
    pubsub.publish("taskDeleted", task);
  };

  const reset = () => {
    tasks = [];
    storeTask.tasks = tasks;
  };

  return { tasks, store, remove, reset };
})();

// Store and load from local storage
export const localStorage = (() => {
  const storage = window.localStorage;
  const storageAvailable = checkStorage("localStorage") ? true : false;

  function storeLocal() {
    storage.setItem("tasks", JSON.stringify(storeTask.tasks));
  }

  function loadLocalStorage() {
    const tasks = [];

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
  async function storeDb(user, isUserSignedIn) {
    if (isUserSignedIn()) {
      const userId = user.uid;
      try {
        await setDoc(doc(getFirestore(), "tasks", `tasks${userId}`), {
          tasks: storeTask.tasks,
        });
      } catch (error) {
        console.error("Cannot write to Database", error);
      }
    }
  }

  async function loadDb(user) {
    const docRef = doc(getFirestore(), "tasks", `tasks${user.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      storeTask.reset();
      storeTask.store(...docSnap.data().tasks);
      pubsub.publish("tasksLoaded", storeTask.tasks);
    } else {
      console.error("Document not found");
    }
  }

  function useDb(user, isUserSignedIn) {
    function storeUserTasks() {
      storeDb(user, isUserSignedIn);
    }
    if (user) {
      pubsub.subscribe("taskAdded", storeUserTasks);
      pubsub.subscribe("taskChecked", storeUserTasks);
      pubsub.subscribe("taskUnchecked", storeUserTasks);
      pubsub.subscribe("taskDeleted", storeUserTasks);
      pubsub.subscribe("taskUpdated", storeUserTasks);
    }
  }

  return { useDb, loadDb };
})();
