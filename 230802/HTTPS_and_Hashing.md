# 보안에 대한 고민

CS스터디를 진행하면서 HTTP, HTTPS, SSL, 대칭키 비대칭키에 대해 공부했다.
우리 프로젝트에 적용해보고싶었다.
지금 백엔드에서 해싱처리를 하고있는데, 이에 대한 고민, 생각의 흐름을 정리해보자

**기본 전제론 HTTPS 보안 프로토콜을 도입하는게 맞다.**

## 프론트엔드에서 보안에 도움을 주는 다른 방법은 없을까?

### 프론트엔드에서 해싱해서 백엔드에 보내볼까?

1. **의미가 없다. 안전하지 않은 연결에서의 해싱은 의미가 없다.**
해시된 비밀번호가 도청당하면, 그 해시자체가 비밀번호가 되어버린다. 즉, 도청자는 원래의 비밀번호를 알 필요 없이 해시된 값을 그대로 사용할 수 있다.
2. **클라이언트의 해싱은 브라우저에 의존한다.**
모든 브라우저가 동일한 방식으로 해싱을 처리하지 않을 수 있으므로 호환성문제가 발생할 수 있다.
3. **해싱 알고리즘이 클라이언트에 노출된다.**
악의적인 사용자가 이를 이용해 공격을 시도한다.

### 프론트엔드와 백엔드 둘다 해싱을 처리하는건? 해싱의 해싱은?

근거 : 프론트엔드에서 단방향 암호화를 해버리면 탈취당해도 유저의 **비밀번호 원문은 지켜주기 때문**에 다른 사이트에서 **악용하는 사례를 막을 수 있을 것** 같다.

1. **클라이언트의 해싱은 서버의 해싱을 방해할 수 있다.**
대부분의 경우 서버측에서 솔트와 함께 해싱된다. **솔트는 각 비밀번호에 고유하게 추가되는 랜덤 문자열**인데, 같은 비밀번호여도 각 사용자마다 다른 해시를 생성하게 해서 레인보우 테이블 공격을 방어한다.
    - 레인보우 테이블
        - 해시 함수를 사용하여 변환 가능한 모든 해시 값을 저장시켜 놓은 표
        - 보통 해시 함수를 이용하여 저장된 비밀번호로부터 원래의 비밀번호를 추출해 내는데 사용
        - 미리 해쉬값들을 계산해 놓은 테이블
    
    근데 **클라이언트에서 이미 해싱된 비밀번호를 받으면, 서버는 다시 솔트와 함께 해싱하는게 불가능**해진다.
    

사실 완전한 솔루션은 없을거고 바뀔수도 있을것이다. 내가 찾은 바로는 프론트엔드에서 암호화를 처리하는 것이 최선의 방법은 아니다.

### 결국 해야할건 웹사이트에서 HTTPS를 사용하는것이다. 아무리 강조해도 지나치지 않을 만큼의 중요한 사항이라고 한다.

그래도 직접 찾아보면서 시행착오를 겪어보니 행동에 대한 근거가 생기는 것 같다. 다음엔 HTTPS를 도입을 하고, 정리해보자.