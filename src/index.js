import { Task } from "./task";
import { todayView } from "./today-view";
import { tasksView } from "./tasks-view";
import { storeTask } from "./storage";

const task1 = Task("task1", "test", "2021-09-15", "!!!", "project1");
const task2 = Task("task2", "test", "2021-09-15", "!!!", "project1");
storeTask.store(task1, task2);

todayView();
tasksView();
