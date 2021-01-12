class MyPromise {
    constructor(func) {
        this.func = func;
        this.err = null;
    }
    reject(error) {
        //this.err = error;
    }
    then(onFulfilled) {
        this.func(resolve, this.reject);
        function resolve() {
            onFulfilled(...arguments);
        }
        return this;
    }
    catch(onRejected) {
        console.log("catch");
        if(this.err) onRejected(err);
    }
}

let promise = new MyPromise(function(resolve, reject) {
    setTimeout(() => {
        console.log("1초지남");
        reject("errrrr");
    }, 1000);
    
});
promise.then(function() {
    console.log("then");
}).catch(function(err) {
    console.log(err);
});