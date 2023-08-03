https://github.com/kimmainsain/TIL/blob/master/230802/Konva_Images_in_Firebase.md

어제 정리했던 Firebase에 이미지를 넣는 코드와 원리를 알아보자.

```
const imageUrl = linesAndPointsLayerRef.current.toDataURL();
```

라인과 포인트 레이어 데이터들을 URL로 변환한다.

```jsx
const [header, data] = imageUrl.split(","); // data:image/png;base64
```

헤더와 데이터를 분리한다. 이유는 아래에서 자세히 설명할 것

```jsx
const mimeType = header.split(";")[0].split(":")[1]; // image/png
```

mimeType. 헤더의 data, png를 떼어낸 결과값을 저장한다.

```jsx
const binary = atob(data);
const array = Uint8Array.from(binary, (c) => c.charCodeAt(0));
```

데이터를 바이너리 데이터로 바꾸고, Uint8Array로 변환

```jsx
const imageName = `constellation-${new Date().getTime()}.png`;
const storageRef = ref(storage, `images/${imageName}`);
const uploadTask = uploadBytesResumable(storageRef, array, {
  contentType: mimeType,
});
```

`**imageName**`을 정하고**`firebase`**에 저장한다. (imageName은 추후에 nickname + time으로변경)

**`uploadTask`**는 **파일 업로드 작업을 나타내는 객체**

## 데이터 → URL변환되는 과정

### **`atob(data)`**

**`data`**는 앞서 **`toDataURL`** 메서드로부터 얻은 데이터 URL에서 추출된 **Base64 인코딩된 문자열이**다. **`atob`** 함수는 이 Base64 인코딩된 문자열을 **디코딩**하여 바이너리 **데이터를 ASCII 문자열 형태로 반환**한다.

이미지와 같은 바이너리 데이터를 ASCII 문자열로 표현하기 위해 **Base64 인코딩이 주로 사용**되며, **`atob`**를 통해 이를 **디코딩**할 수 있다.

### 왜 Base64 인코딩되었을까?

Base64 인코딩**은 바이너리 데이터를 ASCII 문자열로 변환하는 과정**에서 64개의 안전한 문자를 사용한다. 이것은 바이너리 데이터가 텍스트 기반의 시스템에서 **안전하게 전송될 수 있도록 하기 위한 것**

### **`Uint8Array.from(binary, (c) => c.charCodeAt(0))`**

**`binary`** 문자열은 앞서 언급한 **바이너리 데이터를 ASCII 문자열 형태로 표현한 것**이다. 이 문자열의 각 문자는 원래 바이너리 데이터의 각 바이트를 나타낸다. **`Uint8Array.from`** 메서드는 이 문자열을 **바이트 배열로 변환**합니다.

- **`Uint8Array`**: 8비트 부호 없는 정수의 배열을 나타낸다. 각 요소는 0부터 255 사이의 값을 가진다. 이미지 파일과 같은 바이너리 데이터는 8비트 단위로 처리되므로, 8비트 배열을 사용한다.
- **`c.charCodeAt(0)`**: 문자열의 각 문자 **`c`**를 해당 ASCII 코드값으로 변환한다. 이는 바이너리 데이터의 원래 8비트 값과 일치한다.

**바이너리 데이터는 8비트 단위로 구성되어 있으므로, 8비트 배열을 사용해야 해당 데이터를 올바르게 표현할 수 있다.**

## mimeType에 대해 알아보자.

MIME(Multipurpose Internet Mail Extensions) 타입은 **파일의 형식을 설명하는 라벨**이다. 웹에서는 **서버가 브라우저에게 어떤 종류의 파일을 전송하고 있는지를 알려주는 역할**을 한다. 예를 들어, **`text/html`**은 HTML 파일을, **`image/png`**은 PNG 이미지 파일을 나타낸다.

### mimeType을 지정 안할 경우

실제로 해봤는데, `**firebase**`에 내 별자리가 정상적으로 올라가긴 하는데, 이미지를 클릭하면 화면에 나오는게 아니라 다운로드가 되는 문제가 생겼다.
`**application/octet-stream**` 내 개별 타입은 이렇게 나온다. 다른 화면에 나오는 이미지들은`**image/jpeg**`였다. 속성이 다른 문제가 있다. 찾아보니 **`application/octet-stream`**은 특정한 타입이 지정되지 않은 바이너리 데이터를 의미한다고 한다.

### 문법, 일반적인 구조

**`type/subtype`**
MIME타입의 구조는 매우 간단하다. '/'로 구분된 두 개의 **문자열인 타입**과 **서브타입으로 구성**된다. **type은 카테고리**를 나타내며 개별 혹은 멀티파트 타입이 될 수 있다. **subtype은 각각의 타입**에 한정된다.

