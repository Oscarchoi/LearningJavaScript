// 1 - task1 실행: script, script start 출력
console.log('script start')

// 2 - task2 등록: timer task 대기열에 들어감
setTimeout(function() {
  console.log('setTimeout')
}, 0)

// 3 - microtask1 등록: promise가 microtask 대기열에 들어감
Promise.resolve()
  // 5 - microtask1 실행: promise1 출력
  .then(function() {
    console.log('promise1')
    // 6 - microtask2 등록:
  })  
  .then(function() {
    // 7 - microtask2 실행: promise2 출력    
    console.log('promise2')
  })

// 4 - task1 종료: script end 출력
console.log('script end')

/* 출력 순서   
script start
script end
promise1
promise2
setTimeout */

