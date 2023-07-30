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

07.30
HTTP 요청에 대해 궁금한거

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

이렇게 내가 AxiosInstance를 만들어 코드의 재사용성을 강화했음

추가적으로 로그인을 하려고 하는데 Authorization 필드라는 개념이 등장함.
클라이언트가 서버에 요청을 보낼 때 마다 저장된 JWT를 요청 헤더의 'Authorization'필드에 넣어서 보낸다.

??? : Authorizaion이 뭔데?

그 전에 HTTP요청을 알아보자.
헤더 (Header)
HTTP 헤더는 HTTP 요청이나 응답에 대한 메타데이터를 포함하고 있습니다. 메타데이터란 해당 HTTP 요청이나 응답 자체에 대한 정보, 즉 데이터에 대한 데이터를 의미합니다. 헤더에는 클라이언트와 서버가 요청 또는 응답을 올바르게 해석하고 처리하기 위한 다양한 정보가 포함될 수 있습니다.
예를 들어, 'Content-Type' 헤더는 요청 본문의 미디어 타입을 나타내고, 'Authorization' 헤더는 클라이언트의 인증 정보를 포함하는 등의 역할을 합니다. 또한 'User-Agent' 헤더는 클라이언트의 어플리케이션 타입, 운영체제, 소프트웨어 제조사 등을 서버에게 알려주는 역할을 합니다.

바디 (Body)
바디는 실제로 전송하고자 하는 데이터를 포함하고 있습니다. 요청 메서드에 따라 바디의 존재 여부와 역할이 달라집니다. 예를 들어, GET 요청은 데이터를 가져오는 요청이므로 바디를 포함하지 않습니다. 반면에 POST, PUT, PATCH와 같은 요청은 새로운 리소스를 생성하거나 기존 리소스를 수정하는 요청이므로, 이 경우 바디에 생성하거나 수정하고자 하는 데이터를 JSON, XML 등의 형식으로 담아서 전송합니다.

그래서 보통 클라이언트와 서버 간에 데이터를 주고받을 때, 헤더는 요청에 대한 메타데이터를 전달하고, 바디는 실제로 전달하고자 하는 데이터를 담아 전송하는 역할을 합니다.


내가 사용했던 'Content-Type' 헤더는 클라이언트가 서버로 보내는 요청의 본문에 대한 정보를 담고 있습니다. 'Content-Type: application/json'이라는 것은 클라이언트가 서버로 보내는 데이터가 JSON 형태임을 서버에 알려주는 역할을 합니다. 이는 서버가 클라이언트가 보낸 요청의 본문을 올바르게 해석하고 처리하기 위해 필요한 정보입니다.

반면, 'Authorization' 헤더는 클라이언트가 서버에 자신의 신원을 증명하기 위한 정보를 담고 있습니다. 이 헤더의 값으로 JWT(Jason Web Token) 같은 토큰을 설정할 수 있습니다. 'Bearer {jwt}' 형식으로 토큰을 설정하면, 이 토큰을 통해 클라이언트가 자신이 누구인지(즉, 어떤 사용자인지), 어떤 권한을 가지고 있는지 등의 정보를 서버에 제공할 수 있습니다. 이는 서버가 클라이언트의 요청을 처리할 때 요청을 보낸 사용자의 권한을 확인하는 데 사용됩니다.

예를 들어, JSON 형태의 데이터를 보내는 로그인 요청을 할 때는 'Content-Type' 헤더와 함께 'Authorization' 헤더를 사용하지 않을 것입니다. 왜냐하면 이 시점에서는 아직 클라이언트가 자신의 신원을 증명할 토큰을 받지 못했기 때문입니다. 반면에, 로그인 후 사용자의 정보를 가져오는 요청을 보낼 때는 'Authorization' 헤더를 사용하여 요청에 JWT를 포함시킬 것입니다.
