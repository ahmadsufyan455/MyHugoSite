---
title: "Membuat Spinner Pada Projek Android Studio"
slug: "spinner"
date: 2020-02-10T16:43:25+07:00
draft: false
author: "Ahmad Sufyan"
categories: [code, android]
---

Kita akan membuat spinner menggunakan layout XML dan juga memberikan aksi
klik pada button dan menampilkan toast sesuai dengan item yang dipilih.
<!--more-->

Langkah pertama kita akan membuat daftar item menggunakan string-array

Masuk ke bagian **res > values > strings.xml**

Kemudian tambahkan itemnya menggunakan string-array

```xml
    <string-array name="league_list">
        <item>Premiere League</item>
        <item>Spanish La Liga</item>
        <item>Serie-A Italia</item>
        <item>Bundesliga</item>
        <item>Eradivisie</item>
        <item>Shopee Liga 1</item>
    </string-array>
```

Setelah itu masuk ke bagian *activity_main.xml*, kemudian buat layout seperti ini

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <Spinner
        android:id="@+id/league_list"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:entries="@array/league_list"
        android:padding="15dp" />

    <Button
        android:id="@+id/btn_choose"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:text="@string/choose_league" />

</LinearLayout>
```

Setelah itu masuk ke bagian *MainActivity.kt* dan tambahkan kodenya menjadi seperti ini

```kotlin
package com.fynzero.myspinner

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.Spinner
import android.widget.Toast

class MainActivity : AppCompatActivity(), View.OnClickListener {

    private lateinit var list: Spinner
    private lateinit var btnChoose: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        list = findViewById(R.id.league_list)
        btnChoose = findViewById(R.id.btn_choose)

        btnChoose.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        val toast = Toast.makeText(this, "Your Choose ${list.selectedItem}", Toast.LENGTH_SHORT)
        toast.show()
    }
}
```

{{< figure src="/uploads/spinner.png" width="30%" >}}


Happy coding :)