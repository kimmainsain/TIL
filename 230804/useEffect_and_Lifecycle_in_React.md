useEffect와 life cycle을 한번 정리하고 가야겠다고 생각해왔었다.
그게 오늘이다.

### React에서의 useEffect와 생명주기

React에서 컴포넌트의 생명주기는 크게 세 가지로 나누어진다. **마운트**, **업데이트**, **언마운트**.

1. **마운트**: 페이지에 컴포넌트가 나타남
2. **업데이트**: 컴포넌트 정보 업데이트
3. **언마운트**: 페이지에서 컴포넌트가 사라짐

### useEffect

`useEffect`는 이러한 생명주기를 관리하는 강력한 Hook이다.

- **첫 번째 파라미터**: 수행하려는 작업을 함수로 전달
- **두 번째 파라미터**: 의존성 배열(deps)

### deps배열을 비운경우

```jsx
useEffect(() => {
  console.log("컴포넌트가 마운트될 때만 실행됩니다.");
}, []);
```

만약 deps배열을 비운다면, **컴포넌트가 처음 나타날 때**에만 `useEffect`에 등록한 함수가 호출된다.

</br>

```jsx
useEffect(() => {
  console.log("마운트될 때 실행");
  return () => {
    console.log("언마운트될 때 cleanup");
  };
}, []);
```

cleanup 함수는 `useEffect` 안에서 반환할 수 있으며 **컴포넌트가 언마운트될 때** 실행된다.

</br>

### 마운트 시에 일반적으로 하는 작업은 뭐가있을까?

- props로 받은 값을 로컬 상태로 설정
- 외부 API 요청
- 라이브러리 사용 (D3, Video.js 등)
- setInterval, setTimeout을 통한 작업

</br>

### 언마운트 시에 하는 작업은?

- setInterval, setTimeout의 작업 clear
- 라이브러리 인스턴스 제거

</br>

### 의존성 배열에 값 지정

```jsx
useEffect(() => {
  console.log("value 값이 변경될 때마다 실행됩니다.");
}, [value]);
```

deps에 특정 값을 넣게 된다면, 컴포넌트가 **처음 마운트될 때에도 호출**이 되고, **지정한 값이 바뀔 때에도 호출**이 된다.

</br>

### deps 파라미터 생략

```jsx
useEffect(() => {
  console.log("컴포넌트가 리렌더링될 때마다 실행됩니다.");
});
```

deps파라미터를 생략한다면, 컴포넌트가 **리렌더링될 때마다 호출**이 된다.

</br>

### 주의 : useEffect안에서 사용하는 상태나 props가 있다면, useEffect의 deps에 넣어야 한다.

만약 useEffect안에서 사용하는 상태나 props를 deps에 넣지 않게 된다면 useEffect에 등록한 함수가 **실행될 때 최신 props상태를 가리키지 않게된다.**

## 추가적으로 공부해야할 것 : 컴포넌트의 최적화 (React.memo, useMemo, useCallback ...)

이번 프로젝트에서 계속 최적화를 고려하고있지만, 시간이 너무 한정되어있다.. 일단해보자