### 개별 타입

```
text/plain
text/html
image/jpeg
image/png
audio/mpeg
audio/ogg
audio/*
video/mp4
application/octet-stream
…

```

*개별* 타입은 문서의 카테고리를 가리키며, 다음 중 하나가 될 수 있다.

| 타입        | 설명                                                                                                                                   | 일반적인 서브타입 예시                                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| text        | 텍스트를 포함하는 모든 문서를 나타내며 이론상으로는 인간이 읽을 수 있어야 합니다                                                       | text/plain, text/html, text/css, text/javascript (application/javascript권장)                                                       |
| image       | 모든 종류의 이미지를 나타냅니다. (animated gif처럼) 애니메이션되는 이미지가 이미지 타입에 포함되긴 하지만, 비디오는 포함되지 않습니다. | image/gif, image/png, image/jpeg, image/bmp, image/webp                                                                             |
| audio       | 모든 종류의 오디오 파일들을 나타냅니다.                                                                                                | audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav                                                                            |
| video       | 모든 종류의 비디오 파일들을 나타냅니다.                                                                                                | video/webm, video/ogg                                                                                                               |
| application | 모든 종류의 이진 데이터를 나타냅니다.                                                                                                  | application/octet-stream, application/pkcs12, application/vnd.mspowerpoint, application/xhtml+xml, application/xml, application/pdf |

### **application/octet-stream**

옥텟 스트림은 이름에서처럼 8비트 단위의 바이너리 데이터를 의미한다.

위에서 말했듯 특별히 표현할 수 있는 프로그램이 존재하지 않는 데이터의 경우 **기본값**으로 `**octet-stream**`을 사용한다.

![Untitled](<./img/Untitled%20(6).png>)

1 ~ 2) 송신자는 바이너리 데이터인 이미지 파일 aaa.png 를 MIME 사양에 맞게 ASCII코드로 인코딩한다. 3) 인코딩된 이미지 데이터를 수신자에게 전송
4 ~ 5) 수신자는 인코딩된 이미지 데이터(ASCII) 를 MIME TYPE image/png 의 사양에 맞게 다시 aaa.png 바이너리 데이터로 디코딩한다.

### **정확한 MIME 타입의 중요성**

1. **알 수 없는 타입의 처리**: MIME 타입이 잘못 설정되거나 알 수 없는 경우, 웹 서버는 일반적으로 **`application/octet-stream`**이라는 기본값을 사용한다. 이는 "이것은 바이너리 데이터이며, 어떻게 다룰지 모르겠다"라는 뜻.
2. **보안 문제**: 브라우저는 이런 타입의 파일을 어떻게 처리해야 할지 모르므로, 사용자에게 직접 물어보거나 파일을 다운로드하게 할 수 있다. 이로 인해 사용자 경험이 떨어질 수 있으며, 잘못된 처리로 인한 보안 위험이 발생할 수도 있음.
3. **특정 파일의 처리**: 일부 특별한 파일, 예를 들어 인코딩된 RAR 파일이나 오디오/비디오 파일은 올바른 MIME 타입이 설정되지 않으면 제대로 작동하지 않을 수 있다.
   - **RAR 파일**: 올바른 타입인 **`application/x-rar-compressed`**를 설정해야만 브라우저가 올바르게 처리한다.
   - **오디오/비디오 파일**: 올바른 MIME 타입 없이는 **`<video>`**나 **`<audio>`** 태그로 재생되지 않을 수 있다.
4. **개인적인 파일 타입**: 특별한 파일 형식을 사용하는 경우, 일반적인 **`application/octet-stream`** 대신 정확한 타입을 설정해야 한다. 그렇지 않으면 브라우저가 어떻게 처리해야 할지 모르게 되어, 사용자 경험이 저하될 수 있다고 한다.

# 확장

[](https://github.com/kimmainsain/TIL/blob/master/230730/React_HTTP_Callback.md)

HTTP헤더에 관해서 공부를 했었던 230730내용이다.

**`Content-Type`** 에 **`application/json`** 을 지정해줬었다.

이미지를 전송하려면 **`Content-Type`** 헤더에 이미지의 타입을 지정해야 한다. 예를 들어 PNG 이미지를 전송하는 경우 헤더는 `**Content-Type: image/png`\*\* 으로 지정해준다.

HTTP 본문에는 **이진 형식으로 인코딩된 이미지 데이터가 포함될 것**입니다. 이를 통해 클라이언트나 서버가 본문의 데이터를 올바르게 해석하고 처리할 수 있게 된다.
