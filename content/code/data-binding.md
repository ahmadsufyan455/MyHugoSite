---
title: "View Binding"
slug: "view-binding"
date: 2020-11-26T10:20:29+07:00
draft: false
---

Semenjak android studio 4.1 diluncurkan penggunaan kotlin syntetic sudah tidak diutamakan dan sudah tergolong *deprecated* walaupun masih bisa digunakan. 

Sebagai penggantinya google sebagai official menyarankan untuk menggunakan view binding untuk melakukan pengikatan view ke dalam kode logic program. View binding sangat powerfull untuk digunakan karena aman dari kesalahan serta support untuk java dan kotlin.

Berikut cara menerapkan view binding.

Pertama buka build gradle dan akftikan `viewBinding` di dalam blok android.

```java
android {
...
...
    buildFeatures {
        viewBinding true
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

Untuk mulai menerapkan view binding tinggal ditulis seperti berikut.

```java
binding.btnGenerate.setOnClickListener {
            val name = binding.edtName.text.toString()
            binding.txtName.text = name
        }
```

Contoh diatas merupakan view binding untuk memanggil Button, editText, dan TextView dari activity_main.xml dan melakukan beberapa proses di dalamnya.

Lalu bagaimana cara menerapkan view binding pada fragment ? caranya sedikit berbeda dengan activity. Berikut cara menerapkan view binding pada fragment.

Buka file fragmentnya dalam hal ini `AmazingFragment.kt` kemudian sesuaikan kodenya menjadi seperti dibawah ini.

```java
class AmazingFragment : Fragment() {

    private lateinit var binding: FragmentAmazingBinding // deklerasi binding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentAmazingBinding.inflate(inflater, container, false) // inflate binding
        return binding.root // return binding
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.btnGenerate.setOnClickListener {
            val name = binding.edtName.text.toString() // penerapan
            binding.txtName.text = name
        }
    }
}
```

Kemudian jangan lupa untuk melakukan onDestroy supaya tidak menyebabkan memory leak.

```java
override fun onDestroyView() {
    binding = null
}
```

Itulah cara penerapan view binding pada activity dan fragment, semoga bermanfaat.