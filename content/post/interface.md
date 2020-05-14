---
title: "Interface"
date: 2020-05-13T23:56:01+07:00
draft: false
categories: [code]
---

Interface bisa dibilang sebuah gambaran atau rencana dari sebuah program.<!--more-->

Interface hanya berisi kumpulan method atau fungsi yang tidak memiliki body/isi. Tidak jauh berbeda dengan kelas abstract fungsinya juga hampir sama. 

Interface biasanya akan di implementasikan pada suatu kelas, jadi kelas yang mengimplementasikan suatu interface bisa mengakses semua method yang ada di dalam interface dengan melakukan *override*. 

Dengan membuat interface kita bisa menyederhanakan/mengoptimalkan kode yang memiliki fungsi yang sama dengan implementasi yang berbeda.

Penulisan nama interface sendiri biasanya diawali dengan huruf `I` kemudian dilanjutkan dengan nama interfacenya, hal ini bertujuan untuk membedakannya dengan kelas yang lain.

Kita dapat mengimplementasikan lebih dari satu interface pada sebuah kelas.

Example :

Misalkan saya mempunyai interface dengan nama `Ikoding` yang di dalamnya terdapat beberapa method berikut.

```kotlin
interface IKoding {
    fun kode()
    fun eat()
    fun sleep()
    fun repeat()
    var produktif: Boolean
}
```

Kemudian saya akan implementasikan ke dalam kelas `Programmer` sehingga kita bisa mengakses semua method yang ada di interface `Ikoding`.

```kotlin
class Programmer(override var produktif: Boolean) : IKoding {
    override fun kode() {
        println("Ngoding dulu sambil ngopi gan")
    }

    override fun sleep() {
        println("Waktunya tidur gan")
    }

    override fun eat() {
        println("Makan dulu bosku")
    }

    override fun repeat() {
        if (produktif == true) println("Kerja bagus, semoga cepat sukses")
        else println("Sulit untuk berkembang")
    }
}
```

Kita bisa menaruh kode yang akan di implementasikan pada masing-masing method yang telah di `override`.

