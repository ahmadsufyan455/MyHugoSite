---
title: "Setup Tablayout With Viewpager"
slug: "viewpager"
date: 2020-06-26T12:58:28+07:00
draft: false
categories: [code, android, kotlin]
---

Bagaimana cara membuat tablayout dengan view pager ? Lets cekidot!

1. Tambahkan dependensi material berikut di `build.gradle(Module:app)` :

```java
implementation 'com.google.android.material:material:1.1.0'
```

2. Edit `main_activity.xml` dan tambahkan view pager dan tablayout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".ui.MainActivity">

    <com.google.android.material.tabs.TabLayout
        android:id="@+id/tabs"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="?attr/colorPrimary"
        app:tabTextColor="@android:color/white" />

    <androidx.viewpager.widget.ViewPager
        android:id="@+id/viewPager"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```

3. Buat dua buah fragment atau lebih (contoh: PopularFragment dan UpcomingFragment).

4. Buat kelas `ViewPagerAdapter` dan extends ke `FragmentPagerAdapter` kemudian sesuaikan kodenya seperti berikut.

```java
class ViewPagerAdapter(private val context: Context, fm: FragmentManager) : FragmentPagerAdapter(fm, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {
    override fun getItem(position: Int): Fragment {

        var fragment: Fragment? = null
        when (position) {
            0 -> fragment = PopularFragment()
            1 -> fragment = UpcomingFragment()
        }
        return fragment as Fragment
    }

    override fun getPageTitle(position: Int): CharSequence? {
        return when (position) {
            0 -> "POPULAR"
            else -> "UPCOMING"
        }
    }

    override fun getCount(): Int {
        return 2
    }

}
```

5. Pasang viewpager ke dalam `MainActivity`.

```java
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // setup view pager
        val viewPagerAdapter = ViewPagerAdapter(this, supportFragmentManager)
        viewPager.adapter = viewPagerAdapter
        tabs.setupWithViewPager(viewPager)

        supportActionBar?.elevation = 0f
    }
}
```

Done.