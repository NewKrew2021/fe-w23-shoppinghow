/*
    mypromise.js
    직접 구현한 프로미스 객체

    초기에 pending(resolve, reject 호출 전)
    -> fulfilled / reject -> settled
    Promise 객체에는 파라미터로 resolve, reject를 인자로 받는 함수를 넘긴다.
    resolve 호출 -> fulfilled 상태 -> then으로 결과 값을 받을 수 있음
    reject 호출 -> reject 상태 -> catch로 받을 수 있음
*/

const Status = {
    PENDING: "pending",
    FULFILL: "fulfill",
    REJECT: "reject"
}

const addTaskQueue = (task) => setTimeout(task, 0); // 태스크 큐에 넣는 함수

class MyPromise{

    constructor(fn){
        this.promiseResult = undefined; // resolve를 통해 넘겨받는 프로미스 결과값
        this.status = Status.PENDING; // 초기 상태
        this.fulfillFunc = () => {};// fulfill 상태가 되면 실행하는 함수
        fn( (data) => this.resolve(data),
            (data) => this.reject(data));
    }
    // resolve에 넘겨진 파라미터는 결과값을 의미한다.
    // resolve 실행 시, then으로 받은 콜백함수가 실행된다.
    resolve(data){
        /* resolve 수행 시 상태를 Fulfill로 변경 */
        this.status = Status.FULFILL;

        /* promise 결과 변수에 resolve로 넘겨받은 값을 대입 */
        /* 이는 then에서 넘겨 받은 콜백 함수의 인자값이 된다. */
        this.promiseResult = data;

        /* then에서 받은 콜백 함수를 실행하기 위해 task queue에 등록 */
        addTaskQueue(this.fulfillFunc);
    }

    then(callback){
        /* then으로 받은 콜백 함수를 resolve 이후 실행하기 위해 변수에 저장 */
        const fulfillTask = () => { callback(this.promiseResult) };

        /* PENDING 상태일 경우, 저장된 함수를 resolve 이후 실행할 함수에 등록 */
        if (this.status === Status.PENDING){
            this.fulfillFunc = fulfillTask;
        }
    }

    reject(){
    }
    // .then(null, ()=>{}) 과 같은 의미, 실패 시 catch
    catch(){
    }
}

const tests = new MyPromise(function(resolve, reject){
    setTimeout(function(){
        resolve('success');
    }, 1000);
});
tests.then((res)=>(console.log(res)));

/* // test
const test2 = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('success3');
    }, 3000);
})
test2.then((res) => console.log(res));
*/