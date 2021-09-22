export const pubsub = (function () {
  const events = {};
  function subscribe(event, callback) {
    events[event] = events[event] || [];
    // const fnName = callback.name;
    // const cbNames = events[event].map((cb) => cb.name);
    // if (!cbNames.includes(fnName)) {
    // }
    events[event].push(callback);
    console.log(events[event]);
  }

  function unsubscribe(event, callback) {
    if (events[event]) {
      events[event] = events[event].filter((cb) => cb !== callback);
    }
  }

  function publish(event, data) {
    if (events[event]) {
      events[event].forEach((cb) => cb(data));
    }
  }

  return { subscribe, unsubscribe, publish };
})();
