프로세스와 스레드를 찾아보면서 느낀건데

운영체제의 거의 모든 곳에 프로세스와 스레드가 나온다.

다음을 위해 프로세스와 스레드의 기본적인, 기초적인 이해를 목표로 하자.

# 목표

아래 질문에 대해 대답할 수 있을 정도로 알아보자.

- **프로세스와 스레드의 차이를 설명해주세요**
- 설명

  프로세스는 운영체제로부터 자원을 할당받아 실행되는 독립적인 작업의 단위입니다. 이에 반해 스레드는 프로세스 내에서 실행되는 흐름의 단위로, 프로세스의 자원을 공유하여 사용합니다. 따라서 프로세스는 독립적인 메모리 공간을 가지지만, 스레드는 프로세스의 메모리를 공유하면서 독립적인 스택 영역을 가집니다. 이는 스레드가 메모리를 공유하므로 생성과 관리가 더 빠르고 경량화되어 있지만, 동기화 문제를 신경 써야한다는 단점도 있습니다.

- **멀티프로세싱과 멀티스레딩의 차이점은 무엇인가요?**
- 설명

  멀티프로세싱은 여러 개의 프로세스를 동시에 처리하는 것을 의미합니다. 각 프로세스는 독립적인 메모리 영역을 가지므로 프로세스 간의 영향을 받지 않습니다. 그러나 프로세스 생성과 스위칭에는 상대적으로 많은 자원이 소모됩니다.

  반면, 멀티스레딩은 단일 프로세스 내에서 여러 개의 스레드를 동시에 처리하는 것을 의미합니다. 스레드들은 같은 프로세스 내에서 메모리를 공유하기 때문에 통신이 더 간단하고 경량화되어 있습니다. 그러나 이로 인해 데이터 동기화에 신경을 써야합니다.

  따라서 핵심적인 차이는 '독립적인 메모리 공간에서 동작하는 여러 프로세스'와 '공유된 메모리 공간에서 동작하는 여러 스레드'를 동시에 실행하는지에 있습니다.

- **프로세스와 스레드의 주요 차이점 중 하나인 메모리 공유에 대해 설명해주세요**
- 설명

  프로세스는 운영체제로부터 독립적인 메모리 공간을 할당받아 실행됩니다. 이 메모리 공간은 코드, 데이터, 힙, 스택 등의 영역으로 나뉘어져 있습니다. 이 때, 각 프로세스는 다른 프로세스의 메모리 공간에 직접 접근할 수 없습니다.

  반면, 스레드는 하나의 프로세스 내에서 동작하며, 그 프로세스의 메모리 공간을 공유합니다. 스레드는 프로세스의 코드, 데이터, 힙 영역을 공유하면서, 각각 독립적인 스택 영역을 가지게 됩니다. 이 때문에 스레드 간에는 데이터를 공유하며 통신하는 것이 가능하나, 데이터 동기화에 주의를 기울여야 합니다.

  따라서, 프로세스와 스레드의 주요 차이점 중 하나는 메모리 공유에 있습니다. 프로세스는 독립적인 메모리 공간을 가지고, 스레드는 프로세스의 메모리 공간을 공유합니다. 이로 인해 스레드는 메모리를 효율적으로 사용하면서 빠른 통신이 가능하지만, 동기화 문제를 신경 써야 합니다.

- 스레드 동기화란 무엇인가요?
- 컨텍스트 스위칭이란 무엇인가요?

## 프로세스

- 운영체제로부터 자원을 할당받은 **작업의 단위**

## 스레드

- 프로세스가 할당받은 자원을 이용하는 **실행 흐름의 단위**

잘 납득이 안가더라도 일단 기억해보자.

프로세스 - 작업의 단위

스레드 - 실행 흐름의 단위

## 프로그램과 프로세스

- 프로그램 → 코드 덩어리
- 프로세스 → 그 코드 덩어리를 실행한 것

**프로그램**은 `*.exe`, `*.dmg` 파일과 같이 **컴퓨터에서 실행 할 수 있는 파일**을 통칭한다. 단, 아직 파일을 실행하지 않은 상태이기에 정적 프로그램. 줄여서 프로그램이라고 부른다.

모든 프로그램은 운영체제가 실행되기 위한 메모리 공간을 할당해 줘야 실행될 수 있다. 그래서 프로그램을 실행하는 순간 파일은 컴퓨터 메모리에 올라가게 되고, 운영체제로부터 시스템 자원(CPU)을 할당받아 프로그램 코드를 실행시켜 서비스를 이용할 수 있게 되는 것이다.

