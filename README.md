# TIL

07.28

konva 맵 그리기 진행중

이전 버튼을 누르면 직전에 그린 별자리로 업데이트를 해야하는 상황

handleBeforeClick
이전 버튼을 눌렀음
Points는 useState에서 관리되고있음
slice로 points끝부분 잘라버린 뒤, deDup에서 자른 후의 points와 비교해서 중복체크를 해야했음
그대로 구현했는데, setState의 비동기성때문에 slice한 points가 set되지않는 문제가 발생함.

해결방법으론 1. useEffect, 2. callback
여기서 useEffect로 해결해보자.
Points의 상태가 바뀔때마다 업데이트를 해줬는데, 그러면 클릭이벤트에서도 points상태가 변하기에 deDup가 계속호출됨
따라서 Flag체크를 handleBeforeClick에 만들어줘서 true가 반환된다면 useEffect에서 업데이트하는걸로 해결했음.

궁금한거
grid[y][x] = true;
setGrid((prevGrid) => {
const newGrid = [...prevGrid];
newGrid[y][x] = true;
return newGrid;
});

제가 코드를 살펴본 바로는 handleGridClick 함수에서 직접 grid 상태를 변경하려고 하고 있습니다.
grid[y][x] = true;이 부분이 문제입니다.
이렇게 하면 React는 상태가 변경되었음을 인지하지 못하고, 이로 인해 발생하는 버그나 에러를 예상할 수 있습니다.
대신, 이전 상태를 복사하고 이 복사본을 변경한 후 이를 상태로 설정해야 합니다.
