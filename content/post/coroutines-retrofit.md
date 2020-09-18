---
title: "Coroutines + Retrofit"
description: "consume api menggunakan coroutines dan retrofit"
date: 2020-09-18T17:37:28+07:00
draft: false
categories: [code]
---

Ketika kita ingin mengambil data dari API di android kita bisa menggunakan beberapa cara, salah satunya adalah dengan library retrofit. Cara penggunaannya pun sudah sempat saya tulis di link berikut, [Consume API Menggunakan Retrofit](https://ahmadsufyan.my.id/post/belajar-retrofit/). Ketika kita menggunakan retrofit kita memerlukan sebuah callback.

Namun yang spesial di kotlin kita bisa menggabungkan antara [coroutines](https://ahmadsufyan.my.id/post/coroutines/) dan retrofit sehingga kita tidak memerlukan callback dan kode yang ditulis pun menjadi lebih ringkas.

Seperti biasa kita bisa tentukan dulu endpoint yang akan digunakan. Disinilah bedanya, terlihat bahwa kode dibawah menggunakan suspend function dan kita tidak menggunakan Call lagi untuk memanggil data classnya.

```java
interface Endpoint {
    @GET("api/v1/json/1/eventspastleague.php")
    suspend fun getLastMatch(@Query("id") leagueId: String): Response<LastMatchResponse>
}
```

Selanjutnya kita buat dulu ApiClient seperti biasa untuk negbuild retrofitnya.

```java
object ApiClient {
    private const val BASE_URL = "https://www.thesportsdb.com/"
    val instance: Endpoint by lazy {
        val interceptor = HttpLoggingInterceptor()
        interceptor.level = HttpLoggingInterceptor.Level.BODY
        val client = OkHttpClient.Builder().addInterceptor(interceptor).build()

        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(client)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        retrofit.create(Endpoint::class.java)
    }
}
```

Disinilah kita menggunakan coroutines untuk mengambil data dari API yang disediakan. Karena proses ini berkaitan dengan read data maka kita menggunakan `Dispatchers.IO`. Bisa dilihat perbedaan saat kita hanya menggunakan retrofit dan retrofit+coroutines, sangat ringkas.

```java
fun setMatch(id: String) {
        GlobalScope.launch(Dispatchers.IO) {
            val response = ApiClient.instance.getLastMatch(id)
            if (response.isSuccessful) {
               // get response
                matchList.postValue(response.body()?.events)
            }
        }
    }
```

Proses pengambilan data dari API ini akan berjalan secara asynchronous sehingga tidak akan menganggu kinerja UI thread.