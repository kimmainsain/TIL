# 위젯 디자인을 정해보자

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cb1b8f1b-291b-4925-b41f-9238d5de628f/0d8dca1f-8cf5-47c8-9e1c-e2fdf94279a8/Untitled.png)

현재 우리 어플이다.

이걸 위젯에 띄울건데, 스톱워치기능을 이쁘게 꾸며서 위젯으로 띄우는게 이번 목표이다.

[Widgets | Apple Developer Documentation](https://developer.apple.com/design/human-interface-guidelines/widgets)

[App widgets overview  |  Android Developers](https://developer.android.com/develop/ui/views/appwidgets/overview)

## 위젯의 사이즈를 먼저 정해보자.

### 위젯은 보통 resize가 가능하다.

![size-range.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cb1b8f1b-291b-4925-b41f-9238d5de628f/16f56300-4109-47be-a751-20446d2c2727/size-range.gif)

```java
@Override
public void onUpdate(...) {
    RemoteViews smallView = ...;
    RemoteViews tallView = ...;
    RemoteViews wideView = ...;

    Map<SizeF, RemoteViews> viewMapping = new ArrayMap<>();
    viewMapping.put(new SizeF(150f, 100f), smallView);
    viewMapping.put(new SizeF(150f, 200f), tallView);
    viewMapping.put(new SizeF(215f, 100f), wideView);
    RemoteViews remoteViews = new RemoteViews(viewMapping);

    appWidgetManager.updateAppWidget(id, remoteViews);
}
```

가이드까지 친절하게 나와있다.. 사용자가 resize하면 미리 정해둔 사이즈별 View를 보여주는 코드이다.

### 근데 위젯별로 1셀당 dp가 다른데 이건 어떻게하지?

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cb1b8f1b-291b-4925-b41f-9238d5de628f/10909472-c016-49f0-880f-c0b27f845c85/Untitled.png)

```java
@Override
public void onAppWidgetOptionsChanged(
    Context context, AppWidgetManager appWidgetManager, int appWidgetId, Bundle newOptions) {
    super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions);
    // Get the new sizes.
    ArrayList<SizeF> sizes =
        newOptions.getParcelableArrayList(AppWidgetManager.OPTION_APPWIDGET_SIZES);
    // Check that the list of sizes is provided by the launcher.
    if (sizes == null || sizes.isEmpty()) {
      return;
    }
    // Map the sizes to the RemoteViews that you want.
    Map<SizeF, RemoteViews> viewMapping = new ArrayMap<>();
    for (SizeF size : sizes) {
        viewMapping.put(size, createRemoteViews(size));
    }
    RemoteViews remoteViews = new RemoteViews(viewMapping);
    appWidgetManager.updateAppWidget(id, remoteViews);
}

// Create the RemoteViews for the given size.
private RemoteViews createRemoteViews(SizeF size) { }
```

android dev에서도 위젯 크기를 결정할땐, 그 size를 case별로 나누어줘서 계산해야한다고 한다.

특정 함수를 사용하면 그 디바이스의 1셀을 계산한 뒤 n x n셀의 dp를 계산해주는 메소드가 있는지 검색해봤는데, dev에서도 하드코딩을한다.(…)

일반적으로 1셀이 몇dp인지 대략적인 가이드라인이 있긴하다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cb1b8f1b-291b-4925-b41f-9238d5de628f/91654c5b-bd9a-4fbb-81dc-6ec0bca63f35/Untitled.png)

일단 세로 2셀, 가로 4셀을 고정으로 하자. 팀원들 안드로이드 폰을 보니 가로 4셀도있고 5셀도있다. 2 x 4를 기준으로 먼저 디자인하자.

## 위젯의 모범 활용

- 앱의 주요 목적과 명확하게 관련된 아이디어를 제공하라.
  - 디자인의 첫 번째는 단일 아이디어를 채택하는 것이다.
- 위젯의 각 크기마다 위젯의 주요 목적과 직접적으로 관련된 정보만 표시하라.
  - 위젯 크기가 커지면 더 많은 정보를 제공하는건 맞지만, 위젯의 목적에 집중해라.
- 다양한 크기로 위젯을 제공하면, 가치가 더해진다.
- 앱을 실행하기만 하는 위젯을 생성하지 마라.
- 계속 변화하는 동적 정보를 선호한다.
  - 위젯의 콘텐츠가 전혀 변경되지 않는 것처럼 보이면 위젯을 눈에 안띄는 곳에 위치할 수 있다.
  - 자주 볼 수 있도록 콘텐츠를 최신 상태로 유지하라.

## 인터페이스 디자인

- 위젯에 로고, 앱 아이콘은 신중하게 고려해라
  - 사용자는 위젯을 인식할 때 로고나 앱 아이콘이 필요한 경우는 거의 없다.
  - 위젯을 제공하는 앱을 미묘하게 식별하기 위해 오른쪽 상단에 작은 로고를 박는게 합리적이다.
- 편안한 정보 밀도를 목표를 해라.
  - 컨텐츠가 너무 적으면 위젯이 불필요하고, 많으면 인식하기 어려움
- 색상을 신중하게 사용하라
  - 아름다운 색은 시선을 끌지만, 위젯의 정보를 한눈에 흡수하는데 방해된다.

## 모드 지원

라이트 모드와 다크 모드가 있다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cb1b8f1b-291b-4925-b41f-9238d5de628f/aafba061-25e1-4b67-980e-a2cb7e8bdcd7/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cb1b8f1b-291b-4925-b41f-9238d5de628f/2bb6a7c7-b791-48a9-a48e-643f2c05d13e/Untitled.png)

검정배경 + 하얀텍스트 or 반투명 + 하얀텍스트 두개를 고려해서 만들어보자.

A안 ( 다크모드 )

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cb1b8f1b-291b-4925-b41f-9238d5de628f/99f1abd8-00eb-457e-842c-34d916cd11b2/Untitled.png)

다음 챕터에서 코드를 작성한다.
