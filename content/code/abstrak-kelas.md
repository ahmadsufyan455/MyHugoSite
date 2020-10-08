---
title: "Abstrak Kelas"
slug: "abstract-class"
date: 2020-05-13T23:55:42+07:00
draft: false
categories: [code]
---

Abstrak kelas merupakan suatu kelas pada OOP (Object Oriented Programming) yang tidak bisa dijadikan sebuah objek. <!--more-->

Seperti namanya abstrak kelas belum bisa di definisikan secara spesifik. Misalnya kelas `Animal`, animal yang dimaksud masih bersifat abstrak. Kelas abstrak hanya bisa diwariskan pada kelas lain atau kelas turunannya. Kelas abstrak hanya berisi properti dan fungsi sehingga bisa di implementasikan pada kelas turunnanya dengan melakukan *override*.

Kelas abstrak ditulis dengan menambahkan kata kunci `abstract` sebelum nama kelas.

Example :

Misalkan saya disini mempunyai kelas `Animal` yang merupakan kelas abstract.

```kotlin
abstract class Animal(var name: String, val weight: Double, var age: Int, var isCarnivora: Boolean) {
    open fun eat() {
        print("$name sedang makan!!")
    }

    open fun sleep() {
        print("$name sedang tidur!!")
    }
}
```

Kemudian saya buat kelas baru lagi dengan nama `Koala` dan mewarisi kelas abstrak `Animal` jadi kalau dilihat secara diagram bahwa `Koala` is `Animal`.

```kotlin
class Koala : Animal("Koala", 1.2, 12, true) {
    override fun eat() {
        println("$name sedang makan!!")
    }
}
```

Misalnya lagi saya buat kelas `Sapi` yang mewarisi `Animal`, jadi `Sapi` is `Animal`.

```kotlin
class Sapi : Animal("Sapi", 3.4, 10, false) {
    override fun eat(){
        println("$name sedang makan rumput")
    }
}
```

Jadi dengan abstraksi kita bisa menggunakan method pada kelas abstrak di kelas yang mewarisinya dengan meng-overridenya, jadi satu nama fungsi dengan implementasi yang berbeda-beda pada setiap kelas yang mewarisinya.