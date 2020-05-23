import { useState } from "react";

let cursor = 0; // 当前memoizedState 的索引
let memoizedState = []; // hooks 的值存放在这个数组中

function useState1(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;

  const currentCursor = cursor;

  function setState(newState) {
    memoizedState[currentCursor] = newState;
    cursor = 0;
    render(<App />, document.getElementById("root"));
  }

  return [memoizedState[cursor++], setState];
}
