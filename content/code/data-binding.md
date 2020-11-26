---
title: "Data Binding"
slug: "data-binding"
date: 2020-11-26T10:20:29+07:00
draft: false
---

Semenjak android studio 4.1 diluncurkan penggunaan kotlin syntetic sudah tidak diutamakan dan sudah tergolong deprecated walaupun masih bisa digunakan. 

Sebagai penggantinya google sebagai official menyarankan untuk menggunakan data binding untuk melakukan pengikatan view ke dalam kode logic program. Data binding sangat powerfull untuk digunakan karena aman dari kesalahan serta support untuk java dan kotlin.

Berikut cara menerapkan data binding.

Pertama buka build gradle dan akftikan `viewBinding` di dalam blok android.

```java
android {
...
...
    viewBinding {
        enabled = true
    }
}
```

Kemudian buka `MainActivity` dan inisialisasi variable binding terlebih dahulu diluar fungsi onCreate().

```java
private lateinit var binding: ActivityMainBinding
```

Kemudian hapus fungsi setContentView yang mengarah ke activity_main.xml dan ganti dengan view binding yang sudah di inflate sehingga seperti berikut.

```java
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

    }
```

Untuk mulai menerapkan data binding tinggal ditulis seperti berikut.

```java
binding.btnGenerate.setOnClickListener {
            val name = binding.edtName.text.toString()
            binding.txtName.text = name
        }
```

Contoh diatas merupakan data binding untuk memanggil Button, editText, dan TextView dari activity_main.xml dan melakukan beberapa proses di dalamnya.