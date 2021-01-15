class MyPromise {
    constructor(func) {
        this.func = func;
        this.status = "pending";
        this.onFulfilledTasks = [];
        this.onRejectedTasks = [];
    }
    resolve(data) {
        if(this.status !== "pending") return;
        this.status = "fulfilled";    
    }
    reject(error) {
        if(this.status !== "pending") return;
        this.status = "rejected";
    }
    then(onFulfilled) {
        let returnValue = new MyPromise();
    }
    catch(onRejected) {
        
    }
}

let i = 0;
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("function");
        resolve();
    }, 1000);
});

promise.then(() => {
    console.log(i++);
    return promise;
}).then(() => {
    console.log(i++);
    return promise;
}).then(() => {
    console.log(i);
});