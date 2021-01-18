/*
    참고 링크 : https://p-iknow.netlify.app/js/custom-promise
*/
class MyPromise {
    constructor(func) {
        this.state = "pending";
        func(this.resolve.bind(this), this.reject.bind(this));
    }
    resolve(data) {
        if(this.state !== "pending") return;
        this.state = "fulfilled";

        if(this.onFulfilled === undefined) return;
        this.onFulfilled(data);
    }
    reject(error) {
        if(this.status !== "pending") return;
        this.status = "rejected";
    }
    then(onFulfilled) {
        this.onFulfilled = onFulfilled;
        this.func(this.resolve, this.reject);
    }
    catch(onRejected) {
        
    }
}


// 테스트용
const promise = new Promise((resolve, reject) => {
    console.log("function");
    setTimeout(() => {
        resolve("data");
    }, 1000);
}).then((data) => {
    console.log("then", data);
});