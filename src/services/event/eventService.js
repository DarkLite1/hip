const events = {}

export function unsubscribe(eventName, fn) {
  if (!events[eventName]) {
    return
  }

  const index = events[eventName].findIndex((l) => l === fn)

  if (index < 0) {
    return
  }

  events[eventName].splice(index, 1)
}

export function subscribe(eventName, fn) {
  if (!events[eventName]) {
    events[eventName] = []
  }
  events[eventName].push(fn)
  return () => unsubscribe(eventName, fn)
}

export function subscribeOnce(eventName, fn) {
  // Here I just used subscribe to listen to an event. If you look closely, you'll see
  // I've wrapped the supplied callback in an internal callback that invokes the past one, and
  // immediately before, it just unsubscribes itself with the function that subscribes method
  // generates for us.
  const unsubscribe = subscribe(eventName, () => {
    fn()
    unsubscribe()
  })

  // This method returns the subscription because you MAY remove the subscription
  // before it gets triggered. That would depend on you and your needs.
  return unsubscribe
}

export function emit(eventName, ...args) {
  if (!events[eventName]) {
    return
  }

  for (const fn of events[eventName]) {
    const result = fn(...args)

    if (result === false) {
      break
    }
  }
}
