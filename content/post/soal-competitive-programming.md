---
title: "Kotlin Heroes Episode 4 : Problem A Color Revolution"
date: 2020-05-31T12:34:48+07:00
draft: false
categories: [code, Kotlin, CompetitiveProgramming]
---

Halo friend, pada kesempatan kali ini saya akan membahas mengenai soal competitive programming.<!--more-->

Oiya, bagi kalian yang belum tau, jadi competitive programming merupakan sebuah ajang atau kontes programming yang biasanya bertujuan untuk memecahkan sebuah masalah yang diberikan berupa narasi dan matematika menggunkan kode program.

> *Dengan mengikuti competitive programming kalian bisa sekalian belajar dalam mengasah kemampuan logika berpikir, menyusun algoritma, dan memecahkan sebuah permasalahan menggunakan kode program*.

Dimana saya bisa ikut competitive programming ? banyak situs competitive programming seperti codeforce, hackerRank, google code jam, dan masih banyak lagi. Namun yang akan dibahasa kali ini adalah sebuah soal **kotlin heroes episode 4** dari [codeforces](https://codeforces.com/contests)

Soal competitive programming biasanya menggunakan bahasa inggris, jadi sedikit kemampuan bahasa inggris bisa membantu atau bisa juga menggunakan google translate.

Oke perhatikan soal berikut ini, color revolution.

```
A. Color Revolution
time limit per test: 1 second
memory limit per test: 256 megabytes
input: standard input
output: standard output
```
Hmm, how long has it been since the last color revolution? 5 years?! It's totally the time to make a new one!

So the general idea is the following. Division 1 should have n1 participants. Division 2 should have n2 and be exactly k times bigger than division 1 (**_n2=k⋅n1_**). Division 3 should have **_n3=k⋅n2_** participants. Finally, division 4 should have **_n4=k⋅n3_** participants.

There are n participants on Codeforces in total. So **_n1+n2+n3+n4_** should be exactly equal to **n**.

You know the values of n and k. **You also know that n and k are chosen in such a way that there exist values n1,n2,n3 and n4 such that all the conditions are satisfied**.

What will be the number of participants in each division (**_n1,n2,n3 and n4_**) after the revolution?

Input
The first line contains a single integer **t** (**_1≤t≤1000_**) — the number of testcases.

Each of the next **t** lines contains two integers **n** and **k** (**_4≤n≤109; 1≤k≤500_**) — the total number of participants on Codeforces and the size multiplier for the corresponding testcase. In each testcase, **n** and **k** are chosen in such a way that the answer exists.

Output
For each testcase print four integers **_n1,n2,n3 and n4_** such that **_n2=k⋅n1, n3=k⋅n2, n4=k⋅n3 and n1+n2+n3+n4=n_**.

example
```
input
4
40 3
1200 7
320802005 400
4 1
```
```
output
1 3 9 27
3 21 147 1029
5 2000 800000 320000000
1 1 1 1
```

Oke mari kita selesaikan soal diatas,

#### 1. Analisis narasi masalah

Hal pertama yang harus dilakukan adalah menganalisis narasi masalah yang diberikan. Hal ini sangat penting untuk dilakukan supaya kita tau problem dari soal tersebut apa dan kita bisa identifikasi hal apa saja yang dibutuhkan untuk menyelesaikan masalah tersebut. Oke setelah dibaca dan dipahami maka kita dapat kesimpulan seperti ini.

**Jadi divisi 1 harus punya n1 partisipan, divisi 2 harus punya n2 partisipan yang k kali lebih besar dari n1, jadi (n2 = k x n1), divisi 3 punya n3 = k x n2, divisi 4 punya n4 = k x n3. Kemudian ada n total partisipan codeforces, jadi n1 + n2 + n3 + n4 harus sama dengan n total jumlah partisipan**.

**Kemudian harus ada nilai n dan k sebagai input sehingga memenuhi syarat untuk menghitung nilai n1, n2, n3, dan n4**

**Perintahnya adalah tampilkan nilai n1, n2, n3, dan n4**

#### Menyusun algoritma

Algoritma adalah langkah-langkah untuk menyelesaikan sesuatu. Jadi sangat penting bagi kita untuk membuat algoritma atau langkah-langkahnya terlebih dahulu sebelum kita masuk ke kodingan. Algoritma juga akan mempermudah kita ketika kita mengkonversi permasalah ke dalam sebuah kode program.

Jadi setelah di analisis kita bisa menyusun algoritma seperti berikut.

```
1. Masukkan nilai t untuk banyaknya percobaan
2. Masukkan nilai n untuk total partisipan
3. Masukkan nilai k untuk kelipatan n1
4. Hitung nilai n1
5. hitung nilai n2, n3, dan n4 dengan nilai n1 yang sudah di dapat
6. Tampilkan nilai n1, n2, n3, dan n4
7. Ulangi sebanyak t kali
```

Oke sangat simpel bukan ?
Oiya untuk menentukan nilai n1 kita bisa menggunakan rumus matematika sesuai kebutuhan.

#### Membuat kode program

Setelah kita buat algoritmanya, akhirnya sekarang kita akan membuat sebuah kode program untuk memecahkan masalah pada soal diatas. Berikut ini kode program menggunakan bahasa kotlin.

```kotlin
fun main() {
    val scanner = Scanner(System.`in`)
    val t = scanner.nextInt()

    repeat(t) {
        val n = scanner.nextLong()
        val k = scanner.nextInt()

        val n1 = (n / (1 + k + (k*k) + (k*k*k))).toInt()
        val n2 = k * n1
        val n3 = k * n2
        val n4 = k * n3

        println("$n1 $n2 $n3 $n4")
    }
}
```

#### Jalankan kode program

Setelah kita buat kode programnya, selanjutnya jalankan kode program tersebut. Kemudian inputkan angka sesuai example input dan cocokkan dengan hasilnya. Apabila sudah sesuai dengan hasil maka kita berhasil dalam membuat solusi untuk permasalahan tersebut. 

berikut hasilnya :

<img src="/uploads/result.JPG" width="50%" style="display: block; margin: auto;"><br>

selanjutnya kita bisa submit kode program tersebut ke platform tempat competitive programming di adakan, seperti codeforces dan hasilnya akan di accepted kalau sudah sesuai.

<img src="/uploads/colorevolution.JPG" style="display: block; margin: auto;"><br>

Oke friend sekian dulu, nanti kita lanjutkan pembahasan mengenai soal-soal competitive programming lainnya, semoga bermanfaat.