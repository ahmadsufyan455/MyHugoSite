---
title: "Consume API Menggunakan Retrofit"
date: 2020-05-18T19:11:56+07:00
draft: false
categories: [code,android]
---

Pada artikel ini kita akan belajar tentang retrofit. Jadi retrofit merupakan sebuah library android yang bisa kita gunakan untuk consume API atau menggunakan API dengan memparsing data JSON ke dalam POJO atau data class sehingga bisa kita tampilkan ke dalam interface.<!--more-->

Kali ini saya akan mencoba menampilkan data covid-19 yang API nya kita ambil dari situs https://kawalcorona.com/api/

Disana terdapat beberapa endpoint yang bisa kita gunakan mulai dari data lokal hingga data global. Untuk tutorial ini saya menggunakan endpoint lokal yaitu `indonesia`

{{< figure src="/uploads/endpoint.JPG" width="100%" >}}

Oke langsung saja kita coba..

#### 1. Buat project baru

Buka android studio dan buat project baru dengan bahasa kotlin dan API level 21.

#### 2. Memasang library dependensi

Setelah projek siap, kita tambahkan beberapa dependensi retrofit berikut.

```java
implementation 'com.squareup.retrofit2:retrofit:2.8.1'
implementation 'com.squareup.retrofit2:converter-gson:2.8.1'
implementation 'com.squareup.okhttp3:logging-interceptor:3.12.1'
```

dependensi diatas terdiri dari retrofit, kemudian ada gson yang akan kita gunakan untuk converter data ke dalam data class dan juga ada okhttp3 yang kita gunakan untuk menampilkan data API ke dalam logcat.

Klik `sync` untuk melakukan sinkronisasi data

Oiya karena kita akan berhubungan dengan API maka kita tentu harus tersambung dengan internet, untuk itu kita perlu juga untuk memasang *internet permission* pada file `AndroidManifest.xml`

```java
<uses-permission android:name="android.permission.INTERNET"/>
```

#### 3. Membuat layout

Untuk layout kita pake yang simpel dulu, nanti belakangan kita modifikasi. Pada bagian layout activity yang akan kita gunakan tambahkan layout berikut.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="20dp"
    tools:context=".MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">

        <TextView
            android:id="@+id/label"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Data Corona di Indonesia"
            android:textSize="16sp"
            android:textStyle="bold"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/tvPositif"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:text="Result"
            android:textSize="16sp"
            android:textStyle="bold"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/label" />

        <TextView
            android:id="@+id/tvMeninggal"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:text="Result"
            android:textSize="16sp"
            android:textStyle="bold"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/label" />

        <TextView
            android:id="@+id/tvSembuh"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:text="Result"
            android:textSize="16sp"
            android:textStyle="bold"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/label" />

        <ProgressBar
            android:id="@+id/progressBar"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/label" />
    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

disana ada 3 textview yang kita gunakan untuk menampilkan data positif, sembuh, dan meninggal.

#### 4. Membuat data class

Sekarang kita buat sebuah data class yang akan kita gunakan untuk menampung data hasil parsing JSON oleh retofit.

Buat data class dengan nama `MainModel`

```kotlin
data class MainModel(
    val name: String, val positif: String, val sembuh: String,
    val meninggal: String
)
```

#### 5. Membuat interface

Kemudian kita buat sebuah interface untuk endpoitnnya, kasih nama `ApiEndpoint`.

```kotlin
interface ApiEndpoint {

    @GET("indonesia")
    fun getData(): Call<List<MainModel>>
}
```

metode `@GET` digunakan untuk menampung endpoint yang digunakan kemudian kita juga membuat fungsi `getData` yang nantinya digunakan untuk call data pada api servisnya.

#### 6. Membuat object Api servis

Sekarang kita buat sebuah object bernama `ApiService`, ini mirip seperti static kalau di java, namun karena kotlin tidak mendukung static maka sebagai gantinya adalah object.

```kotlin
object ApiService {
    private var BASE_URL: String = "https://api.kawalcorona.com/"
    val endpoint: ApiEndpoint
        get() {
            val interceptor = HttpLoggingInterceptor()
            interceptor.level = HttpLoggingInterceptor.Level.BODY
            val client = OkHttpClient.Builder().addInterceptor(interceptor).build()

            val retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build()

            return retrofit.create(ApiEndpoint::class.java)
        }
}
```

Pada api servis kita menyimpan BASE URL yang kita gunakan dalam hal ini adalah https://api.kawalcorona.com/ kemudian kita juga deklerasi endpoint dan pada metode `get()` kita melakukan implementasi retrofit mengikuti dokumentasi yang ada di halaman resminya.

https://square.github.io/retrofit/

#### 7. Melakukan data binding

Pertama kita buat fungsi untuk menampilkan progress bar. Jadi apabila data belum di muat maka akan muncul progress bar, apabila data selesai di muat maka progress bar akan hilang.

```kotlin
fun showLoading(loading: Boolean) {
        when (loading) {
            true -> progressBar.visibility = View.VISIBLE
            false -> progressBar.visibility = View.GONE
        }
    }
```

Kemudian kita buat fungsi `setResponse` untuk mengatur result / data yang akan ditampilkan ketika responnya sukses.

```kotlin
fun setResponse(mainModel: List<MainModel>) {
        val response = mainModel[0]
        tvPositif.text = "positif: ${response.positif}"
        tvSembuh.text = "sembuh: ${response.sembuh}"
        tvMeninggal.text = "meninggal: ${response.meninggal}"
    }
```

Bila kita perhatikan kode diatas sesaui dengan id pada layout kita dan variabel pada constructor data class.

Selanjutnya kita buat fungsi `getData` untuk memanggil data dari API.

```kotlin
private fun getData() {
        showLoading(true)
        ApiService.endpoint.getData()
            .enqueue(object : Callback<List<MainModel>> {
                override fun onFailure(call: Call<List<MainModel>>, t: Throwable) {
                    showLoading(false)
                }

                override fun onResponse(
                    call: Call<List<MainModel>>,
                    response: Response<List<MainModel>>
                ) {
                    showLoading(false)
                    if (response.isSuccessful) {
                        val mainModel: List<MainModel>? = response.body()
                        if (mainModel != null) {
                            setResponse(mainModel)
                        }
                    }
                }

            })
    }
```

Terakhir panggil fungsi `getData` tersebut ke dalam fungsi `onCreate`.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        getData()
    }
```

Maka hasil akhirnya seperti ini.

{{< figure src="/uploads/retrofit2.png" width="50%" >}}