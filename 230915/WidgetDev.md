# 흐름도

1. React Native에서 타이머 시작 / 정지 / 재설정 등의 액션을 받으면 해당 액션과 함께 현재 시간 정보를 Native Module을 통해 Android코드로 전달한다.
2. Android 코드에선 이 정보를 ‘Data Store’에 저장한다.

   ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cb1b8f1b-291b-4925-b41f-9238d5de628f/61df4182-9d3f-468b-993a-65a8dd972904/Untitled.png)

   - Android에서 제공하는 Store를 사용해 앱과 위젯 간의 공유 데이터를 저장하고 관리할 수 있다.
   - 1 ~ 2년전엔 SharedPreferences를 사용했다. 현재는 더 개선된 DataStore를 사용한다. 공식문서에서도 DataStore 사용을 권장한다.

3. 위젯은 주기적으로 Data Store의 정보를 체크해 해당 정보에 따라 UI를 업데이트한다.
4. 위젯에서도 타이머를 시작 / 정지 / 재설정 등 액션이 가능하므로, 이러한 정보들도 Data Store의 정보를 업데이트한다.

## XML 레이아웃을 작성하자.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cb1b8f1b-291b-4925-b41f-9238d5de628f/5662835c-5041-4951-9ffb-d241923f92e8/Untitled.png)

```jsx
<LinearLayout
  xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="@drawable/background_idog_widget"
  android:visibility="visible"
  android:orientation="horizontal"
>
  <LinearLayout
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_weight="1"
    android:gravity="center"
    android:orientation="vertical"
  >
    <ImageView
      android:id="@+id/profile"
      android:layout_width="110dp"
      android:layout_height="110dp"
      android:src="@drawable/timer"
    />
  </LinearLayout>

  <LinearLayout
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_weight="1"
    android:gravity="center"
    android:orientation="vertical"
  >
    <LinearLayout
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:orientation="horizontal"
      android:gravity="center"
    >
      <Button
        android:id="@+id/playButton"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:background="@drawable/timer"
        android:text="재생"
      />

      <Button
        android:id="@+id/stopButton"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_marginLeft="30dp"
        android:background="@drawable/timer"
        android:text="정지"
      />
    </LinearLayout>

    <TextView
      android:id="@+id/timer"
      android:layout_width="110dp"
      android:layout_height="40dp"
      android:layout_marginTop="30dp"
      android:background="@drawable/timer"
      android:text="00:00:00"
      android:gravity="center"
      android:textSize="18sp"
    />
  </LinearLayout>
</LinearLayout>
```

좀 심각하게 못생겼지만,, 일단 기능구현과 연결을 한 뒤 디자인을 다시하자.

## 위젯과 UI를 연동하자.

난 아는게 하나도 없는데 새로운 정보가 너무 많다. 정리하고 시작하자.

intent, remoteViews, pendingIntent, Context
