# 상황

처음엔 그냥 무지성으로 npx expo start 명령어 + 안드로이드 에뮬레이터를 사용해 퍼블리싱, 라우팅연습 등 이것저것 만졌다.

그러나 S3, Google Social Login을 구현하고, 테스트할때 **expo start가 제대로 작동하지 않기 시작했다.** 당장 엎질러진 물을 주워담기 위해 검색해서 eas라는것을 알게되었고, npx expo run:android로 테스트를 시작했다. 왜 작동하는진 몰랐다.

정리하지 않고 넘어갔다. 또 시간이 지나 React Native Widget을 구현하려 했을 때, npx expo start로 실행하려하니 또 오류가 발생했고, **메시지는 Expo Go를 사용하지 않아야 한다**고 명시되어 있었다.

해결방법을 찾아보니, `expo-dev-client`라는게 있었고, `eas build --profile development --platform android`을 통해 빌드한 뒤 apk를 받아 에뮬레이터에 연결했다. 정상적으로 작동했다.

# ?? 뭐지? 왜 작동하지?

이게 뭔데 expo를 실행할 수 있는 방법이 3가지나 있는거지? apk를 받아 에뮬에 연결했을 때 든 생각이다.

- `npx expo start`
- `npx expo run:android`
- `eas build … expo start —dev-client`

오늘 정리할건 이 3가지들의 차이. 아니 **Expo의 모든 것**

## Expo의 시작

- Expo는 React Native 개발의 복잡성을 줄이기 위한 프레임워크이다.
  - 처음에 Expo CLI를 사용해 프로젝트를 시작하면 그 프로젝트는 Expo의 관리 아래에 있다.
  - 그러한 프로젝트는 **Managed workflow**라고 부른다.
- **Managed workflow**에선 Expo SDK가 제공하는 기능만 사용할 수 있다.
  - 이로인해 개발을 매우 간단하게 만들어주는 장점이 있다.
  - **그러나 일부 고급 기능이나 특정 네이티브 모듈에 대한 접근이 제한된다.**
    - 본인같은경우 S3, Google Social Login, Widget이 Expo에서 제공하지않았다.
    - **해당 라이브러리 맞춤 네이티브 코드가 필요**하게 되어 Expo Go를 사용하지 못하게 된 것.

## Expo에서 벗어나기

- 예전엔 Expo SDK에 없는 네이티브 모듈을 사용하려면, eject라는 과정을 통해 Expo를 벗어나야 했다.
  - 이 과정은 **Managed workflow**에서 **Bare workflow**로 전환하는 것을 의미한다.
  - 다시말해, Expo의 관리 환경에서 벗어나 React Native의 기본적인 환경에서 개발을 진행할 수 있다.
  - 이 때문에 Bare workflow는 **React Native Cli와 유사**하다. 그러나 Expo의 도구 및 라이브러리를 사용할 수는 있다. Managed workflow와 React Native Cli의 **중간지점**이라고 할 수 있겠다.
- 이 방식은 유연하긴 하지만, Expo의 큰 장점인 **IDE의 자유도를 잃게된다.**
  - Bare은 React Native Cli와 마찬가지로 Xcode, Android스튜디오가 필요하다.
  - 그래서 그냥 Expo를 꺼려했다고 한다. 굳이? 라는게 너무 컸다.

### 놀랍게도 2 ~ 3년 전까지만해도 이렇게 개발했다고 한다.

조금만 예전 글 구글링해보면 다 eject때문에 골머리를 앓고있다.. 2021년에도 그런 글이 있었다.

## Expo Development Client의 등장

- Expo Dev Client을 사용하면 Custom Development Client를 생성할 수 있다.
  - 쉽게 생각해서 Expo Go가 아닌 별도의 runtime을 만들어 실행한다.
  - **커스텀 Expo Go**라고 생각하면 이해가 쉽겠다.
- 이로인해 개발자는 Expo의 편리한 기능을 유지하면서, 필요한 네이티브 모듈들을 사용할 수 있게되었다.

## 그래서 저 세개의 명령어들 차이가 뭔데?

### npx expo start

- Expo 개발 서버를 시작하고, QR코드를 통해 Expo Go 앱에서 프로젝트 로드하는. 기본적인 명령어
- 개발 초기 단계에 `npx expo start`로 별다른 설정없이 빠르게 개발과 테스트할 수 있다.

### npx expo run:android

- 이 명령어는 **expo-dev-client와 함께 작동한다.**
- 개발 중인 애플리케이션의 변화를 실시간으로 확인하기 위한 것이다.
- 본질적으로, 이 명령어는 expo start와 비슷한 개발 환경을 제공한다. 그러나 커스텀 네이티브 모듈이나 기능을 사용할 수 있는 환경 또한 제공한다.

### eas build

- EAS Build는 애플리케이션의 빌드 과정을 클라우드에서 수행하게 해주는 서비스이다.
- 클라우드에서 APK, AAB파일(Android), IPA파일(IOS)을 생성한다. 이 파일을 받아 에뮬레이터나 실제 기기에서 설치 및 테스트가 가능하다.

## 결론

`npx expo run:android`는 개발 중인 로컬 머신에서 실시간으로 앱의 변화를 반영하며 테스트하는데에 초점을 맞춘다.

`eas build`는 클라우드 기반의 빌드 서비스를 통해 애플리케이션의 빌드파일을 생성하는거에 초점을 맞춘다.

끗