![Untitled](./img/Untitled.png)

| 프로그램                                                          | 프로세스                                                            |
| ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| 어떤 작업을 하기 위해 실행할 수 있는 파일                         | 실행되어 작업중인 컴퓨터 프로그램                                   |
| 파일이 저장 장치에 있지만 메모리에는 올라가 있지 않은 정적인 상태 | 메모리에 적재되고 CPU 자원을 할당받아 프로그램이 실행되고 있는 상태 |
| 쉽게 말해 그냥 코드 덩어리                                        | 그 코드 덩어리를 실행한 것                                          |

## 스레드의 등장

예전엔 프로세스 하나만 사용해서 다운완료될때까지 기다려야했다. 근데 요즘은? 컴퓨터 하면서 노래도 듣고 골프잇도 하고 음성채팅도하고 ㅇㅇ 예전엔 당연하지 않았음.

예를 들어보자. 크롬 브라우저가 실행되면 프로세스 하나가 생성될건데, 우리는 브라우저에서 파일 받으며 게임도 하고 쇼핑도한다.

![Untitled](<./img/Untitled%20(1).png>)

하나의 프로세스 안에서 여러가지 작업들 흐름이 동시에 진행되는데, 이러한 작업 흐름들을 **스레드**라고 하며 여러개가 있다면 **멀티 스레드**라고 부른다. ~~당연히 스레드 수가 많을 수록 동시에 하는 작업이 많아져 성능이 올라갈 것이다.~~

# 프로세스 & 스레드의 메모리

## 프로세스의 자원 구조

![Untitled](<./img/Untitled%20(2).png>)

### 스택

- 지역변수나 매개변수가 저장되는 공간
- 함수 호출 시 스택에 스택 프레임블록이 생성되고, 종료시 사라진다. 메모리 초과시 ‘스택오버플로우’

### 힙 영역

- C의 malloc과 같이 동적으로 메모리를 할당받아 사용하는 공간.
- 끝나면 해제해야하며 제때 하지않을시 메모리 누수가 발생할 수 있음

### 데이터 영역

- 전역 변수와 정적 변수가 저장되는 공간

### 코드 영역

- 실행코드가 저장되는 공간.
- 컴퓨터가 실행해야 할 명령들이 이곳에 저장된다.

![Untitled](<./img/Untitled%20(3).png>)

프로그램이 하나씩 실행될때마다 메모리에 프로세스들이 담길 주소 공간이 생기고, 그 안에 Code, Data, Stack, Heap공간이 만들어진다.

## 스레드의 자원 공유

스레드는 프로세스가 할당 받은 자원을 이용하는 실행의 단위이다. **스레드끼리 프로세스의 자원을 공유**하며 실행 흐름의 일부가 되기 때문에 동시 작업이 가능하다.

![Untitled](<./img/Untitled%20(4).png>)

사진과 같이 하나의 프로세스 내에 여러개의 스레드가 들어있는 상태이다.

이때 프로세스의 4가지 메모리 영역`(Code, Data, Heap, Stack)`중 스레드는 `Stack` 만 할당받아 복사하고, `Code, Data, Heap`은 프로세스내의 다른 스레드들과 **공유**된다.

![Untitled](<./img/Untitled%20(5).png>)

조금 풀어서 이해해보자. 사실 당연하다.

- Code영역은 프로그램의 실행코드가 저장되는 영역이라고 설명했다.
- Data영역은 전역 변수, 정적 변수가 저장되는 영역이다.
- 당연히 지역변수, 매개변수, 반환주소를 저장하는 **스레드**는 **다른 스레드와 공유하지않는다.**
- Heap영역은 동적으로 할당받은 메모리를 관리하는 영역이다.
  - 스레드 A에서 `malloc` 을 사용해 메모리를 할당받았다고 생각해보자.
  - 다른 스레드는 그 메모리의 주솟값을 모르기에 접근할 수 없지만, 스레드 A가 주솟값을 전달하면 접근할 수 있다.

## 프로세스의 자원 공유

기본적으로 각 프로세스는 메모리에 별도의 주소 공간에서 실행되기 때문에, 한 프로세스는 다른 프로세스의 변수나 자료구조에 접근할 수 없다.

그러나 특별한 방법을 통해 프로세스가 다른 프로세스의 정보에 접근하는 것이 가능하긴한데 (IPC, LPC, 별도의 공유 메모리를 만들어서 정보를 주고 받도록 설정) 너무 지엽적인 것 같아 넘어간다.
