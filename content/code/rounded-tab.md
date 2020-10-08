---
title: "Rounded TabLayout"
slug: "tablayout"
date: 2020-09-06T19:13:20+07:00
draft: false
categories: [code]
---

Hello there, in this article I will gonna show you how to implement rounded tablayout as a background in tablayout widget android studio.

Oke let's start..

First, you need to create tablayout with viewpager. I have written article in this link ([Setup TabLayout With ViewPager](https://ahmadsufyan.my.id/viewpager/))

Then you need to create three drawable resources file like *selected_tab*, *unselected_tab*, and *selector_tab*.

Put this code into your *selected_tab* file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">

    <corners android:radius="24dp" />
    <solid android:color="@color/colorAccent" />

</shape>
```

You can change the color according to your wishes.

Then put this code into your *unselected_tab* file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">

    <corners android:radius="24dp" />
    <solid android:color="@android:color/transparent" />

</shape>
```

And the last one of drawable file put this code into your *selector_tab*.

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">

<!--    drawable for selected tab-->
    <item
        android:drawable="@drawable/selected_tab"
        android:state_selected="true"/>

<!--    drawable for unselected tab-->
    <item
        android:drawable="@drawable/unselected_tab"
        android:state_selected="false"/>

</selector>
```

Finally, open *activity_main.xml* the place where you put tablayout and according to the code below.

```xml
<com.google.android.material.tabs.TabLayout
        android:id="@+id/tabs"
        android:layout_width="match_parent"
        android:layout_height="32dp"
        android:layout_below="@id/title_bar"
        app:tabBackground="@drawable/tab_selector"
        app:tabGravity="center"
        app:tabIndicatorHeight="0dp"
        app:tabMode="scrollable"
        app:tabPaddingEnd="24dp"
        app:tabPaddingStart="24dp"
        app:tabRippleColor="@null"
        app:tabSelectedTextColor="@color/colorPrimaryDark"
        app:tabTextAppearance="@style/TabTextAppearance" />
```

As you can see we have a *app:tabTextAppearance* properties, you can make the value in *style.xml* like code below.

```xml
<style name="TabTextAppearance" parent="TextAppearance.Design.Tab">
   <item name="android:textSize">12sp</item>
   <item name="android:textColor">@color/myTextColor</item>
   <item name="fontFamily">@font/psemibold</item>
</style>
``` 

Hope help you, see you the next one. 