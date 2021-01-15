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
    this.nextType = undefined

    // call the callback with this
    callback(
      value => this.#resolve(value),
      reason => this.#reject(reason)
    )
  }

  // add task into the task queue
  #addToTaskQueue(type, task, arg) {
    this.status = PromiseStatus.PENDING

    setTimeout(function () {
      try {
        if (type === PromiseNextType.FINALLY) {
          // handle finally

          // do task
          task()

          switch (this.nextType) {
            case PromiseNextType.CATCH:
              this.#reject(this.reason)
              break
            case PromiseNextType.THEN:
              this.#resolve(this.value)
              break
          }
        } else {
          // handle non-finally
          this.#resolve(task(arg))
        }
      } catch (err) {
        this.#reject(err)
      }
    }.bind(this), 0)
  }

  #makeNext(type, next) {
    return { type, next }
  }

  #addCatch(next) {
    this.nexts.push(this.#makeNext(PromiseNextType.CATCH, next))
  }

  #addFinally(next) {
    this.nexts.push(this.#makeNext(PromiseNextType.FINALLY, next))
  }

  #addThen(next) {
    this.nexts.push(this.#makeNext(PromiseNextType.THEN, next))
  }

  #doNext(arg) {
    while (this.nexts.length) {
      // pop the first
      const { type, next } = this.nexts.shift()

      // do next (include finally)
      if (type === this.nextType || type === PromiseNextType.FINALLY) {

        // add the next into the task queue
        this.#addToTaskQueue(type, next, arg)
        break
      }
    }
  }

  // all = function() {}
  // allSettled = function() {}
  // race = function() {}

  #reject(reason) {
    // handle exception
    if (this.status !== PromiseStatus.PENDING) {
      return this
    }

    // set status and reason
    this.status = PromiseStatus.REJECTED
    this.reason = reason

    // do next
    this.nextType = PromiseNextType.CATCH
    this.#doNext(this.reason)
  }

  #resolve(value) {
    // handle exception
    if (this.status !== PromiseStatus.PENDING) {
      return this
    }

    // set status and value
    this.status = PromiseStatus.FULFILLED
    this.value = value

    // do next
    this.nextType = PromiseNextType.THEN
    this.#doNext(this.value)
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
        this.#addToTaskQueue(PromiseNextType.CATCH, next, this.reason)
        break

      default:
        // unknown status
        break
    }

    return this
  }

  finally(next) {
    switch (this.status) {
      case PromiseStatus.PENDING:
        this.#addFinally(next)
        break

      case PromiseStatus.FULFILLED:
        this.#addToTaskQueue(PromiseNextType.FINALLY, next, this.value)
        break

      case PromiseStatus.REJECTED:
        this.#addToTaskQueue(PromiseNextType.FINALLY, next, this.reason)
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
        this.#addToTaskQueue(PromiseNextType.THEN, next, this.value)
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
}