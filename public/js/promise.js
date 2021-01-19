/*
    참고 링크 : https://p-iknow.netlify.app/js/custom-promise
*/
class MyPromise {
    constructor(func) {
        this.state = "pending";
        this.callbacks = [];

        func(this.resolve.bind(this), this.reject.bind(this));
    }
    applyChangedState(data, state) {
        if(this.state !== "pending") return;
        if(data instanceof MyPromise) {
            data.then(innerPromiseData => {
                this.data = innerPromiseData;
                this.state = state;
                this.callbacks.forEach(callback => callback());
            });
        }
        else {
            this.data = data;
            this.state = state;
            this.callbacks.forEach(callback => callback());
        }
    }

    decidePromiseByMethod(method, callback) {
        const state = method === "then" ? "fulfilled" : "rejected";
        if(this.state === state) return new MyPromise(resolve => resolve(callback(this.data)));
        if(this.state === "pending") return new MyPromise(resolve => {
            this.callbacks.push(() => {
                resolve(callback(this.data));
            });
        });
        return this;
    }

    resolve(data) {
        this.applyChangedState(data, "fulfilled");
    }
    reject(error) {
        this.applyChangedState(error, "rejected");
    }
    then(callback) {
        return this.decidePromiseByMethod("then", callback);
    }
    catch(callback) {
        return this.decidePromiseByMethod("catch", callback);
    }
}