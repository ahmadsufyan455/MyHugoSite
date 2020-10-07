---
title: "Kotlin Coroutines"
date: 2020-09-11T09:44:54+07:00
draft: false
categories: [code]
---

Ketika kita perlu menjalankan sebuah proses secara asynchronous supaya tidak mengganggu kinerja dari main threads (UI Thread) maka kita perlu membuat threads baru yang disebut background threads.

Ada berbagai jenis threads yang bisa kita gunakan seperti AsyncTask dan Handler. Namun dalam penerapannya kita perlu menuliskan kode lebih kompleks, misalkan AsycnTask yang memerlukan callback serta menaruh proses di dalam *doInBackround* setelah itu mengirimkan hasilnya ke *onPostExecute*. Namun bagi pengguna kotlin bisa meringkas proses tersebut bahkan dua kali lipat dengan menggunakan coroutines.

**Apa itu coroutines ?**

Coroutines merupakan sebuah library yang disedikan untuk pengembangan aplikasi menggunakan kotlin yang fungsinya untuk menjalankan sebuah proses secara asynchronous. Cara kerjanya mirip dengan AsyncTask, namun coroutines lebih powerfull dan ringkas. Coroutines berjalan diatas threads, walaupun begitu coroutines tidak terikat dengan threads. Bayangkan bahwa threads adalah sebuah proyek bangunan dan coroutines adalah pekerjanya, jadi banyak coroutines dapat berjalan dalam satu threads.

Coroutines juga menyediakan beberapa suspend function seperti *delay* sehingga ketika sebuah proses membutuhkan waktu, maka tidak akan memblokir UI threads sehingga aplikasi bisa tetap berjalan secara responsif.

Dengan menggunakan coroutines kita bisa dengan mudah untuk berpindah antar threads. Kita bisa memanfaatkan Dispatchers. Berikut beberapa Dispatchers pada coroutines.

1. **Dispatchers.Main** : Untuk menjalankan proses yang berhubungan langsung ke UI misalnya untuk mengupdate UI ketika proses di background telah selesai dijalankan. Apabila kita tidak menggunakannya maka UI tidak akan pernah terupdate.

2. **Dispatchers.IO** : Untuk menjalankan fungsi yang berhubungan dengan proses read-write file dari server atau database.

3. **Dispatchers.Default** : Untuk menjalankan fungsi/proses menggunakan kinerja CPU seperti sorting dan parsing data.

Karena coroutines bukan bagian dari bahasa kotlin melainkan ia adalah sebuah library, maka untuk mengimplementasikannya kita membutuhkan dependensi yang harus kita tambahkan di dalam *build.gradle*.

```java
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.0"
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.0"
```

Untuk memulai sebuah coroutines kita bisa menulis kode

```java
GlobalScope.launch { /*do asynchronous*/  }
```

*GlobalScope* berarti kita mengatur lifecycle dari coroutines mengikuti lifecycle dari aplikasi dan *launch* berarti kita memanggil proses tanpa ada nilai kembalian. Kemudian di dalam block kurung kurawal kita bisa menjalankan sebuah proses secara asynchronous.

```java
GlobalScope.launch {
            delay(3000)
            Log.d(TAG, "Hello from coroutine")
        }
        Log.d(TAG, "Hello from main")
```

Ketika kita run kode diatas maka hasilnya adalah..

```
2020-09-11 10:22:06.880 6903-6903/com.fynzero.kotlincoroutine D/MainActivity: Hello from main
2020-09-11 10:22:09.878 6903-6936/com.fynzero.kotlincoroutine D/MainActivity: Hello from coroutine
```

Kenapa yang di print *hello from main* terlebih dahulu baru *hello from coroutine* padahal kita menulis coroutines diawal ? Karena di dalam coroutines kita memberikan sebuah suspend function delay sehingga kode setelahnya akan ditahan selama 3 detik (3000L) baru kemudian dijalankan. Karena kita menggunakan suspend function maka ia tidak akan memblokir main thread sehingga kode yang ada di main thread tetap berjalan normal tanpa harus menunggu proses yang ada di coroutines selesai.

Lalu bagaimana jika kita ingin memanggil proses dengan nilai kembalian ? *async* adalah jawabannya.

Dengan menggunakan kata kunci *async* maka kita bisa memanggil proses dengan nilai kembalian dalam bentuk *Deffered* dan untuk mendapatkan hasilnya kita bisa menggunakan fungsi *await()*.

Contoh kita buat sebuah suspend function dengan nilai kembalian berupa string.

```java
private suspend fun getName(name: String): String {
        delay(2000L)
        return "Hello $name"
    }
```

Kemudian untuk memanggil fungsi tersebut di dalam coroutines kita membutuhkan fungsi *async* dan *await*.

```java
GlobalScope.launch {
            val name = async { getName("Fyn") }
            val results = name.await()
            Log.d(TAG, results)
        }
```

Dan ketika di run maka hasilnya sudah pasti bisa ditebak

```
2020-09-11 10:41:30.160 7290-7337/com.fynzero.kotlincoroutine D/MainActivity: Hello Fyn
```