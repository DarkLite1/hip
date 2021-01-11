// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TCallBack<T extends any = any> = (...args: T[]) => boolean | void

const subscriptions: { [key: string]: TCallBack[] } = {}

interface ISubscription<T> {
  eventName: string
  callback: TCallBack<T>
}

export function unsubscribe<T>({ eventName, callback }: ISubscription<T>) {
  if (!subscriptions[eventName]) {
    return
  }
  const index = subscriptions[eventName].findIndex((l) => l === callback)
  if (index < 0) {
    return
  }
  subscriptions[eventName].splice(index, 1)
}

export function subscribe<T>({ eventName, callback }: ISubscription<T>) {
  // console.log('subscribe: ', eventName)
  // console.log('subscribe: ', callback)
  
  if (!subscriptions[eventName]) {
    subscriptions[eventName] = []
  }
  subscriptions[eventName].push(callback)
  return () => unsubscribe({ eventName, callback })
}

export function subscribeOnce<T>({ eventName, callback }: ISubscription<T>) {
  const unsubscribe = subscribe({
    eventName,
    callback: () => {
      callback()
      unsubscribe()
    },
  })
  return unsubscribe
}

export function publish<T>(eventName: string, ...args: T[]) {
  // console.log('publish: ', eventName)
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
