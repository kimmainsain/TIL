## konva 맵 그리기 진행중

이전 버튼을 누르면 직전에 그린 별자리로 업데이트를 해야하는 상황

handleBeforeClick 이전 버튼을 눌렀음
Points는 useState에서 관리되고있음 slice로 points끝부분 잘라버린 뒤, deDup에서 자른 후의 points와 비교해서 중복체크를 해야했다.
그대로 구현했는데, setState의 비동기성때문에 slice한 points가 set되지않는 문제가 발생함.

해결방법으론 1. useEffect, 2. callback 여기서 useEffect로 해결해보자. Points의 상태가 바뀔때마다 업데이트를 해줬는데, 그러면 클릭이벤트에서도 points상태가 변하기에 deDup가 계속호출됨 따라서 Flag체크를 handleBeforeClick에 만들어줘서 true가 반환된다면 useEffect에서 업데이트하는걸로 해결했음.

## 궁금한거

```jsx
grid[y][x] = true; (이렇게 하면안됨)
setGrid((prevGrid) => {
  const newGrid = [...prevGrid];
  newGrid[y][x] = true;
  return newGrid; });
```

## 해결

찾아본 결과 handleGridClick 함수에서 직접 grid상태를 변경하면 안된다.
React의 useState의 상태변경함수는 비동기식으로 가기에 상태 변경을 직접 변경해버리면 React는 상태가 변경됨을 인지를 못하게된다.
따라서 이전 상태를 복사하고, 이 복사본을 변경한 후 이를 상태로 설정해야 한다.

## 추가적인 의문

ㅇㅋ 상태변경 인지못하는거 맞음 근데 그렇다고 2차원배열을 전부 다 돌아야하나? 너무 비효율적인 방법이 아닐까? 사람들에게 의견을 물어보고 시도해봤다.

### y,x를 가진 객체의 배열을 선언해서 그 안에서 처리한다면?

아까 했던 방법이랑 비슷하다. useEffect에서 flag잡고 배열의 요소가 바뀐다면 업데이트하는 방법인데, grid[y][x] = true를 한다면 React가 인지를 못한다.

### 2차원 배열을 들고있는 객체를 만든 다음, 객체만 새로 만들고 배열 그대로 내비둔다면?

그러면 2차원배열을 들고있는 객체를 새로 만들어버린다면? -> 결국엔 똑같다. 2차원배열 복사한 뒤 객체를 생성하는데 최적화가 되는 방법이 아니다.

## 느낀점

2차원배열의 상태관리를 이렇게 해야하나,, 그래도 useEffect와 React의 상태변경에 대해서 배울 수 있는 시간이였다.
