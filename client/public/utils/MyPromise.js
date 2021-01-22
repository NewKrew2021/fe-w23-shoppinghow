const PENDING = 'pending';
const FULFILLED = 'fullfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(exec) {
        this.state = PENDING;
        this.result = undefined;
        this.callbackQueue = [];
        this.exec = exec;
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        exec(this.resolve, this.reject);
    }
    then (callback) {
        if (this.state === PENDING) {
            this.callbackQueue.push(() => callback(this.result));
            return this;
        } else if (this.state === FULFILLED) {
            return new MyPromise((res)=>{res(callback(this.result))})
        }
     }
    resolve (value) {
        this.result = value;
        if (this.callbackQueue.length === 0) {
            this.state = FULFILLED;
            return;
        }
        this.callbackQueue[0]();
        this.callbackQueue.shift();
    }
    reject (value) {
        this.result = value;
        this.state = REJECTED;
    }
}