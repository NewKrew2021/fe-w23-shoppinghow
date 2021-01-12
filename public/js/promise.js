/**
 * Referred to: https://velog.io/@teihong93/Promise-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-1
 */

class _Promise {

    PENDING = "pending";
    FULFILLED = "fulfilled";
    REJECTED = "rejected";

    constructor(callBack) {
        this.status = this.PENDING;
        this.promiseResult = undefined;
        this.fulfilledFunc = () => { };
        this.rejectedFunc = () => { };
        callBack(
            (v) => this.resolve(v),
            (v) => this.reject(v)
        );
    }
    addToTaskQueue = (t) => setTimeout(t, 0);
    then(onFulfilled) {
        const fulfilledTask = () => {
            onFulfilled(this.promiseResult);
        };
        switch (this.status) {
            case this.PENDING: {
                this.fulfilledFunc = fulfilledTask;
                break;
            }
            case this.FULFILLED: {
                this.addToTaskQueue(fulfilledTask);
                break;
            }
            case this.REJECTED: {
                break;
            }
        }
        return this;
    }
    _doTask(t) {
        this.addToTaskQueue(t)
    }
    resolve(v) {
        if (this.status !== this.PENDING) {
            return this;
        }
        this.status = this.FULFILLED;
        this.promiseResult = v;
        this._doTask(this.fulfilledFunc)
    }
}

const asyncJob = (f) => setTimeout(f, 3000);

new _Promise((res, rej) => {
    asyncJob(() => {
        res("resolved");
    });
}).then((e) => console.log("then", e));

console.log("console log call");