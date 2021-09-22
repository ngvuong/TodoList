export const pubsub = (function () {
  const events = {};
  function subscribe(event, ...callback) {
    events[event] = events[event] || [];
    events[event].push(...callback);
  }

  function publish(event, data) {
    if (events[event]) {
      events[event].forEach((cb) => cb(data));
    }
  }

  return { subscribe, publish };
})();
