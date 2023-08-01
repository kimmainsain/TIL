## HTTP 요청에 대해 궁금한거

```jsx
import axios from "axios";
import { API_URL, CONTENT_TYPE_JSON } from "../constants/constants";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": CONTENT_TYPE_JSON,
  },
});

const authApiClient = (token) =>
  axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": CONTENT_TYPE_JSON,
      Authorization: `Bearer ${token}`,
    },
  });
export default useAxiosInstance;
```

이렇게 내가 AxiosInstance를 만들어 코드의 재사용성을 강화했음

추가적으로 로그인을 하려고 하는데 **Authorization 필드**라는 개념이 등장함.
클라이언트가 서버에 요청을 보낼 때 마다 저장된 JWT를 요청 헤더의 'Authorization'필드에 넣어서 보낸다.

??? : Authorizaion이 뭔데?

## HTTP요청을 알아보자.

### 헤더 (Header)

HTTP 헤더는 HTTP 요청이나 응답에 대한 메타데이터를 포함하고 있습니다. 메타데이터란 해당 HTTP 요청이나 응답 자체에 대한 정보, 즉 데이터에 대한 데이터를 의미합니다. 헤더에는 **클라이언트와 서버가 요청 또는 응답**을 올바르게 해석하고 처리하기 위한 다양한 정보가 포함될 수 있습니다.
예를 들어, **'Content-Type' 헤더는 요청 본문의 미디어 타입**을 나타냅니다. 'Content-Type: application/json'이라는 것은 클라이언트가 서버로 보내는 데이터가 **JSON 형태임을 서버에 알려주는 역할**을 합니다.
'Authorization' 헤더는 클라이언트가 서버에 **자신의 신원을 증명**하기 위한 정보를 담고 있습니다.

### 바디 (Body)

바디는 **실제로 전송하고자 하는 데이터를 포함**하고 있습니다. 요청 메서드에 따라 바디의 존재 여부와 역할이 달라집니다. 예를 들어, GET 요청은 데이터를 **가져오는 요청**이므로 바디를 포함하지 않습니다. 반면에 POST, PUT, PATCH와 같은 요청은 새로운 리소스를 생성하거나 기존 리소스를 **수정하는 요청**이므로, 이 경우 바디에 생성하거나 수정하고자 하는 데이터를 JSON, XML 등의 형식으로 담아서 전송합니다.

그래서 보통 클라이언트와 서버 간에 데이터를 주고받을 때, 헤더는 **요청에 대한 메타데이터를 전달**하고, 바디는 실제로 **전달하고자 하는 데이터**를 담아 전송하는 역할을 합니다.

---

사진을 보면 알겠지만 굉장히 코드 중복이 많음
개선하고싶었다.

```jsx
const duplicateNicknameCheck = async () => {
  if (nickname === "") {
    alert("닉네임을 입력해주세요.");
    return;
  }
  const response = await useMemberApi.membersGetCheckNickname(nickname);
  if (response === true) {
    alert("사용 가능한 닉네임입니다.");
  } else {
    alert("이미 사용중인 닉네임입니다.");
  }
};

const duplicateEmailCheck = () => {
  if (email === "") {
    alert("이메일을 입력해주세요.");
    return;
  }
  const response = useMemberApi.membersGetCheckEmail(email);
  if (response === true) {
    alert("사용 가능한 이메일입니다.");
  } else {
    alert("이미 사용중인 이메일입니다.");
  }
};
```

## useCallback

**`useCallback`**은 React Hook 중 하나로, 메모이제이션(memoization)된 버전의 콜백 함수를 반환합니다. 이 Hook을 사용하면 **React는 해당 콜백을 메모리에 저장**하고, 의존성 배열이 변경되지 않는 한 **동일한 콜백을 재사용**합니다. 이는 성능 최적화에 도움이 됩니다.

간단한 예를 들면 아래와 같습니다.

```jsx
jsxCopy code
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);

```

여기서 **`doSomething(a, b)`**는 콜백 함수이고, **`[a, b]`**는 의존성 배열입니다. 이 배열이 변경될 때마다 새로운 콜백이 생성됩니다. 그렇지 않다면 이전에 메모이제이션된 콜백이 반환됩니다.

즉, **`useCallback`**은 주어진 콜백과 배열을 받아들이고, 메모이제이션된 콜백을 반환합니다. 배열 내부의 값들이 변경될 때마다 콜백이 다시 생성되며, 그렇지 않다면 React는 이전의 콜백을 재사용합니다.

개선한 후

```jsx
const duplicateCheck = useCallback(async (type, value, emptyMessage) => {
  if (value === "") {
    alert(emptyMessage);
    return;
  }
  const checkFunc =
    type === "Email"
      ? useMemberApi.membersGetCheckEmail
      : useMemberApi.membersGetCheckNickname;
  const response = await checkFunc(value);
  alert(
    response ? `사용 가능한 ${type}입니다.` : `이미 사용중인 ${type}입니다.`
  );
}, []);

<Button1
  value="닉네임 중복확인"
  className="font-TAEBAEKmilkyway"
  onClick={() => duplicateCheck("Nickname", nickname, "닉네임을 입력해주세요.")}
/>;
```

확실히 개선됐다.
