# Eventloop

## 개요
- Eventloop는 timers, I/O callbacks, idle&prepare, poll, check, close callbacks 등의 phase로 구성되어 있다.
- 각 Phase는 FIFO 큐로 구성되어 콜백 함수들을 담고 있으며, 이들을 동기적으로 실행한다. 이 때, 하나의 큐를 비우는 과정을 tick이라고 하는 것으로 보인다.
- 각 Phase가 끝나면, process.nectTick 콜백 큐와 microtasks 큐(promise)가 실행된다.
  - 이 부분은 NodeJS v11 부터는 바뀌어서 하나의 콜백 함수 호출이 끝날 때마다 microtask 큐를 확인하는 것으로 바뀌었다.

## Phases
- Timer phase
  - 이벤트 루프의 시작
  - setTimeout 이나 setInterval 과 같은 타이머 콜백들이 저장된다.
- Pending i/o callback phase
- Idle, Prepare phase
- Poll phase
  - I/O와 연관된 콜백들이 실행된다.
  - 실행할 다른 콜백 함수가 없는 경우, Node는 여기서 적절히 블록된다.
- Check phase
  - setImmediate()를 통해 등록된 콜백들이 실행된다.
- Close callbacks
  - close 이벤트 타입 콜백들이 처리된다.
- nextTickQueue & microTaskQueue


## 구조
*Image by [DEEPAL's BLOG (https://blog.insiderattack.net/timers-immediates-and-process-nexttick-nodejs-event-loop-part-2-2c53fd511bb3)](https://blog.insiderattack.net/timers-immediates-and-process-nexttick-nodejs-event-loop-part-2-2c53fd511bb3)*
![Alt text](https://miro.medium.com/max/1000/1*2yXbhvpf1kj5YT-m_fXgEQ.png)

