type TCallBack = (...args: unknown[]) => boolean | void

const subscriptions: { [key: string]: TCallBack[] } = {}

interface ISubscription {
  eventName: string
  callback: TCallBack
}

export function unsubscribe({ eventName, callback }: ISubscription) {
  if (!subscriptions[eventName]) {
    return
  }

  const index = subscriptions[eventName].findIndex((l) => l === callback)

  if (index < 0) {
    return
  }

  subscriptions[eventName].splice(index, 1)
}

export function subscribe({ eventName, callback }: ISubscription) {
  if (!subscriptions[eventName]) {
    subscriptions[eventName] = []
  }
  subscriptions[eventName].push(callback)
  return () => unsubscribe({ eventName, callback })
}

export function subscribeOnce({ eventName, callback }: ISubscription) {
  // Here I just used subscribe to listen to an event. If you look closely, you'll see I've wrapped the supplied callback in an internal callback that invokes the past one, and immediately before, it just unsubscribes itself with the function that subscribes method generates for us.

  const unsubscribe = subscribe({
    eventName,
    callback: () => {
      callback()
      unsubscribe()
    },
  })

  // This method returns the subscription because you MAY remove the subscription before it gets triggered. That would depend on your needs.
  return unsubscribe
}

export function publish(eventName: string, ...args: unknown[]) {
  if (!subscriptions[eventName]) {
    return
  }

  for (const callback of subscriptions[eventName]) {
    const result = callback(...args)

    if (result === false) {
      break
    }
  }
}
