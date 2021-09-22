export const pubsub = (function () {
  const events = {};
  function subscribe(event, ...callback) {
    events[event] = events[event] || [];

    events[event].push(...callback);
    console.log(events[event]);
    events[event] = events[event].filter(
      (cb, index) => events[event].indexOf(cb) === index
    );
    console.log(events);
  }

  function unsubscribe(event, callback) {
    if (events[event]) {
      events[event].splice(events[event].indexOf(callback), 1);
    }
  }

  function publish(event, data) {
    if (events[event]) {
      events[event].forEach((cb) => cb(data));
    }
  }

  return { subscribe, unsubscribe, publish };
})();
