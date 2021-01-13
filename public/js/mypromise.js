const PromiseStatus = {
  FULFILLED: Symbol("fulfilled"),
  PENDING: Symbol("pending"),
  REJECTED: Symbol("rejected"),
}

const PromiseNextType = {
  CATCH: Symbol("catch"),
  FINALLY: Symbol("finally"),
  THEN: Symbol("then"),
}

class MyPromise {
  // callback: (resolve, reject) => { ... }
  constructor(callback) {
    this.nexts = []
    this.status = PromiseStatus.PENDING
    this.reason = undefined
    this.value = undefined

    // call the callback with this
    callback(
      value => this.resolve(value),
      reason => this.reject(reason)
    )
  }

  // add task into the task queue
  #addToTaskQueue(task, arg) {
    setTimeout(function () {
      try {
        const value = task(arg)
        this.resolve(value)
      } catch (err) {
        this.reject(err)
      }
    }.bind(this), 0)
  }

  #makeNext(type, next) {
    return {
      type: type,
      next: next || (() => {})
    }
  }

  #addCatch(next) {
    this.nexts.push(this.#makeNext(PromiseNextType.CATCH, next))
  }

  #addThen(next) {
    this.nexts.push(this.#makeNext(PromiseNextType.THEN, next))
  }

  #doNext(typeToDo, arg) {
    while (this.nexts.length) {
      // pop the first
      const { type, next } = this.nexts.shift()

      // do next
      if (type === typeToDo) {
        this.status = PromiseStatus.PENDING

        // add the next into the task queue
        this.#addToTaskQueue(next, arg)
        break
      }
    }
  }

  // all = function() {}
  // allSettled = function() {}
  // race = function() {}

  reject(reason) {
    // handle exception
    if (this.status !== PromiseStatus.PENDING) {
      return this
    }

    // set status and reason
    this.status = PromiseStatus.REJECTED
    this.reason = reason

    // do next
    this.#doNext(PromiseNextType.CATCH, this.reason)
  }

  resolve(value) {
    // handle exception
    if (this.status !== PromiseStatus.PENDING) {
      return this
    }

    // set status and value
    this.status = PromiseStatus.FULFILLED
    this.value = value

    // do next
    this.#doNext(PromiseNextType.THEN, this.value)
  }

  catch(next) {
    switch (this.status) {
      case PromiseStatus.PENDING:
        this.#addCatch(next)
        break

      case PromiseStatus.FULFILLED:
        // do nothing
        break

      case PromiseStatus.REJECTED:
        this.#addToTaskQueue(next, this.reason)
        break

      default:
        // unknown status
        break
    }

    return this
  }

  then(next) {
    switch (this.status) {
      case PromiseStatus.PENDING:
        this.#addThen(next)
        break

      case PromiseStatus.FULFILLED:
        this.#addToTaskQueue(next, this.value)
        break

      case PromiseStatus.REJECTED:
        // do nothing
        break

      default:
        // unknown status
        break
    }

    return this
  }

  finally() {}
}