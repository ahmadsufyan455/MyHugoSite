---
title: "Android MVVM Design Pattern"
description: "Architecture Component - MVVM Design Pattern"
date: 2020-08-19T18:06:41+07:00
draft: false
categories: [code, android, kotlin]
---

Model View ViewModel atau lebih dikenal dengan MVVM merupakan sebuah design pattern yang direkomendasikan oleh google untuk mengembangkan aplikasi android. MVVM merupakan bagian dari android jetpack atau architecture component.

{{< figure src="/uploads/mvvm.png" width="100%" >}}

MVVM terdiri dari komponen Model, View, dan ViewModel.

* **Model** : Berisi fungsi yang digunakan untuk memproses data atau bisa juga menyediakan representasi data yang digunakan sehingga bisa dipakai di dalam ViewModel sebagai LiveData.

* **View** : Merupakan UI Controller atau yang bertugas untuk menampilkan data ke dalam UI, dalam hal ini yang bertindak sebagai UI Controller biasanya adalah activity dan fragment.

* **ViewModel** : Berinteraksi dengan model sehingga tugasnya adalah untuk menyimpan data model yang kemudian di observasi oleh view.

Berikut adalah lifecycle dari ViewModel.

{{< figure src="/uploads/mvvm-lifecycle.jpg" width="100%" >}}

ViewModel akan tetap dipertahankan ketika activity pertamakali dijalankan sampai activity tersebut dihancurkan atau aplikasinya ditutup sehingga datanya tetap terjaga dari awal hingga akhir.

Contohnya ketika kita melakukan configuration changes seperti mengubah orientasi layar dari portrait ke landscape atau sebaliknya, jika tidak menggunakan ViewModel maka datanya tidak akan terjaga dan direstart kembali, namun jika kita menggunakan ViewModel untuk menyimpan data tersebut maka data tersebut akan langsung tersedia.

Berikut contoh penggunaan ViewModel.

Untuk penggunakan ViewModel kita perlu menambahkan dependency berikut di dalam build gradle.

```java
implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0"
```

Atur layout `activity_main.xml` untuk membuat sebuah textview dan button.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/txt_number"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:text="@string/_0"
        android:textSize="50sp"
        android:textStyle="bold" />

    <Button
        android:id="@+id/btn_add"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/txt_number"
        android:layout_centerInParent="true"
        android:layout_marginTop="16dp"
        android:text="@string/add_1" />

</RelativeLayout>
```

Kemudian kita buat sebuah kelas `MainViewModel` yang extends ke kelas `ViewModel` dan kita masukkan data yang kita perlukan, dalam hal ini adalah variabel number.

```kotlin
class MainViewModel : ViewModel() {
    var number = 0
    fun addNumber() {
        number++
    }
}
```

Sekarang kita buat dan panggil objek ViewModel tersebut didalam kelas `MainActivity` menggunakan `ViewModelProvider`.

```kotlin
val mainViewModel = ViewModelProvider(this)
            .get(MainViewModel::class.java)
```

Kemudian kita panggil method yang ada didalam objek viewmodel tersebut yang berisi variable number dan kita taruh di button setOnClickListener sehingga `MainActivity` menjadi seperti ini.

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val mainViewModel = ViewModelProvider(this)
            .get(MainViewModel::class.java)

        txt_number.text = mainViewModel.number.toString()

        btn_add.setOnClickListener {
            mainViewModel.addNumber()
            txt_number.text = mainViewModel.number.toString()
        }
    }
}
```

Ketika kita jalankan dan melakukan rotasi layar, maka data akan tetap terjaga karena sudah tersimpan di dalam kelas ViewModel.

Simpel bukan ?