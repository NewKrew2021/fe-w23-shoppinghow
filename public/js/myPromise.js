export default class MyPromise {
  constructor(callback) {
    this.status = "pending";
    this.promiseResult = undefined;
    this.fulfilledFunc = () => {};
    this.rejectedFunc = () => {};
    callback(
      resFunc => this.resolve(resFunc), rejFunc => this.reject(rejFunc)
    );
  }

  then(resFunc) {
    if(this.status === "pending") {
      this.fulfilledFunc = resFunc;
    }
    else if(this.status === "fulfilled") {
       addToTaskQueue(resFunc(this.promiseResult));
    }
    return this;
  }

  catch(rejFunc) {
    if(this.status === "pending") {
      this.rejectedFunc = rejFunc;
    }
    else if(this.status === "rejected") {
      addToTaskQueue(rejFunc(this.promiseResult));
    } 
    return this;
  }
  
  resolve(param) {
    if (this.status !== "pending") return this;
    this.status = "fulfilled";
    this.promiseResult = param;
    console.log(param, this.fulfilledFunc)
    addToTaskQueue(this.fulfilledFunc(this.promiseResult));
  }

  reject(error) {
    if (this.status !== "pending") return this;
    this.status = "rejected";
    this.promiseResult = error;
    addToTaskQueue(this.rejectedFunc(this.promiseResult));
  }
}

const addToTaskQueue = task => setTimeout(task, 0);

const promiseTest = new MyPromise((resolve, reject) => {
  setTimeout( () => resolve("kevin"), 3000);
  setTimeout( () => reject(new Error("Request is failded")), 3000);
});

promiseTest
.then( name => console.log("I'm", name))
.catch( error => console.log(error));
